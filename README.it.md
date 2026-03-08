<p align="center">
  <a href="README.md">English</a> · <a href="README.zh-TW.md">繁體中文</a> · <a href="README.zh-CN.md">简体中文</a> · <a href="README.ja.md">日本語</a> · <a href="README.ko.md">한국어</a> · <a href="README.de.md">Deutsch</a> · <a href="README.es.md">Español</a> · <a href="README.fr.md">Français</a> · <b>Italiano</b> · <a href="README.nl.md">Nederlands</a> · <a href="README.pt.md">Português</a>
</p>

# GOMOKU

### Riesci a battere l'IA nel gioco di strategia più antico del mondo?

<p align="center">
  <a href="https://open-gomoku.pages.dev"><img src="https://img.shields.io/badge/%E2%96%B6%EF%B8%8F_Gioca_ora-open--gomoku.pages.dev-black?style=for-the-badge&labelColor=000" alt="Gioca ora" /></a>
</p>

<p align="center">
  <img src="assets/en/screenshots/midgame.png" alt="Partita di Gomoku" width="320" />
</p>

<p align="center">
  Gratis. Nessuna registrazione. Nessun download. Gioca e basta.
</p>

---

<table>
  <tr>
    <td align="center" width="50%">
      <img src="assets/en/screenshots/midgame.png" alt="Partita in tempo reale" width="280" />
      <br /><b>Partita in tempo reale</b>
      <br /><sub>Timer di turno, indicatore IA, annulla mossa — tutto a portata di mano</sub>
    </td>
    <td align="center" width="50%">
      <img src="assets/en/screenshots/win.png" alt="Schermata di fine partita" width="280" />
      <br /><b>Riesci a vincere?</b>
      <br /><sub>Finali drammatici con kaomoji animati — vittoria o sconfitta</sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <img src="assets/en/screenshots/settings.png" alt="Impostazioni" width="280" />
      <br /><b>Personalizza tutto</b>
      <br /><sub>3 livelli di difficoltà, gioca con Nero o Bianco, statistiche V/S/P</sub>
    </td>
    <td align="center" width="50%">
      <img src="assets/en/screenshots/replay.png" alt="Replay mossa per mossa" width="280" />
      <br /><b>Rivedi ogni partita</b>
      <br /><sub>Scorri mossa per mossa, controlla il tempo di riflessione dell'IA</sub>
    </td>
  </tr>
</table>

---

## Perché questo?

- **IA imbattibile** — Motore Rust compilato in WebAssembly. Meno di 100ms a mossa. In bocca al lupo.
- **Funziona nel browser** — Nessuna app, nessun account. Qualsiasi dispositivo.
- **Mobile first** — Ottimizzato per il touch. Caricamento istantaneo.
- **11 lingue** — English, 繁體中文, 简体中文, 日本語, 한국어, Deutsch, Español, Français, Italiano, Nederlands, Português.
- **Cronologia e replay** — Ogni partita salvata. Rivedi qualsiasi partita mossa per mossa.

---

<details>
<summary><b>Per sviluppatori</b></summary>
<br />

```bash
git clone https://github.com/tombelieber/gomoku.git
cd gomoku
bun install
bun run build:engine   # Compile Rust → WASM
bun run dev            # http://localhost:5173
```

**Prerequisiti:** [Rust](https://rustup.rs/) · [Bun](https://bun.sh) · [wasm-pack](https://rustwasm.github.io/wasm-pack/installer/)

| Livello | Tecnologia |
|---------|------------|
| Engine | Rust, WebAssembly, wasm-pack |
| Frontend | React 19, TypeScript, Zustand, Vite |
| Hosting | Cloudflare Pages |

Vedi [CONTRIBUTING.md](CONTRIBUTING.md) e [ARCHITECTURE.md](docs/ARCHITECTURE.md) per approfondimenti.

</details>

---

<p align="center">
  <img src="https://img.shields.io/badge/Rust-WASM-orange?logo=rust" alt="Rust WASM" />
  <img src="https://img.shields.io/badge/React_19-TypeScript-blue?logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/License-MIT-yellow" alt="MIT License" />
</p>

<p align="center">
  <a href="https://github.com/tombelieber/gomoku">Stella su GitHub</a> · <a href="https://open-gomoku.pages.dev">open-gomoku.pages.dev</a> · MIT License · Creato da <a href="https://github.com/tombelieber">Tom Tang</a>
</p>
