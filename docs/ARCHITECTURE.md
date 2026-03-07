# Architecture

## Overview

open-gomoku is a three-layer application: a React frontend for UI, a Web Worker for threading, and a Rust/WASM engine for AI computation.

```
┌──────────────────────────────────────────┐
│         React Frontend (TypeScript)       │
│  UI · Game state · i18n · History         │
└────────────┬─────────────────────────────┘
             │ postMessage
┌────────────▼─────────────────────────────┐
│      Web Worker (Engine Interface)        │
│  Async AI computation · Non-blocking      │
└────────────┬─────────────────────────────┘
             │ WASM calls
┌────────────▼─────────────────────────────┐
│   Rust WASM Engine (AI & Logic)           │
│  Minimax + Alpha-Beta · Board eval        │
│  Move generation · Win detection          │
└──────────────────────────────────────────┘
```

## Layer 1: React Frontend

**Key files:**
- `web/src/App.tsx` — Root component, wires game + replay + settings
- `web/src/hooks/useGame.ts` — Zustand store for game state (board, turns, history, undo)
- `web/src/hooks/useReplay.ts` — Zustand store for replay mode (step-through past games)
- `web/src/components/Board.tsx` — Renders the 15x15 board, handles click/touch input
- `web/src/components/SettingsSheet.tsx` — iOS-style scrollable settings drawer
- `web/src/components/HistoryPanel.tsx` — Game records with W/L/D display
- `web/src/lib/game-history.ts` — localStorage persistence for game records

**State management:** Zustand (not Redux). Two independent stores — `useGame` for active play, `useReplay` for reviewing past games. This separation means replay never interferes with an active game.

**i18n:** Custom lightweight system with zero dependencies. The `Translation` interface in `types.ts` is the source of truth. All 11 locale files must satisfy this interface at compile time. Pre-commit hooks validate completeness.

## Layer 2: Web Worker

**Key file:** `web/src/workers/engine.worker.ts`

The Web Worker exists for one reason: keeping the UI responsive while the AI thinks.

```
React Component (Main Thread)
  │  postMessage({ board, difficulty })
  ▼
Web Worker Thread
  │  Calls WASM ai_move()
  │  Blocks this thread (not the main thread)
  ▼
  │  postMessage({ bestMove })
  ▼
React updates board with AI's move
```

Without the Worker, the main thread blocks for 50-100ms during AI computation. That's enough to cause visible jank on mobile — frozen animations, unresponsive touch input, dropped frames.

## Layer 3: Rust WASM Engine

**Key files:**
- `engine/src/lib.rs` — WASM exports (`ai_move()` called from JavaScript)
- `engine/src/ai.rs` — Minimax algorithm with alpha-beta pruning
- `engine/src/board.rs` — Board representation, move validation, win detection
- `engine/src/eval.rs` — Position scoring heuristics

### Minimax with Alpha-Beta Pruning

The AI uses a classic game tree search:

1. **Minimax:** Recursively evaluate all possible game states to a depth limit. The AI (maximizing player) picks moves that maximize its score; the opponent (minimizing player) picks moves that minimize it.

2. **Alpha-Beta Pruning:** Skips branches that provably can't affect the final decision. Reduces evaluations from ~3^depth to ~3^(depth/2).

```
function minimax(board, depth, isMaximizing, alpha, beta):
  if depth == 0 or game over:
    return evaluate(board)

  if isMaximizing:
    for each move:
      score = minimax(board, depth-1, false, alpha, beta)
      alpha = max(alpha, score)
      if beta <= alpha: break    ← prune
    return alpha
  else:
    for each move:
      score = minimax(board, depth-1, true, alpha, beta)
      beta = min(beta, score)
      if beta <= alpha: break    ← prune
    return beta
```

### Evaluation Function

The evaluation function teaches the AI what "good" looks like. It uses hand-crafted heuristics:

- Count patterns (open threes, open fours, etc.) for both players
- Weight threats asymmetrically (blocking opponent's four > building own three)
- Consider center control and connectivity

This could be replaced with a neural network trained via self-play, but the hand-crafted version is fast and effective enough for browser play.

### Performance: Why Rust + WASM

| | JavaScript | Rust WASM |
|---|---|---|
| Minimax depth 6 | ~2-3 seconds | ~50-100ms |
| Execution model | JIT interpreted | Compiled to native-like instructions |

The 20-60x speedup comes from Rust compiling to efficient machine instructions that run in the browser's WASM VM. The trade-off is build complexity (wasm-pack, Cargo toolchain), but it's essential for sub-100ms move times.

## Design Decisions

### Why Web Workers (not main thread)

Without a Worker, `ai_move()` blocks the main thread. At 100ms, users on mobile see frozen UI. With a Worker, computation runs on a background thread and the main thread stays responsive.

Trade-off: adds message-passing complexity. Worth it for perceived performance.

### Why Zustand (not Redux or Context)

Zustand is minimal — no providers, no boilerplate. Two independent stores (`useGame`, `useReplay`) keep concerns separate without a global state tree.

### Why Custom i18n (not react-intl or i18next)

The i18n needs are simple: static key-value translations with one interpolation pattern. A custom 50-line system avoids 50KB+ of library code and gives compile-time type safety via the `Translation` interface.

### Why localStorage (not a backend)

Game history is stored in localStorage — no server, no account, no signup friction. The game loads instantly and works offline. Trade-off: history doesn't sync across devices.

## Learning Resources

- [Minimax Algorithm](https://en.wikipedia.org/wiki/Minimax)
- [Alpha-Beta Pruning](https://en.wikipedia.org/wiki/Alpha%E2%80%93beta_pruning)
- [Rust + WASM Book](https://rustwasm.github.io/book/)
- [MDN: Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)
- [Zustand](https://github.com/pmndrs/zustand)
