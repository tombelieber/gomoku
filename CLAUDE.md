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

## Key Paths

- `web/src/hooks/useGame.ts` — main game Zustand store
- `web/src/hooks/useReplay.ts` — replay mode Zustand store
- `web/src/i18n/types.ts` — Translation interface (source of truth for keys)
- `web/src/i18n/translations/` — 11 locale files, all must satisfy `Translation`
- `web/src/lib/game-history.ts` — localStorage persistence for game records
- `web/src/workers/engine.worker.ts` — WASM bridge worker
- `scripts/validate-i18n.ts` — pre-commit: checks all locales have all keys
- `scripts/check-hardcoded-jsx.ts` — pre-commit: detects hardcoded strings in JSX
