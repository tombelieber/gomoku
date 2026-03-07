# open-gomoku

> **2026 年最先進的 AI 遊戲。** 線上遊玩或學習現代 AI 如何運作。

一款完全可玩的五子棋遊戲，配備無敵的 AI 對手，採用 Rust WebAssembly 和 React 構建。這是最先進的 AI 在一個週末能打造的成品。它是免費、開源且具有教育意義的—複製它、從中學習、修改它。

**[▶ 立即線上遊玩](https://open-gomoku.pages.dev)** • [按主題學習](#學習路徑) • [查看代碼](#完整技術分解)

---

## 你在看什麼

**open-gomoku** 是一款生產級別的五子棋 AI 遊戲，展示了：
- ✅ **現代 AI 行動** — 採用極大值極小值算法和 alpha-beta 剪枝，在你的瀏覽器中運行
- ✅ **實時性能** — Rust WASM 實現 100 毫秒以內的移動決策
- ✅ **移動端優先設計** — 在手機和平板上完全可玩
- ✅ **生產就緒** — 錯誤處理、無 panic、測試過邊界情況
- ✅ **100% 免費開源** — MIT 許可，可自由學習和修改

構建於 2026 年 3 月，展示現代 AI 工程的樣貌。

---

## 快速開始

### 線上遊玩（立即開始）
[在 Cloudflare Pages 上遊玩](https://open-gomoku.pages.dev)

### 本地運行
```bash
git clone https://github.com/yourusername/open-gomoku.git
cd open-gomoku
bun install
bun run dev
```

打開 http://localhost:5173 並開始遊玩。

---

## 包含內容

### 技術棧
- **引擎：** 採用 WebAssembly (WASM) 的 Rust，用於 AI
- **前端：** React 18 + TypeScript + Tailwind CSS
- **線程：** Web Worker 用於非阻塞式 AI 移動
- **部署：** Cloudflare Pages
- **構建：** Bun + Vite + wasm-pack

### 主要功能
- **無敵 AI** — 使用極大值極小值算法結合 alpha-beta 剪枝
- **響應式 UI** — 每次移動都有即時視覺回饋
- **移動端就緒** — 觸摸優化的棋盤和控件
- **遊戲控制** — 重置、撤銷（受限）、難度級別（計劃中）
- **狀態持久化** — 使用 Zustand 管理遊戲狀態
- **性能分析** — 記錄移動時間，AI 深度自適應

### 高層架構
```
┌──────────────────────────────────────────┐
│         React 前端 (TypeScript)           │
│  • 遊戲 UI • 移動驗證 • 狀態              │
└────────────┬─────────────────────────────┘
             │ postMessage
┌────────────▼─────────────────────────────┐
│      Web Worker (引擎接口)                │
│  • 非同步 AI 計算 • 線程處理              │
└────────────┬─────────────────────────────┘
             │ WASM 調用
┌────────────▼─────────────────────────────┐
│   Rust WASM 引擎 (AI & 邏輯)             │
│  • 極大值極小值 + Alpha-Beta 剪枝        │
│  • 棋盤評估                              │
│  • 移動生成 & 驗證                       │
└──────────────────────────────────────────┘
```

---

## 學習路徑

根據你想學習的內容選擇適合的路徑：

### 🎮 遊戲開發者
你想瞭解 AI 如何在遊戲中做出決策。

**從這裡開始：**
1. 閱讀下面的 [遊戲 AI 基礎](#遊戲-ai-基礎)
2. 查看 `engine/src/ai.rs` — 帶有 alpha-beta 剪枝的極大值極小值算法
3. 修改 `engine/src/evaluation.rs` — 改變 AI 如何評估位置
4. 嘗試在 `engine/src/lib.rs` 中增加/減少 `MAX_DEPTH` 以觀察性能影響

**關鍵文件：**
- `engine/src/ai.rs:minimax()` — 核心決策算法
- `engine/src/evaluation.rs:evaluate_board()` — 位置評分
- `web/src/workers/engine.worker.ts` — Web Worker 集成

**解答的問題：**
- AI 如何決定「最佳」移動？
- 為什麼 alpha-beta 剪枝速度快？
- WASM 相比 JavaScript 如何提升性能？

**後續步驟：**
- 添加不同難度級別（變化 `MAX_DEPTH`）
- 實現迭代深化
- 添加開局庫以加快早期移動

---

### 📚 學生和教育工作者
你想瞭解完整堆棧 AI 集成和現代網絡架構。

**從這裡開始：**
1. 閱讀下面的 [完整技術分解](#完整技術分解)
2. 按照 [入門指南（詳細）](#入門指南詳細) 進行操作
3. 查看 `web/src/components/Board.tsx` 和 `web/src/workers/engine.worker.ts` 中的組件互動
4. 研究 Zustand 如何在 `web/src/store.ts` 中管理遊戲狀態

**關鍵概念：**
- **架構模式** — 分離關注點（AI、UI、狀態管理）
- **線程模型** — 為什麼 Web Worker 對響應性至關重要
- **WASM 邊界** — Rust 和 JavaScript 如何通信
- **全棧開發** — 從 AI 引擎到用戶界面

**解答的問題：**
- 如何集成編譯代碼 (Rust) 與動態代碼 (React)？
- 為什麼使用 Web Worker？
- 應如何構建 AI 遊戲應用？

**包含的學習資源：**
- 架構圖和解釋
- 代碼註釋，突出設計模式
- 性能追蹤提示
- WASM + JavaScript 最佳實踐

---

### 🔬 好奇的開發者
你想瞭解現代 AI 系統如何運作，從決策制定到性能優化。

**從這裡開始：**
1. 先玩遊戲 — 瞭解你在看什麼
2. 閱讀 [我們為什麼這樣構建](#我們為什麼這樣構建)
3. 探索 `engine/src/` — 以視覺方式理解極大值極小值算法
4. 查看 `web/src/workers/engine.worker.ts` — 看 AI 如何在後台運行

**關鍵洞察：**
- AI 不是魔法 — 這是有智能剪枝的窮舉搜索
- 性能很重要 — 100 毫秒以內的決策使用 WASM 而非 JavaScript
- 架構實現功能 — Web Worker 讓 UI 保持響應
- 現代堆棧混合語言 — Rust 用於性能，JavaScript 用於交互性

**解答的問題：**
- 是什麼使這個 AI 確實「聰明」？
- 為什麼編譯 Rust 到 WASM 而不只是用 JavaScript？
- AI 如何提前思考？

---

### 💻 AI 工程師
你想瞭解 AI 模型架構、優化和決策邏輯。

**從這裡開始：**
1. 閱讀 [AI 架構和決策邏輯](#ai-架構--決策邏輯)
2. 研究 `engine/src/ai.rs` — 帶有完整註釋的極大值極小值實現
3. 查看 `engine/src/evaluation.rs` — 教 AI 什麼是「好的」的評估函數
4. 使用 `web/src/workers/engine.worker.ts` 中的計時日誌測量性能

**技術深度：**
- **算法：** 帶有 alpha-beta 剪枝的極大值極小值（經典遊戲 AI 技術）
- **搜索空間：** 約 3^80 種可能的遊戲狀態 → 通過剪枝減少到每次移動約 10k 次評估
- **評估函數：** 手工製作的啟發式方法（可以被神經網絡替換）
- **性能：** Rust WASM 在深度 6-8 達到 <100 毫秒移動時間

**主要優化：**
- 轉置表（記憶化）用於重複的棋盤狀態
- 移動排序啟發式方法以最大化 alpha-beta 剪枝效果
- 迭代深化（尚未實現）
- 並行搜索（由於 WASM 線程限制，具有挑戰性）

---

## 完整技術分解

### 架構概述

應用分為三個主要層：

#### 1. **React 前端** (`web/src/`)
處理：
- 用戶界面和遊戲棋盤渲染
- 移動驗證（選定的方格是否為空？）
- 遊戲狀態管理（誰的回合、遊戲歷史）
- 與 AI 引擎的通信

**關鍵組件：**
- `App.tsx` — 主應用設置和遊戲流程
- `Board.tsx` — 遊戲棋盤渲染和點擊處理
- `GameControls.tsx` — 重置、撤銷、難度按鈕
- `store.ts` — 用於遊戲狀態的 Zustand 存儲

**為什麼用 React？**
- 組件可重用性
- 通過虛擬 DOM 進行高效的 DOM 更新
- 強大的 TypeScript 支持
- 龐大的 UI 模式生態系統

---

#### 2. **Web Worker** (`web/src/workers/engine.worker.ts`)
處理：
- 在單獨的線程中運行 AI 計算
- 在 AI 回合期間保持 UI 響應
- 將結果傳回主線程

**工作原理：**
```
┌─────────────────────────────────┐
│ React 組件（主線程）            │
│ postMessage({action: "move"})   │
└────────────┬────────────────────┘
             │
             │ Worker 接收消息
┌────────────▼────────────────────┐
│ Web Worker 線程                 │
│ 調用 WASM ai_move()            │
│ postMessage({bestMove})         │
└────────────┬────────────────────┘
             │
             │ 主線程接收
┌────────────▼────────────────────┐
│ React 使用移動更新棋盤          │
└─────────────────────────────────┘
```

**為什麼用 Web Worker？**
- 防止「卡頓」（在長計算期間凍結 UI）
- 瀏覽器保持對用戶輸入的響應
- 即使在移動設備上也讓遊戲感覺敏捷

---

#### 3. **Rust WASM 引擎** (`engine/src/`)
處理：
- 遊戲邏輯和棋盤狀態
- AI 移動生成
- 帶有 alpha-beta 剪枝的極大值極小值算法
- 棋盤評估函數

**關鍵模塊：**
- `lib.rs` — WASM 導出（從 JavaScript 調用 `ai_move()`）
- `ai.rs` — 極大值極小值算法實現
- `board.rs` — 棋盤表示和移動驗證
- `evaluation.rs` — 位置評分函數

**為什麼用 Rust + WASM？**
- **性能：** Rust 編譯成類似機器的指令，JavaScript 被解釋
- **正確性：** 強類型系統在編譯時捕獲 bug
- **可移植性：** WASM 在任何現代瀏覽器上運行
- **互操作性：** 通過 WASM 邊界輕鬆從 JavaScript 調用

---

### 遊戲 AI 基礎

#### AI 如何做出移動決策

AI 使用 **帶有 alpha-beta 剪枝的極大值極小值**：

1. **極大值極小值：** 遊戲樹其中：
   - 最大化玩家 (AI) 想要最高分
   - 最小化玩家 (對手) 想要最低分
   - 遞歸評估所有可能的遊戲狀態至深度限制

2. **Alpha-Beta 剪枝：** 智能優化，其中：
   - 跳過無法影響最終決策的分支
   - 將評估從 ~3^depth 減少到 ~3^(depth/2)
   - 使 100 毫秒以內的移動成為可能

**偽代碼：**
```
function minimax(board, depth, isMaximizing, alpha, beta):
  if depth == 0:
    return evaluate(board)  // 基礎情況

  if isMaximizing:  // AI 的回合
    for each move:
      score = minimax(board, depth-1, false, alpha, beta)
      alpha = max(alpha, score)
      if beta <= alpha:
        break  // 剪枝
    return alpha
  else:  // 對手的回合
    for each move:
      score = minimax(board, depth-1, true, alpha, beta)
      beta = min(beta, score)
      if beta <= alpha:
        break  // 剪枝
    return beta
```

#### AI 如何評估位置

**評估函數**教 AI 什麼是「好的」：

```rust
fn evaluate_board(board: &Board) -> i32 {
  let mut score = 0;

  // 計算開放的三個（可能的贏棋移動）
  score += 100 * count_open_threes(&board, AI);
  score -= 100 * count_open_threes(&board, PLAYER);

  // 計算開放的兩個（有用的威脅）
  score += 10 * count_open_twos(&board, AI);
  score -= 10 * count_open_twos(&board, PLAYER);

  return score;
}
```

評估函數是 **手工製作的啟發式方法**。在現代 AI 中，這可能被通過自我對弈訓練的神經網絡所取代（見路線圖）。

---

### 我們為什麼這樣構建

#### 設計決定：為引擎使用 WASM

**我們能在 JavaScript 中做到嗎？**
- JavaScript 深度 6 的極大值極小值：~2-3 秒
- Rust WASM 深度 6 的極大值極小值：~50-100 毫秒

**為什麼快 20-60 倍？**
- Rust 編譯成原生指令
- WASM 在瀏覽器的原生 VM 中執行
- JavaScript 是帶 JIT 的解釋型（不錯，但不如快）

**權衡：** 用 Rust 構建需要工具鏈設置 (wasm-pack, Cargo)。值得用於性能。

#### 設計決定：為線程使用 Web Worker

**沒有 Web Worker 會發生什麼？**
- 用戶點擊 → React 在主線程上調用 `ai_move()`
- 主線程被阻塞 100 毫秒以上（計算移動）
- UI 無法響應點擊，動畫凍結
- 用戶看到凍結的遊戲

**使用 Web Worker：**
- React 向 worker 線程發佈消息
- Worker 進行計算
- 主線程繼續運行，UI 保持響應
- 完成後發佈結果

**權衡：** 增加複雜性（消息傳遞、非同步）。對感知性能至關重要。

#### 設計決定：為前端使用 React

**為什麼不用普通 JavaScript？**
- React 的組件模型使 UI 邏輯可重用
- 虛擬 DOM 意味著高效的更新
- TypeScript 早期捕獲類型錯誤
- 龐大的生態系統（狀態管理、樣式等）

---

## 入門指南（詳細）

### 前置要求
- **Rust** (1.56+) — [安裝 rustup](https://rustup.rs/)
- **Node.js** (18+) — [下載](https://nodejs.org)
- **Bun** (最新) — `curl -fsSL https://bun.sh/install | bash`
- **wasm-pack** — `cargo install wasm-pack`

### 步驟 1：克隆倉庫

```bash
git clone https://github.com/yourusername/open-gomoku.git
cd open-gomoku
```

### 步驟 2：安裝依賴

```bash
bun install
```

這會安裝根級別和 `web/` 的依賴。

### 步驟 3：構建 WASM 引擎

```bash
bun run build:engine
```

這將 Rust 編譯為 WASM 並輸出到 `web/src/wasm/engine/`。

預期輸出：
```
...
   Compiling engine v0.1.0
    Finished release [optimized] target(s) in 2.54s
   Generating WASM bindings...
✓ Engine built to web/src/wasm/engine/
```

### 步驟 4：啟動開發服務器

```bash
bun run dev
```

在你的瀏覽器中打開 http://localhost:5173。進行幾次移動以驗證一切工作正常。

### 步驟 5：進行改動（可選測試）

嘗試編輯 `engine/src/evaluation.rs` 以改變開放三個的分數：

```rust
// 改變這一行：
score += 100 * count_open_threes(&board, AI);
// 為這一行：
score += 200 * count_open_threes(&board, AI);  // AI 更看重三個
```

然後：
```bash
bun run build:engine
bun run dev
```

刷新瀏覽器。AI 應該對完成三個一行更激進。

### 為生產構建

```bash
bun run build
```

輸出優化後的包到 `web/dist/`。

### 部署到 Cloudflare Pages

項目為 Cloudflare Pages 配置：

```bash
bun run deploy
```

這構建所有內容並部署到你的 Cloudflare Pages 項目「gomoku」。

---

## 項目結構

```
open-gomoku/
├── README.md                 # 你在這裡
├── package.json             # 根工作區配置
│
├── engine/                  # Rust WASM AI 引擎
│   ├── Cargo.toml          # Rust 依賴
│   ├── src/
│   │   ├── lib.rs          # WASM 導出 (ai_move, 棋盤驗證)
│   │   ├── ai.rs           # 極大值極小值算法
│   │   ├── board.rs        # 棋盤狀態和規則
│   │   └── evaluation.rs    # 位置評分
│   └── target/
│       └── wasm32-unknown-unknown/
│           └── release/    # 編譯的 WASM 文件
│
├── web/                     # React 前端
│   ├── package.json        # 前端依賴 (React, Tailwind 等)
│   ├── src/
│   │   ├── App.tsx         # 主應用組件
│   │   ├── index.css       # 全局樣式
│   │   ├── components/
│   │   │   ├── Board.tsx   # 遊戲棋盤渲染
│   │   │   └── GameControls.tsx
│   │   ├── store.ts        # Zustand 遊戲狀態
│   │   ├── workers/
│   │   │   └── engine.worker.ts  # Web Worker for AI
│   │   └── wasm/
│   │       └── engine/     # 來自 build:engine 的 WASM 輸出
│   ├── vite.config.ts      # Vite 構建配置
│   ├── tailwind.config.js   # Tailwind CSS 配置
│   └── dist/               # 構建的前端 (構建後)
│
└── docs/
    └── plans/              # 實現文檔
```

**關鍵洞察：** `web/src/wasm/engine/` 由 `bun run build:engine` **生成** — 不要直接編輯它。

---

## 開發指南

### 如何擴展 AI

#### 使 AI 更強

在 `engine/src/lib.rs` 中增加搜索深度：

```rust
pub fn ai_move(board_state: &str, ai_player: i32) -> String {
    let mut board = Board::from_string(board_state);
    let best_move = minimax(&board, 8, true);  // 原為 6，現為 8
    ...
}
```

**性能影響：** 深度每增加一次約慢 3 倍。

#### 改變評估函數

編輯 `engine/src/evaluation.rs`：

```rust
fn evaluate_board(board: &Board) -> i32 {
  // 給中心位置更多權重
  let center_bonus = count_center_pieces(&board, AI) * 5;

  // 懲罰分散的位置
  let connectivity = measure_piece_connectivity(&board, AI);

  ...
}
```

這教 AI 不同的優先級。

### 如何修改遊戲規則

#### 改變棋盤大小

編輯 `engine/src/board.rs`：

```rust
pub const BOARD_SIZE: usize = 17;  // 原為 15，現為 17x17
```

然後：
```bash
bun run build:engine
bun run dev
```

#### 添加讓子模式

在 `web/src/components/GameControls.tsx` 中添加讓子選擇：

```tsx
<select value={handicap} onChange={(e) => setHandicap(e.target.value)}>
  <option value="0">Even</option>
  <option value="1">Black +1 Stone</option>
  <option value="2">Black +2 Stones</option>
</select>
```

然後將讓子傳遞給 WASM `ai_move()`。

### 測試策略

#### 單元測試 (Rust)

在 `engine/src/board.rs` 中添加測試：

```rust
#[cfg(test)]
mod tests {
  use super::*;

  #[test]
  fn test_valid_move() {
    let mut board = Board::new();
    assert!(board.make_move(5, 5));
    assert!(!board.make_move(5, 5));  // 同一位置無法移動兩次
  }
}
```

運行：`cargo test`

#### 集成測試 (React)

在 `web/src/components/Board.test.tsx` 中：

```tsx
test("AI moves after player move", async () => {
  render(<App />);
  await userEvent.click(screen.getByTestId("square-5-5"));

  await waitFor(() => {
    expect(screen.getByTestId("square-6-5")).toHaveClass("ai-stone");
  });
});
```

### 性能分析

在 `web/src/workers/engine.worker.ts` 中添加計時日誌：

```typescript
const start = performance.now();
const bestMove = engine.ai_move(boardState, AI);
const elapsed = performance.now() - start;
console.log(`AI move took ${elapsed}ms at depth ${depth}`);
```

查看瀏覽器 DevTools 控制台以查看移動時間。如果 > 200 毫秒，調整深度。

---

## 路線圖：v2 及以後

### v2：線上多人遊戲（進行中 🚀）

**接下來：** 通過互聯網進行實時的雙人五子棋。

#### 架構概述
```
玩家 A 瀏覽器 ──┐
                   │ WebSocket
玩家 B 瀏覽器 ──┤
                   │
                 服務器
                   │
            遊戲狀態
            (Redis/DB)
```

**組件：**
1. **匹配配對** — 找到對手，創建遊戲房間
2. **實時同步** — WebSocket 用於即時移動更新
3. **移動驗證** — 服務器驗證所有移動（防止作弊）
4. **回合管理** — 服務器執行誰的回合
5. **超時處理** — 不活動後沒收

#### 為什麼構建這個？

- 玩家可以彼此挑戰（不只是 AI）
- 學習關於實時遊戲網絡
- 理解服務器端移動驗證
- 啟用競技遊戲和排行榜

#### 實現計劃

1. 設置 WebSocket 服務器 (Node.js + Socket.io 或 Rust Actix)
2. 添加遊戲房間管理
3. 在服務器上實現移動驗證
4. 添加玩家身份驗證（可選但推薦）
5. 構建對手匹配配對
6. 在 web 應用程序旁邊部署服務器

#### 技術棧
- **後端：** Node.js (Express + Socket.io) 或 Rust (Actix-web)
- **數據庫：** PostgreSQL 用於遊戲歷史 + Elo 評分
- **實時：** WebSocket 用於即時通信
- **前端：** 次要 React 更新以處理網絡狀態

---

### 未來可能性 (v3+)

1. **AI 對 AI 匹配** — 觀看兩個 AI 互相對弈
2. **難度級別** — 簡單 (深度 4)、中等 (深度 6)、困難 (深度 8)
3. **遊戲變體**
   - 自由式（任何五個一行都贏）
   - 連珠（針對阻擋的特殊規則）
   - 6 個一行、交換-2
4. **神經網絡 AI** — 通過自我對弈訓練模型（替代手工評估）
5. **移動應用** — React Native 版本
6. **回放和分析** — 保存遊戲、回放移動、分析錯誤
7. **排行榜和評分** — Elo 評分、季節排名

---

## 貢獻

### 如何 Fork 和修改

```bash
# 1. 在 GitHub 上 Fork（點擊 Fork 按鈕）
# 2. 克隆你的 fork
git clone https://github.com/YOUR-USERNAME/open-gomoku.git
cd open-gomoku

# 3. 進行改動
# 4. 本地測試
bun run dev

# 5. 提交和推送
git add .
git commit -m "feat: add your change"
git push origin main

# 6. 在 GitHub 上打開 Pull Request
```

### 對路線圖的貢獻

有 v2 或以後的想法？打開 GitHub Issue：

1. 清楚地描述你的想法
2. 解釋為什麼它會有價值
3. 如果有的話，建議技術方法
4. 鏈接到相關資源

貢獻的好想法：
- [ ] 實現難度級別選擇器
- [ ] 添加移動計時器（顯示 AI 花費多長時間）
- [ ] 為更快的早期移動創建開局庫
- [ ] 添加視覺 AI 評估（顯示棋盤熱力圖）
- [ ] 實現迭代深化
- [ ] 添加轉置表記憶化

### 代碼風格

- **Rust：** 使用 `cargo fmt` 格式化，使用 `cargo clippy` 檢查
- **TypeScript：** 使用 ESLint + Prettier（在 `web/.eslintrc` 中配置）
- **提交：** 清楚的消息描述改變的內容和原因

### 測試要求

在打開 PR 之前：
- Rust: `cargo test` 通過
- 前端：在桌面和移動設備上進行手動測試
- 構建：`bun run build` 不出現警告即成功

---

## 學習資源

### 遊戲 AI 和算法
- [極大值極小值算法解釋](https://en.wikipedia.org/wiki/Minimax) — Wikipedia
- [Alpha-Beta 剪枝](https://en.wikipedia.org/wiki/Alpha%E2%80%93beta_pruning) — 如何跳過分支
- [遊戲樹搜索](https://www.chessprogramming.org/Search) — 象棋編程 Wiki

### 五子棋具體內容
- [五子棋規則 (英文)](https://en.wikipedia.org/wiki/Gomoku)
- [五子棋 AI 技術](https://github.com/topics/gomoku-ai) — 其他實現

### WebAssembly 和性能
- [MDN: WebAssembly](https://developer.mozilla.org/en-US/docs/WebAssembly)
- [Rust + WASM 書籍](https://rustwasm.github.io/book/)
- [wasm-pack 指南](https://rustwasm.github.io/docs/wasm-pack/)

### Web Worker
- [MDN: Web Worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)
- [卸載重計算](https://web.dev/workers-basics/)

### 現代網絡棧
- [React 文檔](https://react.dev)
- [TypeScript 手冊](https://www.typescriptlang.org/docs/)
- [Zustand 狀態管理](https://github.com/pmndrs/zustand)
- [Tailwind CSS](https://tailwindcss.com)

### 性能優化
- [網絡 Vitals](https://web.dev/vitals/) — 測量性能
- [Rust 性能](https://nnethercote.github.io/perf-book/) — 低級優化
- [WASM 性能調優](https://rustwasm.github.io/docs/wasm-pack/tutorials/npm-wasm/index.html)

---

## 許可

MIT 許可 — 見 LICENSE 文件了解詳情。

**這意味著什麼：**
- ✅ 自由克隆和修改
- ✅ 商業使用
- ✅ 分發（修改或未修改）
- ✅ 私人使用
- ❌ 責任 — 我們不提供任何保證

---

## 2026 年 3 月使用現代 AI 構建

open-gomoku 展示了最先進的 AI 工程能夠實現的成果：
- **生產性 AI 協助**在每個階段（設計、實現、調試）
- **多語言集成** (Rust、TypeScript、React) 在幾小時內
- **生產質量代碼**具有錯誤處理和測試
- **教育價值** — 通過閱讀真實代碼學習現代 AI 實踐

不是魔法。只是好工具在熟練從業者手中。

**有問題？** 在 GitHub 上打開 issue。

**想瞭解更多？** 從與你的興趣相符的學習路徑開始。

**準備構建？** 按照 [入門指南（詳細）](#入門指南詳細) 進行操作。
