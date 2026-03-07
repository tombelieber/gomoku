# Contributing to open-gomoku

## Prerequisites

- **Rust** (1.56+) — [Install rustup](https://rustup.rs/)
- **Bun** (latest) — `curl -fsSL https://bun.sh/install | bash`
- **wasm-pack** — `cargo install wasm-pack`

## Setup

```bash
git clone https://github.com/tombelieber/gomoku.git
cd gomoku
bun install
bun run build:engine   # Compile Rust → WASM
bun run dev            # http://localhost:5173
```

## Project Structure

```
open-gomoku/
├── engine/                     # Rust WASM AI engine
│   └── src/
│       ├── lib.rs              # WASM exports (ai_move, validation)
│       ├── ai.rs               # Minimax algorithm
│       ├── board.rs            # Board state & rules
│       └── eval.rs             # Position scoring
│
├── web/                        # React frontend
│   └── src/
│       ├── App.tsx             # Main app component
│       ├── components/
│       │   ├── Board.tsx       # Game board rendering
│       │   ├── GameControls.tsx
│       │   ├── GameEndOverlay.tsx
│       │   ├── HistoryPanel.tsx
│       │   ├── LanguageSwitcher.tsx
│       │   ├── ReplayControls.tsx
│       │   └── SettingsSheet.tsx
│       ├── hooks/
│       │   ├── useGame.ts      # Main game Zustand store
│       │   └── useReplay.ts    # Replay mode Zustand store
│       ├── i18n/
│       │   ├── types.ts        # Translation interface (source of truth)
│       │   ├── store.ts        # i18n Zustand store
│       │   ├── detect.ts       # Browser locale detection
│       │   └── translations/   # 11 locale files
│       ├── lib/
│       │   ├── game-history.ts # localStorage persistence
│       │   └── engine-bridge.ts # WASM engine interface
│       └── workers/
│           └── engine.worker.ts # WASM bridge worker
│
├── assets/                     # Public media
│   ├── demo.gif
│   ├── screenshots/
│   └── mockups/
│
└── scripts/
    ├── validate-i18n.ts        # Pre-commit: all locales have all keys
    └── check-hardcoded-jsx.ts  # Pre-commit: no hardcoded strings in JSX
```

## How to Extend

### Change AI Difficulty

Edit search depth in `engine/src/lib.rs`. Each +1 depth is roughly 3x slower but significantly stronger.

### Modify the Evaluation Function

Edit `engine/src/eval.rs` to change how the AI scores board positions. This is where you teach the AI what "good" looks like.

### Add a New Language

1. Add the locale code to `web/src/i18n/types.ts`
2. Create a new translation file in `web/src/i18n/translations/`
3. Register it in the i18n store
4. Run `bun scripts/validate-i18n.ts` to verify completeness

### Add New UI Text

Every user-visible string must go through the i18n system:

1. Add the key to `web/src/i18n/types.ts` (the `Translation` interface)
2. Add the translation to all 11 locale files in `web/src/i18n/translations/`
3. Use `const { t } = useI18n()` and reference `t.section.key` in your component

The pre-commit hook will block hardcoded strings in `.tsx` files.

## Building

```bash
bun run build:engine   # Compile Rust → WASM
bun run build          # Build frontend for production → web/dist/
bun run deploy         # Deploy to Cloudflare Pages
```

## Code Style

- **Rust:** `cargo fmt` + `cargo clippy`
- **TypeScript:** ESLint + Prettier
- **Commits:** Clear messages describing what changed and why
- **Pre-commit:** Lefthook runs i18n validation and hardcoded string checks

## Testing

```bash
cargo test             # Rust engine unit tests
bun run dev            # Manual testing on desktop + mobile
bun run build          # Verify production build succeeds
```

## Pull Requests

1. Fork the repo and create your branch from `main`
2. Make your changes
3. Ensure `cargo test` passes and `bun run build` succeeds
4. Test on both desktop and mobile
5. Open a PR with a clear description of what you changed and why
