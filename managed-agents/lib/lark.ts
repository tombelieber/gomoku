import crypto from "crypto";

/**
 * Posts a message to a Lark webhook with HMAC-SHA256 signing.
 * Silently skips if LARK_WEBHOOK_URL is not set.
 */
export async function postToLark(message: string): Promise<boolean> {
  const url = process.env.LARK_WEBHOOK_URL;
  const secret = process.env.LARK_WEBHOOK_SECRET;
  if (!url) return false;

  const ts = Math.floor(Date.now() / 1000).toString();
  const sign = secret
    ? crypto.createHmac("sha256", `${ts}\n${secret}`).update("").digest("base64")
    : undefined;

  const body = JSON.stringify({
    timestamp: ts,
    ...(sign ? { sign } : {}),
    msg_type: "text",
    content: { text: message },
  });

  const resp = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });

  if (!resp.ok) {
    console.error(`  [lark] ${resp.status}: ${await resp.text()}`);
    return false;
  }

  console.log("  [lark] Posted to Lark");
  return true;
}
