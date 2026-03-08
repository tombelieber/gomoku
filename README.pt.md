<p align="center">
  <a href="README.md">English</a> · <a href="README.zh-TW.md">繁體中文</a> · <a href="README.zh-CN.md">简体中文</a> · <a href="README.ja.md">日本語</a> · <a href="README.ko.md">한국어</a> · <a href="README.de.md">Deutsch</a> · <a href="README.es.md">Español</a> · <a href="README.fr.md">Français</a> · <a href="README.it.md">Italiano</a> · <a href="README.nl.md">Nederlands</a> · <b>Português</b>
</p>

# GOMOKU

### Consegues vencer a IA no jogo de estratégia mais antigo do mundo?

<p align="center">
  <a href="https://open-gomoku.pages.dev"><img src="https://img.shields.io/badge/%E2%96%B6%EF%B8%8F_Jogar_agora-open--gomoku.pages.dev-black?style=for-the-badge&labelColor=000" alt="Jogar agora" /></a>
</p>

<p align="center">
  <img src="assets/en/screenshots/midgame.png" alt="Jogo de Gomoku" width="320" />
</p>

<p align="center">
  Grátis. Sem registo. Sem download. Joga agora.
</p>

---

<table>
  <tr>
    <td align="center" width="50%">
      <img src="assets/en/screenshots/midgame.png" alt="Jogo em tempo real" width="280" />
      <br /><b>Jogo em tempo real</b>
      <br /><sub>Temporizador de turno, indicador de IA a pensar, desfazer — tudo à mão</sub>
    </td>
    <td align="center" width="50%">
      <img src="assets/en/screenshots/win.png" alt="Ecrã de fim" width="280" />
      <br /><b>Consegues ganhar?</b>
      <br /><sub>Finais dramáticos com kaomoji animados — vitória ou derrota</sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <img src="assets/en/screenshots/settings.png" alt="Definições" width="280" />
      <br /><b>Personaliza tudo</b>
      <br /><sub>3 níveis de dificuldade, joga com Pretas ou Brancas, estatísticas V/D/E</sub>
    </td>
    <td align="center" width="50%">
      <img src="assets/en/screenshots/replay.png" alt="Repetição jogada a jogada" width="280" />
      <br /><b>Revê qualquer jogo</b>
      <br /><sub>Percorre jogada a jogada, vê o tempo de reflexão da IA</sub>
    </td>
  </tr>
</table>

---

## Porquê este?

- **IA invencível** — Motor Rust compilado para WebAssembly. Menos de 100ms por jogada. Boa sorte.
- **Funciona no browser** — Sem app, sem conta. Qualquer dispositivo.
- **Mobile first** — Otimizado para toque. Carregamento instantâneo.
- **11 idiomas** — English, 繁體中文, 简体中文, 日本語, 한국어, Deutsch, Español, Français, Italiano, Nederlands, Português.
- **Histórico e repetição** — Cada jogo guardado. Revê qualquer partida jogada a jogada.

---

<details>
<summary><b>Para programadores</b></summary>
<br />

```bash
git clone https://github.com/tombelieber/gomoku.git
cd gomoku
bun install
bun run build:engine   # Compile Rust → WASM
bun run dev            # http://localhost:5173
```

**Pré-requisitos:** [Rust](https://rustup.rs/) · [Bun](https://bun.sh) · [wasm-pack](https://rustwasm.github.io/wasm-pack/installer/)

| Camada | Tecnologia |
|--------|------------|
| Motor | Rust, WebAssembly, wasm-pack |
| Frontend | React 19, TypeScript, Zustand, Vite |
| Alojamento | Cloudflare Pages |

Ver [CONTRIBUTING.md](CONTRIBUTING.md) e [ARCHITECTURE.md](docs/ARCHITECTURE.md) para mais detalhes.

</details>

---

<p align="center">
  <img src="https://img.shields.io/badge/Rust-WASM-orange?logo=rust" alt="Rust WASM" />
  <img src="https://img.shields.io/badge/React_19-TypeScript-blue?logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/License-MIT-yellow" alt="MIT License" />
</p>

<p align="center">
  <a href="https://github.com/tombelieber/gomoku">Estrela no GitHub</a> · <a href="https://open-gomoku.pages.dev">open-gomoku.pages.dev</a> · MIT License · Criado por <a href="https://github.com/tombelieber">Tom Tang</a>
</p>
