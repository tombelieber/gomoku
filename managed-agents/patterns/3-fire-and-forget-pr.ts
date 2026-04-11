/**
 * Pattern 3: Fire-and-Forget PR
 *
 * Human provides a task → agent makes code changes → pushes branch → creates PR
 *
 * The agent uses bash+git for the branch/push and GitHub MCP for PR creation.
 * The github_repository resource mounts the repo with write access.
 *
 * Usage: bun run pattern:pr
 *
 * NOTE: This will actually push a branch and create a PR on your repo.
 * Make sure GITHUB_TOKEN has Contents:Write + PullRequests:Write permissions.
 */
import Anthropic from "@anthropic-ai/sdk";
import { resolveConfig } from "../lib/config.js";
import { runSession, archiveSession } from "../lib/stream.js";

const client = new Anthropic();
const config = resolveConfig("pr");

const task = `
Add a "last updated" timestamp display to the game UI.

Requirements:
1. In /workspace/gomoku, create a new branch: agent/add-timestamp
2. Add a simple timestamp that shows when the game state was last modified
3. The timestamp should be stored in the game Zustand store (useGame.ts)
4. Display it in the UI somewhere unobtrusive
5. Follow the existing i18n pattern — add keys to the Translation interface
   and ALL 11 locale files in web/src/i18n/translations/
6. Commit the changes with message "feat: add last-updated timestamp to game UI"
7. Push the branch
8. Create a PR using the GitHub MCP tool targeting main

IMPORTANT: Follow the existing code patterns. Check how other state is managed
in useGame.ts before adding new state. Use inline styles (no Tailwind classes).
`.trim();

console.log("=== Pattern 3: Fire-and-Forget PR (task → code → push → PR) ===\n");

async function main() {
  const { sessionId } = await runSession(client, config, task, "PR: Add timestamp");
  await archiveSession(client, sessionId);
}

main().catch((err) => {
  console.error("Failed:", err.message ?? err);
  process.exit(1);
});
