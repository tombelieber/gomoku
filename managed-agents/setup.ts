/**
 * SETUP — idempotent. Creates or updates managed agent infrastructure.
 *
 * Modes:
 *   bun run setup              If config exists → update agents in-place
 *                               If no config → create everything fresh
 *   bun run setup -- --fresh   Archive old agents, create everything fresh
 *
 * Creates/updates:
 *   1. Environment (sandbox config)
 *   2. Vault + credentials (GitHub MCP + Slack MCP auth)
 *   3. 5 agents (1 shared + 4 dedicated)
 */
import Anthropic from "@anthropic-ai/sdk";
import { toFile } from "@anthropic-ai/sdk";
import fs from "fs";
import os from "os";
import path from "path";
import { loadConfig, saveConfig } from "./lib/config.js";
import type { AgentRef, FullConfig } from "./lib/config.js";

const client = new Anthropic();
const FRESH = process.argv.includes("--fresh");

function requireEnv(name: string): string {
  const val = process.env[name];
  if (!val) {
    console.error(`Missing env var: ${name}. See .env.example`);
    process.exit(1);
  }
  return val;
}

// ── Model & infra constants ──

const MODEL = "claude-haiku-4-5";

const MCP_SERVERS = [
  { type: "url" as const, name: "github", url: "https://api.githubcopilot.com/mcp/" },
];

const ALL_TOOLS = [
  { type: "agent_toolset_20260401" as const, default_config: { enabled: true } },
  { type: "mcp_toolset" as const, mcp_server_name: "github" },
];

type SkillRef =
  | { type: "anthropic"; skill_id: string }
  | { type: "custom"; skill_id: string; version: string };

// ── Agent definitions (single source of truth) ──

function agentDefs(wtfSkillId: string) {
  return {
    shared: {
      name: "Gomoku Shared Agent",
      system: [
        "You are a research and development agent for the Gomoku project —",
        "an AI-powered gomoku game built with React 19, TypeScript, Zustand,",
        "and a Rust/WASM engine. You help with code analysis, feature research,",
        "PR creation, automated reporting, and codebase exploration.",
        "The repo is mounted at /workspace/gomoku.",
      ].join(" "),
      tools: ALL_TOOLS,
      skills: [
        { type: "anthropic" as const, skill_id: "pdf" },
        { type: "anthropic" as const, skill_id: "xlsx" },
        { type: "custom" as const, skill_id: wtfSkillId, version: "latest" },
      ],
    },
    event: {
      name: "Gomoku PR Reviewer",
      system: [
        "You are a code review specialist for the Gomoku project.",
        "When given a PR description, you analyze the affected files,",
        "assess code quality and impact, and produce a concise review summary.",
        "Post results to Slack when available. The repo is at /workspace/gomoku.",
      ].join(" "),
      tools: ALL_TOOLS,
      skills: undefined as SkillRef[] | undefined,
    },
    scheduled: {
      name: "Gomoku Reporter",
      system: [
        "You are a reporting agent for the Gomoku project.",
        "You generate structured health reports: recent commits, code quality",
        "(TODOs/FIXMEs), dependency status, and i18n coverage.",
        "Format reports in clean markdown. Post to Slack when available.",
        "The repo is at /workspace/gomoku.",
      ].join(" "),
      tools: ALL_TOOLS,
      skills: [
        { type: "anthropic" as const, skill_id: "xlsx" },
        { type: "custom" as const, skill_id: wtfSkillId, version: "latest" },
      ],
    },
    pr: {
      name: "Gomoku Coder",
      system: [
        "You are a coding agent for the Gomoku project.",
        "Given a task, you implement changes following existing patterns:",
        "inline styles (no Tailwind), Zustand stores, i18n via all 11 locale files.",
        "You create branches, commit, push, and open PRs via GitHub MCP.",
        "The repo is at /workspace/gomoku.",
      ].join(" "),
      tools: ALL_TOOLS,
      skills: undefined as SkillRef[] | undefined,
    },
    research: {
      name: "Gomoku Researcher",
      system: [
        "You are a research analyst for the Gomoku project.",
        "You investigate topics using web search, analyze the codebase,",
        "and produce polished HTML reports saved to /mnt/session/outputs/.",
        "Reports should be self-contained (inline CSS), visually clean,",
        "and actionable. The repo is at /workspace/gomoku.",
      ].join(" "),
      tools: ALL_TOOLS,
      skills: [{ type: "anthropic" as const, skill_id: "pdf" }],
    },
  };
}

// ── Helpers ──

async function createAgent(
  def: { name: string; system: string; tools: typeof ALL_TOOLS; skills?: SkillRef[] },
): Promise<AgentRef> {
  const agent = await client.beta.agents.create({
    name: def.name,
    model: MODEL,
    system: def.system,
    mcp_servers: MCP_SERVERS,
    tools: def.tools,
    ...(def.skills?.length ? { skills: def.skills } : {}),
  });
  console.log(`  + ${def.name}: ${agent.id} (v${agent.version})`);
  return { id: agent.id, version: agent.version };
}

