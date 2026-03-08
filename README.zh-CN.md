<p align="center">
  <a href="README.md">English</a> · <a href="README.zh-TW.md">繁體中文</a> · <b>简体中文</b> · <a href="README.ja.md">日本語</a> · <a href="README.ko.md">한국어</a> · <a href="README.de.md">Deutsch</a> · <a href="README.es.md">Español</a> · <a href="README.fr.md">Français</a> · <a href="README.it.md">Italiano</a> · <a href="README.nl.md">Nederlands</a> · <a href="README.pt.md">Português</a>
</p>

# 五子棋

### 你能打败 AI 吗？来挑战世界上最古老的策略游戏

<p align="center">
  <a href="https://open-gomoku.pages.dev"><img src="https://img.shields.io/badge/%E2%96%B6%EF%B8%8F_%E7%AB%8B%E5%8D%B3%E5%BC%80%E7%8E%A9-open--gomoku.pages.dev-black?style=for-the-badge&labelColor=000" alt="立即开玩" /></a>
</p>

<p align="center">
  <img src="assets/zh-TW/screenshots/midgame.png" alt="五子棋游戏画面" width="320" />
</p>

<p align="center">
  免费。无需注册。无需下载。直接开玩。
</p>

---

<table>
  <tr>
    <td align="center" width="50%">
      <img src="assets/zh-TW/screenshots/midgame.png" alt="实时对弈画面" width="280" />
      <br /><b>实时对弈</b>
      <br /><sub>回合计时、AI 思考指示、悔棋 — 尽在掌中</sub>
    </td>
    <td align="center" width="50%">
      <img src="assets/en/screenshots/win.png" alt="游戏结束画面" width="280" />
      <br /><b>你能赢吗？</b>
      <br /><sub>戏剧性的结局配上动态颜文字 — 胜或败</sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <img src="assets/zh-TW/screenshots/settings.png" alt="设置面板" width="280" />
      <br /><b>自定义一切</b>
      <br /><sub>3 种难度、选择执黑或执白、胜/负/平统计</sub>
    </td>
    <td align="center" width="50%">
      <img src="assets/zh-TW/screenshots/replay.png" alt="逐步回放" width="280" />
      <br /><b>回顾任何棋局</b>
      <br /><sub>逐步浏览每一手，查看 AI 思考时间</sub>
    </td>
  </tr>
</table>

---

## 为什么选这个？

- **无敌 AI** — Rust 引擎编译为 WebAssembly，每手不到 100 毫秒。祝你好运。
- **浏览器直接跑** — 无需安装 App，无需创建账号。任何设备都能玩。
- **移动端优先** — 为触控操作优化的界面。瞬间加载。
- **11 种语言** — English, 繁體中文, 简体中文, 日本語, 한국어, Deutsch, Español, Français, Italiano, Nederlands, Português.
- **对局历史与回放** — 每盘棋自动保存。逐步回顾任何一场对局。

---

<details>
<summary><b>开发者信息</b></summary>
<br />

```bash
git clone https://github.com/tombelieber/gomoku.git
cd gomoku
bun install
bun run build:engine   # Compile Rust → WASM
bun run dev            # http://localhost:5173
```

**必要条件：** [Rust](https://rustup.rs/) · [Bun](https://bun.sh) · [wasm-pack](https://rustwasm.github.io/wasm-pack/installer/)

| 层级 | 技术 |
|------|------|
| 引擎 | Rust, WebAssembly, wasm-pack |
| 前端 | React 19, TypeScript, Zustand, Vite |
| 部署 | Cloudflare Pages |

详见 [CONTRIBUTING.md](CONTRIBUTING.md) 和 [ARCHITECTURE.md](docs/ARCHITECTURE.md)。

</details>

---

<p align="center">
  <img src="https://img.shields.io/badge/Rust-WASM-orange?logo=rust" alt="Rust WASM" />
  <img src="https://img.shields.io/badge/React_19-TypeScript-blue?logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/License-MIT-yellow" alt="MIT License" />
</p>

<p align="center">
  <a href="https://github.com/tombelieber/gomoku">在 GitHub 上加星</a> · <a href="https://open-gomoku.pages.dev">open-gomoku.pages.dev</a> · MIT License · 由 <a href="https://github.com/tombelieber">Tom Tang</a> 制作
</p>
