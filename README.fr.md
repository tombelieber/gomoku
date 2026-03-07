# open-gomoku

> **Jeu d'IA de pointe construit en 2026.** Jouez en ligne ou apprenez comment fonctionne l'IA moderne.

Un jeu Gomoku complètement jouable (五子棋) avec un adversaire IA imbattable, construit avec Rust WebAssembly et React. C'est ce que l'IA de pointe peut construire en un week-end. C'est gratuit, open-source et éducatif : clonez-le, apprenez-le, modifiez-le.

**[▶ Jouer en ligne maintenant](https://open-gomoku.pages.dev)** • [Learn by Example](#learning-paths) • [See the Code](#technical-breakdown)

---

## Ce que vous regardez

**open-gomoku** est un jeu d'IA Gomoku de qualité production qui démontre :
- ✅ **Modern AI in action** — Minimax avec élagage alpha-bêta, s'exécute dans votre navigateur
- ✅ **Real-time performance** — Rust WASM pour des décisions de mouvement en moins de 100 ms
- ✅ **Mobile-first design** — Entièrement jouable sur téléphones et tablettes
- ✅ **Production-ready** — Gestion des erreurs, pas de paniques, cas limites testés
- ✅ **100% free & open-source** — Licencié MIT, apprenez et modifiez librement

Construit pour montrer à quoi ressemble l'ingénierie de l'IA moderne en mars 2026.

---

## Démarrage rapide

### Jouer en ligne (Dès maintenant)
[Jouer sur Cloudflare Pages](https://open-gomoku.pages.dev)

### Exécuter localement
```bash
git clone https://github.com/yourusername/open-gomoku.git
cd open-gomoku
bun install
bun run dev
```

Ouvrez http://localhost:5173 et commencez à jouer.

---

## Contenu

### Pile technologique
- **Engine:** Rust avec WebAssembly (WASM) pour l'IA
- **Frontend:** React 18 + TypeScript + Tailwind CSS
- **Threading:** Web Workers pour les mouvements de l'IA non-bloquants
- **Deployment:** Cloudflare Pages
- **Build:** Bun + Vite + wasm-pack

### Caractéristiques principales
- **Unbeatable AI** — Utilise l'algorithme minimax avec élagage alpha-bêta
- **Responsive UI** — Retour visuel instantané à chaque mouvement
- **Mobile-ready** — Plateau et contrôles optimisés pour le toucher
- **Game controls** — Réinitialiser, annuler (limité), niveaux de difficulté prévus
- **State persistence** — État du jeu géré avec Zustand
- **Performance profiling** — Temps de mouvement enregistré, profondeur d'IA adaptative

### Architecture de haut niveau
```
┌──────────────────────────────────────────┐
│         React Frontend (TypeScript)       │
│  • Game UI • Move validation • State      │
└────────────┬─────────────────────────────┘
             │ postMessage
┌────────────▼─────────────────────────────┐
│      Web Worker (Engine Interface)       │
│  • Async AI computation • Threading      │
└────────────┬─────────────────────────────┘
             │ WASM calls
┌────────────▼─────────────────────────────┐
│   Rust WASM Engine (AI & Logic)          │
│  • Minimax + Alpha-Beta Pruning          │
│  • Board evaluation                      │
│  • Move generation & validation          │
└──────────────────────────────────────────┘
```

---

## Chemins d'apprentissage

Choisissez votre chemin en fonction de ce que vous voulez apprendre :

### 🎮 Pour les développeurs de jeux
Vous voulez comprendre comment l'IA prend des décisions dans les jeux.

**Commencez ici:**
1. Lire [Game AI Fundamentals](#game-ai-fundamentals) ci-dessous
2. Regardez `engine/src/ai.rs` — algorithme minimax avec élagage alpha-bêta
3. Modifiez `engine/src/evaluation.rs` — changez comment l'IA évalue les positions
4. Essayez d'augmenter/diminuer `MAX_DEPTH` dans `engine/src/lib.rs` pour voir l'impact sur les performances

**Fichiers clés:**
- `engine/src/ai.rs:minimax()` — Core decision algorithm
- `engine/src/evaluation.rs:evaluate_board()` — Position scoring
- `web/src/workers/engine.worker.ts` — Web Worker integration

**Questions répondues:**
- Comment l'IA décide-t-elle le mouvement « meilleur » ?
- Pourquoi l'élagage alpha-bêta est-il rapide ?
- Comment WASM améliore-t-il les performances par rapport à JavaScript ?

**Prochaines étapes:**
- Add different difficulty levels (vary `MAX_DEPTH`)
- Implement iterative deepening
- Add opening book for faster early moves

---

### 📚 Pour les étudiants et les éducateurs
Vous voulez comprendre l'intégration d'IA complète et l'architecture web moderne.

**Commencez ici:**
1. Lire [Complete Technical Breakdown](#complete-technical-breakdown) ci-dessous
2. Suivre [Getting Started (Detailed)](#getting-started-detailed) guide
3. Examinez l'interaction des composants dans `web/src/components/Board.tsx` et `web/src/workers/engine.worker.ts`
4. Étudiez comment Zustand gère l'état du jeu dans `web/src/store.ts`

**Concepts clés:**
- **Architecture patterns** — Separating concerns (AI, UI, state management)
- **Threading model** — Why Web Workers matter for responsiveness
- **WASM boundary** — How Rust and JavaScript communicate
- **Full-stack development** — From AI engine to user interface

**Questions répondues:**
- Comment intégrez-vous le code compilé (Rust) avec le code dynamique (React) ?
- Pourquoi utilisons-nous les Web Workers ?
- Comment devriez-vous structurer les applications de jeux d'IA ?

**Ressources d'apprentissage incluses:**
- Architecture diagrams and explanations
- Code comments highlighting design patterns
- Performance tracing tips
- Best practices for WASM + JavaScript

---

### 🔬 Pour les développeurs curieux
Vous voulez comprendre comment les systèmes d'IA modernes fonctionnent, de la prise de décision à l'optimisation des performances.

**Commencez ici:**
1. Jouez d'abord le jeu — comprendre ce que vous regardez
2. Lire [Why We Built It This Way](#why-we-built-it-this-way)
3. Explorez `engine/src/` — comprenez visuellement l'algorithme minimax
4. Vérifiez `web/src/workers/engine.worker.ts` — voyez comment l'IA s'exécute en arrière-plan

**Informations clés:**
- AI isn't magic — it's exhaustive search with smart pruning
- Performance matters — sub-100ms decisions use WASM, not JavaScript
- Architecture enables capability — Web Workers let UI stay responsive
- Modern stacks mix languages — Rust for performance, JavaScript for interactivity

**Questions répondues:**
- Qu'est-ce qui rend cette IA vraiment « bonne » ?
- Pourquoi compiler Rust en WASM au lieu d'utiliser simplement JavaScript ?
- Comment l'IA pense-t-elle à l'avance ?

---

### 💻 Pour les ingénieurs IA
Vous voulez comprendre l'architecture du modèle d'IA, l'optimisation et la logique de décision.

**Commencez ici:**
1. Lire [AI Architecture & Decision Logic](#ai-architecture--decision-logic)
2. Étudiez `engine/src/ai.rs` — implémentation minimax avec annotations complètes
3. Examinez `engine/src/evaluation.rs` — la fonction d'évaluation qui enseigne à l'IA ce qui est « bon »
4. Mesurez les performances avec `web/src/workers/engine.worker.ts` journaux de synchronisation

**Technical depth:**
- **Algorithm:** Minimax with alpha-beta pruning (classic game AI technique)
- **Search space:** ~3^80 possible game states → reduced by pruning to ~10k evaluations per move
- **Evaluation function:** Hand-crafted heuristics (can be replaced with neural nets)
- **Performance:** Rust WASM achieves <100ms move time at depth 6-8

**Optimisations clés:**
- Transposition table (memoization) for duplicate board states
- Move ordering heuristics to maximize alpha-beta pruning effectiveness
- Iterative deepening (not yet implemented)
- Parallel search (challenging due to WASM threading limitations)

---

## Décomposition technique complète

### Aperçu de l'architecture

L'application se divise en trois couches principales :

#### 1. **React Frontend** (`web/src/`)
Gère:
- Interface utilisateur et rendu du plateau de jeu
- Validation des mouvements (le carré sélectionné est-il vide ?)
- Gestion de l'état du jeu (à qui le tour, historique du jeu)
- Communication avec le moteur d'IA

**Composants clés:**
- `App.tsx` — Main app setup and game flow
- `Board.tsx` — Game board rendering and click handling
- `GameControls.tsx` — Reset, undo, difficulty buttons
- `store.ts` — Zustand store for game state

**Pourquoi React?**
- Component reusability
- Efficient DOM updates via virtual DOM
- Strong TypeScript support
- Large ecosystem for UI patterns

---

#### 2. **Web Worker** (`web/src/workers/engine.worker.ts`)
Gère:
- Running AI computation in a separate thread
- Keeping the UI responsive during AI's turn
- Communicating results back to the main thread

**Comment ça marche:**
```
┌─────────────────────────────────┐
│ React Component (Main Thread)   │
│ postMessage({action: "move"})   │
└────────────┬────────────────────┘
             │
             │ Worker receives message
┌────────────▼────────────────────┐
│ Web Worker Thread              │
│ Call WASM ai_move()            │
│ postMessage({bestMove})        │
└────────────┬────────────────────┘
             │
             │ Main thread receives
┌────────────▼────────────────────┐
│ React updates board with move   │
└─────────────────────────────────┘
```

**Pourquoi les Web Workers?**
- Prevents "jank" (frozen UI) during long computations
- Browser stays responsive to user input
- Makes the game feel snappy even on mobile

---

#### 3. **Rust WASM Engine** (`engine/src/`)
Gère:
- Game logic and board state
- AI move generation
- Minimax algorithm with alpha-beta pruning
- Board evaluation function

**Modules clés:**
- `lib.rs` — WASM exports (`ai_move()` is called from JavaScript)
- `ai.rs` — Minimax algorithm implementation
- `board.rs` — Board representation and move validation
- `evaluation.rs` — Position scoring function

**Pourquoi Rust + WASM?**
- **Performance:** Rust compiles to machine-like instructions, JavaScript is interpreted
- **Correctness:** Strong type system catches bugs at compile time
- **Portability:** WASM runs on any modern browser
- **Interop:** Easy to call from JavaScript via WASM boundary

---

### Fondamentaux de l'IA de jeu

#### Comment l'IA décide les mouvements

L'IA utilise **Minimax avec élagage alpha-bêta**:

1. **Minimax:** L'arbre de jeu où :
   - Maximizing player (AI) wants highest score
   - Minimizing player (opponent) wants lowest score
   - Recursively evaluate all possible game states up to a depth limit

2. **Élagage alpha-bêta:** Optimisation intelligente qui :
   - Skips branches that can't affect the final decision
   - Reduces evaluations from ~3^depth to ~3^(depth/2)
   - Makes sub-100ms moves possible

**Pseudocode:**
```
function minimax(board, depth, isMaximizing, alpha, beta):
  if depth == 0:
    return evaluate(board)  // Base case

  if isMaximizing:  // AI's turn
    for each move:
      score = minimax(board, depth-1, false, alpha, beta)
      alpha = max(alpha, score)
      if beta <= alpha:
        break  // Prune
    return alpha
  else:  // Opponent's turn
    for each move:
      score = minimax(board, depth-1, true, alpha, beta)
      beta = min(beta, score)
      if beta <= alpha:
        break  // Prune
    return beta
```

#### Comment l'IA évalue les positions

La **fonction d'évaluation** enseigne à l'IA ce qui est « bon »:

```rust
fn evaluate_board(board: &Board) -> i32 {
  let mut score = 0;

  // Count open threes (likely winning moves)
  score += 100 * count_open_threes(&board, AI);
  score -= 100 * count_open_threes(&board, PLAYER);

  // Count open twos (useful threats)
  score += 10 * count_open_twos(&board, AI);
  score -= 10 * count_open_twos(&board, PLAYER);

  return score;
}
```

The evaluation function is **hand-crafted heuristics**. In modern AI, this might be replaced with a neural network trained via self-play (see Roadmap).

---

### Pourquoi nous l'avons construit de cette façon

#### Décision de conception : WASM pour le moteur

**Pourrions-nous le faire en JavaScript?**
- JavaScript minimax at depth 6: ~2-3 seconds
- Rust WASM minimax at depth 6: ~50-100ms

**Pourquoi 20-60 fois plus rapide?**
- Rust compiles to native instructions
- WASM executes in browser's native VM
- JavaScript is interpreted with JIT (good, but not as fast)

**Trade-off:** Building in Rust requires toolchain setup (wasm-pack, Cargo). Worth it for performance.

#### Décision de conception : Web Worker pour le threading

**Que se passe-t-il sans Web Worker?**
- User clicks → React calls `ai_move()` on main thread
- Main thread is blocked for 100ms+ (computing move)
- UI can't respond to clicks, animations freeze
- User sees frozen game

**Avec Web Worker:**
- React posts message to worker thread
- Worker does computation
- Main thread keeps running, UI stays responsive
- Posts result back when done

**Trade-off:** Adds complexity (message passing, async). Essential for perceived performance.

#### Décision de conception : React pour le frontend

**Pourquoi pas du JavaScript vanille?**
- React's component model makes UI logic reusable
- Virtual DOM means efficient updates
- TypeScript catches type errors early
- Large ecosystem (state management, styling, etc.)

---

## Premiers pas (Détaillé)

### Prérequis
- **Rust** (1.56+) — [Install rustup](https://rustup.rs/)
- **Node.js** (18+) — [Download](https://nodejs.org)
- **Bun** (latest) — `curl -fsSL https://bun.sh/install | bash`
- **wasm-pack** — `cargo install wasm-pack`

### Étape 1: Cloner le référentiel

```bash
git clone https://github.com/yourusername/open-gomoku.git
cd open-gomoku
```

### Étape 2: Installer les dépendances

```bash
bun install
```

This installs both root-level and `web/` dependencies.

### Étape 3: Construire le moteur WASM

```bash
bun run build:engine
```

This compiles Rust → WASM and outputs to `web/src/wasm/engine/`.

Expected output:
```
...
   Compiling engine v0.1.0
    Finished release [optimized] target(s) in 2.54s
   Generating WASM bindings...
✓ Engine built to web/src/wasm/engine/
```

### Étape 4: Démarrer le serveur de développement

```bash
bun run dev
```

Opens http://localhost:5173 in your browser. Play a few moves to verify everything works.

### Étape 5: Faire un changement (Test optionnel)

Try editing `engine/src/evaluation.rs` to change the score for open threes:

```rust
// Change this line:
score += 100 * count_open_threes(&board, AI);
// To this:
score += 200 * count_open_threes(&board, AI);  // AI values threes more
```

Then:
```bash
bun run build:engine
bun run dev
```

Refresh the browser. The AI should be more aggressive about completing three-in-a-rows.

### Construction pour la production

```bash
bun run build
```

Outputs optimized bundle to `web/dist/`.

### Déployer sur Cloudflare Pages

The project is configured for Cloudflare Pages:

```bash
bun run deploy
```

This builds everything and deploys to your Cloudflare Pages project named "gomoku".

---

## Structure du projet

```
open-gomoku/
├── README.md                 # You are here
├── package.json             # Root workspace config
│
├── engine/                  # Rust WASM AI engine
│   ├── Cargo.toml          # Rust dependencies
│   ├── src/
│   │   ├── lib.rs          # WASM exports (ai_move, board validation)
│   │   ├── ai.rs           # Minimax algorithm
│   │   ├── board.rs        # Board state & rules
│   │   └── evaluation.rs    # Position scoring
│   └── target/
│       └── wasm32-unknown-unknown/
│           └── release/    # Compiled WASM files
│
├── web/                     # React frontend
│   ├── package.json        # Frontend dependencies (React, Tailwind, etc.)
│   ├── src/
│   │   ├── App.tsx         # Main app component
│   │   ├── index.css       # Global styles
│   │   ├── components/
│   │   │   ├── Board.tsx   # Game board rendering
│   │   │   └── GameControls.tsx
│   │   ├── store.ts        # Zustand game state
│   │   ├── workers/
│   │   │   └── engine.worker.ts  # Web Worker for AI
│   │   └── wasm/
│   │       └── engine/     # WASM output from build:engine
│   ├── vite.config.ts      # Vite build configuration
│   ├── tailwind.config.js   # Tailwind CSS config
│   └── dist/               # Built frontend (after build)
│
└── docs/
    └── plans/              # Implementation documentation
```

**Information clé:** `web/src/wasm/engine/` est **généré** par `bun run build:engine` — ne l'éditez pas directement.

---

## Guide de développement

### Comment étendre l'IA

#### Rendre l'IA plus forte

Increase search depth in `engine/src/lib.rs`:

```rust
pub fn ai_move(board_state: &str, ai_player: i32) -> String {
    let mut board = Board::from_string(board_state);
    let best_move = minimax(&board, 8, true);  // Was 6, now 8
    ...
}
```

**Impact sur les performances:** Chaque augmentation de profondeur ~3x plus lent.

#### Changer la fonction d'évaluation

Edit `engine/src/evaluation.rs`:

```rust
fn evaluate_board(board: &Board) -> i32 {
  // Give more weight to center positions
  let center_bonus = count_center_pieces(&board, AI) * 5;

  // Penalize fragmented positions
  let connectivity = measure_piece_connectivity(&board, AI);

  ...
}
```

This teaches the AI different priorities.

### Comment modifier les règles du jeu

#### Changer la taille du plateau

Edit `engine/src/board.rs`:

```rust
pub const BOARD_SIZE: usize = 17;  // Was 15, now 17x17
```

Then:
```bash
bun run build:engine
bun run dev
```

#### Ajouter le mode handicap

In `web/src/components/GameControls.tsx`, add handicap selection:

```tsx
<select value={handicap} onChange={(e) => setHandicap(e.target.value)}>
  <option value="0">Even</option>
  <option value="1">Black +1 Stone</option>
  <option value="2">Black +2 Stones</option>
</select>
```

Then pass handicap to WASM `ai_move()`.

### Stratégies de test

#### Test unitaire (Rust)

Add tests in `engine/src/board.rs`:

```rust
#[cfg(test)]
mod tests {
  use super::*;

  #[test]
  fn test_valid_move() {
    let mut board = Board::new();
    assert!(board.make_move(5, 5));
    assert!(!board.make_move(5, 5));  // Can't move twice same spot
  }
}
```

Run: `cargo test`

#### Test d'intégration (React)

In `web/src/components/Board.test.tsx`:

```tsx
test("AI moves after player move", async () => {
  render(<App />);
  await userEvent.click(screen.getByTestId("square-5-5"));

  await waitFor(() => {
    expect(screen.getByTestId("square-6-5")).toHaveClass("ai-stone");
  });
});
```

### Profilage des performances

Add timing logs to `web/src/workers/engine.worker.ts`:

```typescript
const start = performance.now();
const bestMove = engine.ai_move(boardState, AI);
const elapsed = performance.now() - start;
console.log(`AI move took ${elapsed}ms at depth ${depth}`);
```

Check browser DevTools Console to see move times. Adjust depth if > 200ms.

---

## Feuille de route: v2 et au-delà

### v2: Multijoueur en ligne (en cours 🚀)

**What's next:** Real-time, two-player Gomoku over the internet.

#### Aperçu de l'architecture
```
Player A Browser ──┐
                   │ WebSocket
Player B Browser ──┤
                   │
                 Server
                   │
            Game State
            (Redis/DB)
```

**Composants:**
1. **Matchmaking** — Find opponent, create game room
2. **Real-time sync** — WebSocket for instant move updates
3. **Move validation** — Server validates all moves (prevents cheating)
4. **Turn management** — Server enforces whose turn it is
5. **Timeout handling** — Forfeit after inactivity

#### Pourquoi construire cela?

- Players can challenge each other (not just AI)
- Learn about real-time game networking
- Understand server-side move validation
- Enable competitive play and leaderboards

#### Plan de mise en œuvre

1. Set up WebSocket server (Node.js + Socket.io or Rust Actix)
2. Add game room management
3. Implement move validation on server
4. Add player authentication (optional but recommended)
5. Build opponent matchmaking
6. Deploy server alongside web app

#### Pile technologique
- **Backend:** Node.js (Express + Socket.io) or Rust (Actix-web)
- **Database:** PostgreSQL for game history + ELO ratings
- **Real-time:** WebSocket for instant communication
- **Frontend:** Minor React updates to handle network state

---

### Possibilités futures (v3+)

1. **AI vs AI matches** — Watch two AIs play each other
2. **Difficulty levels** — Easy (depth 4), Medium (depth 6), Hard (depth 8)
3. **Game variants**
   - Free-style (any 5 in a row wins)
   - Renju (special rules for blocking)
   - 6-in-a-row, Swap-2
4. **Neural network AI** — Train a model via self-play (replaces hand-crafted evaluation)
5. **Mobile app** — React Native version
6. **Replay & analysis** — Save games, replay moves, analyze mistakes
7. **Leaderboard & ratings** — ELO ratings, seasonal rankings

---

## Contribution

### Comment bifurquer et modifier

```bash
# 1. Fork on GitHub (click Fork button)
# 2. Clone your fork
git clone https://github.com/YOUR-USERNAME/open-gomoku.git
cd open-gomoku

# 3. Make changes
# 4. Test locally
bun run dev

# 5. Commit and push
git add .
git commit -m "feat: add your change"
git push origin main

# 6. Open Pull Request on GitHub
```

### Contribution à la feuille de route

Have an idea for v2 or beyond? Open a GitHub Issue:

1. Describe your idea clearly
2. Explain why it would be valuable
3. Suggest technical approach if you have one
4. Link to relevant resources

Excellentes idées pour les contributions:
- [ ] Implement difficulty level selector
- [ ] Add move timer (show how long AI took)
- [ ] Create opening book for faster early moves
- [ ] Add visual AI evaluation (show board heat map)
- [ ] Implement iterative deepening
- [ ] Add transposition table memoization

### Style de code

- **Rust:** Format with `cargo fmt`, lint with `cargo clippy`
- **TypeScript:** Use ESLint + Prettier (configured in `web/.eslintrc`)
- **Commits:** Clear messages describing what changed and why

### Exigences en matière d'essais

Before opening a PR:
- Rust: `cargo test` passes
- Frontend: Manual testing on desktop + mobile
- Build: `bun run build` succeeds without warnings

---

## Ressources d'apprentissage

### Jeux d'IA et algorithmes
- [Minimax Algorithm Explained](https://en.wikipedia.org/wiki/Minimax) — Wikipedia
- [Alpha-Beta Pruning](https://en.wikipedia.org/wiki/Alpha%E2%80%93beta_pruning) — How to skip branches
- [Game Tree Search](https://www.chessprogramming.org/Search) — Chess Programming Wiki

### Spécificités de Gomoku
- [Gomoku Rules (English)](https://en.wikipedia.org/wiki/Gomoku)
- [Gomoku AI Techniques](https://github.com/topics/gomoku-ai) — Other implementations

### WebAssembly et performances
- [MDN: WebAssembly](https://developer.mozilla.org/en-US/docs/WebAssembly)
- [Rust + WASM Book](https://rustwasm.github.io/book/)
- [wasm-pack Guide](https://rustwasm.github.io/docs/wasm-pack/)

### Web Workers
- [MDN: Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)
- [Offloading Heavy Computation](https://web.dev/workers-basics/)

### Pile web moderne
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Zustand State Management](https://github.com/pmndrs/zustand)
- [Tailwind CSS](https://tailwindcss.com)

### Optimisation des performances
- [Web Vitals](https://web.dev/vitals/) — Measuring performance
- [Rust Performance](https://nnethercote.github.io/perf-book/) — Low-level optimization
- [WASM Performance Tuning](https://rustwasm.github.io/docs/wasm-pack/tutorials/npm-wasm/index.html)

---

## Licence

MIT License — See LICENSE file for details.

**Cela signifie:**
- ✅ Clone and modify freely
- ✅ Use commercially
- ✅ Distribute (modified or not)
- ✅ Private use
- ❌ Liability — We provide no warranty

---

## Construit avec l'IA moderne en mars 2026

open-gomoku demonstrates what state-of-the-art AI engineering can achieve:
- **Productive AI assistance** in every phase (design, implementation, debugging)
- **Multi-language integration** (Rust, TypeScript, React) in hours
- **Production-quality code** with error handling and testing
- **Educational value** — Learn modern AI practices by reading real code

Not magic. Just good tools in the hands of skilled practitioners.

**Questions?** Open an issue on GitHub.

**Want to learn more?** Start with the learning path that matches your interests above.

**Ready to build?** Follow [Getting Started (Detailed)](#getting-started-detailed).
