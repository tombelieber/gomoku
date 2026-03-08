# Gomoku — Project Rules

## i18n: No Hardcoded User-Visible Strings

This project supports 11 languages. **Every user-visible string must go through the i18n system.**

- Use `const { t } = useI18n()` and reference `t.section.key` for all text shown to users.
- Add new keys to `web/src/i18n/types.ts` (the `Translation` interface), then to all 11 translation files in `web/src/i18n/translations/`.
- Never hardcode Chinese, English, or any other language directly in JSX. The only exceptions are:
  - CSS class names, HTML attributes, ARIA roles
  - Punctuation and symbols (`·`, `|`, `#`, `%`)
  - Emoji and kaomoji (decorative, not informational)
  - Numbers and units used in code logic
  - Brand names that don't change across locales (e.g. "GOMOKU", "Tom Tang", "GitHub")
- The pre-commit hook (`scripts/check-hardcoded-jsx.ts`) will block commits with hardcoded strings in `.tsx` files.
- The i18n key validator (`scripts/validate-i18n.ts`) ensures all 11 locale files have every key from `en.ts`.

## Tech Stack

- **Frontend:** React 19, TypeScript, Zustand, Vite
- **Engine:** Rust/WASM gomoku engine running in a Web Worker
- **i18n:** Custom lightweight system — `web/src/i18n/` (no external i18n library)
- **Styling:** Inline styles + CSS custom properties (no Tailwind classes used despite dep)
- **Pre-commit:** Lefthook

## Versioning & Deploy

- `bun run deploy` auto-bumps the version before build+deploy
- Bump type is auto-detected from commits since last `release:` commit:
  - Any `feat:` commit → **minor** bump (e.g. 1.0.0 → 1.1.0)
  - Only `fix:`, `chore:`, `docs:`, etc. → **patch** bump (e.g. 1.0.0 → 1.0.1)
- Both `package.json` and `web/package.json` are kept in sync
- The script commits the version bump as `release: vX.Y.Z` before building
- `APP_VERSION` is exposed to the frontend via Vite's `define` config

## M1 Max Performance: Always Use Hardware Acceleration

This project runs on M1 Max. **Never use software encoders/renderers when hardware alternatives exist.**

- **ffmpeg:** Always use `h264_videotoolbox` (or `hevc_videotoolbox`) — never `libx264`/`libx265`. The M1 Max media engine encodes near-instantly at zero CPU cost. Use `-hwaccel videotoolbox` for decode, `-q:v 55` for quality (not `-crf`, not `-preset`).
- **Chromium/Playwright:** Launch with `--use-angle=metal --enable-gpu --enable-gpu-rasterization --ignore-gpu-blocklist` to use the 32-core GPU for rendering instead of CPU software rasterization.
- **Video capture:** Record at target output resolution directly (e.g. 1080px wide) — don't record small then upscale in post. The DPR 3 render (1179px) is already larger than 1080, so capture downscales for free.
- **General rule:** If a tool has a hardware-accelerated path on Apple Silicon, use it. CPU = last resort.

## Key Paths

- `web/src/hooks/useGame.ts` — main game Zustand store
- `web/src/hooks/useReplay.ts` — replay mode Zustand store
- `web/src/i18n/types.ts` — Translation interface (source of truth for keys)
- `web/src/i18n/store.ts` — Zustand i18n store + `window.__gomokuSetLocale()` automation API
- `web/src/i18n/translations/` — 11 locale files, all must satisfy `Translation`
- `web/src/lib/game-history.ts` — localStorage persistence for game records
- `web/src/workers/engine.worker.ts` — WASM bridge worker
- `assets/{lang}/screenshots/` — per-language screenshots (6 per locale)
- `assets/{lang}/videos/` — per-language demo videos
- `assets/demo.mp4` — hero video for README (English)
- `scripts/validate-i18n.ts` — pre-commit: checks all locales have all keys
- `scripts/check-hardcoded-jsx.ts` — pre-commit: detects hardcoded strings in JSX
- `scripts/version-bump.ts` — auto version bump (patch/minor based on commit history)
