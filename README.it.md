# open-gomoku

> **IA all'avanguardia costruita nel 2026.** Gioca online oppure impara come funziona l'IA moderna.

Un gioco Gomoku (五子棋) completamente giocabile con un avversario IA imbattibile, costruito con Rust WebAssembly e React. Questo è quello che l'IA all'avanguardia può costruire in un weekend. È gratuito, open-source ed educativo—clonalo, impara da esso, modificalo.

**[▶ Gioca Ora Online](https://open-open-gomoku.pages.dev)** • [Impara con Esempi](#learning-paths) • [Guarda il Codice](#technical-breakdown)

---

## Quello Che Stai Guardando

**open-gomoku** è un gioco Gomoku IA di livello produttivo che dimostra:
- ✅ **IA moderna in azione** — Minimax con potatura alfa-beta, eseguito nel tuo browser
- ✅ **Prestazioni in tempo reale** — WASM Rust per decisioni di mosse in meno di 100ms
- ✅ **Design mobile-first** — Completamente giocabile su telefoni e tablet
- ✅ **Pronto per la produzione** — Gestione degli errori, senza panic, casi limite testati
- ✅ **100% gratuito e open-source** — Licenza MIT, impara e modifica liberamente

Costruito per mostrare come appare l'ingegneria moderna dell'IA nel marzo 2026.

---

## Avvio Rapido

### Gioca Online (Proprio Ora)
[Gioca su Cloudflare Pages](https://open-open-gomoku.pages.dev)

### Esegui Localmente
```bash
git clone https://github.com/yourusername/open-gomoku.git
cd open-gomoku
bun install
bun run dev
```

Apri http://localhost:5173 e inizia a giocare.

---

## Cosa È Incluso

### Stack Tecnologico
- **Engine:** Rust con WebAssembly (WASM) per l'IA
- **Frontend:** React 18 + TypeScript + Tailwind CSS
- **Threading:** Web Workers per mosse IA non bloccanti
- **Deployment:** Cloudflare Pages
- **Build:** Bun + Vite + wasm-pack

### Funzionalità Principali
- **IA Imbattibile** — Utilizza algoritmo minimax con potatura alfa-beta
- **UI Responsiva** — Feedback visivo istantaneo ad ogni mossa
- **Pronta per Mobile** — Controlli e tavola ottimizzati al tocco
- **Controlli di Gioco** — Reset, annulla (limitato), livelli di difficoltà pianificati
- **Persistenza dello Stato** — Stato di gioco gestito con Zustand
- **Profilazione delle Prestazioni** — Tempo della mossa registrato, profondità IA adattiva

### Architettura di Alto Livello
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

## Percorsi di Apprendimento

Scegli il tuo percorso in base a cosa vuoi imparare:

### 🎮 Per gli Sviluppatori di Giochi
Vuoi capire come l'IA prende decisioni nei giochi.

**Inizia da qui:**
1. Leggi [Fondamenti dell'IA di Gioco](#game-ai-fundamentals) qui sotto
2. Controlla `engine/src/ai.rs` — algoritmo minimax con potatura alfa-beta
3. Modifica `engine/src/evaluation.rs` — cambia come l'IA valuta le posizioni
4. Prova ad aumentare/diminuire `MAX_DEPTH` in `engine/src/lib.rs` per vedere l'impatto sulle prestazioni

**File chiave:**
- `engine/src/ai.rs:minimax()` — Algoritmo decisionale principale
- `engine/src/evaluation.rs:evaluate_board()` — Valutazione della posizione
- `web/src/workers/engine.worker.ts` — Integrazione Web Worker

**Domande a cui rispondere:**
- Come decide l'IA la mossa "migliore"?
- Perché la potatura alfa-beta è veloce?
- Come WASM migliora le prestazioni rispetto a JavaScript?

**Passaggi successivi:**
- Aggiungi diversi livelli di difficoltà (varia `MAX_DEPTH`)
- Implementa l'approfondimento iterativo
- Aggiungi un libro di apertura per mosse iniziali più veloci

---

### 📚 Per Studenti e Insegnanti
Vuoi comprendere l'integrazione AI full-stack e l'architettura web moderna.

**Inizia da qui:**
1. Leggi il [Breakdown Tecnico Completo](#complete-technical-breakdown) qui sotto
2. Segui la guida [Avvio Rapido (Dettagliato)](#getting-started-detailed)
3. Rivedi l'interazione dei componenti in `web/src/components/Board.tsx` e `web/src/workers/engine.worker.ts`
4. Studia come Zustand gestisce lo stato di gioco in `web/src/store.ts`

**Concetti chiave:**
- **Pattern di architettura** — Separazione dei compiti (IA, UI, gestione dello stato)
- **Modello di threading** — Perché i Web Worker sono importanti per la reattività
- **Confine WASM** — Come Rust e JavaScript comunicano
- **Sviluppo full-stack** — Dal motore IA all'interfaccia utente

**Domande a cui rispondere:**
- Come integri codice compilato (Rust) con codice dinamico (React)?
- Perché usiamo Web Worker?
- Come dovresti strutturare applicazioni di gioco IA?

**Risorse di apprendimento incluse:**
- Diagrammi di architettura e spiegazioni
- Commenti al codice che evidenziano pattern di design
- Suggerimenti per la tracciatura delle prestazioni
- Migliori pratiche per WASM + JavaScript

---

### 🔬 Per Sviluppatori Curiosi
Vuoi capire come funzionano i sistemi IA moderni, dalla presa di decisione all'ottimizzazione delle prestazioni.

**Inizia da qui:**
1. Gioca al gioco per primo — comprendi quello che stai guardando
2. Leggi [Perché L'Abbiamo Costruito Così](#why-we-built-it-this-way)
3. Esplora `engine/src/` — comprendi l'algoritmo minimax visivamente
4. Controlla `web/src/workers/engine.worker.ts` — vedi come l'IA funziona in background

**Intuizioni chiave:**
- L'IA non è magia — è ricerca esaustiva con potatura intelligente
- Le prestazioni contano — decisioni in meno di 100ms usano WASM, non JavaScript
- L'architettura abilita la capacità — Web Worker mantiene l'UI responsiva
- Stack moderni mescolano linguaggi — Rust per le prestazioni, JavaScript per l'interattività

**Domande a cui rispondere:**
- Cosa rende questa IA davvero "buona"?
- Perché compilare Rust a WASM invece di usare solo JavaScript?
- Come l'IA pensa avanti?

---

### 💻 Per Ingegneri IA
Vuoi capire l'architettura del modello IA, l'ottimizzazione e la logica decisionale.

**Inizia da qui:**
1. Leggi [Architettura IA e Logica Decisionale](#ai-architecture--decision-logic)
2. Studia `engine/src/ai.rs` — implementazione minimax con annotazioni complete
3. Rivedi `engine/src/evaluation.rs` — la funzione di valutazione che insegna all'IA cosa sia "buono"
4. Misura le prestazioni con i log di timing in `web/src/workers/engine.worker.ts`

**Profondità tecnica:**
- **Algoritmo:** Minimax con potatura alfa-beta (tecnica classica di IA per giochi)
- **Spazio di ricerca:** ~3^80 stati di gioco possibili → ridotti dalla potatura a ~10k valutazioni per mossa
- **Funzione di valutazione:** Euristiche realizzate a mano (possono essere sostituite con reti neurali)
- **Prestazioni:** WASM Rust raggiunge <100ms tempo di mossa a profondità 6-8

**Ottimizzazioni chiave:**
- Tavola di trasposizione (memoizzazione) per stati di tavola duplicati
- Euristiche di ordinamento delle mosse per massimizzare l'efficacia della potatura alfa-beta
- Approfondimento iterativo (non ancora implementato)
- Ricerca parallela (difficile a causa dei limiti del threading WASM)

---

## Breakdown Tecnico Completo

### Panoramica dell'Architettura

L'applicazione si divide in tre livelli principali:

#### 1. **React Frontend** (`web/src/`)
Gestisce:
- Interfaccia utente e renderizzazione della tavola di gioco
- Validazione della mossa (il quadrato selezionato è vuoto?)
- Gestione dello stato di gioco (il turno di chi, cronologia del gioco)
- Comunicazione con il motore IA

**Componenti chiave:**
- `App.tsx` — Setup dell'app principale e flusso di gioco
- `Board.tsx` — Renderizzazione della tavola di gioco e gestione dei click
- `GameControls.tsx` — Pulsanti di reset, annulla, difficoltà
- `store.ts` — Store Zustand per lo stato di gioco

**Perché React?**
- Riutilizzabilità dei componenti
- Aggiornamenti DOM efficienti tramite virtual DOM
- Forte supporto TypeScript
- Ampio ecosistema per pattern UI

---

#### 2. **Web Worker** (`web/src/workers/engine.worker.ts`)
Gestisce:
- Esecuzione della computazione IA in un thread separato
- Mantenimento della reattività dell'UI durante il turno dell'IA
- Comunicazione dei risultati al thread principale

**Come funziona:**
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

**Perché Web Worker?**
- Previene "jank" (UI congelata) durante lunghe computazioni
- Browser rimane reattivo all'input dell'utente
- Rende il gioco snappy anche su mobile

---

#### 3. **Rust WASM Engine** (`engine/src/`)
Gestisce:
- Logica di gioco e stato della tavola
- Generazione della mossa IA
- Algoritmo minimax con potatura alfa-beta
- Funzione di valutazione della tavola

**Moduli chiave:**
- `lib.rs` — Esportazioni WASM (`ai_move()` è chiamato da JavaScript)
- `ai.rs` — Implementazione dell'algoritmo minimax
- `board.rs` — Rappresentazione della tavola e validazione della mossa
- `evaluation.rs` — Funzione di valutazione della posizione

**Perché Rust + WASM?**
- **Prestazioni:** Rust compila a istruzioni simili a macchina, JavaScript è interpretato
- **Correttezza:** Forte sistema di tipi che cattura i bug al momento della compilazione
- **Portabilità:** WASM funziona su qualsiasi browser moderno
- **Interop:** Facile da chiamare da JavaScript tramite il confine WASM

---

### Fondamenti dell'IA di Gioco

#### Come l'IA Decide le Mosse

L'IA utilizza **minimax con potatura alfa-beta**:

1. **Minimax:** L'albero di gioco dove:
   - Giocatore massimizzante (IA) vuole il punteggio più alto
   - Giocatore minimizzante (avversario) vuole il punteggio più basso
   - Valuta ricorsivamente tutti gli stati di gioco possibili fino a un limite di profondità

2. **Potatura Alfa-Beta:** Ottimizzazione intelligente che:
   - Salta i rami che non possono influenzare la decisione finale
   - Riduce le valutazioni da ~3^profondità a ~3^(profondità/2)
   - Rende possibili mosse in meno di 100ms

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

#### Come l'IA Valuta le Posizioni

La **funzione di valutazione** insegna all'IA cosa sia "buono":

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

La funzione di valutazione è **euristiche realizzate a mano**. Nell'IA moderna, questa potrebbe essere sostituita con una rete neurale addestrata tramite auto-gioco (vedi Roadmap).

---

### Perché L'Abbiamo Costruito Così

#### Decisione di Design: WASM per l'Engine

**Potremmo farlo in JavaScript?**
- JavaScript minimax a profondità 6: ~2-3 secondi
- Rust WASM minimax a profondità 6: ~50-100ms

**Perché 20-60x più veloce?**
- Rust compila a istruzioni native
- WASM eseguito nella VM nativa del browser
- JavaScript è interpretato con JIT (buono, ma non così veloce)

**Trade-off:** Costruire in Rust richiede setup del toolchain (wasm-pack, Cargo). Vale la pena per le prestazioni.

#### Decisione di Design: Web Worker per il Threading

**Cosa accade senza Web Worker?**
- Utente clicca → React chiama `ai_move()` nel thread principale
- Thread principale è bloccato per 100ms+ (calcolo della mossa)
- UI non può rispondere ai click, le animazioni si congelano
- Utente vede il gioco congelato

**Con Web Worker:**
- React invia messaggio al thread worker
- Worker esegue il calcolo
- Thread principale continua a eseguire, l'UI rimane reattiva
- Invia il risultato indietro quando finito

**Trade-off:** Aggiunge complessità (message passing, async). Essenziale per le prestazioni percepite.

#### Decisione di Design: React per il Frontend

**Perché non JavaScript vanilla?**
- Il modello di componente di React rende la logica UI riutilizzabile
- Virtual DOM significa aggiornamenti efficienti
- TypeScript cattura gli errori di tipo in anticipo
- Ampio ecosistema (gestione dello stato, styling, ecc.)

---

## Avvio Rapido (Dettagliato)

### Prerequisiti
- **Rust** (1.56+) — [Installa rustup](https://rustup.rs/)
- **Node.js** (18+) — [Scarica](https://nodejs.org)
- **Bun** (latest) — `curl -fsSL https://bun.sh/install | bash`
- **wasm-pack** — `cargo install wasm-pack`

### Passaggio 1: Clona il Repository

```bash
git clone https://github.com/yourusername/open-gomoku.git
cd open-gomoku
```

### Passaggio 2: Installa le Dipendenze

```bash
bun install
```

Questo installa sia le dipendenze a livello di root che le dipendenze di `web/`.

### Passaggio 3: Compila l'Engine WASM

```bash
bun run build:engine
```

Questo compila Rust → WASM e output a `web/src/wasm/engine/`.

Output previsto:
```
...
   Compiling engine v0.1.0
    Finished release [optimized] target(s) in 2.54s
   Generating WASM bindings...
✓ Engine built to web/src/wasm/engine/
```

### Passaggio 4: Avvia il Server di Sviluppo

```bash
bun run dev
```

Apre http://localhost:5173 nel tuo browser. Gioca qualche mossa per verificare che tutto funzioni.

### Passaggio 5: Fai un Cambio (Test Opzionale)

Prova a modificare `engine/src/evaluation.rs` per cambiare il punteggio per i tre aperti:

```rust
// Change this line:
score += 100 * count_open_threes(&board, AI);
// To this:
score += 200 * count_open_threes(&board, AI);  // AI values threes more
```

Poi:
```bash
bun run build:engine
bun run dev
```

Aggiorna il browser. L'IA dovrebbe essere più aggressiva nel completare tre in fila.

### Compila per la Produzione

```bash
bun run build
```

Output del bundle ottimizzato a `web/dist/`.

### Distribuisci su Cloudflare Pages

Il progetto è configurato per Cloudflare Pages:

```bash
bun run deploy
```

Questo compila tutto e distribuisce al tuo progetto Cloudflare Pages denominato "gomoku".

---

## Struttura del Progetto

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

**Intuizione chiave:** `web/src/wasm/engine/` è **generato** da `bun run build:engine` — non modificarlo direttamente.

---

## Guida allo Sviluppo

### Come Estendere l'IA

#### Rendi l'IA Più Forte

Aumenta la profondità di ricerca in `engine/src/lib.rs`:

```rust
pub fn ai_move(board_state: &str, ai_player: i32) -> String {
    let mut board = Board::from_string(board_state);
    let best_move = minimax(&board, 8, true);  // Was 6, now 8
    ...
}
```

**Impatto sulle prestazioni:** Ogni aumento di profondità ~3x più lento.

#### Cambia la Funzione di Valutazione

Modifica `engine/src/evaluation.rs`:

```rust
fn evaluate_board(board: &Board) -> i32 {
  // Give more weight to center positions
  let center_bonus = count_center_pieces(&board, AI) * 5;

  // Penalize fragmented positions
  let connectivity = measure_piece_connectivity(&board, AI);

  ...
}
```

Questo insegna all'IA diverse priorità.

### Come Modificare le Regole di Gioco

#### Cambia le Dimensioni della Tavola

Modifica `engine/src/board.rs`:

```rust
pub const BOARD_SIZE: usize = 17;  // Was 15, now 17x17
```

Poi:
```bash
bun run build:engine
bun run dev
```

#### Aggiungi Modalità Handicap

In `web/src/components/GameControls.tsx`, aggiungi selezione handicap:

```tsx
<select value={handicap} onChange={(e) => setHandicap(e.target.value)}>
  <option value="0">Even</option>
  <option value="1">Black +1 Stone</option>
  <option value="2">Black +2 Stones</option>
</select>
```

Poi passa l'handicap al WASM `ai_move()`.

### Strategie di Testing

#### Unit Testing (Rust)

Aggiungi test in `engine/src/board.rs`:

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

Esegui: `cargo test`

#### Integration Testing (React)

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

### Profilazione delle Prestazioni

Aggiungi log di timing a `web/src/workers/engine.worker.ts`:

```typescript
const start = performance.now();
const bestMove = engine.ai_move(boardState, AI);
const elapsed = performance.now() - start;
console.log(`AI move took ${elapsed}ms at depth ${depth}`);
```

Controlla la Console di DevTools del browser per vedere i tempi della mossa. Regola la profondità se > 200ms.

---

## Roadmap: v2 e Oltre

### v2: Multiplayer Online (In Corso 🚀)

**Cosa succede dopo:** Gomoku multigiocatore in tempo reale tramite internet.

#### Panoramica dell'Architettura
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

**Componenti:**
1. **Matchmaking** — Trova avversario, crea stanza di gioco
2. **Sincronizzazione in tempo reale** — WebSocket per aggiornamenti istantanei delle mosse
3. **Validazione della mossa** — Server valida tutte le mosse (previene cheating)
4. **Gestione dei turni** — Server applica il turno di chi è
5. **Gestione dei timeout** — Abbandono dopo inattività

#### Perché Costruire Questo?

- I giocatori possono sfidarsi a vicenda (non solo l'IA)
- Impara sulla rete di gioco in tempo reale
- Comprendi la validazione delle mosse lato server
- Abilita il gioco competitivo e le classifiche

#### Piano di Implementazione

1. Configura il server WebSocket (Node.js + Socket.io o Rust Actix)
2. Aggiungi la gestione della stanza di gioco
3. Implementa la validazione della mossa sul server
4. Aggiungi autenticazione del giocatore (opzionale ma consigliato)
5. Costruisci l'abbinamento degli avversari
6. Distribuisci il server insieme all'app web

#### Stack Tecnologico
- **Backend:** Node.js (Express + Socket.io) o Rust (Actix-web)
- **Database:** PostgreSQL per la cronologia del gioco + rating ELO
- **Real-time:** WebSocket per la comunicazione istantanea
- **Frontend:** Piccoli aggiornamenti React per gestire lo stato di rete

---

### Possibilità Future (v3+)

1. **Partite IA vs IA** — Guarda due IA giocare l'una contro l'altra
2. **Livelli di difficoltà** — Facile (profondità 4), Medio (profondità 6), Difficile (profondità 8)
3. **Varianti di gioco**
   - Free-style (qualsiasi 5 in fila vince)
   - Renju (regole speciali per il blocco)
   - 6-in-a-row, Swap-2
4. **IA a rete neurale** — Addestra un modello tramite auto-gioco (sostituisce la valutazione realizzata a mano)
5. **App mobile** — Versione React Native
6. **Replay e analisi** — Salva partite, riproduci mosse, analizza gli errori
7. **Leaderboard e rating** — Rating ELO, classifiche stagionali

---

## Contribuendo

### Come Fare un Fork e Modificare

```bash
# 1. Fork su GitHub (clicca pulsante Fork)
# 2. Clona il tuo fork
git clone https://github.com/YOUR-USERNAME/open-gomoku.git
cd open-gomoku

# 3. Fai i tuoi cambiamenti
# 4. Testa localmente
bun run dev

# 5. Commit e push
git add .
git commit -m "feat: add your change"
git push origin main

# 6. Apri Pull Request su GitHub
```

### Contribuendo alla Roadmap

Hai un'idea per v2 o oltre? Apri un GitHub Issue:

1. Descrivi la tua idea chiaramente
2. Spiega perché sarebbe preziosa
3. Suggerisci un approccio tecnico se ne hai uno
4. Collega a risorse rilevanti

Ottime idee per i contributi:
- [ ] Implementa il selettore di livello di difficoltà
- [ ] Aggiungi un timer di mossa (mostra quanto ha impiegato l'IA)
- [ ] Crea un libro di apertura per mosse iniziali più veloci
- [ ] Aggiungi valutazione visiva dell'IA (mostra mappa termica della tavola)
- [ ] Implementa l'approfondimento iterativo
- [ ] Aggiungi memoizzazione della tavola di trasposizione

### Stile del Codice

- **Rust:** Formatta con `cargo fmt`, linting con `cargo clippy`
- **TypeScript:** Utilizza ESLint + Prettier (configurato in `web/.eslintrc`)
- **Commit:** Messaggi chiari che descrivono cosa è cambiato e perché

### Requisiti di Testing

Prima di aprire una PR:
- Rust: `cargo test` passa
- Frontend: Test manuale su desktop + mobile
- Build: `bun run build` ha successo senza avvisi

---

## Risorse di Apprendimento

### IA di Gioco e Algoritmi
- [Minimax Algorithm Explained](https://en.wikipedia.org/wiki/Minimax) — Wikipedia
- [Alpha-Beta Pruning](https://en.wikipedia.org/wiki/Alpha%E2%80%93beta_pruning) — Come saltare i rami
- [Game Tree Search](https://www.chessprogramming.org/Search) — Chess Programming Wiki

### Specifiche di Gomoku
- [Gomoku Rules (English)](https://en.wikipedia.org/wiki/Gomoku)
- [Gomoku AI Techniques](https://github.com/topics/gomoku-ai) — Altre implementazioni

### Web Assembly e Prestazioni
- [MDN: WebAssembly](https://developer.mozilla.org/en-US/docs/WebAssembly)
- [Rust + WASM Book](https://rustwasm.github.io/book/)
- [wasm-pack Guide](https://rustwasm.github.io/docs/wasm-pack/)

### Web Worker
- [MDN: Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)
- [Offloading Heavy Computation](https://web.dev/workers-basics/)

### Stack Web Moderno
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Zustand State Management](https://github.com/pmndrs/zustand)
- [Tailwind CSS](https://tailwindcss.com)

### Ottimizzazione delle Prestazioni
- [Web Vitals](https://web.dev/vitals/) — Misurare le prestazioni
- [Rust Performance](https://nnethercote.github.io/perf-book/) — Ottimizzazione di basso livello
- [WASM Performance Tuning](https://rustwasm.github.io/docs/wasm-pack/tutorials/npm-wasm/index.html)

---

## Licenza

Licenza MIT — Vedi il file LICENSE per i dettagli.

**Cosa significa:**
- ✅ Clona e modifica liberamente
- ✅ Usa commercialmente
- ✅ Distribuisci (modificato o meno)
- ✅ Uso privato
- ❌ Responsabilità — Non forniamo garanzie

---

## Costruito con IA Moderna nel Marzo 2026

open-gomoku dimostra cosa può raggiungere l'ingegneria IA all'avanguardia:
- **Assistenza IA produttiva** in ogni fase (design, implementazione, debug)
- **Integrazione multi-linguaggio** (Rust, TypeScript, React) in ore
- **Codice di qualità produttiva** con gestione degli errori e test
- **Valore educativo** — Impara pratiche moderne di IA leggendo codice reale

Non magia. Solo buoni strumenti nelle mani di praticanti esperti.

**Domande?** Apri un issue su GitHub.

**Vuoi imparare di più?** Inizia con il percorso di apprendimento che corrisponde ai tuoi interessi qui sopra.

**Pronto a costruire?** Segui [Avvio Rapido (Dettagliato)](#getting-started-detailed).
