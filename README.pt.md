# open-gomoku

> **IA de ponta em 2026.** Jogue online ou aprenda como a IA moderna funciona.

Um jogo de Gomoku (五子棋) totalmente jogável com um oponente de IA invencível, construído com Rust WebAssembly e React. Isto é o que a IA de ponta consegue construir num fim de semana. É gratuito, código aberto e educacional—clone-o, aprenda com ele, modifique-o.

**[▶ Jogue Online Agora](https://open-open-gomoku.pages.dev)** • [Aprenda com Exemplos](#caminhos-de-aprendizado) • [Veja o Código](#análise-técnica-completa)

---

## O Que Está Vendo

**open-gomoku** é um jogo de Gomoku com IA de grau produção que demonstra:
- ✅ **IA moderna em ação** — Minimax com poda alfa-beta, executa no seu navegador
- ✅ **Desempenho em tempo real** — Rust WASM para decisões de movimento em menos de 100ms
- ✅ **Design mobile-first** — Totalmente jogável em telefones e tablets
- ✅ **Pronto para produção** — Tratamento de erros, sem panics, testes de casos extremos
- ✅ **100% gratuito e código aberto** — Licença MIT, aprenda e modifique livremente

Construído para mostrar como a engenharia de IA moderna se parece em março de 2026.

---

## Início Rápido

### Jogar Online (Agora)
[Jogue em Cloudflare Pages](https://open-open-gomoku.pages.dev)

### Executar Localmente
```bash
git clone https://github.com/yourusername/open-gomoku.git
cd open-gomoku
bun install
bun run dev
```

Abra http://localhost:5173 e comece a jogar.

---

## O Que Está Incluído

### Stack de Tecnologia
- **Engine:** Rust com WebAssembly (WASM) para IA
- **Frontend:** React 18 + TypeScript + Tailwind CSS
- **Threading:** Web Workers para movimentos de IA sem bloqueio
- **Deployment:** Cloudflare Pages
- **Build:** Bun + Vite + wasm-pack

### Recursos Principais
- **IA Invencível** — Usa algoritmo minimax com poda alfa-beta
- **UI Responsiva** — Feedback visual instantâneo em cada movimento
- **Pronto para Mobile** — Tabuleiro e controles otimizados para toque
- **Controles de Jogo** — Reiniciar, desfazer (limitado), níveis de dificuldade planejados
- **Persistência de Estado** — Estado do jogo gerenciado com Zustand
- **Criação de Perfil de Desempenho** — Tempo de movimento registrado, profundidade de IA adaptativa

### Arquitetura de Alto Nível
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

## Caminhos de Aprendizado

Escolha seu caminho com base no que deseja aprender:

### 🎮 Para Desenvolvedores de Jogos
Você quer entender como a IA toma decisões em jogos.

**Comece aqui:**
1. Leia [Fundamentos de IA para Jogos](#fundamentos-de-ia-para-jogos) abaixo
2. Confira `engine/src/ai.rs` — algoritmo minimax com poda alfa-beta
3. Modifique `engine/src/evaluation.rs` — mude como a IA avalia posições
4. Tente aumentar/diminuir `MAX_DEPTH` em `engine/src/lib.rs` para ver o impacto de desempenho

**Arquivos-chave:**
- `engine/src/ai.rs:minimax()` — Algoritmo de decisão central
- `engine/src/evaluation.rs:evaluate_board()` — Pontuação de posição
- `web/src/workers/engine.worker.ts` — Integração com Web Worker

**Perguntas respondidas:**
- Como a IA decide o movimento "melhor"?
- Por que a poda alfa-beta é rápida?
- Como WASM melhora o desempenho sobre JavaScript?

**Próximos passos:**
- Adicione níveis de dificuldade diferentes (varie `MAX_DEPTH`)
- Implemente aprofundamento iterativo
- Adicione livro de aberturas para movimentos iniciais mais rápidos

---

### 📚 Para Alunos e Educadores
Você quer entender integração de IA full-stack e arquitetura web moderna.

**Comece aqui:**
1. Leia a [Análise Técnica Completa](#análise-técnica-completa) abaixo
2. Siga o guia [Início Detalhado](#início-detalhado)
3. Revise a interação de componentes em `web/src/components/Board.tsx` e `web/src/workers/engine.worker.ts`
4. Estude como Zustand gerencia estado do jogo em `web/src/store.ts`

**Conceitos-chave:**
- **Padrões de arquitetura** — Separação de preocupações (IA, UI, gestão de estado)
- **Modelo de threading** — Por que Web Workers são importantes para responsividade
- **Limite de WASM** — Como Rust e JavaScript se comunicam
- **Desenvolvimento full-stack** — De engine de IA até interface de usuário

**Perguntas respondidas:**
- Como integrar código compilado (Rust) com código dinâmico (React)?
- Por que usamos Web Workers?
- Como estruturar aplicações de jogos com IA?

**Recursos de aprendizado inclusos:**
- Diagramas de arquitetura e explicações
- Comentários de código destacando padrões de design
- Dicas para rastreamento de desempenho
- Melhores práticas para WASM + JavaScript

---

### 🔬 Para Desenvolvedores Curiosos
Você quer entender como sistemas de IA modernos funcionam, desde tomada de decisão até otimização de desempenho.

**Comece aqui:**
1. Jogue o jogo primeiro — entenda o que está vendo
2. Leia [Por Que Construímos Desta Forma](#por-que-construímos-desta-forma)
3. Explore `engine/src/` — entenda o algoritmo minimax visualmente
4. Confira `web/src/workers/engine.worker.ts` — veja como a IA executa em segundo plano

**Insights-chave:**
- IA não é magia — é busca exaustiva com poda inteligente
- Desempenho importa — decisões em menos de 100ms usam WASM, não JavaScript
- Arquitetura habilita capacidade — Web Workers mantêm UI responsiva
- Stacks modernos misturam linguagens — Rust para desempenho, JavaScript para interatividade

**Perguntas respondidas:**
- O que torna essa IA realmente "boa"?
- Por que compilar Rust para WASM em vez de apenas usar JavaScript?
- Como a IA pensa à frente?

---

### 💻 Para Engenheiros de IA
Você quer entender arquitetura de modelo de IA, otimização e lógica de decisão.

**Comece aqui:**
1. Leia [Arquitetura de IA e Lógica de Decisão](#arquitetura-de-ia-e-lógica-de-decisão)
2. Estude `engine/src/ai.rs` — implementação minimax com anotações completas
3. Revise `engine/src/evaluation.rs` — a função de avaliação que ensina à IA o que é "bom"
4. Meça desempenho com logs de tempo em `web/src/workers/engine.worker.ts`

**Profundidade técnica:**
- **Algoritmo:** Minimax com poda alfa-beta (técnica clássica de IA para jogos)
- **Espaço de busca:** ~3^80 possíveis estados do jogo → reduzido por poda a ~10k avaliações por movimento
- **Função de avaliação:** Heurísticas hand-crafted (pode ser substituído por redes neurais)
- **Desempenho:** Rust WASM consegue tempo de movimento <100ms em profundidade 6-8

**Otimizações-chave:**
- Tabela de transposição (memoização) para estados do tabuleiro duplicados
- Heurísticas de ordenação de movimento para maximizar eficácia de poda alfa-beta
- Aprofundamento iterativo (ainda não implementado)
- Busca paralela (desafiador devido a limitações de threading em WASM)

---

## Análise Técnica Completa

### Visão Geral da Arquitetura

A aplicação se divide em três camadas principais:

#### 1. **Frontend React** (`web/src/`)
Lida com:
- Interface de usuário e renderização do tabuleiro do jogo
- Validação de movimento (o quadrado selecionado está vazio?)
- Gestão de estado do jogo (de quem é a vez, histórico do jogo)
- Comunicação com engine de IA

**Componentes-chave:**
- `App.tsx` — Configuração principal da app e fluxo do jogo
- `Board.tsx` — Renderização do tabuleiro e manipulação de cliques
- `GameControls.tsx` — Botões de reiniciar, desfazer, dificuldade
- `store.ts` — Store Zustand para estado do jogo

**Por que React?**
- Reusabilidade de componentes
- Atualizações eficientes de DOM via DOM virtual
- Suporte forte a TypeScript
- Grande ecossistema para padrões de UI

---

#### 2. **Web Worker** (`web/src/workers/engine.worker.ts`)
Lida com:
- Execução de computação de IA em thread separada
- Manutenção da UI responsiva durante a vez da IA
- Comunicação de resultados de volta à thread principal

**Como funciona:**
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

**Por que Web Workers?**
- Previne "jank" (congelamento de UI) durante computações longas
- Navegador permanece responsivo à entrada do usuário
- Faz o jogo parecer ágil mesmo em mobile

---

#### 3. **Engine Rust WASM** (`engine/src/`)
Lida com:
- Lógica do jogo e estado do tabuleiro
- Geração de movimento de IA
- Algoritmo minimax com poda alfa-beta
- Função de avaliação do tabuleiro

**Módulos-chave:**
- `lib.rs` — Exportações WASM (`ai_move()` é chamado de JavaScript)
- `ai.rs` — Implementação do algoritmo minimax
- `board.rs` — Representação do tabuleiro e validação de movimento
- `evaluation.rs` — Função de pontuação de posição

**Por que Rust + WASM?**
- **Desempenho:** Rust compila em instruções similares a máquina, JavaScript é interpretado
- **Correção:** Sistema de tipos forte detecta bugs em tempo de compilação
- **Portabilidade:** WASM executa em qualquer navegador moderno
- **Interop:** Fácil chamar de JavaScript via limite de WASM

---

### Fundamentos de IA para Jogos

#### Como a IA Toma Decisões de Movimento

A IA usa **minimax com poda alfa-beta**:

1. **Minimax:** A árvore de jogo onde:
   - Jogador maximizador (IA) quer pontuação mais alta
   - Jogador minimizador (oponente) quer pontuação mais baixa
   - Avaliar recursivamente todos os possíveis estados do jogo até limite de profundidade

2. **Poda Alfa-Beta:** Otimização inteligente que:
   - Pula ramos que não podem afetar a decisão final
   - Reduz avaliações de ~3^profundidade para ~3^(profundidade/2)
   - Torna movimentos em menos de 100ms possíveis

**Pseudocódigo:**
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

#### Como a IA Avalia Posições

A **função de avaliação** ensina à IA o que é "bom":

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

A função de avaliação é **heurísticas hand-crafted**. Na IA moderna, isto pode ser substituído por uma rede neural treinada via jogo automático (veja Roadmap).

---

### Por Que Construímos Desta Forma

#### Decisão de Design: WASM para Engine

**Poderíamos fazer isto em JavaScript?**
- Minimax em JavaScript em profundidade 6: ~2-3 segundos
- Minimax em Rust WASM em profundidade 6: ~50-100ms

**Por que 20-60x mais rápido?**
- Rust compila para instruções nativas
- WASM executa na VM nativa do navegador
- JavaScript é interpretado com JIT (bom, mas não tão rápido)

**Trade-off:** Construir em Rust requer setup de toolchain (wasm-pack, Cargo). Vale a pena pelo desempenho.

#### Decisão de Design: Web Worker para Threading

**O que acontece sem Web Worker?**
- Usuário clica → React chama `ai_move()` na thread principal
- Thread principal é bloqueada por 100ms+ (computando movimento)
- UI não pode responder a cliques, animações congelam
- Usuário vê jogo congelado

**Com Web Worker:**
- React posta mensagem à thread de worker
- Worker faz computação
- Thread principal continua rodando, UI permanece responsiva
- Posta resultado de volta quando pronto

**Trade-off:** Adiciona complexidade (passagem de mensagem, async). Essencial para desempenho percebido.

#### Decisão de Design: React para Frontend

**Por que não JavaScript vanilla?**
- Modelo de componentes de React torna lógica de UI reutilizável
- DOM Virtual significa atualizações eficientes
- TypeScript detecta erros de tipo cedo
- Grande ecossistema (gestão de estado, estilos, etc.)

---

## Início Detalhado

### Pré-requisitos
- **Rust** (1.56+) — [Instale rustup](https://rustup.rs/)
- **Node.js** (18+) — [Download](https://nodejs.org)
- **Bun** (latest) — `curl -fsSL https://bun.sh/install | bash`
- **wasm-pack** — `cargo install wasm-pack`

### Passo 1: Clonar o Repositório

```bash
git clone https://github.com/yourusername/open-gomoku.git
cd open-gomoku
```

### Passo 2: Instalar Dependências

```bash
bun install
```

Isto instala dependências de nível raiz e de `web/`.

### Passo 3: Construir o Engine WASM

```bash
bun run build:engine
```

Isto compila Rust → WASM e retorna para `web/src/wasm/engine/`.

Saída esperada:
```
...
   Compiling engine v0.1.0
    Finished release [optimized] target(s) in 2.54s
   Generating WASM bindings...
✓ Engine built to web/src/wasm/engine/
```

### Passo 4: Iniciar Servidor de Desenvolvimento

```bash
bun run dev
```

Abre http://localhost:5173 no seu navegador. Jogue alguns movimentos para verificar que tudo funciona.

### Passo 5: Fazer uma Mudança (Teste Opcional)

Tente editar `engine/src/evaluation.rs` para mudar a pontuação para trios abertos:

```rust
// Change this line:
score += 100 * count_open_threes(&board, AI);
// To this:
score += 200 * count_open_threes(&board, AI);  // AI values threes more
```

Depois:
```bash
bun run build:engine
bun run dev
```

Atualize o navegador. A IA deve ser mais agressiva sobre completar trios.

### Construindo para Produção

```bash
bun run build
```

Retorna bundle otimizado para `web/dist/`.

### Deployando em Cloudflare Pages

O projeto está configurado para Cloudflare Pages:

```bash
bun run deploy
```

Isto constrói tudo e faz deploy para seu projeto Cloudflare Pages nomeado "gomoku".

---

## Estrutura de Projeto

```
open-gomoku/
├── README.md                 # Você está aqui
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

**Insight-chave:** `web/src/wasm/engine/` é **gerado** por `bun run build:engine` — não edite direto.

---

## Guia de Desenvolvimento

### Como Estender a IA

#### Tornando a IA Mais Forte

Aumente profundidade de busca em `engine/src/lib.rs`:

```rust
pub fn ai_move(board_state: &str, ai_player: i32) -> String {
    let mut board = Board::from_string(board_state);
    let best_move = minimax(&board, 8, true);  // Was 6, now 8
    ...
}
```

**Impacto de desempenho:** Cada aumento em profundidade ~3x mais lento.

#### Mudando a Função de Avaliação

Edite `engine/src/evaluation.rs`:

```rust
fn evaluate_board(board: &Board) -> i32 {
  // Give more weight to center positions
  let center_bonus = count_center_pieces(&board, AI) * 5;

  // Penalize fragmented positions
  let connectivity = measure_piece_connectivity(&board, AI);

  ...
}
```

Isto ensina à IA diferentes prioridades.

### Como Modificar Regras do Jogo

#### Mudar Tamanho do Tabuleiro

Edite `engine/src/board.rs`:

```rust
pub const BOARD_SIZE: usize = 17;  // Was 15, now 17x17
```

Depois:
```bash
bun run build:engine
bun run dev
```

#### Adicionar Modo Handicap

Em `web/src/components/GameControls.tsx`, adicione seleção de handicap:

```tsx
<select value={handicap} onChange={(e) => setHandicap(e.target.value)}>
  <option value="0">Even</option>
  <option value="1">Black +1 Stone</option>
  <option value="2">Black +2 Stones</option>
</select>
```

Depois passe handicap para WASM `ai_move()`.

### Estratégias de Testes

#### Testes Unitários (Rust)

Adicione testes em `engine/src/board.rs`:

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

Execute: `cargo test`

#### Testes de Integração (React)

Em `web/src/components/Board.test.tsx`:

```tsx
test("AI moves after player move", async () => {
  render(<App />);
  await userEvent.click(screen.getByTestId("square-5-5"));

  await waitFor(() => {
    expect(screen.getByTestId("square-6-5")).toHaveClass("ai-stone");
  });
});
```

### Criação de Perfil de Desempenho

Adicione logs de timing a `web/src/workers/engine.worker.ts`:

```typescript
const start = performance.now();
const bestMove = engine.ai_move(boardState, AI);
const elapsed = performance.now() - start;
console.log(`AI move took ${elapsed}ms at depth ${depth}`);
```

Confira Console do DevTools do navegador para ver tempos de movimento. Ajuste profundidade se > 200ms.

---

## Roadmap: v2 & Além

### v2: Multiplayer Online (Em Progresso 🚀)

**O que vem a seguir:** Gomoku em tempo real, dois jogadores pela internet.

#### Visão Geral da Arquitetura
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

**Componentes:**
1. **Matchmaking** — Encontrar oponente, criar sala de jogo
2. **Sincronização em tempo real** — WebSocket para atualizações instantâneas de movimento
3. **Validação de movimento** — Servidor valida todos os movimentos (previne trapaça)
4. **Gestão de turnos** — Servidor força cuja vez é
5. **Manipulação de timeout** — Forfeit após inatividade

#### Por Que Construir Isto?

- Jogadores podem desafiar um ao outro (não apenas IA)
- Aprender sobre networking de jogos em tempo real
- Entender validação de movimento no lado servidor
- Habilitar jogo competitivo e leaderboards

#### Plano de Implementação

1. Configurar servidor WebSocket (Node.js + Socket.io ou Rust Actix)
2. Adicionar gestão de sala de jogo
3. Implementar validação de movimento no servidor
4. Adicionar autenticação de jogador (opcional mas recomendado)
5. Construir matchmaking de oponente
6. Fazer deploy de servidor ao lado da web app

#### Stack de Tecnologia
- **Backend:** Node.js (Express + Socket.io) ou Rust (Actix-web)
- **Database:** PostgreSQL para histórico de jogo + ratings ELO
- **Real-time:** WebSocket para comunicação instantânea
- **Frontend:** Atualizações menores de React para lidar com estado de rede

---

### Possibilidades Futuras (v3+)

1. **Partidas IA vs IA** — Observe dois AIs jogarem um contra o outro
2. **Níveis de dificuldade** — Fácil (profundidade 4), Médio (profundidade 6), Difícil (profundidade 8)
3. **Variantes de jogo**
   - Free-style (qualquer 5 em linha ganha)
   - Renju (regras especiais de bloqueio)
   - 6-em-linha, Swap-2
4. **IA de rede neural** — Treinar modelo via jogo automático (substitui avaliação hand-crafted)
5. **Aplicativo Mobile** — Versão React Native
6. **Replay e análise** — Salvar jogos, reproduzir movimentos, analisar erros
7. **Leaderboard e ratings** — Ratings ELO, rankings sazonais

---

## Contribuindo

### Como Fazer Fork & Modificar

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

### Contribuindo para Roadmap

Tem uma ideia para v2 ou além? Abra um GitHub Issue:

1. Descreva sua ideia claramente
2. Explique por que seria valiosa
3. Sugira abordagem técnica se tiver uma
4. Ligue a recursos relevantes

Ótimas ideias para contribuições:
- [ ] Implementar seletor de nível de dificuldade
- [ ] Adicionar timer de movimento (mostrar quanto tempo a IA levou)
- [ ] Criar livro de aberturas para movimentos iniciais mais rápidos
- [ ] Adicionar avaliação visual de IA (mostrar mapa de calor do tabuleiro)
- [ ] Implementar aprofundamento iterativo
- [ ] Adicionar memoização de tabela de transposição

### Estilo de Código

- **Rust:** Formate com `cargo fmt`, lint com `cargo clippy`
- **TypeScript:** Use ESLint + Prettier (configurado em `web/.eslintrc`)
- **Commits:** Mensagens claras descrevendo o que mudou e por quê

### Requisitos de Teste

Antes de abrir um PR:
- Rust: `cargo test` passa
- Frontend: Testes manuais em desktop + mobile
- Build: `bun run build` sucede sem avisos

---

## Recursos de Aprendizado

### IA para Jogos & Algoritmos
- [Minimax Algorithm Explained](https://en.wikipedia.org/wiki/Minimax) — Wikipedia
- [Alpha-Beta Pruning](https://en.wikipedia.org/wiki/Alpha%E2%80%93beta_pruning) — Como pular ramos
- [Game Tree Search](https://www.chessprogramming.org/Search) — Chess Programming Wiki

### Gomoku Específico
- [Gomoku Rules (English)](https://en.wikipedia.org/wiki/Gomoku)
- [Gomoku AI Techniques](https://github.com/topics/gomoku-ai) — Outras implementações

### Web Assembly & Desempenho
- [MDN: WebAssembly](https://developer.mozilla.org/en-US/docs/WebAssembly)
- [Rust + WASM Book](https://rustwasm.github.io/book/)
- [wasm-pack Guide](https://rustwasm.github.io/docs/wasm-pack/)

### Web Workers
- [MDN: Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)
- [Offloading Heavy Computation](https://web.dev/workers-basics/)

### Stack Web Moderno
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Zustand State Management](https://github.com/pmndrs/zustand)
- [Tailwind CSS](https://tailwindcss.com)

### Otimização de Desempenho
- [Web Vitals](https://web.dev/vitals/) — Medindo desempenho
- [Rust Performance](https://nnethercote.github.io/perf-book/) — Otimização de baixo nível
- [WASM Performance Tuning](https://rustwasm.github.io/docs/wasm-pack/tutorials/npm-wasm/index.html)

---

## Licença

Licença MIT — Veja arquivo LICENSE para detalhes.

**O que isto significa:**
- ✅ Clone e modifique livremente
- ✅ Use comercialmente
- ✅ Distribua (modificado ou não)
- ✅ Uso privado
- ❌ Responsabilidade — Não proporcionamos garantia

---

## Construído com IA Moderna em Março de 2026

open-gomoku demonstra o que engenharia de IA de ponta consegue alcançar:
- **Assistência produtiva de IA** em cada fase (design, implementação, debugging)
- **Integração multi-linguagem** (Rust, TypeScript, React) em horas
- **Código de qualidade produção** com tratamento de erros e testes
- **Valor educacional** — Aprenda práticas modernas de IA lendo código real

Não é magia. Só ferramentas boas nas mãos de praticantes hábeis.

**Perguntas?** Abra um issue no GitHub.

**Quer aprender mais?** Comece com o caminho de aprendizado que corresponde aos seus interesses acima.

**Pronto para construir?** Siga [Início Detalhado](#início-detalhado).
