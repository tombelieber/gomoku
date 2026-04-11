import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONFIG_PATH = path.join(__dirname, "..", ".managed-agents.json");

export interface AgentRef {
  id: string;
  version: number;
}

export interface FullConfig {
  environment_id: string;
  vault_id: string;
  skill_ids: { wtf: string };
  shared_agent: AgentRef;
  agents: {
    event: AgentRef;
    scheduled: AgentRef;
    pr: AgentRef;
    research: AgentRef;
  };
}

/** What runSession needs — one agent + infra IDs */
export interface SessionConfig {
  environment_id: string;
  vault_id: string;
  agent_id: string;
  agent_version: number;
}

export type PatternName = "event" | "scheduled" | "pr" | "research";

/**
 * Loads config and resolves which agent to use based on --shared flag.
 * Returns a flat SessionConfig ready for runSession().
 */
export function resolveConfig(pattern: PatternName): SessionConfig {
  const config = loadConfig();
  const useShared = process.argv.includes("--shared");
  const agent = useShared ? config.shared_agent : config.agents[pattern];

  if (useShared) {
    console.log("Mode: shared agent\n");
  } else {
    console.log(`Mode: dedicated ${pattern} agent\n`);
  }

  return {
    environment_id: config.environment_id,
    vault_id: config.vault_id,
    agent_id: agent.id,
    agent_version: agent.version,
  };
}

export function loadConfig(): FullConfig {
  if (!fs.existsSync(CONFIG_PATH)) {
    console.error("No .managed-agents.json found. Run: bun run setup");
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(CONFIG_PATH, "utf-8"));
}

export function saveConfig(config: FullConfig): void {
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
}
