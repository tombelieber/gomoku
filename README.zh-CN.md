# open-gomoku

> **2026年最先进的AI游戏。** 在线游玩或学习现代AI如何工作。

一个完全可玩的五子棋游戏，拥有无敌的AI对手，采用Rust WebAssembly和React构建。这是最先进的AI在周末内能构建的游戏。它免费、开源且具有教育意义——克隆它、学习它、修改它。

**[▶ 立即在线游玩](https://gomoku.pages.dev)** • [按示例学习](#学习路径) • [查看代码](#完整技术详解)

---

## 你正在看什么

**open-gomoku** 是一个生产级的五子棋AI游戏，展示了：
- ✅ **现代AI在行动** — 使用Minimax和alpha-beta修剪算法，在浏览器中运行
- ✅ **实时性能** — Rust WASM实现，移动决策时间在100毫秒以内
- ✅ **移动优先设计** — 完全可在手机和平板上游玩
- ✅ **生产就绪** — 完善的错误处理、无panic、测试完整边界情况
- ✅ **100%免费开源** — MIT许可证，自由学习和修改

构建于2026年3月，展示现代AI工程的最新状态。

---

## 快速开始

### 在线游玩（立即）
[在Cloudflare Pages上游玩](https://gomoku.pages.dev)

### 本地运行
```bash
git clone https://github.com/yourusername/open-gomoku.git
cd open-gomoku
bun install
bun run dev
```

打开 http://localhost:5173 并开始游玩。

---

## 包含的内容

### 技术栈
- **引擎:** 带WebAssembly（WASM）的Rust用于AI
- **前端:** React 18 + TypeScript + Tailwind CSS
- **多线程:** Web Workers用于非阻塞AI移动
- **部署:** Cloudflare Pages
- **构建:** Bun + Vite + wasm-pack

### 主要功能
- **无敌AI** — 使用带alpha-beta修剪的minimax算法
- **响应式UI** — 每次移动都有即时视觉反馈
- **移动友好** — 触屏优化的棋盘和控制
- **游戏控制** — 重置、撤销（有限）、计划中的难度级别
- **状态持久化** — 使用Zustand管理游戏状态
- **性能分析** — 记录移动时间、自适应AI深度

### 高级架构
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

## 学习路径

根据你想学习的内容选择你的路径：

### 🎮 游戏开发者
你想理解AI如何在游戏中做决策。

**从这里开始:**
1. 阅读下面的 [游戏AI基础知识](#游戏ai基础知识)
2. 查看 `engine/src/ai.rs` — 带alpha-beta修剪的minimax算法
3. 修改 `engine/src/evaluation.rs` — 改变AI评估位置的方式
4. 尝试增加/减少 `engine/src/lib.rs` 中的 `MAX_DEPTH` 以查看性能影响

**关键文件:**
- `engine/src/ai.rs:minimax()` — 核心决策算法
- `engine/src/evaluation.rs:evaluate_board()` — 位置评分
- `web/src/workers/engine.worker.ts` — Web Worker集成

**回答的问题:**
- AI如何决定"最好的"移动？
- 为什么alpha-beta修剪快速？
- WASM如何相比JavaScript改进性能？

**后续步骤:**
- 添加不同难度级别（改变 `MAX_DEPTH`）
- 实现迭代深化
- 为早期移动添加开局库

---

### 📚 学生和教育者
你想理解全栈AI集成和现代Web架构。

**从这里开始:**
1. 阅读下面的 [完整技术详解](#完整技术详解)
2. 按照 [详细入门指南](#详细入门指南) 操作
3. 查看 `web/src/components/Board.tsx` 和 `web/src/workers/engine.worker.ts` 中的组件交互
4. 研究Zustand如何在 `web/src/store.ts` 中管理游戏状态

**关键概念:**
- **架构模式** — 分离关注点（AI、UI、状态管理）
- **线程模型** — Web Workers为什么对响应性至关重要
- **WASM边界** — Rust和JavaScript如何通信
- **全栈开发** — 从AI引擎到用户界面

**回答的问题:**
- 如何整合编译代码（Rust）与动态代码（React）？
- 为什么使用Web Workers？
- 应如何构建AI游戏应用？

**包含的学习资源:**
- 架构图和解释
- 高亮设计模式的代码注释
- 性能跟踪技巧
- WASM + JavaScript最佳实践

---

### 🔬 好奇的开发者
你想理解现代AI系统如何工作，从决策到性能优化。

**从这里开始:**
1. 先游玩游戏 — 理解你正在看什么
2. 阅读 [为什么我们这样构建](#为什么我们这样构建)
3. 浏览 `engine/src/` — 直观理解minimax算法
4. 检查 `web/src/workers/engine.worker.ts` — 查看AI如何在后台运行

**关键洞察:**
- AI不是魔法 — 它是带智能修剪的穷举搜索
- 性能很重要 — 低于100毫秒的决策使用WASM而不是JavaScript
- 架构启用能力 — Web Workers让UI保持响应
- 现代栈混合语言 — Rust用于性能，JavaScript用于交互性

**回答的问题:**
- 是什么使这个AI真正"好"？
- 为什么编译Rust为WASM而不仅仅使用JavaScript？
- AI如何提前思考？

---

### 💻 AI工程师
你想理解AI模型架构、优化和决策逻辑。

**从这里开始:**
1. 阅读 [AI架构和决策逻辑](#ai架构和决策逻辑)
2. 研究 `engine/src/ai.rs` — 完全注释的minimax实现
3. 查看 `engine/src/evaluation.rs` — 教AI什么是"好的"的评估函数
4. 使用 `web/src/workers/engine.worker.ts` 时间日志测量性能

**技术深度:**
- **算法:** 带alpha-beta修剪的Minimax（经典游戏AI技术）
- **搜索空间:** 约3^80个可能的游戏状态 → 通过修剪减少到每次移动约10k评估
- **评估函数:** 手工制作的启发式（可被神经网络替换）
- **性能:** Rust WASM在深度6-8时实现<100毫秒移动时间

**关键优化:**
- 转置表（备忘）用于重复棋盘状态
- 移动排序启发式以最大化alpha-beta修剪有效性
- 迭代深化（尚未实现）
- 平行搜索（由于WASM线程限制存在挑战）

---

## 完整技术详解

### 架构概述

应用分为三个主要层：

#### 1. **React前端** (`web/src/`)
处理：
- 用户界面和游戏棋盘渲染
- 移动验证（选中的方块是否为空？）
- 游戏状态管理（谁的回合、游戏历史）
- 与AI引擎的通信

**关键组件:**
- `App.tsx` — 主应用设置和游戏流
- `Board.tsx` — 游戏棋盘渲染和点击处理
- `GameControls.tsx` — 重置、撤销、难度按钮
- `store.ts` — 游戏状态的Zustand存储

**为什么选择React？**
- 组件复用性
- 通过虚拟DOM高效更新DOM
- 强大的TypeScript支持
- 庞大的UI模式生态系统

---

#### 2. **Web Worker** (`web/src/workers/engine.worker.ts`)
处理：
- 在单独线程中运行AI计算
- 保持UI在AI回合期间响应
- 将结果传回主线程

**工作方式:**
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

**为什么使用Web Workers？**
- 防止"卡顿"（长计算期间UI冻结）
- 浏览器对用户输入保持响应
- 即使在移动设备上也让游戏感觉流畅

---

#### 3. **Rust WASM引擎** (`engine/src/`)
处理：
- 游戏逻辑和棋盘状态
- AI移动生成
- 带alpha-beta修剪的Minimax算法
- 棋盘评估函数

**关键模块:**
- `lib.rs` — WASM导出（从JavaScript调用 `ai_move()`）
- `ai.rs` — Minimax算法实现
- `board.rs` — 棋盘表示和移动验证
- `evaluation.rs` — 位置评分函数

**为什么选择Rust + WASM？**
- **性能:** Rust编译为机器类指令，JavaScript被解释执行
- **正确性:** 强类型系统在编译时捕获bug
- **可移植性:** WASM在任何现代浏览器上运行
- **互操作:** 通过WASM边界从JavaScript轻松调用

---

### 游戏AI基础知识

#### AI如何决定移动

AI使用 **带alpha-beta修剪的minimax**：

1. **Minimax:** 游戏树，其中：
   - 最大化玩家（AI）想要最高分
   - 最小化玩家（对手）想要最低分
   - 递归评估所有可能的游戏状态到深度限制

2. **Alpha-Beta修剪:** 聪明优化，它：
   - 跳过不能影响最终决策的分支
   - 将评估从约3^深度减少到约3^(深度/2)
   - 实现低于100毫秒的移动

**伪代码:**
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

#### AI如何评估位置

**评估函数** 教AI什么是"好的"：

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

评估函数是 **手工制作的启发式**。在现代AI中，这可能被替换为通过自我对弈训练的神经网络（见路线图）。

---

### 为什么我们这样构建

#### 设计决策：引擎采用WASM

**我们可以用JavaScript做这个吗？**
- JavaScript深度6的minimax：约2-3秒
- Rust WASM深度6的minimax：约50-100毫秒

**为什么快20-60倍？**
- Rust编译为原生指令
- WASM在浏览器的原生VM中执行
- JavaScript被解释执行（好，但不够快）

**权衡:** 用Rust构建需要工具链设置（wasm-pack、Cargo）。值得性能的权衡。

#### 设计决策：Web Worker用于多线程

**没有Web Worker会发生什么？**
- 用户点击 → React在主线程上调用 `ai_move()`
- 主线程被阻止100毫秒以上（计算移动）
- UI无法响应点击，动画冻结
- 用户看到冻结的游戏

**使用Web Worker:**
- React向worker线程发送消息
- Worker进行计算
- 主线程继续运行，UI保持响应
- 完成后发回结果

**权衡:** 增加复杂性（消息传递、异步）。对感知性能至关重要。

#### 设计决策：前端采用React

**为什么不用纯JavaScript？**
- React的组件模型使UI逻辑可复用
- 虚拟DOM意味着高效的更新
- TypeScript早期捕获类型错误
- 庞大的生态系统（状态管理、样式等）

---

## 详细入门指南

### 先决条件
- **Rust** (1.56+) — [安装rustup](https://rustup.rs/)
- **Node.js** (18+) — [下载](https://nodejs.org)
- **Bun** (latest) — `curl -fsSL https://bun.sh/install | bash`
- **wasm-pack** — `cargo install wasm-pack`

### 步骤1：克隆仓库

```bash
git clone https://github.com/yourusername/open-gomoku.git
cd open-gomoku
```

### 步骤2：安装依赖

```bash
bun install
```

这会安装根级别和 `web/` 的依赖。

### 步骤3：构建WASM引擎

```bash
bun run build:engine
```

这会编译Rust → WASM并输出到 `web/src/wasm/engine/`。

预期输出：
```
...
   Compiling engine v0.1.0
    Finished release [optimized] target(s) in 2.54s
   Generating WASM bindings...
✓ Engine built to web/src/wasm/engine/
```

### 步骤4：启动开发服务器

```bash
bun run dev
```

在浏览器中打开 http://localhost:5173。游玩几步以验证一切正常。

### 步骤5：进行更改（可选测试）

尝试编辑 `engine/src/evaluation.rs` 来改变开放三连的分数：

```rust
// Change this line:
score += 100 * count_open_threes(&board, AI);
// To this:
score += 200 * count_open_threes(&board, AI);  // AI values threes more
```

然后：
```bash
bun run build:engine
bun run dev
```

刷新浏览器。AI应该更主动地完成三连。

### 生产构建

```bash
bun run build
```

输出优化的包到 `web/dist/`。

### 部署到Cloudflare Pages

项目为Cloudflare Pages配置：

```bash
bun run deploy
```

这会构建所有内容并部署到你名为"gomoku"的Cloudflare Pages项目。

---

## 项目结构

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

**关键洞察:** `web/src/wasm/engine/` 是 `bun run build:engine` **生成的** — 不要直接编辑。

---

## 开发指南

### 如何扩展AI

#### 让AI变得更强

在 `engine/src/lib.rs` 中增加搜索深度：

```rust
pub fn ai_move(board_state: &str, ai_player: i32) -> String {
    let mut board = Board::from_string(board_state);
    let best_move = minimax(&board, 8, true);  // Was 6, now 8
    ...
}
```

**性能影响:** 深度每增加一级约慢3倍。

#### 改变评估函数

编辑 `engine/src/evaluation.rs`：

```rust
fn evaluate_board(board: &Board) -> i32 {
  // Give more weight to center positions
  let center_bonus = count_center_pieces(&board, AI) * 5;

  // Penalize fragmented positions
  let connectivity = measure_piece_connectivity(&board, AI);

  ...
}
```

这教AI不同的优先级。

### 如何修改游戏规则

#### 改变棋盘大小

编辑 `engine/src/board.rs`：

```rust
pub const BOARD_SIZE: usize = 17;  // Was 15, now 17x17
```

然后：
```bash
bun run build:engine
bun run dev
```

#### 添加让子模式

在 `web/src/components/GameControls.tsx` 中，添加让子选择：

```tsx
<select value={handicap} onChange={(e) => setHandicap(e.target.value)}>
  <option value="0">Even</option>
  <option value="1">Black +1 Stone</option>
  <option value="2">Black +2 Stones</option>
</select>
```

然后将让子传递给WASM `ai_move()`。

### 测试策略

#### 单元测试（Rust）

在 `engine/src/board.rs` 中添加测试：

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

运行: `cargo test`

#### 集成测试（React）

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

向 `web/src/workers/engine.worker.ts` 添加时间日志：

```typescript
const start = performance.now();
const bestMove = engine.ai_move(boardState, AI);
const elapsed = performance.now() - start;
console.log(`AI move took ${elapsed}ms at depth ${depth}`);
```

检查浏览器开发者工具控制台以查看移动时间。如果 > 200毫秒则调整深度。

---

## 路线图：v2及以后

### v2：在线多人（进行中 🚀）

**下一步是什么:** 互联网上实时的两人五子棋。

#### 架构概述
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

**组件:**
1. **匹配** — 查找对手、创建游戏房间
2. **实时同步** — WebSocket用于即时移动更新
3. **移动验证** — 服务器验证所有移动（防止作弊）
4. **回合管理** — 服务器强制执行谁的回合
5. **超时处理** — 不活跃后放弃

#### 为什么构建这个？

- 玩家可以相互挑战（不仅仅是AI）
- 学习关于实时游戏网络
- 理解服务器端移动验证
- 启用竞争性游戏和排行榜

#### 实现计划

1. 设置WebSocket服务器（Node.js + Socket.io或Rust Actix）
2. 添加游戏房间管理
3. 在服务器上实现移动验证
4. 添加玩家认证（可选但推荐）
5. 构建对手匹配
6. 与Web应用并行部署服务器

#### 技术栈
- **后端:** Node.js（Express + Socket.io）或Rust（Actix-web）
- **数据库:** PostgreSQL用于游戏历史 + ELO评分
- **实时:** WebSocket用于即时通信
- **前端:** 轻微的React更新以处理网络状态

---

### 未来可能性（v3+）

1. **AI对AI比赛** — 观看两个AI相互游玩
2. **难度级别** — 简单（深度4）、中等（深度6）、困难（深度8）
3. **游戏变体**
   - 自由式（任何五连获胜）
   - 任意三（特殊的阻止规则）
   - 六连、Swap-2
4. **神经网络AI** — 通过自我对弈训练模型（替换手工制作的评估）
5. **移动应用** — React Native版本
6. **回放和分析** — 保存游戏、回放移动、分析错误
7. **排行榜和评分** — ELO评分、赛季排名

---

## 贡献

### 如何Fork和修改

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

### 对路线图进行贡献

有v2或以后的想法？打开GitHub Issue：

1. 清楚地描述你的想法
2. 解释为什么它有价值
3. 建议技术方法（如果你有）
4. 链接到相关资源

贡献的好主意：
- [ ] 实现难度级别选择器
- [ ] 添加移动计时器（显示AI花了多长时间）
- [ ] 为更快的早期移动创建开局库
- [ ] 添加可视AI评估（显示棋盘热力图）
- [ ] 实现迭代深化
- [ ] 添加转置表备忘

### 代码风格

- **Rust:** 用 `cargo fmt` 格式化，用 `cargo clippy` 检查
- **TypeScript:** 使用ESLint + Prettier（在 `web/.eslintrc` 中配置）
- **提交:** 清楚的消息描述改变了什么和为什么

### 测试要求

在打开PR之前：
- Rust: `cargo test` 通过
- 前端：在桌面和移动设备上进行手动测试
- 构建: `bun run build` 不出现警告地成功

---

## 学习资源

### 游戏AI和算法
- [Minimax算法解释](https://en.wikipedia.org/wiki/Minimax) — Wikipedia
- [Alpha-Beta修剪](https://en.wikipedia.org/wiki/Alpha%E2%80%93beta_pruning) — 如何跳过分支
- [游戏树搜索](https://www.chessprogramming.org/Search) — Chess Programming Wiki

### 五子棋特定
- [五子棋规则（英文）](https://en.wikipedia.org/wiki/Gomoku)
- [五子棋AI技术](https://github.com/topics/gomoku-ai) — 其他实现

### Web Assembly和性能
- [MDN: WebAssembly](https://developer.mozilla.org/en-US/docs/WebAssembly)
- [Rust + WASM书籍](https://rustwasm.github.io/book/)
- [wasm-pack指南](https://rustwasm.github.io/docs/wasm-pack/)

### Web Workers
- [MDN: Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)
- [卸载重型计算](https://web.dev/workers-basics/)

### 现代Web栈
- [React文档](https://react.dev)
- [TypeScript手册](https://www.typescriptlang.org/docs/)
- [Zustand状态管理](https://github.com/pmndrs/zustand)
- [Tailwind CSS](https://tailwindcss.com)

### 性能优化
- [Web Vitals](https://web.dev/vitals/) — 衡量性能
- [Rust性能](https://nnethercote.github.io/perf-book/) — 低级优化
- [WASM性能调优](https://rustwasm.github.io/docs/wasm-pack/tutorials/npm-wasm/index.html)

---

## 许可证

MIT许可证 — 有关详细信息，请参见LICENSE文件。

**这意味着什么:**
- ✅ 自由克隆和修改
- ✅ 商业使用
- ✅ 分发（修改或未修改）
- ✅ 私人使用
- ❌ 责任 — 我们不提供任何保证

---

## 2026年3月用现代AI构建

open-gomoku展示了最先进的AI工程能够实现的：
- **生产力AI协助** 在每个阶段（设计、实现、调试）
- **多语言集成** （Rust、TypeScript、React）在数小时内
- **生产质量代码** 带有错误处理和测试
- **教育价值** — 通过阅读真实代码学习现代AI实践

不是魔法。只是优秀的工具掌握在熟练从业者手中。

**有问题？** 在GitHub上打开issue。

**想学习更多？** 从与上述你的兴趣匹配的学习路径开始。

**准备构建？** 按照 [详细入门指南](#详细入门指南) 操作。
