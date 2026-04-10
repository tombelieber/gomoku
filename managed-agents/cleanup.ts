/**
 * CLEANUP — list and purge orphaned managed agent resources.
 *
 * Usage:
 *   bun run cleanup              List all resources, show active vs orphaned
 *   bun run cleanup -- --purge   Archive orphaned agents, delete orphaned envs/vaults
 */
import Anthropic from "@anthropic-ai/sdk";
import { loadConfig } from "./lib/config.js";
import type { FullConfig } from "./lib/config.js";

const client = new Anthropic();
const PURGE = process.argv.includes("--purge");

function tryLoadConfig(): FullConfig | null {
  try {
    return loadConfig();
  } catch {
    return null;
  }
}

function activeAgentIds(config: FullConfig): Set<string> {
  return new Set([
    config.shared_agent.id,
    ...Object.values(config.agents).map((a) => a.id),
  ]);
}

async function listAgents(config: FullConfig | null) {
  const agents = await client.beta.agents.list();
  const activeIds = config ? activeAgentIds(config) : new Set<string>();
  const orphaned: string[] = [];

  console.log("=== Agents ===\n");
  for (const a of agents.data) {
    const active = activeIds.has(a.id);
    const archived = !!(a as any).archived_at;
    const tag = archived ? "  [archived]" : active ? "  [active]" : "  [ORPHAN]";
    console.log(`  ${a.id}  ${(a.name ?? "").padEnd(24)}  v${a.version}${tag}`);
    if (!active && !archived) orphaned.push(a.id);
  }
  console.log(`\n  Total: ${agents.data.length}  |  Active: ${activeIds.size}  |  Orphaned: ${orphaned.length}`);
  return orphaned;
}

async function listEnvironments(config: FullConfig | null) {
  const envs = await client.beta.environments.list();
  const activeId = config?.environment_id;
  const orphaned: string[] = [];

  console.log("\n=== Environments ===\n");
  for (const e of envs.data) {
    const active = e.id === activeId;
    const archived = !!(e as any).archived_at;
    const tag = archived ? "  [archived]" : active ? "  [active]" : "  [ORPHAN]";
    console.log(`  ${e.id}  ${((e as any).name ?? "").padEnd(30)}${tag}`);
    if (!active && !archived) orphaned.push(e.id);
  }
  console.log(`\n  Total: ${envs.data.length}  |  Active: ${activeId ? 1 : 0}  |  Orphaned: ${orphaned.length}`);
  return orphaned;
}

async function listVaults(config: FullConfig | null) {
  const vaults = await client.beta.vaults.list();
  const activeId = config?.vault_id;
  const orphaned: string[] = [];

  console.log("\n=== Vaults ===\n");
  for (const v of vaults.data) {
    const active = v.id === activeId;
    const archived = !!(v as any).archived_at;
    const tag = archived ? "  [archived]" : active ? "  [active]" : "  [ORPHAN]";
    console.log(`  ${v.id}  ${((v as any).display_name ?? "").padEnd(30)}${tag}`);
    if (!active && !archived) orphaned.push(v.id);
  }
  console.log(`\n  Total: ${vaults.data.length}  |  Active: ${activeId ? 1 : 0}  |  Orphaned: ${orphaned.length}`);
  return orphaned;
}

async function purge(
  orphanedAgents: string[],
  orphanedEnvs: string[],
  orphanedVaults: string[],
) {
  const total = orphanedAgents.length + orphanedEnvs.length + orphanedVaults.length;
  if (total === 0) {
    console.log("\nNothing to purge.");
    return;
  }

  console.log(`\n=== Purging ${total} orphaned resources ===\n`);

  for (const id of orphanedAgents) {
    try {
      await client.beta.agents.archive(id);
      console.log(`  x Agent archived: ${id}`);
    } catch (e) {
      console.log(`  - Agent ${id}: ${(e as Error).message}`);
    }
  }

  for (const id of orphanedEnvs) {
    try {
      await client.beta.environments.delete(id);
      console.log(`  x Environment deleted: ${id}`);
    } catch (e) {
      console.log(`  - Env ${id}: ${(e as Error).message}`);
    }
  }

  for (const id of orphanedVaults) {
    try {
      await client.beta.vaults.delete(id);
      console.log(`  x Vault deleted: ${id}`);
    } catch (e) {
      console.log(`  - Vault ${id}: ${(e as Error).message}`);
    }
  }

  console.log("\nPurge complete.");
}

async function main() {
  const config = tryLoadConfig();
  if (!config) {
    console.log("No .managed-agents.json found. Listing all resources as orphans.\n");
  }

  const orphanedAgents = await listAgents(config);
  const orphanedEnvs = await listEnvironments(config);
  const orphanedVaults = await listVaults(config);

  const total = orphanedAgents.length + orphanedEnvs.length + orphanedVaults.length;

  if (!PURGE && total > 0) {
    console.log(`\nRun with --purge to clean up ${total} orphaned resources:`);
    console.log("  bun run cleanup -- --purge");
  } else if (PURGE) {
    await purge(orphanedAgents, orphanedEnvs, orphanedVaults);
  } else {
    console.log("\nAll clean.");
  }
}

main().catch((err) => {
  console.error("Error:", err.message ?? err);
  process.exit(1);
});