async function updateAgent(
  existing: AgentRef,
  def: { name: string; system: string; tools: typeof ALL_TOOLS; skills?: SkillRef[] },
): Promise<AgentRef> {
  const agent = await client.beta.agents.update(existing.id, {
    version: existing.version,
    name: def.name,
    model: MODEL,
    system: def.system,
    mcp_servers: MCP_SERVERS,
    tools: def.tools,
    ...(def.skills?.length ? { skills: def.skills } : {}),
  });
  const oldV = existing.version;
  const newV = agent.version;
  const changed = oldV !== newV ? `v${oldV} -> v${newV}` : `v${newV} (unchanged)`;
  console.log(`  ~ ${def.name}: ${agent.id} (${changed})`);
  return { id: agent.id, version: agent.version };
}

async function uploadSkill(commandPath: string, displayTitle: string): Promise<string> {
  const fullPath = path.join(os.homedir(), commandPath);
  if (!fs.existsSync(fullPath)) {
    console.error(`  Skill source not found: ${fullPath}`);
    process.exit(1);
  }

  const content = fs.readFileSync(fullPath, "utf-8");
  const folderName = path.basename(commandPath, ".md");
  const skillFile = await toFile(
    Buffer.from(content),
    `${folderName}/SKILL.md`,
    { type: "text/markdown" },
  );

  const skill = await client.beta.skills.create({
    display_title: displayTitle,
    files: [skillFile],
  });

  console.log(`  + Skill "${displayTitle}": ${skill.id}`);
  return skill.id;
}

function tryLoadConfig(): FullConfig | null {
  try {
    return loadConfig();
  } catch {
    return null;
  }
}

// ── Update path (config exists, no --fresh) ──

async function updateExisting(config: FullConfig) {
  console.log(`Updating agents to model: ${MODEL}\n`);

  const wtfSkillId = config.skill_ids.wtf;
  const defs = agentDefs(wtfSkillId);

  console.log("Updating agents...");
  const shared = await updateAgent(config.shared_agent, defs.shared);
  const event = await updateAgent(config.agents.event, defs.event);
  const scheduled = await updateAgent(config.agents.scheduled, defs.scheduled);
  const pr = await updateAgent(config.agents.pr, defs.pr);
  const research = await updateAgent(config.agents.research, defs.research);

  saveConfig({
    ...config,
    shared_agent: shared,
    agents: { event, scheduled, pr, research },
  });

  console.log("\nUpdate complete! New versions saved to .managed-agents.json");
}

// ── Fresh create path ──

async function createFresh(oldConfig: FullConfig | null) {
  const githubToken = requireEnv("GITHUB_TOKEN");

  // Archive old agents if --fresh
  if (oldConfig && FRESH) {
    console.log("Archiving old agents...");
    const oldAgents = [
      oldConfig.shared_agent,
      ...Object.values(oldConfig.agents),
    ];
    for (const a of oldAgents) {
      try {
        await client.beta.agents.archive(a.id);
        console.log(`  x Archived ${a.id}`);
      } catch {
        console.log(`  - ${a.id} (already archived or not found)`);
      }
    }
    console.log();
  }

  // 1. Environment
  console.log("1/4  Creating environment...");
  const environment = await client.beta.environments.create({
    name: `gomoku-env-${Date.now()}`,
    config: {
      type: "cloud",
      networking: { type: "unrestricted" },
    },
  });
  console.log(`     env_id: ${environment.id}`);

  // 2. Vault + credentials
  console.log("2/4  Creating vault + credentials...");
  const vault = await client.beta.vaults.create({
    display_name: `gomoku-vault-${Date.now()}`,
  });

  await client.beta.vaults.credentials.create(vault.id, {
    display_name: "GitHub MCP",
    auth: {
      type: "mcp_oauth",
      mcp_server_url: "https://api.githubcopilot.com/mcp/",
      access_token: githubToken,
    },
  });
  console.log(`     vault_id: ${vault.id}`);

  // 3. Custom skills
  console.log("3/4  Uploading custom skills...");
  const wtfSkillId = await uploadSkill(".claude/commands/wtf.md", "WTF Status Report");

  // 4. Agents
  console.log("4/4  Creating agents...");
  const defs = agentDefs(wtfSkillId);
  const shared = await createAgent(defs.shared);
  const event = await createAgent(defs.event);
  const scheduled = await createAgent(defs.scheduled);
  const pr = await createAgent(defs.pr);
  const research = await createAgent(defs.research);

  saveConfig({
    environment_id: environment.id,
    vault_id: vault.id,
    skill_ids: { wtf: wtfSkillId },
    shared_agent: shared,
    agents: { event, scheduled, pr, research },
  });

  console.log("\nSetup complete! IDs saved to .managed-agents.json");
  console.log("\nRun any pattern:");
  console.log("  bun run pattern:research              # dedicated agent");
  console.log("  bun run pattern:research -- --shared   # shared agent");
}

// ── Main ──

async function setup() {
  const existing = tryLoadConfig();

  if (existing && !FRESH) {
    await updateExisting(existing);
  } else {
    await createFresh(existing);
  }
}

setup().catch((err) => {
  console.error("Setup failed:", err.message ?? err);
  process.exit(1);
});
