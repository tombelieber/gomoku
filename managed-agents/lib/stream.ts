import Anthropic from "@anthropic-ai/sdk";
import type { SessionConfig } from "./config.js";
import { postToLark } from "./lark.js";

export interface SessionResult {
  sessionId: string;
  output: string;
}

/**
 * Creates a session, sends a message, streams events, and posts output to Lark.
 *
 * Does NOT archive the session — caller is responsible for archiving
 * after any post-processing (e.g. file downloads).
 */
export async function runSession(
  client: Anthropic,
  config: SessionConfig,
  message: string,
  title?: string,
): Promise<SessionResult> {
  // 1. Create session
  const session = await client.beta.sessions.create({
    agent: {
      type: "agent",
      id: config.agent_id,
      version: config.agent_version,
    },
    environment_id: config.environment_id,
    vault_ids: [config.vault_id],
    title: title ?? "Managed Agent Session",
    resources: [
      {
        type: "github_repository",
        url: "https://github.com/tombelieber/gomoku",
        authorization_token: process.env.GITHUB_TOKEN!,
        checkout: { type: "branch", name: "main" },
      },
    ],
  });
  console.log(`Session: ${session.id} (${session.status})`);

  // 2. Stream-first: open stream BEFORE sending
  const stream = await client.beta.sessions.events.stream(session.id);

  await client.beta.sessions.events.send(session.id, {
    events: [
      {
        type: "user.message",
        content: [{ type: "text", text: message }],
      },
    ],
  });

  // 3. Consume events with proper idle/terminated gate
  const output: string[] = [];

  for await (const event of stream) {
    switch (event.type) {
      case "agent.message":
        for (const block of (event as any).content ?? []) {
          if (block.type === "text") {
            process.stdout.write(block.text);
            output.push(block.text);
          }
        }
        break;

      case "agent.tool_use":
        console.log(`\n  [tool] ${(event as any).name ?? "built-in"}`);
        break;

      case "agent.mcp_tool_use":
        console.log(`\n  [mcp]  ${(event as any).name ?? "mcp-tool"}`);
        break;

      case "agent.thinking":
        break;

      case "session.error":
        console.error("\n  [error]", event);
        break;
    }

    if (event.type === "session.status_terminated") {
      console.log("\n--- Session terminated ---");
      break;
    }
    if (event.type === "session.status_idle") {
      const stopReason = (event as any).stop_reason?.type;
      if (stopReason === "requires_action") continue;
      console.log("\n--- Session idle ---");
      break;
    }
  }

  // 4. Post output to Lark (if configured)
  const text = output.join("");
  if (text.length > 0) {
    const larkMsg = title
      ? `[${title}]\n\n${text.slice(0, 3000)}${text.length > 3000 ? "\n\n...(truncated)" : ""}`
      : text.slice(0, 3000);
    await postToLark(larkMsg).catch(() => {});
  }

  return { sessionId: session.id, output: text };
}

/** Archive a session after post-processing. Safe to call if already archived. */
export async function archiveSession(client: Anthropic, sessionId: string): Promise<void> {
  try {
    await new Promise((r) => setTimeout(r, 500));
    await client.beta.sessions.archive(sessionId);
    console.log("Session archived.");
  } catch {
    // Already archived or not found — non-critical
  }
}
