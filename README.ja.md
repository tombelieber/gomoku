<p align="center">
  <a href="README.md">English</a> · <a href="README.zh-TW.md">繁體中文</a> · <a href="README.zh-CN.md">简体中文</a> · <b>日本語</b> · <a href="README.ko.md">한국어</a> · <a href="README.de.md">Deutsch</a> · <a href="README.es.md">Español</a> · <a href="README.fr.md">Français</a> · <a href="README.it.md">Italiano</a> · <a href="README.nl.md">Nederlands</a> · <a href="README.pt.md">Português</a>
</p>

# 五目並べ

### AIに勝てますか？世界最古の戦略ゲームに挑戦

<p align="center">
  <a href="https://open-gomoku.pages.dev"><img src="https://img.shields.io/badge/%E2%96%B6%EF%B8%8F_%E4%BB%8A%E3%81%99%E3%81%90%E9%81%8A%E3%81%B6-open--gomoku.pages.dev-black?style=for-the-badge&labelColor=000" alt="今すぐ遊ぶ" /></a>
</p>

<p align="center">
  <img src="assets/en/screenshots/midgame.png" alt="五目並べのゲーム画面" width="320" />
</p>

<p align="center">
  無料。登録不要。ダウンロード不要。すぐに遊べます。
</p>

---

<table>
  <tr>
    <td align="center" width="50%">
      <img src="assets/en/screenshots/midgame.png" alt="リアルタイム対局" width="280" />
      <br /><b>リアルタイム対局</b>
      <br /><sub>ターンタイマー、AI思考表示、待った — すべてが手の中に</sub>
    </td>
    <td align="center" width="50%">
      <img src="assets/en/screenshots/win.png" alt="ゲーム終了画面" width="280" />
      <br /><b>AIに勝てるか？</b>
      <br /><sub>アニメーション顔文字付きのドラマチックな結末</sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <img src="assets/en/screenshots/settings.png" alt="設定画面" width="280" />
      <br /><b>すべてカスタマイズ</b>
      <br /><sub>3段階の難易度、黒番・白番選択、勝敗統計</sub>
    </td>
    <td align="center" width="50%">
      <img src="assets/en/screenshots/replay.png" alt="棋譜再生" width="280" />
      <br /><b>棋譜を振り返る</b>
      <br /><sub>一手ずつ再生、AI思考時間を確認</sub>
    </td>
  </tr>
</table>

---

## なぜこれを選ぶ？

- **最強AI** — Rustエンジンを WebAssembly にコンパイル。1手100ミリ秒以下。頑張って。
- **ブラウザで動作** — アプリのインストール不要、アカウント作成不要。あらゆるデバイスで。
- **モバイルファースト** — タッチ操作に最適化。瞬時に読み込み。
- **11言語対応** — English, 繁體中文, 简体中文, 日本語, 한국어, Deutsch, Español, Français, Italiano, Nederlands, Português.
- **対局履歴とリプレイ** — すべての対局を自動保存。過去の対局を一手ずつ振り返り。

---

<details>
<summary><b>開発者向け</b></summary>
<br />

```bash
git clone https://github.com/tombelieber/gomoku.git
cd gomoku
bun install
bun run build:engine   # Compile Rust → WASM
bun run dev            # http://localhost:5173
```

**前提条件：** [Rust](https://rustup.rs/) · [Bun](https://bun.sh) · [wasm-pack](https://rustwasm.github.io/wasm-pack/installer/)

| レイヤー | 技術 |
|----------|------|
| エンジン | Rust, WebAssembly, wasm-pack |
| フロントエンド | React 19, TypeScript, Zustand, Vite |
| ホスティング | Cloudflare Pages |

詳細は [CONTRIBUTING.md](CONTRIBUTING.md) と [ARCHITECTURE.md](docs/ARCHITECTURE.md) をご覧ください。

</details>

---

<p align="center">
  <img src="https://img.shields.io/badge/Rust-WASM-orange?logo=rust" alt="Rust WASM" />
  <img src="https://img.shields.io/badge/React_19-TypeScript-blue?logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/License-MIT-yellow" alt="MIT License" />
</p>

<p align="center">
  <a href="https://github.com/tombelieber/gomoku">GitHub でスターを付ける</a> · <a href="https://open-gomoku.pages.dev">open-gomoku.pages.dev</a> · MIT License · <a href="https://github.com/tombelieber">Tom Tang</a> 作
</p>
