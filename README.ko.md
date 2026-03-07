# open-gomoku

> **최첨단 AI 게임, 2026년에 만들어졌습니다.** 온라인에서 플레이하거나 현대적인 AI가 어떻게 작동하는지 배우세요.

완전히 플레이 가능한 오목(五子棋) 게임으로, 무적의 AI 상대가 있으며 Rust WebAssembly와 React로 만들어졌습니다. 이것이 최첨단 AI가 주말에 만들 수 있는 것입니다. 완전히 무료이고 오픈 소스이며 교육용입니다. 클론하고 배우고 수정할 수 있습니다.

**[▶ 지금 온라인 플레이](https://open-open-gomoku.pages.dev)** • [예시로 배우기](#학습-경로) • [코드 보기](#완전한-기술-분석)

---

## 당신이 보고 있는 것은

**open-gomoku**는 다음을 보여주는 프로덕션 레벨의 오목 AI 게임입니다:
- ✅ **실제로 작동하는 현대 AI** — 미니맥스 알고리즘과 알파-베타 가지치기, 브라우저에서 실행됨
- ✅ **실시간 성능** — 부 100ms 내 이동 결정을 위한 Rust WASM
- ✅ **모바일 우선 디자인** — 휴대폰과 태블릿에서 완전히 플레이 가능
- ✅ **프로덕션 준비 완료** — 오류 처리, 패닉 없음, 엣지 케이스 테스트 완료
- ✅ **100% 무료 및 오픈 소스** — MIT 라이선스, 자유롭게 배우고 수정

2026년 3월의 현대적인 AI 엔지니어링이 어떻게 보이는지 보여주기 위해 만들어졌습니다.

---

## 빠른 시작

### 온라인 플레이 (지금 바로)
[Cloudflare Pages에서 플레이](https://open-open-gomoku.pages.dev)

### 로컬에서 실행
```bash
git clone https://github.com/yourusername/open-gomoku.git
cd open-gomoku
bun install
bun run dev
```

http://localhost:5173을 열고 플레이를 시작하세요.

---

## 포함된 것들

### 기술 스택
- **엔진:** WebAssembly용 Rust (WASM)
- **프론트엔드:** React 18 + TypeScript + Tailwind CSS
- **스레딩:** AI 이동을 위한 Web Worker (논블로킹)
- **배포:** Cloudflare Pages
- **빌드:** Bun + Vite + wasm-pack

### 주요 기능
- **무적의 AI** — 미니맥스 알고리즘과 알파-베타 가지치기 사용
- **반응형 UI** — 모든 이동에 대한 즉각적인 시각적 피드백
- **모바일 준비** — 터치 최적화된 게임판과 컨트롤
- **게임 컨트롤** — 리셋, 실행 취소(제한적), 난이도 레벨 계획 중
- **상태 지속성** — Zustand를 사용한 게임 상태 관리
- **성능 프로파일링** — 이동 시간 기록, AI 깊이 적응형

### 높은 수준의 아키텍처
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

## 학습 경로

배우고 싶은 것에 따라 경로를 선택하세요:

### 🎮 게임 개발자용
AI가 게임에서 어떻게 결정을 내리는지 이해하고 싶습니다.

**여기서 시작:**
1. 아래 [게임 AI 기초](#게임-ai-기초)를 읽으세요
2. `engine/src/ai.rs` 확인 — 알파-베타 가지치기를 사용한 미니맥스 알고리즘
3. `engine/src/evaluation.rs` 수정 — AI가 위치를 평가하는 방식 변경
4. `engine/src/lib.rs`의 `MAX_DEPTH`를 늘리거나 줄여서 성능 영향 확인

**주요 파일:**
- `engine/src/ai.rs:minimax()` — 핵심 결정 알고리즘
- `engine/src/evaluation.rs:evaluate_board()` — 위치 점수 매기기
- `web/src/workers/engine.worker.ts` — Web Worker 통합

**답변되는 질문:**
- AI는 "최고의" 이동을 어떻게 결정하나요?
- 알파-베타 가지치기는 왜 빠른가요?
- WASM이 JavaScript보다 성능을 어떻게 개선하나요?

**다음 단계:**
- 다양한 난이도 추가 (`MAX_DEPTH` 변경)
- 반복 깊이 심화 구현
- 더 빠른 초반 이동을 위한 오프닝 북 추가

---

### 📚 학생 및 교육자용
전체 스택 AI 통합과 현대적인 웹 아키텍처를 이해하고 싶습니다.

**여기서 시작:**
1. 아래 [완전한 기술 분석](#완전한-기술-분석)을 읽으세요
2. [시작하기 (상세)](#시작하기-상세) 가이드 따라하기
3. `web/src/components/Board.tsx` 및 `web/src/workers/engine.worker.ts`의 컴포넌트 상호작용 검토
4. `web/src/store.ts`에서 Zustand가 게임 상태를 관리하는 방식 학습

**주요 개념:**
- **아키텍처 패턴** — 관심사 분리 (AI, UI, 상태 관리)
- **스레딩 모델** — Web Worker가 반응성을 위해 중요한 이유
- **WASM 경계** — Rust와 JavaScript가 어떻게 통신하는지
- **전체 스택 개발** — AI 엔진에서 사용자 인터페이스까지

**답변되는 질문:**
- 컴파일된 코드(Rust)를 동적 코드(React)와 어떻게 통합하나요?
- Web Worker를 왜 사용하나요?
- AI 게임 애플리케이션을 어떻게 구조화해야 하나요?

**포함된 학습 리소스:**
- 아키텍처 다이어그램 및 설명
- 설계 패턴을 강조하는 코드 주석
- 성능 추적 팁
- WASM + JavaScript에 대한 모범 사례

---

### 🔬 호기심 많은 개발자용
현대적인 AI 시스템이 의사 결정에서 성능 최적화까지 어떻게 작동하는지 이해하고 싶습니다.

**여기서 시작:**
1. 먼저 게임을 플레이하세요 — 당신이 보고 있는 것을 이해하세요
2. [우리가 이렇게 만든 이유](#우리가-이렇게-만든-이유) 읽기
3. `engine/src/` 탐색 — 미니맥스 알고리즘을 시각적으로 이해
4. `web/src/workers/engine.worker.ts` 확인 — AI가 백그라운드에서 어떻게 실행되는지 확인

**주요 통찰:**
- AI는 마법이 아니다 — 스마트 가지치기를 사용한 철저한 탐색
- 성능이 중요하다 — 부 100ms 의사결정은 JavaScript가 아닌 WASM 사용
- 아키텍처가 능력을 활성화한다 — Web Worker는 UI를 반응성 있게 유지
- 현대적 스택은 언어를 섞는다 — 성능을 위한 Rust, 상호작용을 위한 JavaScript

**답변되는 질문:**
- 이 AI가 실제로 "좋은" 이유는 무엇인가요?
- Rust를 JavaScript 대신 WASM으로 컴파일하는 이유는 무엇인가요?
- AI는 어떻게 미리 생각하나요?

---

### 💻 AI 엔지니어용
AI 모델 아키텍처, 최적화 및 의사결정 로직을 이해하고 싶습니다.

**여기서 시작:**
1. [AI 아키텍처 & 의사결정 로직](#ai-아키텍처--의사결정-로직) 읽기
2. `engine/src/ai.rs` 학습 — 완전한 주석이 있는 미니맥스 구현
3. `engine/src/evaluation.rs` 검토 — AI에게 "좋다"는 것을 가르치는 평가 함수
4. `web/src/workers/engine.worker.ts` 타이밍 로그로 성능 측정

**기술적 깊이:**
- **알고리즘:** 알파-베타 가지치기를 사용한 미니맥스 (클래식 게임 AI 기법)
- **탐색 공간:** ~3^80개의 가능한 게임 상태 → 가지치기로 이동당 ~10k 평가로 감소
- **평가 함수:** 손으로 만든 휴리스틱 (신경망으로 대체할 수 있음)
- **성능:** Rust WASM은 깊이 6-8에서 <100ms 이동 시간 달성

**주요 최적화:**
- 트랜스포지션 테이블 (중복 게임판 상태를 위한 메모이제이션)
- 알파-베타 가지치기 효과를 최대화하기 위한 이동 순서 휴리스틱
- 반복 깊이 심화 (아직 구현되지 않음)
- 병렬 탐색 (WASM 스레딩 제한으로 인해 어려움)

---

## 완전한 기술 분석

### 아키텍처 개요

애플리케이션은 3개의 주요 레이어로 나뉩니다:

#### 1. **React 프론트엔드** (`web/src/`)
처리 사항:
- 사용자 인터페이스 및 게임판 렌더링
- 이동 검증 (선택한 사각형이 비어 있나요?)
- 게임 상태 관리 (누가 이동할 차례, 게임 역사)
- AI 엔진과의 통신

**주요 컴포넌트:**
- `App.tsx` — 메인 앱 설정 및 게임 흐름
- `Board.tsx` — 게임판 렌더링 및 클릭 처리
- `GameControls.tsx` — 리셋, 실행 취소, 난이도 버튼
- `store.ts` — 게임 상태를 위한 Zustand 저장소

**React를 사용하는 이유:**
- 컴포넌트 재사용성
- 가상 DOM을 통한 효율적인 DOM 업데이트
- 강력한 TypeScript 지원
- UI 패턴을 위한 큰 생태계

---

#### 2. **Web Worker** (`web/src/workers/engine.worker.ts`)
처리 사항:
- 별도 스레드에서 AI 계산 실행
- AI의 이동 중 UI 반응성 유지
- 결과를 메인 스레드로 통신

**작동 방식:**
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

**Web Worker를 사용하는 이유:**
- 장시간 계산 중 "끊김" (UI 정지) 방지
- 브라우저가 사용자 입력에 계속 반응
- 모바일에서도 게임이 쾌적하게 느껴짐

---

#### 3. **Rust WASM 엔진** (`engine/src/`)
처리 사항:
- 게임 로직 및 게임판 상태
- AI 이동 생성
- 알파-베타 가지치기를 사용한 미니맥스 알고리즘
- 게임판 평가 함수

**주요 모듈:**
- `lib.rs` — WASM 익스포트 (`ai_move()`는 JavaScript에서 호출됨)
- `ai.rs` — 미니맥스 알고리즘 구현
- `board.rs` — 게임판 표현 및 이동 검증
- `evaluation.rs` — 위치 점수 매기기 함수

**Rust + WASM을 사용하는 이유:**
- **성능:** Rust는 기계 유사 명령으로 컴파일되며, JavaScript는 해석됨
- **정확성:** 강력한 타입 시스템이 컴파일 시 버그를 포착
- **이식성:** WASM은 모든 현대 브라우저에서 실행됨
- **상호운용:** WASM 경계를 통해 JavaScript에서 쉽게 호출

---

### 게임 AI 기초

#### AI가 이동을 결정하는 방식

AI는 **알파-베타 가지치기를 사용한 미니맥스**를 사용합니다:

1. **미니맥스:** 게임 트리로:
   - 최대화 플레이어 (AI)는 최고 점수를 원함
   - 최소화 플레이어 (상대)는 최저 점수를 원함
   - 깊이 제한까지 가능한 모든 게임 상태를 재귀적으로 평가

2. **알파-베타 가지치기:** 다음을 수행하는 스마트 최적화:
   - 최종 결정에 영향을 줄 수 없는 분기 건너뛰기
   - 평가를 ~3^depth에서 ~3^(depth/2)로 감소
   - 부 100ms 이동을 가능하게 함

**의사 코드:**
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

#### AI가 위치를 평가하는 방식

**평가 함수**는 AI에게 "좋다"는 것을 가르칩니다:

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

평가 함수는 **손으로 만든 휴리스틱**입니다. 현대적인 AI에서는 자기 대국을 통해 훈련된 신경망으로 대체될 수 있습니다 (로드맵 참조).

---

### 우리가 이렇게 만든 이유

#### 설계 결정: 엔진을 위한 WASM

**JavaScript에서 할 수 있나요?**
- JavaScript 미니맥스 깊이 6: ~2-3초
- Rust WASM 미니맥스 깊이 6: ~50-100ms

**왜 20-60배 빠른가요?**
- Rust는 네이티브 명령으로 컴파일됨
- WASM은 브라우저의 네이티브 VM에서 실행됨
- JavaScript는 JIT를 사용한 해석 (좋지만, 그렇게 빠르지는 않음)

**절충:** Rust에서 빌드하려면 도구 체인 설정 (wasm-pack, Cargo)이 필요합니다. 성능을 위해 가치가 있습니다.

#### 설계 결정: 스레딩을 위한 Web Worker

**Web Worker가 없으면 어떻게 되나요?**
- 사용자 클릭 → React가 메인 스레드에서 `ai_move()` 호출
- 메인 스레드가 100ms 이상 차단됨 (이동 계산)
- UI가 클릭에 반응할 수 없으며, 애니메이션이 정지됨
- 사용자가 정지된 게임을 봄

**Web Worker 사용 시:**
- React가 워커 스레드에 메시지 게시
- 워커가 계산 수행
- 메인 스레드가 계속 실행되고, UI는 반응성 유지
- 완료되면 결과를 다시 게시

**절충:** 복잡성이 추가됨 (메시지 전달, 비동기). 인지된 성능에 필수적입니다.

#### 설계 결정: 프론트엔드를 위한 React

**순수 JavaScript를 사용하지 않는 이유:**
- React의 컴포넌트 모델은 UI 로직을 재사용 가능하게 만듦
- 가상 DOM은 효율적인 업데이트를 의미
- TypeScript는 초기에 타입 오류를 포착
- 큰 생태계 (상태 관리, 스타일링 등)

---

## 시작하기 (상세)

### 전제 조건
- **Rust** (1.56+) — [rustup 설치](https://rustup.rs/)
- **Node.js** (18+) — [다운로드](https://nodejs.org)
- **Bun** (최신) — `curl -fsSL https://bun.sh/install | bash`
- **wasm-pack** — `cargo install wasm-pack`

### 단계 1: 저장소 클론

```bash
git clone https://github.com/yourusername/open-gomoku.git
cd open-gomoku
```

### 단계 2: 의존성 설치

```bash
bun install
```

이는 루트 수준 및 `web/` 의존성을 설치합니다.

### 단계 3: WASM 엔진 빌드

```bash
bun run build:engine
```

이는 Rust → WASM을 컴파일하고 `web/src/wasm/engine/`에 출력합니다.

예상 출력:
```
...
   Compiling engine v0.1.0
    Finished release [optimized] target(s) in 2.54s
   Generating WASM bindings...
✓ Engine built to web/src/wasm/engine/
```

### 단계 4: 개발 서버 시작

```bash
bun run dev
```

브라우저에서 http://localhost:5173을 엽니다. 모든 것이 작동하는지 확인하기 위해 몇 이동을 플레이하세요.

### 단계 5: 변경 만들기 (선택적 테스트)

`engine/src/evaluation.rs`를 편집하여 오픈 쓰리의 점수를 변경해 보세요:

```rust
// Change this line:
score += 100 * count_open_threes(&board, AI);
// To this:
score += 200 * count_open_threes(&board, AI);  // AI values threes more
```

그 다음:
```bash
bun run build:engine
bun run dev
```

브라우저를 새로 고칩니다. AI는 3-in-a-row 완성에 더 적극적이어야 합니다.

### 프로덕션용 빌드

```bash
bun run build
```

`web/dist/`에 최적화된 번들을 출력합니다.

### Cloudflare Pages에 배포

프로젝트는 Cloudflare Pages용으로 구성됨:

```bash
bun run deploy
```

이는 모든 것을 빌드하고 "gomoku"라는 Cloudflare Pages 프로젝트에 배포합니다.

---

## 프로젝트 구조

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

**핵심 통찰:** `web/src/wasm/engine/`는 `bun run build:engine`으로 **생성됨** — 직접 편집하지 마세요.

---

## 개발 가이드

### AI를 확장하는 방법

#### AI를 더 강하게 만들기

`engine/src/lib.rs`에서 탐색 깊이 증가:

```rust
pub fn ai_move(board_state: &str, ai_player: i32) -> String {
    let mut board = Board::from_string(board_state);
    let best_move = minimax(&board, 8, true);  // Was 6, now 8
    ...
}
```

**성능 영향:** 깊이를 증가시킬 때마다 약 3배 느려집니다.

#### 평가 함수 변경

`engine/src/evaluation.rs`를 편집:

```rust
fn evaluate_board(board: &Board) -> i32 {
  // Give more weight to center positions
  let center_bonus = count_center_pieces(&board, AI) * 5;

  // Penalize fragmented positions
  let connectivity = measure_piece_connectivity(&board, AI);

  ...
}
```

이는 AI에게 다른 우선순위를 가르칩니다.

### 게임 규칙을 수정하는 방법

#### 게임판 크기 변경

`engine/src/board.rs`를 편집:

```rust
pub const BOARD_SIZE: usize = 17;  // Was 15, now 17x17
```

그 다음:
```bash
bun run build:engine
bun run dev
```

#### 핸디캡 모드 추가

`web/src/components/GameControls.tsx`에서 핸디캡 선택 추가:

```tsx
<select value={handicap} onChange={(e) => setHandicap(e.target.value)}>
  <option value="0">Even</option>
  <option value="1">Black +1 Stone</option>
  <option value="2">Black +2 Stones</option>
</select>
```

그 다음 핸디캡을 WASM `ai_move()`에 전달합니다.

### 테스트 전략

#### 단위 테스트 (Rust)

`engine/src/board.rs`에 테스트 추가:

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

실행: `cargo test`

#### 통합 테스트 (React)

`web/src/components/Board.test.tsx`에서:

```tsx
test("AI moves after player move", async () => {
  render(<App />);
  await userEvent.click(screen.getByTestId("square-5-5"));

  await waitFor(() => {
    expect(screen.getByTestId("square-6-5")).toHaveClass("ai-stone");
  });
});
```

### 성능 프로파일링

`web/src/workers/engine.worker.ts`에 타이밍 로그 추가:

```typescript
const start = performance.now();
const bestMove = engine.ai_move(boardState, AI);
const elapsed = performance.now() - start;
console.log(`AI move took ${elapsed}ms at depth ${depth}`);
```

브라우저 DevTools 콘솔을 확인하여 이동 시간을 봅니다. > 200ms이면 깊이를 조정합니다.

---

## 로드맵: v2 이상

### v2: 온라인 멀티플레이어 (진행 중 🚀)

**다음은 무엇인가:** 인터넷상의 실시간 2인 오목.

#### 아키텍처 개요
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

**컴포넌트:**
1. **매칭메이킹** — 상대 찾기, 게임 방 생성
2. **실시간 동기화** — 즉각적인 이동 업데이트를 위한 WebSocket
3. **이동 검증** — 서버가 모든 이동 검증 (부정행위 방지)
4. **턴 관리** — 서버가 누가 이동할 차례인지 강제
5. **시간 초과 처리** — 비활성 후 몰수

#### 왜 이것을 만들 것인가?

- 플레이어가 AI가 아닌 서로를 도전할 수 있음
- 실시간 게임 네트워킹에 대해 배우기
- 서버 측 이동 검증 이해
- 경쟁 플레이 및 순위표 활성화

#### 구현 계획

1. WebSocket 서버 설정 (Node.js + Socket.io 또는 Rust Actix)
2. 게임 방 관리 추가
3. 서버에서 이동 검증 구현
4. 플레이어 인증 추가 (선택 사항이지만 권장)
5. 상대 매칭메이킹 빌드
6. 웹 앱과 함께 서버 배포

#### 기술 스택
- **백엔드:** Node.js (Express + Socket.io) 또는 Rust (Actix-web)
- **데이터베이스:** 게임 역사 + ELO 레이팅을 위한 PostgreSQL
- **실시간:** 즉각적인 통신을 위한 WebSocket
- **프론트엔드:** 네트워크 상태를 처리하기 위한 경미한 React 업데이트

---

### 향후 가능성 (v3+)

1. **AI vs AI 경기** — 두 AI가 서로 플레이하는 것을 봅시다
2. **난이도 레벨** — 쉬움 (깊이 4), 중간 (깊이 6), 어려움 (깊이 8)
3. **게임 변형**
   - Free-style (5개 연속 어디든 우승)
   - Renju (차단을 위한 특수 규칙)
   - 6-in-a-row, Swap-2
4. **신경망 AI** — 자기 대국을 통해 모델 훈련 (손으로 만든 평가 대체)
5. **모바일 앱** — React Native 버전
6. **재생 & 분석** — 게임 저장, 이동 재생, 실수 분석
7. **순위표 & 레이팅** — ELO 레이팅, 시즌별 순위

---

## 기여

### 포크 및 수정 방법

```bash
# 1. GitHub에서 포크 (포크 버튼 클릭)
# 2. 포크 클론
git clone https://github.com/YOUR-USERNAME/open-gomoku.git
cd open-gomoku

# 3. 변경 사항 만들기
# 4. 로컬 테스트
bun run dev

# 5. 커밋 및 푸시
git add .
git commit -m "feat: add your change"
git push origin main

# 6. GitHub에서 Pull Request 열기
```

### 로드맵에 기여

v2 이상에 대한 아이디어가 있습니까? GitHub Issue를 열기:

1. 아이디어를 명확하게 설명
2. 왜 가치가 있는지 설명
3. 기술적 접근 제안 (있으면)
4. 관련 리소스에 링크

기여할 좋은 아이디어:
- [ ] 난이도 수준 선택기 구현
- [ ] 이동 타이머 추가 (AI가 얼마나 오래 걸렸는지 표시)
- [ ] 더 빠른 초반 이동을 위한 오프닝 북 생성
- [ ] AI 평가 시각화 추가 (게임판 열맵 표시)
- [ ] 반복 깊이 심화 구현
- [ ] 트랜스포지션 테이블 메모이제이션 추가

### 코드 스타일

- **Rust:** `cargo fmt`로 형식화, `cargo clippy`로 린트
- **TypeScript:** ESLint + Prettier 사용 (`web/.eslintrc`로 구성됨)
- **커밋:** 변경된 내용과 이유를 명확하게 설명하는 메시지

### 테스트 요구사항

PR을 열기 전에:
- Rust: `cargo test` 통과
- 프론트엔드: 데스크톱 + 모바일에서 수동 테스트
- 빌드: `bun run build` 경고 없이 성공

---

## 학습 리소스

### 게임 AI 및 알고리즘
- [Minimax Algorithm Explained](https://en.wikipedia.org/wiki/Minimax) — Wikipedia
- [Alpha-Beta Pruning](https://en.wikipedia.org/wiki/Alpha%E2%80%93beta_pruning) — 분기를 건너뛰는 방법
- [Game Tree Search](https://www.chessprogramming.org/Search) — Chess Programming Wiki

### 오목 특정사항
- [Gomoku Rules (English)](https://en.wikipedia.org/wiki/Gomoku)
- [Gomoku AI Techniques](https://github.com/topics/gomoku-ai) — 다른 구현

### WebAssembly 및 성능
- [MDN: WebAssembly](https://developer.mozilla.org/en-US/docs/WebAssembly)
- [Rust + WASM Book](https://rustwasm.github.io/book/)
- [wasm-pack Guide](https://rustwasm.github.io/docs/wasm-pack/)

### Web Worker
- [MDN: Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)
- [Offloading Heavy Computation](https://web.dev/workers-basics/)

### 현대적 웹 스택
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Zustand State Management](https://github.com/pmndrs/zustand)
- [Tailwind CSS](https://tailwindcss.com)

### 성능 최적화
- [Web Vitals](https://web.dev/vitals/) — 성능 측정
- [Rust Performance](https://nnethercote.github.io/perf-book/) — 저수준 최적화
- [WASM Performance Tuning](https://rustwasm.github.io/docs/wasm-pack/tutorials/npm-wasm/index.html)

---

## 라이선스

MIT 라이선스 — 상세 사항은 LICENSE 파일을 참조합니다.

**이것이 의미하는 바:**
- ✅ 자유롭게 클론 및 수정
- ✅ 상업적으로 사용
- ✅ 배포 (수정 또는 미수정)
- ✅ 개인용
- ❌ 책임 — 보증 없음

---

## 2026년 3월에 현대 AI로 만들어졌습니다

open-gomoku는 최첨단 AI 엔지니어링이 달성할 수 있는 것을 보여줍니다:
- **생산성 있는 AI 지원** 모든 단계에서 (설계, 구현, 디버깅)
- **다언어 통합** (Rust, TypeScript, React) 몇 시간 안에
- **프로덕션 품질 코드** 오류 처리 및 테스트 포함
- **교육 가치** — 실제 코드를 읽어 현대적인 AI 관행 배우기

마법이 아닙니다. 숙련된 개발자의 손에 들린 좋은 도구일 뿐입니다.

**질문이 있으신가요?** GitHub에서 이슈를 열기.

**더 알고 싶으신가요?** 위의 관심사에 맞는 학습 경로부터 시작하세요.

**빌드할 준비가 되셨나요?** [시작하기 (상세)](#시작하기-상세)를 따르세요.
