/**
 * Monitor — inspect agents, sessions, and events from the CLI.
 *
 * Usage:
 *   bun monitor.ts agents          # list all agents
 *   bun monitor.ts sessions        # list all sessions
 *   bun monitor.ts events <id>     # list events for a session
 *   bun monitor.ts status <id>     # get session status + usage
 */
import Anthropic from "@anthropic-ai/sdk";
import { loadConfig } from "./lib/config.js";

const client = new Anthropic();
const cmd = process.argv[2];
const arg = process.argv[3];

function loadConfig_safe() {
  try {
    return loadConfig();
  } catch {
    return null;
  }
}

async function main() {
  switch (cmd) {
    case "agents": {
      const agents = await client.beta.agents.list();
      console.log("=== Agents ===\n");
      for (const a of agents.data) {
        console.log(`  ${a.id}  ${a.name}  (v${a.version})`);
      }
      console.log(`\n  Total: ${agents.data.length}`);
      break;
    }

    case "sessions": {
      const sessions = await client.beta.sessions.list();
      console.log("=== Sessions ===\n");
      for (const s of sessions.data) {
        console.log(
          `  ${s.id}  ${s.status.padEnd(12)}  ${s.title ?? "(untitled)"}`,
        );
      }
      console.log(`\n  Total: ${sessions.data.length}`);
      break;
    }

    case "events": {
      if (!arg) {
        console.error("Usage: bun monitor.ts events <session_id>");
        process.exit(1);
      }
      const events = await client.beta.sessions.events.list(arg);
      console.log(`=== Events for ${arg} ===\n`);
      for (const e of events.data) {
        const time = e.processed_at
          ? new Date(e.processed_at).toLocaleTimeString()
          : "pending";
        console.log(`  ${time.padEnd(12)}  ${e.type.padEnd(30)}  ${e.id}`);
      }
      console.log(`\n  Total: ${events.data.length}`);
      break;
    }

    case "status": {
      if (!arg) {
        console.error("Usage: bun monitor.ts status <session_id>");
        process.exit(1);
      }
      const session = await client.beta.sessions.retrieve(arg);
      console.log(`=== Session ${arg} ===\n`);
      console.log(`  Status:      ${session.status}`);
      console.log(`  Title:       ${session.title ?? "(untitled)"}`);
      console.log(`  Created:     ${session.created_at}`);
      console.log(`  Updated:     ${session.updated_at}`);
      if (session.usage) {
        console.log(`  Input tkns:  ${(session.usage as any).input_tokens ?? "?"}`);
        console.log(`  Output tkns: ${(session.usage as any).output_tokens ?? "?"}`);
      }
      break;
    }

    case "config": {
      const config = loadConfig_safe();
      if (!config) {
        console.error("No .managed-agents.json found. Run: bun run setup");
        process.exit(1);
      }
      console.log("=== Saved Config ===\n");
      console.log(JSON.stringify(config, null, 2));
      break;
    }

    default:
      console.log(`Usage:
  bun monitor.ts agents          List all agents
  bun monitor.ts sessions        List all sessions
  bun monitor.ts events <id>     List events for a session
  bun monitor.ts status <id>     Get session status + usage
  bun monitor.ts config          Show saved config`);
  }
}

main().catch((err) => {
  console.error("Error:", err.message ?? err);
  process.exit(1);
});
