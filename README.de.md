<p align="center">
  <a href="README.md">English</a> · <a href="README.zh-TW.md">繁體中文</a> · <a href="README.zh-CN.md">简体中文</a> · <a href="README.ja.md">日本語</a> · <a href="README.ko.md">한국어</a> · <b>Deutsch</b> · <a href="README.es.md">Español</a> · <a href="README.fr.md">Français</a> · <a href="README.it.md">Italiano</a> · <a href="README.nl.md">Nederlands</a> · <a href="README.pt.md">Português</a>
</p>

# GOMOKU

### Kannst du die KI besiegen — im ältesten Strategiespiel der Welt?

<p align="center">
  <a href="https://open-gomoku.pages.dev"><img src="https://img.shields.io/badge/%E2%96%B6%EF%B8%8F_Jetzt_spielen-open--gomoku.pages.dev-black?style=for-the-badge&labelColor=000" alt="Jetzt spielen" /></a>
</p>

<p align="center">
  <img src="assets/en/screenshots/midgame.png" alt="Gomoku Spielszene" width="320" />
</p>

<p align="center">
  Kostenlos. Keine Anmeldung. Kein Download. Einfach spielen.
</p>

---

<table>
  <tr>
    <td align="center" width="50%">
      <img src="assets/en/screenshots/midgame.png" alt="Echtzeit-Gameplay" width="280" />
      <br /><b>Echtzeit-Gameplay</b>
      <br /><sub>Zugtimer, KI-Denkzeit-Anzeige, Rückgängig — alles griffbereit</sub>
    </td>
    <td align="center" width="50%">
      <img src="assets/en/screenshots/win.png" alt="Spielende" width="280" />
      <br /><b>Kannst du die KI schlagen?</b>
      <br /><sub>Dramatische Enden mit animierten Kaomoji — Sieg oder Niederlage</sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <img src="assets/en/screenshots/settings.png" alt="Einstellungen" width="280" />
      <br /><b>Alles anpassen</b>
      <br /><sub>3 Schwierigkeitsstufen, Schwarz oder Weiß spielen, S/N/U-Statistiken</sub>
    </td>
    <td align="center" width="50%">
      <img src="assets/en/screenshots/replay.png" alt="Zugweise Wiedergabe" width="280" />
      <br /><b>Jedes Spiel nachspielen</b>
      <br /><sub>Züge einzeln durchgehen, KI-Denkzeit einsehen</sub>
    </td>
  </tr>
</table>

---

## Warum dieses Spiel?

- **Unbesiegbare KI** — Rust-Engine kompiliert zu WebAssembly. Unter 100ms pro Zug. Viel Glück.
- **Läuft im Browser** — Keine App, kein Konto. Funktioniert auf jedem Gerät.
- **Mobile First** — Für Touch optimiert. Sofort geladen.
- **11 Sprachen** — English, 繁體中文, 简体中文, 日本語, 한국어, Deutsch, Español, Français, Italiano, Nederlands, Português.
- **Spielhistorie & Wiedergabe** — Jedes Spiel wird gespeichert. Vergangene Partien Zug für Zug nachspielen.

---

<details>
<summary><b>Für Entwickler</b></summary>
<br />

```bash
git clone https://github.com/tombelieber/gomoku.git
cd gomoku
bun install
bun run build:engine   # Compile Rust → WASM
bun run dev            # http://localhost:5173
```

**Voraussetzungen:** [Rust](https://rustup.rs/) · [Bun](https://bun.sh) · [wasm-pack](https://rustwasm.github.io/wasm-pack/installer/)

| Schicht | Technologie |
|---------|-------------|
| Engine | Rust, WebAssembly, wasm-pack |
| Frontend | React 19, TypeScript, Zustand, Vite |
| Hosting | Cloudflare Pages |

Siehe [CONTRIBUTING.md](CONTRIBUTING.md) und [ARCHITECTURE.md](docs/ARCHITECTURE.md) für Details.

</details>

---

<p align="center">
  <img src="https://img.shields.io/badge/Rust-WASM-orange?logo=rust" alt="Rust WASM" />
  <img src="https://img.shields.io/badge/React_19-TypeScript-blue?logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/License-MIT-yellow" alt="MIT License" />
</p>

<p align="center">
  <a href="https://github.com/tombelieber/gomoku">Stern auf GitHub</a> · <a href="https://open-gomoku.pages.dev">open-gomoku.pages.dev</a> · MIT License · Erstellt von <a href="https://github.com/tombelieber">Tom Tang</a>
</p>
