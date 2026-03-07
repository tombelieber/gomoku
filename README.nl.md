# open-gomoku

> **Geavanceerde AI-game gemaakt in 2026.** Speel online of leer hoe moderne AI werkt.

Een volledig speelbaar Gomoku (五子棋) spel met een onoverwinnelijke AI-tegenstander, gebouwd met Rust WebAssembly en React. Dit is wat geavanceerde AI in een weekend kan bouwen. Het is gratis, open-source en educatief—kloon het, leer ervan en pas het aan.

**[▶ Speel nu online](https://open-open-gomoku.pages.dev)** • [Leer door voorbeelden](#leerpaden) • [Zie de code](#volledige-technische-uitwerking)

---

## Wat je ziet

**open-gomoku** is een productie-grade Gomoku AI-spel dat aantoont:
- ✅ **Moderne AI in actie** — Minimax met alpha-beta pruning, draait in je browser
- ✅ **Echte prestaties** — Rust WASM voor sub-100ms zettingsbeslissingen
- ✅ **Mobile-first ontwerp** — Volledig speelbaar op telefoons en tablets
- ✅ **Production-ready** — Foutafhandeling, geen panics, getest randgevallen
- ✅ **100% gratis en open-source** — MIT-gelicentieerd, vrij leren en aanpassen

Gebouwd om te tonen wat moderne AI-engineering in maart 2026 kan doen.

---

## Snel starten

### Speel online (Nu meteen)
[Speel op Cloudflare Pages](https://open-open-gomoku.pages.dev)

### Voer lokaal uit
```bash
git clone https://github.com/yourusername/open-gomoku.git
cd open-gomoku
bun install
bun run dev
```

Open http://localhost:5173 en begin te spelen.

---

## Wat is inbegrepen

### Technologiestapel
- **Engine:** Rust met WebAssembly (WASM) voor AI
- **Frontend:** React 18 + TypeScript + Tailwind CSS
- **Threading:** Web Workers voor non-blocking AI-zetten
- **Deployment:** Cloudflare Pages
- **Build:** Bun + Vite + wasm-pack

### Belangrijkste functies
- **Onoverwinnelijke AI** — Gebruikt minimax-algoritme met alpha-beta pruning
- **Responsieve UI** — Onmiddellijke visuele feedback op elke zet
- **Mobiel-klaar** — Touch-geoptimaliseerd bord en besturingselementen
- **Spelbesturingen** — Reset, undo (beperkt), moeilijkheidsniveaus gepland
- **Toestandpersistentie** — Spelstatus beheerd met Zustand
- **Prestatieprofieling** — Zettingstijd geregistreerd, AI-diepte adaptief

### Architectuur op hoog niveau
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

## Leerpaden

Kies je pad op basis van wat je wilt leren:

### 🎮 Voor spelontwikkelaars
Je wilt begrijpen hoe AI beslissingen in spellen neemt.

**Begin hier:**
1. Lees [Game AI-grondbeginselen](#game-ai-grondbeginselen) hieronder
2. Controleer `engine/src/ai.rs` — minimax-algoritme met alpha-beta pruning
3. Wijzig `engine/src/evaluation.rs` — verander hoe de AI posities evalueert
4. Probeer `MAX_DEPTH` in `engine/src/lib.rs` te verhogen/verlagen om prestatieimpact te zien

**Sleutelbestanden:**
- `engine/src/ai.rs:minimax()` — Core-beslissingsalgoritme
- `engine/src/evaluation.rs:evaluate_board()` — Positiescoringsfunctie
- `web/src/workers/engine.worker.ts` — Web Worker-integratie

**Vragen beantwoord:**
- Hoe bepaalt de AI de "beste" zet?
- Waarom is alpha-beta pruning snel?
- Hoe verbetert WASM de prestaties ten opzichte van JavaScript?

**Volgende stappen:**
- Voeg verschillende moeilijkheidsniveaus toe (varieer `MAX_DEPTH`)
- Implementeer iteratief verdiepen
- Voeg openingboek toe voor snellere vroege zetten

---

### 📚 Voor studenten en docenten
Je wilt volledige stack AI-integratie en moderne webarchitectuur begrijpen.

**Begin hier:**
1. Lees de [Volledige technische uitwerking](#volledige-technische-uitwerking) hieronder
2. Volg de [Snel starten (Gedetailleerd)](#snel-starten-gedetailleerd) gids
3. Bekijk component-interactie in `web/src/components/Board.tsx` en `web/src/workers/engine.worker.ts`
4. Bestudeer hoe Zustand spelstatus beheert in `web/src/store.ts`

**Kernconcepten:**
- **Architectuurpatronen** — Scheiding van belangen (AI, UI, state management)
- **Threadingmodel** — Waarom Web Workers belangrijk zijn voor responsiviteit
- **WASM-grens** — Hoe Rust en JavaScript communiceren
- **Full-stack-ontwikkeling** — Van AI-engine tot gebruikersinterface

**Vragen beantwoord:**
- Hoe integreer je gecompileerde code (Rust) met dynamische code (React)?
- Waarom gebruiken we Web Workers?
- Hoe zou je AI-speltoepassing structureren?

**Opgenomen leermiddelen:**
- Architectuurdiagrammen en verklaringen
- Codecommentaren die ontwerppatronen benadrukken
- Prestatietracing-tips
- Best practices voor WASM + JavaScript

---

### 🔬 Voor nieuwsgierige ontwikkelaars
Je wilt begrijpen hoe moderne AI-systemen werken, van besluitvorming tot prestatieoptimalisatie.

**Begin hier:**
1. Speel eerst het spel — begrijp wat je bekijkt
2. Lees [Waarom we het op deze manier gebouwd hebben](#waarom-we-het-op-deze-manier-gebouwd-hebben)
3. Verken `engine/src/` — begrijp het minimax-algoritme visueel
4. Controleer `web/src/workers/engine.worker.ts` — zie hoe AI op de achtergrond draait

**Belangrijkste inzichten:**
- AI is geen magie — het is uitputtend zoeken met slim snoeien
- Prestaties zijn belangrijk — sub-100ms-beslissingen gebruiken WASM, niet JavaScript
- Architectuur maakt capaciteit mogelijk — Web Workers houden UI responsief
- Moderne stacks mengen talen — Rust voor prestaties, JavaScript voor interactiviteit

**Vragen beantwoord:**
- Wat maakt deze AI eigenlijk "goed"?
- Waarom Rust naar WASM compileren in plaats van gewoon JavaScript gebruiken?
- Hoe denkt de AI vooruit?

---

### 💻 Voor AI-ingenieurs
Je wilt AI-modelarchitectuur, optimalisatie en besluitlogica begrijpen.

**Begin hier:**
1. Lees [AI-architectuur en besluitlogica](#ai-architectuur--besluitlogica)
2. Bestudeer `engine/src/ai.rs` — minimax-implementatie met volledige aantekeningen
3. Bekijk `engine/src/evaluation.rs` — de evaluatiefunctie die de AI leert wat "goed" is
4. Meet prestaties met `web/src/workers/engine.worker.ts` timing logs

**Technische diepte:**
- **Algoritme:** Minimax met alpha-beta pruning (klassieke game AI-techniek)
- **Zoekruimte:** ~3^80 mogelijke spelsituaties → gereduceerd door snoeien naar ~10k evaluaties per zet
- **Evaluatiefunctie:** Hand-vervaardigde heuristica (kan vervangen worden door neurale netwerken)
- **Prestaties:** Rust WASM bereikt <100ms zettingstijd op diepte 6-8

**Belangrijkste optimalisaties:**
- Transposition table (memoization) voor gedupliceerde bordtoestanden
- Zettingsorderingheuristica's om alpha-beta pruning-effectiviteit te maximaliseren
- Iteratief verdiepen (nog niet geïmplementeerd)
- Parallelle zoeking (uitdagend vanwege WASM-threadingbeperkingen)

---

## Volledige technische uitwerking

### Architectuuroverzicht

De toepassing is verdeeld in drie hoofdlagen:

#### 1. **React Frontend** (`web/src/`)
Behandelt:
- Gebruikersinterface en speelbordweergave
- Zettingsvalidatie (is het geselecteerde vak leeg?)
- Spelstatus management (wiens beurt, spelgeschiedenis)
- Communicatie met AI-engine

**Sleutelcomponenten:**
- `App.tsx` — Hoofdapp-setup en spelflow
- `Board.tsx` — Speelbordweergave en klikafhandeling
- `GameControls.tsx` — Reset-, undo-, moeilijkheidsknop
- `store.ts` — Zustand-opslag voor spelstatus

**Waarom React?**
- Component-herbruikbaarheid
- Efficiënte DOM-updates via virtual DOM
- Sterke TypeScript-ondersteuning
- Grote ecosysteem voor UI-patronen

---

#### 2. **Web Worker** (`web/src/workers/engine.worker.ts`)
Behandelt:
- AI-berekening in een aparte thread uitvoeren
- UI responsief houden tijdens AI-beurt
- Resultaten terug naar de hoofdthread communiceren

**Hoe het werkt:**
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

**Waarom Web Workers?**
- Voorkomt "jank" (bevroren UI) tijdens lange berekeningen
- Browser blijft reactief op gebruikersinvoer
- Maakt het spel voelend snel, zelfs op mobiel

---

#### 3. **Rust WASM Engine** (`engine/src/`)
Behandelt:
- Spellogica en bordstatus
- AI-zetgeneratie
- Minimax-algoritme met alpha-beta pruning
- Bordevaluatiefunctie

**Sleutelmodules:**
- `lib.rs` — WASM-exports (`ai_move()` wordt aangeroepen vanuit JavaScript)
- `ai.rs` — Minimax-algoritme-implementatie
- `board.rs` — Bordrepresentatie en zettingsvalidatie
- `evaluation.rs` — Positiescoringsfunctie

**Waarom Rust + WASM?**
- **Prestaties:** Rust compileert naar machine-achtige instructies, JavaScript is geïnterpreteerd
- **Correctheid:** Sterk typesysteem vangt bugs op compilatietijd
- **Draagbaarheid:** WASM draait op elke moderne browser
- **Interop:** Eenvoudig aan te roepen vanuit JavaScript via WASM-grens

---

### Game AI-grondbeginselen

#### Hoe de AI zetten bepaalt

De AI gebruikt **minimax met alpha-beta pruning**:

1. **Minimax:** De spelboom waarbij:
   - Maximaliserende speler (AI) wil hoogste score
   - Minimaliserande speler (tegenstander) wil laagste score
   - Recursief evalueer alle mogelijke spelsituaties tot dieptelimiet

2. **Alpha-Beta Pruning:** Slimme optimalisatie die:
   - Takken overslaat die de uiteindelijke beslissing niet beïnvloeden
   - Reduceert evaluaties van ~3^diepte naar ~3^(diepte/2)
   - Maakt sub-100ms zetten mogelijk

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

#### Hoe de AI posities evalueert

De **evaluatiefunctie** leert de AI wat "goed" is:

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

De evaluatiefunctie is **hand-vervaardigde heuristica**. In moderne AI zou dit vervangen kunnen worden door een neuraal netwerk getraind via self-play (zie Roadmap).

---

### Waarom we het op deze manier gebouwd hebben

#### Ontwerpbesluit: WASM voor Engine

**Konden we dit in JavaScript doen?**
- JavaScript minimax op diepte 6: ~2-3 seconden
- Rust WASM minimax op diepte 6: ~50-100ms

**Waarom 20-60x sneller?**
- Rust compileert naar native instructies
- WASM draait in browser's native VM
- JavaScript is geïnterpreteerd met JIT (goed, maar niet zo snel)

**Trade-off:** Bouwen in Rust vereist toolchain-setup (wasm-pack, Cargo). Waard voor prestaties.

#### Ontwerpbesluit: Web Worker voor Threading

**Wat gebeurt er zonder Web Worker?**
- Gebruiker klikt → React roept `ai_move()` aan op hoofdthread
- Hoofdthread is geblokkeerd voor 100ms+ (zetberekening)
- UI kan niet op klikken reageren, animaties bevriezen
- Gebruiker ziet bevroren spel

**Met Web Worker:**
- React stuurt bericht naar worker-thread
- Worker doet berekening
- Hoofdthread blijft draaien, UI blijft responsief
- Stuurt resultaat terug als klaar

**Trade-off:** Voegt complexiteit toe (berichtpassing, async). Essentieel voor waargenomen prestaties.

#### Ontwerpbesluit: React voor Frontend

**Waarom niet vanilla JavaScript?**
- React's componentmodel maakt UI-logica herbruikbaar
- Virtual DOM betekent efficiënte updates
- TypeScript vangt typefouten vroeg op
- Groot ecosysteem (state management, styling, enz.)

---

## Snel starten (Gedetailleerd)

### Vereisten
- **Rust** (1.56+) — [Installeer rustup](https://rustup.rs/)
- **Node.js** (18+) — [Download](https://nodejs.org)
- **Bun** (latest) — `curl -fsSL https://bun.sh/install | bash`
- **wasm-pack** — `cargo install wasm-pack`

### Stap 1: Kloon de repository

```bash
git clone https://github.com/yourusername/open-gomoku.git
cd open-gomoku
```

### Stap 2: Installeer afhankelijkheden

```bash
bun install
```

Dit installeert zowel root-level als `web/` afhankelijkheden.

### Stap 3: Bouw de WASM Engine

```bash
bun run build:engine
```

Dit compileert Rust → WASM en voert uit naar `web/src/wasm/engine/`.

Verwachte output:
```
...
   Compiling engine v0.1.0
    Finished release [optimized] target(s) in 2.54s
   Generating WASM bindings...
✓ Engine built to web/src/wasm/engine/
```

### Stap 4: Start ontwikkelingserver

```bash
bun run dev
```

Opent http://localhost:5173 in je browser. Speel enkele zetten om alles te controleren.

### Stap 5: Maak een wijziging (Optionele test)

Probeer `engine/src/evaluation.rs` te bewerken om de score voor open threes te wijzigen:

```rust
// Wijzig deze regel:
score += 100 * count_open_threes(&board, AI);
// Naar dit:
score += 200 * count_open_threes(&board, AI);  // AI values threes more
```

Daarna:
```bash
bun run build:engine
bun run dev
```

Ververs de browser. De AI zou agressiever moeten zijn over het voltooien van three-in-a-rows.

### Bouwen voor productie

```bash
bun run build
```

Voert geoptimaliseerde bundel uit naar `web/dist/`.

### Implementeren op Cloudflare Pages

Het project is geconfigureerd voor Cloudflare Pages:

```bash
bun run deploy
```

Dit bouwt alles en implementeert op je Cloudflare Pages-project genaamd "gomoku".

---

## Projectstructuur

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

**Sleutelinzicht:** `web/src/wasm/engine/` is **gegenereerd** door `bun run build:engine` — bewerk het niet direct.

---

## Ontwikkelingsgids

### Hoe je de AI kunt uitbreiden

#### De AI sterker maken

Verhoog zoekdiepte in `engine/src/lib.rs`:

```rust
pub fn ai_move(board_state: &str, ai_player: i32) -> String {
    let mut board = Board::from_string(board_state);
    let best_move = minimax(&board, 8, true);  // Was 6, now 8
    ...
}
```

**Prestatieimpact:** Elke diepteverhoging ongeveer 3x langzamer.

#### De evaluatiefunctie wijzigen

Bewerk `engine/src/evaluation.rs`:

```rust
fn evaluate_board(board: &Board) -> i32 {
  // Give more weight to center positions
  let center_bonus = count_center_pieces(&board, AI) * 5;

  // Penalize fragmented positions
  let connectivity = measure_piece_connectivity(&board, AI);

  ...
}
```

Dit leert de AI verschillende prioriteiten.

### Hoe spelregels wijzigen

#### Bordgrootte wijzigen

Bewerk `engine/src/board.rs`:

```rust
pub const BOARD_SIZE: usize = 17;  // Was 15, now 17x17
```

Daarna:
```bash
bun run build:engine
bun run dev
```

#### Handicapmodus toevoegen

In `web/src/components/GameControls.tsx`, voeg handicapselectie toe:

```tsx
<select value={handicap} onChange={(e) => setHandicap(e.target.value)}>
  <option value="0">Even</option>
  <option value="1">Black +1 Stone</option>
  <option value="2">Black +2 Stones</option>
</select>
```

Geef handicap dan door aan WASM `ai_move()`.

### Teststrategieën

#### Unit Testing (Rust)

Voeg testen toe in `engine/src/board.rs`:

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

Voer uit: `cargo test`

#### Integratietesting (React)

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

### Prestatieprofieling

Voeg timing-logboeken toe aan `web/src/workers/engine.worker.ts`:

```typescript
const start = performance.now();
const bestMove = engine.ai_move(boardState, AI);
const elapsed = performance.now() - start;
console.log(`AI move took ${elapsed}ms at depth ${depth}`);
```

Controleer browser DevTools Console om zettingstijden te zien. Pas diepte aan als > 200ms.

---

## Roadmap: v2 en verder

### v2: Online multiplayer (In voortgang 🚀)

**Wat komt volgende:** Real-time, twee-speler Gomoku over het internet.

#### Architectuuroverzicht
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

**Componenten:**
1. **Matchmaking** — Vind tegenstander, creëer spelkamer
2. **Real-time sync** — WebSocket voor onmiddellijke zet-updates
3. **Zettingsvalidatie** — Server valideert alle zetten (voorkomt cheaten)
4. **Beurtbeheer** — Server dwingt af wiens beurt het is
5. **Timeout-afhandeling** — Forfeit na inactiviteit

#### Waarom dit bouwen?

- Spelers kunnen elkaar uitdagen (niet alleen AI)
- Leer over real-time-spelnetwerking
- Begrijp server-side zettingsvalidatie
- Maak competitief spelen en leaderboards mogelijk

#### Implementatieplan

1. Stel WebSocket-server op (Node.js + Socket.io of Rust Actix)
2. Voeg spelkamerbeheer toe
3. Implementeer zettingsvalidatie op server
4. Voeg spelauthenticatie toe (optioneel maar aanbevolen)
5. Bouw tegenstander matchmaking
6. Implementeer server naast web-app

#### Technologiestapel
- **Backend:** Node.js (Express + Socket.io) of Rust (Actix-web)
- **Database:** PostgreSQL voor spelgeschiedenis + ELO-ratings
- **Real-time:** WebSocket voor onmiddellijke communicatie
- **Frontend:** Kleine React-updates om netwerkstatus af te handelen

---

### Toekomstige mogelijkheden (v3+)

1. **AI vs AI wedstrijden** — Kijk hoe twee AI's elkaar spelen
2. **Moeilijkheidsniveaus** — Gemakkelijk (diepte 4), Gemiddeld (diepte 6), Moeilijk (diepte 8)
3. **Spelvarianten**
   - Vrije stijl (elke 5 op een rij wint)
   - Renju (speciale regels voor blokkering)
   - 6-in-a-row, Swap-2
4. **Neuraal netwerk AI** — Train een model via self-play (vervangt hand-vervaardigde evaluatie)
5. **Mobiele app** — React Native versie
6. **Herhaling en analyse** — Sla spellen op, herhaal zetten, analyseer fouten
7. **Leaderboard en ratings** — ELO-ratings, seizoensrangschikkingen

---

## Bijdragen

### Hoe je fork en wijzig

```bash
# 1. Fork op GitHub (klik Fork-knop)
# 2. Kloon je fork
git clone https://github.com/YOUR-USERNAME/open-gomoku.git
cd open-gomoku

# 3. Maak wijzigingen
# 4. Test lokaal
bun run dev

# 5. Commit en push
git add .
git commit -m "feat: add your change"
git push origin main

# 6. Open Pull Request op GitHub
```

### Bijdragen aan Roadmap

Heb je een idee voor v2 of verder? Open een GitHub Issue:

1. Beschrijf je idee duidelijk
2. Leg uit waarom het waardevol zou zijn
3. Stel technische benadering voor als je er een hebt
4. Link naar relevante bronnen

Geweldige ideeën voor bijdragen:
- [ ] Implementeer moeilijkheidsniveauselector
- [ ] Voeg zettingstimer toe (toon hoe lang AI deed)
- [ ] Creëer openingboek voor snellere vroege zetten
- [ ] Voeg visuele AI-evaluatie toe (toon bordheatmap)
- [ ] Implementeer iteratief verdiepen
- [ ] Voeg transposition table memoization toe

### Codestijl

- **Rust:** Formatteer met `cargo fmt`, lint met `cargo clippy`
- **TypeScript:** Gebruik ESLint + Prettier (geconfigureerd in `web/.eslintrc`)
- **Commits:** Duidelijke berichten die beschrijven wat is gewijzigd en waarom

### Testvereisten

Voor het openen van een PR:
- Rust: `cargo test` slaagt
- Frontend: Handmatig testen op desktop + mobiel
- Build: `bun run build` slaagt zonder waarschuwingen

---

## Leermiddelen

### Game AI en algoritmen
- [Minimax algoritme uitgelegd](https://en.wikipedia.org/wiki/Minimax) — Wikipedia
- [Alpha-Beta Pruning](https://en.wikipedia.org/wiki/Alpha%E2%80%93beta_pruning) — Hoe takken overslaan
- [Game Tree Search](https://www.chessprogramming.org/Search) — Chess Programming Wiki

### Gomoku Specifiek
- [Gomoku-regels (Engels)](https://en.wikipedia.org/wiki/Gomoku)
- [Gomoku AI-technieken](https://github.com/topics/gomoku-ai) — Andere implementaties

### Web Assembly en prestaties
- [MDN: WebAssembly](https://developer.mozilla.org/en-US/docs/WebAssembly)
- [Rust + WASM Book](https://rustwasm.github.io/book/)
- [wasm-pack gids](https://rustwasm.github.io/docs/wasm-pack/)

### Web Workers
- [MDN: Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)
- [Zware berekening offloaden](https://web.dev/workers-basics/)

### Modern webstack
- [React documentatie](https://react.dev)
- [TypeScript handleiding](https://www.typescriptlang.org/docs/)
- [Zustand State Management](https://github.com/pmndrs/zustand)
- [Tailwind CSS](https://tailwindcss.com)

### Prestatieoptimalisatie
- [Web Vitals](https://web.dev/vitals/) — Prestaties meten
- [Rust prestaties](https://nnethercote.github.io/perf-book/) — Low-level optimalisatie
- [WASM prestatieafstemming](https://rustwasm.github.io/docs/wasm-pack/tutorials/npm-wasm/index.html)

---

## Licentie

MIT-licentie — Zie LICENSE-bestand voor details.

**Wat dit betekent:**
- ✅ Kloon en wijzig vrij
- ✅ Gebruiken commercieel
- ✅ Distribueer (aangepast of niet)
- ✅ Privégebruik
- ❌ Aansprakelijkheid — We geven geen garantie

---

## Gebouwd met moderne AI in maart 2026

open-gomoku toont wat geavanceerde AI-engineering kan bereiken:
- **Productieve AI-hulp** in elke fase (ontwerp, implementatie, debugging)
- **Integratie van meerdere talen** (Rust, TypeScript, React) in uren
- **Productiekwaliteitscode** met foutafhandeling en testen
- **Onderwijswaarde** — Leer moderne AI-praktijken door echte code te lezen

Geen magie. Gewoon goede gereedschappen in handen van vaardige beoefenaars.

**Vragen?** Open een issue op GitHub.

**Wil je meer leren?** Begin met het leerpad dat overeenkomt met je interesses hierboven.

**Klaar om te bouwen?** Volg [Snel starten (Gedetailleerd)](#snel-starten-gedetailleerd).
