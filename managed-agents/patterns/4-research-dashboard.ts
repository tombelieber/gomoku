/**
 * Pattern 4: Research + Dashboard
 *
 * Human provides a topic → agent researches using web_search + codebase analysis
 * → generates an HTML report saved to /mnt/session/outputs/
 *
 * The output HTML file is downloaded after the session completes.
 *
 * Usage: bun run pattern:research
 */
import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";
import { resolveConfig } from "../lib/config.js";
import { runSession, archiveSession } from "../lib/stream.js";

const client = new Anthropic();
const config = resolveConfig("research");

const topic = `
Research the competitive landscape for browser-based gomoku/five-in-a-row games.

Tasks:
1. Search the web for popular online gomoku games and AI implementations
2. Analyze the /workspace/gomoku codebase to understand our current features
3. Compare our implementation against what competitors offer:
   - AI difficulty levels and algorithms used
   - Multiplayer support
   - Mobile responsiveness
   - i18n support
   - UI/UX quality
4. Generate a competitive analysis HTML dashboard and save it to
   /mnt/session/outputs/competitive-analysis.html

The HTML should be self-contained (inline CSS, no external deps) with:
- A summary table comparing features across competitors
- Our strengths and gaps highlighted
- 3-5 actionable recommendations for improvement
- Clean, modern styling (dark theme preferred)

Make the report visually polished — this is for a product review meeting.
`.trim();

console.log("=== Pattern 4: Research + Dashboard (topic → web search → HTML report) ===\n");

async function main() {
  const { sessionId } = await runSession(client, config, topic, "Research: Competitive Analysis");

  // Download output files from the session
  console.log("\nChecking for output files...");

  // Brief delay for file indexing (~1-3s lag after session goes idle)
  await new Promise((r) => setTimeout(r, 3000));

  try {
    // scope: sessionId returns ONLY files written to /mnt/session/outputs/
    const files = await client.beta.files.list({ scope: sessionId } as any);
    await fs.promises.mkdir("./outputs", { recursive: true });

    for (const f of files.data) {
      const resp = await client.beta.files.download(f.id);
      const buffer = Buffer.from(await resp.arrayBuffer());
      const safeName = f.filename ?? `output-${f.id}`;
      const outputPath = `./outputs/${safeName}`;
      await fs.promises.writeFile(outputPath, buffer);
      console.log(`Downloaded: ${outputPath} (${buffer.length} bytes)`);
    }

    if (files.data.length === 0) {
      console.log("No output files found — the report may be in stdout above.");
      console.log(`Session ID for manual check: ${sessionId}`);
    }
  } catch (err) {
    console.log("Could not download outputs:", (err as Error).message);
  }

  await archiveSession(client, sessionId);
}

main().catch((err) => {
  console.error("Failed:", err.message ?? err);
  process.exit(1);
});
