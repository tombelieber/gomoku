import { readFileSync, writeFileSync } from "fs";
import { execFileSync } from "child_process";

const files = ["package.json", "web/package.json"];

// Find commits since last release tag or release commit
let log = "";
try {
  log = execFileSync("git", ["log", "--oneline", "--no-decorate", "HEAD"], {
    encoding: "utf-8",
  });
} catch {
  log = "";
}

// Stop at the last release commit
const lines = log.split("\n").filter(Boolean);
const commitsSinceRelease: string[] = [];
for (const line of lines) {
  if (/^[a-f0-9]+ release:/.test(line)) break;
  commitsSinceRelease.push(line);
}

// Determine bump type: feat → minor, everything else → patch
const hasFeature = commitsSinceRelease.some((line) =>
  /^[a-f0-9]+ feat[\(:]/.test(line),
);
const type = hasFeature ? "minor" : "patch";

// Compute new version
const rootPkg = JSON.parse(readFileSync("package.json", "utf-8"));
const [major, minor, patch] = rootPkg.version.split(".").map(Number);

const newVersion =
  type === "minor"
    ? `${major}.${minor + 1}.0`
    : `${major}.${minor}.${patch + 1}`;

// Update both package.json files
for (const file of files) {
  const pkg = JSON.parse(readFileSync(file, "utf-8"));
  pkg.version = newVersion;
  writeFileSync(file, JSON.stringify(pkg, null, 2) + "\n");
}

// Commit the version bump
execFileSync("git", ["add", "package.json", "web/package.json"]);
execFileSync("git", ["commit", "-m", `release: v${newVersion}`]);

console.log(
  `${type === "minor" ? "Minor" : "Patch"} bump → v${newVersion} (${commitsSinceRelease.length} commits since last release)`,
);
