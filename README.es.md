<p align="center">
  <a href="README.md">English</a> · <a href="README.zh-TW.md">繁體中文</a> · <a href="README.zh-CN.md">简体中文</a> · <a href="README.ja.md">日本語</a> · <a href="README.ko.md">한국어</a> · <a href="README.de.md">Deutsch</a> · <b>Español</b> · <a href="README.fr.md">Français</a> · <a href="README.it.md">Italiano</a> · <a href="README.nl.md">Nederlands</a> · <a href="README.pt.md">Português</a>
</p>

# GOMOKU

### ¿Puedes ganarle a la IA en el juego de estrategia más antiguo del mundo?

<p align="center">
  <a href="https://open-gomoku.pages.dev"><img src="https://img.shields.io/badge/%E2%96%B6%EF%B8%8F_Jugar_ahora-open--gomoku.pages.dev-black?style=for-the-badge&labelColor=000" alt="Jugar ahora" /></a>
</p>

<p align="center">
  <img src="assets/en/screenshots/midgame.png" alt="Partida de Gomoku" width="320" />
</p>

<p align="center">
  Gratis. Sin registro. Sin descarga. Solo juega.
</p>

---

<table>
  <tr>
    <td align="center" width="50%">
      <img src="assets/en/screenshots/midgame.png" alt="Partida en tiempo real" width="280" />
      <br /><b>Partida en tiempo real</b>
      <br /><sub>Temporizador de turno, indicador de IA pensando, deshacer — todo al alcance</sub>
    </td>
    <td align="center" width="50%">
      <img src="assets/en/screenshots/win.png" alt="Pantalla de fin" width="280" />
      <br /><b>¿Puedes ganar?</b>
      <br /><sub>Finales dramáticos con kaomoji animados — ganar o perder</sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <img src="assets/en/screenshots/settings.png" alt="Configuración" width="280" />
      <br /><b>Personaliza todo</b>
      <br /><sub>3 niveles de dificultad, juega con negras o blancas, estadísticas V/D/E</sub>
    </td>
    <td align="center" width="50%">
      <img src="assets/en/screenshots/replay.png" alt="Repetición jugada a jugada" width="280" />
      <br /><b>Revisa cualquier partida</b>
      <br /><sub>Recorre jugada a jugada, ve el tiempo de pensamiento de la IA</sub>
    </td>
  </tr>
</table>

---

## ¿Por qué este?

- **IA invencible** — Motor Rust compilado a WebAssembly. Menos de 100ms por jugada. Buena suerte.
- **Funciona en tu navegador** — Sin apps, sin cuentas. Cualquier dispositivo.
- **Diseño mobile-first** — Optimizado para táctil. Carga instantánea.
- **11 idiomas** — English, 繁體中文, 简体中文, 日本語, 한국어, Deutsch, Español, Français, Italiano, Nederlands, Português.
- **Historial y repetición** — Cada partida guardada. Revisa cualquier partida pasada jugada a jugada.

---

<details>
<summary><b>Para desarrolladores</b></summary>
<br />

```bash
git clone https://github.com/tombelieber/gomoku.git
cd gomoku
bun install
bun run build:engine   # Compile Rust → WASM
bun run dev            # http://localhost:5173
```

**Requisitos:** [Rust](https://rustup.rs/) · [Bun](https://bun.sh) · [wasm-pack](https://rustwasm.github.io/wasm-pack/installer/)

| Capa | Tecnología |
|------|------------|
| Motor | Rust, WebAssembly, wasm-pack |
| Frontend | React 19, TypeScript, Zustand, Vite |
| Hosting | Cloudflare Pages |

Ver [CONTRIBUTING.md](CONTRIBUTING.md) y [ARCHITECTURE.md](docs/ARCHITECTURE.md) para más detalles.

</details>

---

<p align="center">
  <img src="https://img.shields.io/badge/Rust-WASM-orange?logo=rust" alt="Rust WASM" />
  <img src="https://img.shields.io/badge/React_19-TypeScript-blue?logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/License-MIT-yellow" alt="MIT License" />
</p>

<p align="center">
  <a href="https://github.com/tombelieber/gomoku">Estrella en GitHub</a> · <a href="https://open-gomoku.pages.dev">open-gomoku.pages.dev</a> · MIT License · Creado por <a href="https://github.com/tombelieber">Tom Tang</a>
</p>
