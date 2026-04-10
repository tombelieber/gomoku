/**
 * Pattern 2: Scheduled (Cron)
 *
 * Simulates: Daily cron → agent generates a repo health report → result posted to Lark
 *
 * In production, a cron job (GitHub Actions, AWS EventBridge, etc.) would trigger this.
 * Here we run it manually.
 *
 * Usage: bun run pattern:scheduled
 */
import Anthropic from "@anthropic-ai/sdk";
import { resolveConfig } from "../lib/config.js";
import { runSession, archiveSession } from "../lib/stream.js";

const client = new Anthropic();
const config = resolveConfig("scheduled");

const today = new Date().toISOString().split("T")[0];

const message = `
Generate a daily repo health report for ${today}.

Tasks:
1. Read the repo at /workspace/gomoku
2. Check the git log for recent commits (last 7 days)
3. Look at open issues or TODOs in the codebase (grep for TODO, FIXME, HACK)
4. Check the package.json for outdated or concerning dependencies
5. Summarize the i18n coverage (how many languages, any missing keys?)

Format the report as:
## Gomoku Daily Report — ${today}
### Recent Activity
(last 5 commits)
### Code Health
(TODO/FIXME count, any concerns)
### i18n Status
(languages supported, coverage)
### Recommendations
(1-3 actionable items)
`.trim();

console.log("=== Pattern 2: Scheduled (Daily repo health report) ===\n");

async function main() {
  const { sessionId } = await runSession(client, config, message, `Daily Report ${today}`);
  await archiveSession(client, sessionId);
}

main().catch((err) => {
  console.error("Failed:", err.message ?? err);
  process.exit(1);
});
