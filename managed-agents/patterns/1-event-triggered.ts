/**
 * Pattern 1: Event-Triggered
 *
 * Simulates: GitHub webhook (PR push) → agent analyzes the PR → result posted to Lark
 *
 * In production, a webhook handler would receive the GitHub event and call this.
 * Here we simulate it with a hardcoded PR description.
 *
 * Usage: bun run pattern:event
 */
import Anthropic from "@anthropic-ai/sdk";
import { resolveConfig } from "../lib/config.js";
import { runSession, archiveSession } from "../lib/stream.js";

const client = new Anthropic();
const config = resolveConfig("event");

const simulatedPR = {
  number: 42,
  title: "feat: add AI difficulty selector",
  author: "tombelieber",
  branch: "feat/difficulty-selector",
  files_changed: ["web/src/hooks/useGame.ts", "web/src/components/GameControls.tsx"],
};

const message = `
A new PR was just opened on the Gomoku repo. Analyze it and post a summary.

PR details:
- #${simulatedPR.number}: "${simulatedPR.title}" by @${simulatedPR.author}
- Branch: ${simulatedPR.branch}
- Files changed: ${simulatedPR.files_changed.join(", ")}

Tasks:
1. Read the repo structure to understand the codebase
2. Analyze what these files do and assess the PR's impact
3. Write a brief code review summary (3-5 bullet points)
`.trim();

console.log("=== Pattern 1: Event-Triggered (PR webhook → analysis → Lark) ===\n");

async function main() {
  const { sessionId } = await runSession(client, config, message, "Event: PR #42 Review");
  await archiveSession(client, sessionId);
}

main().catch((err) => {
  console.error("Failed:", err.message ?? err);
  process.exit(1);
});
