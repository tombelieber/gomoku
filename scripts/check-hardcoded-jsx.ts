/**
 * check-hardcoded-jsx.ts
 *
 * Pre-commit hook that detects hardcoded user-visible strings in .tsx files.
 * Catches text like `<span>Hello</span>` that should use `{t.some.key}`.
 *
 * Usage: bun scripts/check-hardcoded-jsx.ts
 */

import { readFileSync, readdirSync, statSync } from "fs";
import { join, relative } from "path";

const WEB_SRC = join(import.meta.dirname, "..", "web", "src");

// Patterns that are safe to have as literal text in JSX
const SAFE_PATTERNS = [
  /^[\s\d.,;:!?·|#%+\-–—×÷=<>()[\]{}&@^~`'"\\/*]+$/, // punctuation, symbols, numbers
  /^[\p{Emoji_Presentation}\p{Emoji}\u200d\ufe0f]+$/u, // emoji only
  /^\{.*\}$/, // JSX expressions
  /^v\{.*\}$/, // version string like v{APP_VERSION}
  /^https?:\/\//, // URLs
  /^GOMOKU$/i, // brand
  /^Tom Tang$/, // brand
  /^GitHub$/, // brand
  /^Made with$/, // this is actually i18n'd, but appears in comments
  /^&#\d+;$/, // HTML entities like &#9829;
  /^\s*$/, // whitespace only
];

// Files to skip entirely
const SKIP_FILES = new Set([
  "LanguageSwitcher.tsx", // renders locale labels which are i18n metadata, not user strings
]);

// Collect all .tsx files recursively
function collectTsxFiles(dir: string): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      files.push(...collectTsxFiles(full));
    } else if (entry.endsWith(".tsx") && !SKIP_FILES.has(entry)) {
      files.push(full);
    }
  }
  return files;
}

type Violation = {
  file: string;
  line: number;
  text: string;
};

function isSafe(text: string): boolean {
  const trimmed = text.trim();
  if (!trimmed) return true;
  return SAFE_PATTERNS.some((p) => p.test(trimmed));
}

/**
 * Extract hardcoded text content from JSX.
 * Looks for text between > and < that isn't a JSX expression.
 * Also catches string literals in JSX attributes that look like user-visible text.
 */
function checkFile(filePath: string): Violation[] {
  const content = readFileSync(filePath, "utf-8");
  const lines = content.split("\n");
  const violations: Violation[] = [];
  const relPath = relative(join(import.meta.dirname, ".."), filePath);

  let inStyleBlock = false;
  let inComment = false;
  let braceDepth = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Skip import/export lines
    if (trimmed.startsWith("import ") || trimmed.startsWith("export ")) continue;

    // Skip single-line comments
    if (trimmed.startsWith("//")) continue;

    // Track multi-line comments
    if (trimmed.startsWith("/*")) inComment = true;
    if (inComment) {
      if (trimmed.includes("*/")) inComment = false;
      continue;
    }

    // Track style={{ blocks (crude but effective)
    if (trimmed.includes("style={{") || trimmed.includes("style={")) {
      inStyleBlock = true;
      braceDepth = 0;
    }
    if (inStyleBlock) {
      for (const ch of line) {
        if (ch === "{") braceDepth++;
        if (ch === "}") braceDepth--;
      }
      if (braceDepth <= 0) inStyleBlock = false;
      continue;
    }

    // Skip lines that are purely object/style definitions
    if (/^\s*([\w]+\s*[:=]|return\s*\(|const\s|let\s|var\s|function\s|if\s|else|switch|case\s|default:)/.test(trimmed) && !trimmed.includes(">")) continue;

    // Extract text content between JSX tags: >text here<
    const textMatches = line.matchAll(/>([^<>{]+)</g);
    for (const match of textMatches) {
      const text = match[1];
      if (!isSafe(text)) {
        violations.push({ file: relPath, line: i + 1, text: text.trim() });
      }
    }
  }

  return violations;
}

// Main
const files = collectTsxFiles(join(WEB_SRC, "components")).concat(
  collectTsxFiles(join(WEB_SRC, "hooks")),
);

// Also check App.tsx
const appTsx = join(WEB_SRC, "App.tsx");
try {
  statSync(appTsx);
  files.push(appTsx);
} catch {}

let allViolations: Violation[] = [];
for (const file of files) {
  allViolations = allViolations.concat(checkFile(file));
}

if (allViolations.length > 0) {
  console.error("\n❌ Hardcoded strings found in JSX (should use i18n t.* keys):\n");
  for (const v of allViolations) {
    console.error(`  ${v.file}:${v.line}  →  "${v.text}"`);
  }
  console.error(`\n${allViolations.length} violation(s) found. Fix by using {t.section.key} instead.\n`);
  process.exit(1);
} else {
  console.log("✓ No hardcoded strings in JSX");
}
