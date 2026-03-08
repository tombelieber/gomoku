<p align="center">
  <a href="README.md">English</a> · <a href="README.zh-TW.md">繁體中文</a> · <a href="README.zh-CN.md">简体中文</a> · <a href="README.ja.md">日本語</a> · <a href="README.ko.md">한국어</a> · <a href="README.de.md">Deutsch</a> · <a href="README.es.md">Español</a> · <a href="README.fr.md">Français</a> · <a href="README.it.md">Italiano</a> · <b>Nederlands</b> · <a href="README.pt.md">Português</a>
</p>

# GOMOKU

### Kun jij de AI verslaan in het oudste strategiespel ter wereld?

<p align="center">
  <a href="https://open-gomoku.pages.dev"><img src="https://img.shields.io/badge/%E2%96%B6%EF%B8%8F_Nu_spelen-open--gomoku.pages.dev-black?style=for-the-badge&labelColor=000" alt="Nu spelen" /></a>
</p>

<p align="center">
  <img src="assets/en/screenshots/midgame.png" alt="Gomoku gameplay" width="320" />
</p>

<p align="center">
  Gratis. Geen account. Geen download. Gewoon spelen.
</p>

---

<table>
  <tr>
    <td align="center" width="50%">
      <img src="assets/en/screenshots/midgame.png" alt="Realtime gameplay" width="280" />
      <br /><b>Realtime gameplay</b>
      <br /><sub>Beurttimer, AI-denkindicator, ongedaan maken — alles bij de hand</sub>
    </td>
    <td align="center" width="50%">
      <img src="assets/en/screenshots/win.png" alt="Einde scherm" width="280" />
      <br /><b>Kun jij winnen?</b>
      <br /><sub>Dramatische eindes met geanimeerde kaomoji — winst of verlies</sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <img src="assets/en/screenshots/settings.png" alt="Instellingen" width="280" />
      <br /><b>Pas alles aan</b>
      <br /><sub>3 moeilijkheidsgraden, speel als Zwart of Wit, W/V/G-statistieken</sub>
    </td>
    <td align="center" width="50%">
      <img src="assets/en/screenshots/replay.png" alt="Zet-voor-zet herhaling" width="280" />
      <br /><b>Bekijk elk spel terug</b>
      <br /><sub>Stap door elke zet, bekijk AI-denktijd</sub>
    </td>
  </tr>
</table>

---

## Waarom deze?

- **Onverslaanbare AI** — Rust-engine gecompileerd naar WebAssembly. Minder dan 100ms per zet. Succes.
- **Draait in je browser** — Geen app, geen account. Elk apparaat.
- **Mobile first** — Geoptimaliseerd voor touch. Direct geladen.
- **11 talen** — English, 繁體中文, 简体中文, 日本語, 한국어, Deutsch, Español, Français, Italiano, Nederlands, Português.
- **Spelgeschiedenis & herhaling** — Elk spel opgeslagen. Bekijk elke partij zet voor zet terug.

---

<details>
<summary><b>Voor ontwikkelaars</b></summary>
<br />

```bash
git clone https://github.com/tombelieber/gomoku.git
cd gomoku
bun install
bun run build:engine   # Compile Rust → WASM
bun run dev            # http://localhost:5173
```

**Vereisten:** [Rust](https://rustup.rs/) · [Bun](https://bun.sh) · [wasm-pack](https://rustwasm.github.io/wasm-pack/installer/)

| Laag | Technologie |
|------|-------------|
| Engine | Rust, WebAssembly, wasm-pack |
| Frontend | React 19, TypeScript, Zustand, Vite |
| Hosting | Cloudflare Pages |

Zie [CONTRIBUTING.md](CONTRIBUTING.md) en [ARCHITECTURE.md](docs/ARCHITECTURE.md) voor details.

</details>

---

<p align="center">
  <img src="https://img.shields.io/badge/Rust-WASM-orange?logo=rust" alt="Rust WASM" />
  <img src="https://img.shields.io/badge/React_19-TypeScript-blue?logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/License-MIT-yellow" alt="MIT License" />
</p>

<p align="center">
  <a href="https://github.com/tombelieber/gomoku">Ster op GitHub</a> · <a href="https://open-gomoku.pages.dev">open-gomoku.pages.dev</a> · MIT License · Gemaakt door <a href="https://github.com/tombelieber">Tom Tang</a>
</p>
