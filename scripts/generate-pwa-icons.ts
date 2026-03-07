import { chromium } from "playwright";
import path from "path";

const OUTPUT_DIR = path.resolve(import.meta.dir, "../web/public");

async function generateIcons() {
  const browser = await chromium.launch();

  // Generate 512x512 icon
  const page512 = await browser.newPage({ viewport: { width: 512, height: 512 } });
  await page512.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@900&display=swap" rel="stylesheet">
      <style>
        * { margin: 0; padding: 0; }
        html, body { width: 512px; height: 512px; overflow: hidden; }
      </style>
    </head>
    <body>
      <div style="
        width: 100%; height: 100%;
        display: flex; align-items: center; justify-content: center;
        background: #F5E6C8;
        border-radius: 20%;
      ">
        <span style="
          font-family: 'Noto Serif TC', serif;
          font-size: 317px;
          font-weight: 900;
          color: #1A1008;
        ">棋</span>
      </div>
    </body>
    </html>
  `);
  // Wait for the web font to load
  await page512.waitForLoadState("networkidle");
  await page512.waitForTimeout(1000);
  await page512.screenshot({ path: path.join(OUTPUT_DIR, "icon-512.png"), omitBackground: true });
  console.log("Created icon-512.png");

  // Generate 192x192 icon
  const page192 = await browser.newPage({ viewport: { width: 192, height: 192 } });
  await page192.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@900&display=swap" rel="stylesheet">
      <style>
        * { margin: 0; padding: 0; }
        html, body { width: 192px; height: 192px; overflow: hidden; }
      </style>
    </head>
    <body>
      <div style="
        width: 100%; height: 100%;
        display: flex; align-items: center; justify-content: center;
        background: #F5E6C8;
        border-radius: 20%;
      ">
        <span style="
          font-family: 'Noto Serif TC', serif;
          font-size: 119px;
          font-weight: 900;
          color: #1A1008;
        ">棋</span>
      </div>
    </body>
    </html>
  `);
  await page192.waitForLoadState("networkidle");
  await page192.waitForTimeout(1000);
  await page192.screenshot({ path: path.join(OUTPUT_DIR, "icon-192.png"), omitBackground: true });
  console.log("Created icon-192.png");

  await browser.close();
  console.log("Done! Icons saved to", OUTPUT_DIR);
}

generateIcons().catch((err) => {
  console.error(err);
  process.exit(1);
});
