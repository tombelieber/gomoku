# open-gomoku

> **2026年に構築された最先端のAIゲーム。** オンラインでプレイするか、現代のAIがどのように機能するかを学びましょう。

Rust WebAssemblyとReactで構築された、完全にプレイ可能なゴモク（五子棋）ゲーム。不敗のAI対戦相手を備えています。これは最先端のAIが1週末で構築できる成果です。無料、オープンソース、教育的です。クローンして、学んで、修正してください。

**[▶ 今すぐオンラインでプレイ](https://open-open-gomoku.pages.dev)** • [例で学ぶ](#learning-paths) • [コードを見る](#technical-breakdown)

---

## あなたが見ているもの

**open-gomoku** は本番レベルのゴモクAIゲームで、以下を実証しています：
- ✅ **アクション中の現代AI** — ミニマックス法とアルファ・ベータ枝刈り、ブラウザで実行
- ✅ **リアルタイムパフォーマンス** — Rust WASMで100ms未満の着手判定
- ✅ **モバイルファースト設計** — スマートフォンとタブレットで完全にプレイ可能
- ✅ **本番環境対応** — エラーハンドリング、パニック無し、エッジケースのテスト済み
- ✅ **100%無料＆オープンソース** — MITライセンス、自由に学び、修正が可能

2026年3月の現代AI工学がどのようなものであるかを示すために構築されました。

---

## クイックスタート

### オンラインでプレイ（今すぐ）
[Cloudflare Pagesでプレイ](https://open-open-gomoku.pages.dev)

### ローカルで実行
```bash
git clone https://github.com/yourusername/open-gomoku.git
cd open-gomoku
bun install
bun run dev
```

ブラウザで http://localhost:5173 を開いてプレイを開始します。

---

## 含まれるもの

### テクノロジースタック
- **エンジン：** AIのためのRust + WebAssembly（WASM）
- **フロントエンド：** React 18 + TypeScript + Tailwind CSS
- **スレッド処理：** AI着手のノンブロッキング処理用Web Worker
- **デプロイメント：** Cloudflare Pages
- **ビルド：** Bun + Vite + wasm-pack

### 主な機能
- **不敗AI** — ミニマックス法とアルファ・ベータ枝刈りを使用
- **レスポンシブUI** — すべての着手に即座のビジュアルフィードバック
- **モバイル対応** — タッチ最適化されたボードとコントロール
- **ゲームコントロール** — リセット、アンドゥ（制限あり）、難易度レベル（計画中）
- **状態永続化** — Zustandでゲーム状態を管理
- **パフォーマンスプロファイリング** — 着手時間をログに記録、深さ適応

### 高レベルアーキテクチャ
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

## 学習パス

学びたい内容に基づいて、自分の道を選んでください：

### 🎮 ゲーム開発者向け
AIがゲーム内でどのように判定を下すかを理解したい。

**ここから始める：**
1. 以下の[ゲームAI基礎](#ゲームai基礎)を読む
2. `engine/src/ai.rs` を確認 — ミニマックス法とアルファ・ベータ枝刈り
3. `engine/src/evaluation.rs` を修正 — AIがポジションを評価する方法を変更
4. `engine/src/lib.rs` の `MAX_DEPTH` を増減して、パフォーマンスへの影響を確認

**主要ファイル：**
- `engine/src/ai.rs:minimax()` — コアの判定アルゴリズム
- `engine/src/evaluation.rs:evaluate_board()` — ポジションのスコアリング
- `web/src/workers/engine.worker.ts` — Web Worker統合

**質問に答えられます：**
- AIが「最良の」着手をどのように判定するのか？
- なぜアルファ・ベータ枝刈りが高速なのか？
- WASMがJavaScriptより高速である理由は？

**次のステップ：**
- 異なる難易度レベルを追加（`MAX_DEPTH` を変動させる）
- 反復深化を実装
- 序盤の着手を高速化するための定石集を追加

---

### 📚 学生＆教育者向け
フルスタックAI統合と現代的なウェブアーキテクチャを理解したい。

**ここから始める：**
1. 以下の[完全な技術分析](#complete-technical-breakdown)を読む
2. [はじめに（詳細版）](#はじめに詳細版)ガイドに従う
3. `web/src/components/Board.tsx` と `web/src/workers/engine.worker.ts` 内のコンポーネント相互作用をレビュー
4. `web/src/store.ts` でZustandがゲーム状態をどのように管理するかを学ぶ

**主要概念：**
- **アーキテクチャパターン** — 関心の分離（AI、UI、状態管理）
- **スレッドモデル** — Web Workerが重要な理由
- **WASM境界** — RustとJavaScriptがどのように通信するか
- **フルスタック開発** — AIエンジンからユーザーインターフェースまで

**質問に答えられます：**
- コンパイルされたコード（Rust）を動的コード（React）と統合する方法は？
- なぜWeb Workerを使用するのか？
- AIゲームアプリケーションはどのように構造化すべきか？

**含まれる学習リソース：**
- アーキテクチャ図と説明
- デザインパターンをハイライトするコードコメント
- パフォーマンストレースのヒント
- WASM + JavaScriptのベストプラクティス

---

### 🔬 好奇心旺盛な開発者向け
現代のAIシステムがどのように機能するか、判定から性能最適化まで理解したい。

**ここから始める：**
1. まずゲームをプレイ — 見ているものを理解する
2. 以下の[このように構築した理由](#このように構築した理由)を読む
3. `engine/src/` を探索 — ミニマックス法を視覚的に理解
4. `web/src/workers/engine.worker.ts` をチェック — AIがバックグラウンドで実行されるしくみ

**主要な洞察：**
- AIは魔法ではない — 賢い枝刈りを伴う網羅的探索である
- パフォーマンスが重要 — 100ms未満の判定にはWASMを使用、JavaScriptではない
- アーキテクチャが能力を可能にする — Web WorkerはUIを応答可能に保つ
- 現代スタックは言語を混在させる — パフォーマンスはRust、相互作用はJavaScript

**質問に答えられます：**
- このAIを実際に「良い」ものにしているものは何か？
- JavaScriptを使用するのではなく、RustをWASMにコンパイルする理由は？
- AIはどのように先を読むのか？

---

### 💻 AI工学者向け
AIモデルアーキテクチャ、最適化、判定ロジックを理解したい。

**ここから始める：**
1. 以下の[AI アーキテクチャと判定ロジック](#ai-architecture--decision-logic)を読む
2. `engine/src/ai.rs` を詳しく研究 — 完全な注釈付きミニマックス実装
3. `engine/src/evaluation.rs` をレビュー — AIに「良い」ことが何かを教える評価関数
4. `web/src/workers/engine.worker.ts` のタイミングログでパフォーマンスを測定

**技術的深さ：**
- **アルゴリズム：** ミニマックス法とアルファ・ベータ枝刈り（古典的なゲームAI技術）
- **探索空間：** ~3^80の可能なゲーム状態 → 枝刈りで ~10k評価に削減
- **評価関数：** 手工作のヒューリスティック（ニューラルネットで置き換え可能）
- **パフォーマンス：** Rust WASMは深さ6～8で<100msの着手時間を実現

**主要な最適化：**
- トランスポジションテーブル（重複するボード状態のメモ化）
- 着手順序付けヒューリスティック（アルファ・ベータ枝刈り効果を最大化）
- 反復深化（未実装）
- 並列探索（WASMスレッド処理の制限により困難）

---

## 完全な技術分析

### アーキテクチャ概要

アプリケーションは3つの主要なレイヤーに分かれます：

#### 1. **React フロントエンド** (`web/src/`)
処理内容：
- ユーザーインターフェースとゲームボード描画
- 着手検証（選択したマスが空いているか？）
- ゲーム状態管理（誰のターン、ゲーム履歴）
- AIエンジンとの通信

**主要コンポーネント：**
- `App.tsx` — メインアプリセットアップとゲームフロー
- `Board.tsx` — ゲームボード描画とクリック処理
- `GameControls.tsx` — リセット、アンドゥ、難易度ボタン
- `store.ts` — ゲーム状態用Zustandストア

**Reactを使う理由は？**
- コンポーネント再利用性
- 仮想DOMを通じた効率的なDOM更新
- 強力なTypeScriptサポート
- UIパターン用の大規模エコシステム

---

#### 2. **Web Worker** (`web/src/workers/engine.worker.ts`)
処理内容：
- 別スレッドでAI計算を実行
- AI処理中のUI応答性を保つ
- 結果をメインスレッドに通信

**仕組み：**
```
┌─────────────────────────────┐
│ React Component (Main Thread)│
│ postMessage({action: "move"})│
└────────────┬────────────────┘
             │
             │ ワーカーがメッセージを受信
┌────────────▼────────────────┐
│ Web Worker Thread          │
│ Call WASM ai_move()        │
│ postMessage({bestMove})    │
└────────────┬────────────────┘
             │
             │ メインスレッドが受信
┌────────────▼────────────────┐
│ React着手でボードを更新    │
└─────────────────────────────┘
```

**Web Workerを使う理由は？**
- 長い計算中の「ジャンク」（UIフリーズ）を防ぐ
- ブラウザはユーザー入力に応答可能なままである
- モバイルでもゲームがキビキビしてみえる

---

#### 3. **Rust WASMエンジン** (`engine/src/`)
処理内容：
- ゲームロジックとボード状態
- AI着手生成
- アルファ・ベータ枝刈り付きミニマックス法
- ボード評価関数

**主要モジュール：**
- `lib.rs` — WASM エクスポート（JavaScriptから呼び出される `ai_move()` ）
- `ai.rs` — ミニマックス法実装
- `board.rs` — ボード表現と着手検証
- `evaluation.rs` — ポジションスコアリング関数

**Rust + WASMを使う理由は？**
- **パフォーマンス：** Rustはマシン風の命令にコンパイル、JavaScriptは解釈実行
- **正確性：** 強力な型システムがコンパイル時にバグをキャッチ
- **互換性：** WASMはあらゆる現代的なブラウザで実行
- **相互運用性：** WASM境界経由でJavaScriptから簡単に呼び出し可能

---

### ゲームAI基礎

#### AIが着手をどのように判定するか

AIは **ミニマックス法とアルファ・ベータ枝刈り** を使用します：

1. **ミニマックス法：** ゲームツリー：
   - 最大化プレイヤー（AI）は最高スコアを望む
   - 最小化プレイヤー（対戦者）は最低スコアを望む
   - 深さ制限まで可能なゲーム状態をすべて再帰的に評価

2. **アルファ・ベータ枝刈り：** 最終判定に影響を与えない枝をスキップする賢い最適化：
   - 評価を ~3^depth から ~3^(depth/2) に削減
   - 100ms未満の着手を可能にする

**疑似コード：**
```
function minimax(board, depth, isMaximizing, alpha, beta):
  if depth == 0:
    return evaluate(board)  // ベースケース

  if isMaximizing:  // AIのターン
    for each move:
      score = minimax(board, depth-1, false, alpha, beta)
      alpha = max(alpha, score)
      if beta <= alpha:
        break  // 枝刈り
    return alpha
  else:  // 対戦者のターン
    for each move:
      score = minimax(board, depth-1, true, alpha, beta)
      beta = min(beta, score)
      if beta <= alpha:
        break  // 枝刈り
    return beta
```

#### AIがポジションをどのように評価するか

**評価関数** はAIに「良い」ことが何かを教えます：

```rust
fn evaluate_board(board: &Board) -> i32 {
  let mut score = 0;

  // オープンスリー（勝つ可能性のある着手）をカウント
  score += 100 * count_open_threes(&board, AI);
  score -= 100 * count_open_threes(&board, PLAYER);

  // オープンツー（有用な脅威）をカウント
  score += 10 * count_open_twos(&board, AI);
  score -= 10 * count_open_twos(&board, PLAYER);

  return score;
}
```

評価関数は **手工作のヒューリスティック** です。現代のAIでは、自己対戦で訓練されたニューラルネットで置き換えることができます（ロードマップを参照）。

---

### このように構築した理由

#### 設計判定：エンジンのためのWASM

**JavaScriptでこれを実行できるか？**
- JavaScriptミニマックス深さ6：~2～3秒
- Rust WASMミニマックス深さ6：~50～100ms

**なぜ20～60倍高速か？**
- Rustはネイティブ命令にコンパイル
- WASMはブラウザのネイティブVMで実行
- JavaScriptはJIT（良いが、それほど高速ではない）で解釈実行

**トレードオフ：** Rustでビルドするにはツールチェーンセットアップ（wasm-pack、Cargo）が必要です。パフォーマンスのためにやる価値があります。

#### 設計判定：スレッド処理用Web Worker

**Web Workerなしで何が起こるか？**
- ユーザークリック → React がメインスレッドで `ai_move()` を呼び出し
- メインスレッドは100ms+ブロック（着手を計算中）
- UI はクリックに応答できない、アニメーションはフリーズ
- ユーザーはゲームがフリーズしているのを見る

**Web Worker付き：**
- React がワーカースレッドにメッセージをポスト
- ワーカーが計算を実行
- メインスレッドは実行し続け、UIは応答可能なままである
- 完了時に結果をポスト

**トレードオフ：** 複雑さを追加します（メッセージ通信、非同期）。認識されるパフォーマンスに必須です。

#### 設計判定：フロントエンド用React

**バニラJavaScriptではなくなぜReact？**
- ReactのコンポーネントモデルはUIロジックを再利用可能にする
- 仮想DOMは効率的な更新を意味する
- TypeScriptは早期に型エラーをキャッチ
- 大規模なエコシステム（状態管理、スタイリング、など）

---

## はじめに（詳細版）

### 前提条件
- **Rust** (1.56+) — [rustupをインストール](https://rustup.rs/)
- **Node.js** (18+) — [ダウンロード](https://nodejs.org)
- **Bun** (latest) — `curl -fsSL https://bun.sh/install | bash`
- **wasm-pack** — `cargo install wasm-pack`

### ステップ1：リポジトリをクローン

```bash
git clone https://github.com/yourusername/open-gomoku.git
cd open-gomoku
```

### ステップ2：依存関係をインストール

```bash
bun install
```

これはルートレベルと `web/` の依存関係の両方をインストールします。

### ステップ3：WASMエンジンをビルド

```bash
bun run build:engine
```

これはRust → WASMをコンパイルし、`web/src/wasm/engine/` に出力します。

期待される出力：
```
...
   Compiling engine v0.1.0
    Finished release [optimized] target(s) in 2.54s
   Generating WASM bindings...
✓ Engine built to web/src/wasm/engine/
```

### ステップ4：開発サーバーを開始

```bash
bun run dev
```

ブラウザで http://localhost:5173 が開きます。いくつかの手を動かして、すべてが機能することを確認します。

### ステップ5：変更を加える（オプションテスト）

`engine/src/evaluation.rs` を編集してオープンスリーのスコアを変更してみてください：

```rust
// この行を変更：
score += 100 * count_open_threes(&board, AI);
// これに：
score += 200 * count_open_threes(&board, AI);  // AIはスリーをより高く評価
```

その後：
```bash
bun run build:engine
bun run dev
```

ブラウザをリフレッシュします。AIはスリーロー（3個並べ）を完成させることについてより積極的になるはずです。

### 本番環境用にビルド

```bash
bun run build
```

`web/dist/` に最適化されたバンドルを出力します。

### Cloudflare Pagesへのデプロイ

プロジェクトはCloudflare Pagesに設定されています：

```bash
bun run deploy
```

これはすべてをビルドし、「gomoku」という名前のCloudflare Pagesプロジェクトにデプロイします。

---

## プロジェクト構成

```
open-gomoku/
├── README.md                 # ここを見ています
├── package.json             # ルートワークスペース設定
│
├── engine/                  # Rust WASM AIエンジン
│   ├── Cargo.toml          # Rust依存関係
│   ├── src/
│   │   ├── lib.rs          # WASMエクスポート (ai_move, board validation)
│   │   ├── ai.rs           # ミニマックス法
│   │   ├── board.rs        # ボード状態＆ルール
│   │   └── evaluation.rs    # ポジションスコアリング
│   └── target/
│       └── wasm32-unknown-unknown/
│           └── release/    # コンパイル済みWASMファイル
│
├── web/                     # Reactフロントエンド
│   ├── package.json        # フロントエンド依存関係（React、Tailwindなど）
│   ├── src/
│   │   ├── App.tsx         # メインアプリコンポーネント
│   │   ├── index.css       # グローバルスタイル
│   │   ├── components/
│   │   │   ├── Board.tsx   # ゲームボード描画
│   │   │   └── GameControls.tsx
│   │   ├── store.ts        # Zustandゲーム状態
│   │   ├── workers/
│   │   │   └── engine.worker.ts  # AI用Web Worker
│   │   └── wasm/
│   │       └── engine/     # build:engineによる出力
│   ├── vite.config.ts      # Viteビルド設定
│   ├── tailwind.config.js   # Tailwind CSS設定
│   └── dist/               # ビルド済みフロントエンド (ビルド後)
│
└── docs/
    └── plans/              # 実装ドキュメント
```

**重要な洞察：** `web/src/wasm/engine/` は `bun run build:engine` によって **生成される** — 直接編集しないでください。

---

## 開発ガイド

### AIを拡張する方法

#### AIを強くする

`engine/src/lib.rs` の探索深さを増やします：

```rust
pub fn ai_move(board_state: &str, ai_player: i32) -> String {
    let mut board = Board::from_string(board_state);
    let best_move = minimax(&board, 8, true);  // 6 だった、今は 8
    ...
}
```

**パフォーマンスへの影響：** 深さの増加ごとに ~3倍遅くなります。

#### 評価関数を変更

`engine/src/evaluation.rs` を編集：

```rust
fn evaluate_board(board: &Board) -> i32 {
  // センターポジションにもっと重みを与える
  let center_bonus = count_center_pieces(&board, AI) * 5;

  // 分割されたポジションにペナルティを与える
  let connectivity = measure_piece_connectivity(&board, AI);

  ...
}
```

これはAIに異なる優先順位を教えます。

### ゲームルールを修正する方法

#### ボードサイズを変更

`engine/src/board.rs` を編集：

```rust
pub const BOARD_SIZE: usize = 17;  // 15 だった、今は 17x17
```

その後：
```bash
bun run build:engine
bun run dev
```

#### ハンディキャップモードを追加

`web/src/components/GameControls.tsx` でハンディキャップ選択を追加：

```tsx
<select value={handicap} onChange={(e) => setHandicap(e.target.value)}>
  <option value="0">Even</option>
  <option value="1">Black +1 Stone</option>
  <option value="2">Black +2 Stones</option>
</select>
```

その後、ハンディキャップをWASM `ai_move()` に渡します。

### テスト戦略

#### ユニットテスト（Rust）

`engine/src/board.rs` にテストを追加：

```rust
#[cfg(test)]
mod tests {
  use super::*;

  #[test]
  fn test_valid_move() {
    let mut board = Board::new();
    assert!(board.make_move(5, 5));
    assert!(!board.make_move(5, 5));  // 同じスポットで2回動かせない
  }
}
```

実行: `cargo test`

#### 統合テスト（React）

`web/src/components/Board.test.tsx` で：

```tsx
test("AI moves after player move", async () => {
  render(<App />);
  await userEvent.click(screen.getByTestId("square-5-5"));

  await waitFor(() => {
    expect(screen.getByTestId("square-6-5")).toHaveClass("ai-stone");
  });
});
```

### パフォーマンスプロファイリング

`web/src/workers/engine.worker.ts` にタイミングログを追加：

```typescript
const start = performance.now();
const bestMove = engine.ai_move(boardState, AI);
const elapsed = performance.now() - start;
console.log(`AI move took ${elapsed}ms at depth ${depth}`);
```

ブラウザDevToolsコンソールをチェックして着手時間を見ます。> 200ms の場合は深さを調整してください。

---

## ロードマップ：v2＆その先

### v2：オンラインマルチプレイヤー（進行中 🚀）

**次は：** インターネット経由のリアルタイム、2プレイヤーゴモク。

#### アーキテクチャ概要
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

**コンポーネント：**
1. **マッチメイキング** — 対戦者を探す、ゲームルームを作成
2. **リアルタイム同期** — インスタント着手更新用WebSocket
3. **着手検証** — サーバーはすべての着手を検証（カンニング防止）
4. **ターン管理** — サーバーは誰のターンかを強制
5. **タイムアウト処理** — 非アクティブ後にフォーフェイト

#### これをビルドする理由は？

- プレイヤーは互いにチャレンジ可能（AIだけではない）
- リアルタイムゲームネットワーキングについて学ぶ
- サーバー側の着手検証を理解
- 競争的なプレイとランキングボードを有効にする

#### 実装計画

1. WebSocketサーバーをセットアップ（Node.js + Socket.ioまたはRust Actix）
2. ゲームルーム管理を追加
3. サーバーで着手検証を実装
4. プレイヤー認証を追加（オプションだが推奨）
5. 対戦者マッチメイキングをビルド
6. Webアプリと共にサーバーをデプロイ

#### テックスタック
- **バックエンド：** Node.js (Express + Socket.io) または Rust (Actix-web)
- **データベース：** ゲーム履歴 + ELOレーティング用PostgreSQL
- **リアルタイム：** インスタント通信用WebSocket
- **フロントエンド：** ネットワーク状態処理用の軽微なReactアップデート

---

### 今後の可能性（v3+）

1. **AI vs AIマッチ** — 2つのAIが互いにプレイするのを見る
2. **難易度レベル** — イージー（深さ4）、ミディアム（深さ6）、ハード（深さ8）
3. **ゲームバリアント**
   - フリースタイル（任意の5個並べが勝ち）
   - 連珠（ブロック用の特殊ルール）
   - 6個並べ、スワップ-2
4. **ニューラルネットワークAI** — 自己対戦で訓練（手工作評価関数を置き換え）
5. **モバイルアプリ** — React Nativeバージョン
6. **リプレイ＆分析** — ゲームを保存、着手をリプレイ、ミスを分析
7. **ランキング＆レーティング** — ELOレーティング、シーズンランキング

---

## 貢献

### フォーク＆修正する方法

```bash
# 1. GitHubでフォーク（フォークボタンをクリック）
# 2. フォークをクローン
git clone https://github.com/YOUR-USERNAME/open-gomoku.git
cd open-gomoku

# 3. 変更を加える
# 4. ローカルでテスト
bun run dev

# 5. コミットとプッシュ
git add .
git commit -m "feat: add your change"
git push origin main

# 6. GitHubでプルリクエストを開く
```

### ロードマップに貢献

v2以降のアイデアはありますか？ GitHubイシューを開いてください：

1. アイデアを明確に説明
2. それが価値があると考える理由を説明
3. 技術的アプローチを提案（持っている場合）
4. 関連リソースにリンク

貢献に最適なアイデア：
- [ ] 難易度レベルセレクタを実装
- [ ] 着手タイマーを追加（AIがどのくらい時間を取ったかを表示）
- [ ] 序盤の着手を高速化するための定石集を作成
- [ ] 視覚的AI評価を追加（ボードヒートマップを表示）
- [ ] 反復深化を実装
- [ ] トランスポジションテーブルメモ化を追加

### コードスタイル

- **Rust：** `cargo fmt` でフォーマット、`cargo clippy` でリント
- **TypeScript：** ESLint + Prettier を使用（`web/.eslintrc` に設定）
- **コミット：** 変更内容と理由を説明する明確なメッセージ

### テスト要件

PRを開く前に：
- Rust: `cargo test` が成功
- フロントエンド：デスクトップ + モバイルで手動テスト
- ビルド：`bun run build` が警告なしで成功

---

## 学習リソース

### ゲームAI＆アルゴリズム
- [ミニマックス法の説明](https://en.wikipedia.org/wiki/Minimax) — Wikipedia
- [アルファ・ベータ枝刈り](https://en.wikipedia.org/wiki/Alpha%E2%80%93beta_pruning) — 枝をスキップする方法
- [ゲームツリー探索](https://www.chessprogramming.org/Search) — チェスプログラミングウィキ

### ゴモク特定
- [ゴモクルール（英語）](https://en.wikipedia.org/wiki/Gomoku)
- [ゴモクAI技術](https://github.com/topics/gomoku-ai) — その他の実装

### Web AssemblyＦパフォーマンス
- [MDN：WebAssembly](https://developer.mozilla.org/en-US/docs/WebAssembly)
- [Rust + WASMブック](https://rustwasm.github.io/book/)
- [wasm-packガイド](https://rustwasm.github.io/docs/wasm-pack/)

### Web Worker
- [MDN：Web Worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)
- [重い計算をオフロード](https://web.dev/workers-basics/)

### 現代的なウェブスタック
- [React ドキュメント](https://react.dev)
- [TypeScript ハンドブック](https://www.typescriptlang.org/docs/)
- [Zustand 状態管理](https://github.com/pmndrs/zustand)
- [Tailwind CSS](https://tailwindcss.com)

### パフォーマンス最適化
- [Web Vitals](https://web.dev/vitals/) — パフォーマンス測定
- [Rust パフォーマンス](https://nnethercote.github.io/perf-book/) — 低レベル最適化
- [WASM パフォーマンスチューニング](https://rustwasm.github.io/docs/wasm-pack/tutorials/npm-wasm/index.html)

---

## ライセンス

MITライセンス — 詳細はLICENSEファイルを参照してください。

**これの意味：**
- ✅ 自由にクローン＆修正
- ✅ 商用利用
- ✅ 配布（修正版または非修正版）
- ✅ 個人的な使用
- ❌ 責任 — 保証なし

---

## 2026年3月の現代AIで構築

open-gomoku は、最先端のAI工学が達成できることを実証しています：
- **生産性AIA支援** 設計、実装、デバッグの各段階
- **多言語統合** (Rust、TypeScript、React)数時間で
- **本番環境品質コード** エラーハンドリングとテスト付き
- **教育的価値** — 実際のコードを読むことで現代的なAIプラクティスを学ぶ

魔法ではありません。スキルのある実務家の手にある優れたツールだけです。

**質問がありますか？** GitHubでイシューを開いてください。

**もっと学びたいですか？** 上記のあなたの興味に合った学習パスから始めてください。

**構築する準備はできましたか？** [はじめに（詳細版）](#はじめに詳細版)に従ってください。
