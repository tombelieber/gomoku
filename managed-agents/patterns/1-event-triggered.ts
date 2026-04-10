/**
 * Pattern 1: Event-Triggered
 *
 * Agent analyzes a PR and posts results to Lark.
 *
 * Usage:
 *   bun run pattern:event 4                          # review PR #4
 *   bun run pattern:event "review PR #4 for i18n"    # freeform prompt
 *   bun run pattern:event                            # uses default demo PR
 *
 * The agent has GitHub MCP tools — it fetches PR details, reads diffs, and
 * analyzes the codebase automatically. Just give it a PR number or a question.
 */
import Anthropic from "@anthropic-ai/sdk";
import { resolveConfig } from "../lib/config.js";
import { runSession, archiveSession } from "../lib/stream.js";

const client = new Anthropic();
const config = resolveConfig("event");

// CLI arg: skip --shared and any flags starting with -
const arg = process.argv.slice(2).find((a) => !a.startsWith("-"));

function buildMessage(input: string | undefined): { message: string; title: string } {
  // PR number
  if (input && /^\d+$/.test(input)) {
    return {
      message: `
Review PR #${input} on tombelieber/gomoku.

Tasks:
1. The repo is at /workspace/gomoku. Use bash to fetch PR info:
   - cd /workspace/gomoku && git fetch origin 'pull/${input}/head:pr-${input}' && git diff main...pr-${input}
   - Or: curl -s -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/repos/tombelieber/gomoku/pulls/${input}
2. Read the affected files to understand context
3. Assess code quality, correctness, and adherence to project conventions
4. Write a concise review summary (3-5 bullet points)

Do NOT use GitHub MCP tools for reading — use bash and git instead.
`.trim(),
      title: `Event: PR #${input} Review`,
    };
  }

  // Freeform prompt
  if (input) {
    return {
      message: `${input}\n\nThe repo is at /workspace/gomoku. Use GitHub MCP tools if you need PR data.`,
      title: `Event: ${input.slice(0, 50)}`,
    };
  }

  // Default demo
  return {
    message: `
A new PR was just opened on the Gomoku repo. Analyze it and post a summary.

PR details:
- #42: "feat: add AI difficulty selector" by @tombelieber
- Branch: feat/difficulty-selector
- Files changed: web/src/hooks/useGame.ts, web/src/components/GameControls.tsx

Tasks:
1. Read the repo structure to understand the codebase
2. Analyze what these files do and assess the PR's impact
3. Write a brief code review summary (3-5 bullet points)
`.trim(),
    title: "Event: PR #42 Review (demo)",
  };
}

const { message, title } = buildMessage(arg);

console.log("=== Pattern 1: Event-Triggered (PR → analysis → Lark) ===\n");

async function main() {
  const { sessionId } = await runSession(client, config, message, title);
  await archiveSession(client, sessionId);
}

main().catch((err) => {
  console.error("Failed:", err.message ?? err);
  process.exit(1);
});
