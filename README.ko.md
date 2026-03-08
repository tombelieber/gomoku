<p align="center">
  <a href="README.md">English</a> · <a href="README.zh-TW.md">繁體中文</a> · <a href="README.zh-CN.md">简体中文</a> · <a href="README.ja.md">日本語</a> · <b>한국어</b> · <a href="README.de.md">Deutsch</a> · <a href="README.es.md">Español</a> · <a href="README.fr.md">Français</a> · <a href="README.it.md">Italiano</a> · <a href="README.nl.md">Nederlands</a> · <a href="README.pt.md">Português</a>
</p>

# 오목

### AI를 이길 수 있을까요? 세계에서 가장 오래된 전략 게임에 도전하세요

<p align="center">
  <a href="https://open-gomoku.pages.dev"><img src="https://img.shields.io/badge/%E2%96%B6%EF%B8%8F_%EC%A7%80%EA%B8%88_%ED%94%8C%EB%A0%88%EC%9D%B4-open--gomoku.pages.dev-black?style=for-the-badge&labelColor=000" alt="지금 플레이" /></a>
</p>

<p align="center">
  <img src="assets/en/screenshots/midgame.png" alt="오목 게임 화면" width="320" />
</p>

<p align="center">
  무료. 가입 불필요. 다운로드 불필요. 바로 플레이.
</p>

---

<table>
  <tr>
    <td align="center" width="50%">
      <img src="assets/en/screenshots/midgame.png" alt="실시간 대국" width="280" />
      <br /><b>실시간 대국</b>
      <br /><sub>턴 타이머, AI 사고 표시, 무르기 — 모든 것이 손안에</sub>
    </td>
    <td align="center" width="50%">
      <img src="assets/en/screenshots/win.png" alt="게임 종료 화면" width="280" />
      <br /><b>AI를 이길 수 있을까?</b>
      <br /><sub>애니메이션 이모티콘과 함께하는 드라마틱한 결말</sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <img src="assets/en/screenshots/settings.png" alt="설정 화면" width="280" />
      <br /><b>모든 것을 커스터마이즈</b>
      <br /><sub>3단계 난이도, 흑돌·백돌 선택, 승/패/무 통계</sub>
    </td>
    <td align="center" width="50%">
      <img src="assets/en/screenshots/replay.png" alt="기보 재생" width="280" />
      <br /><b>모든 대국을 되돌아보기</b>
      <br /><sub>한 수씩 재생하며 AI 사고 시간 확인</sub>
    </td>
  </tr>
</table>

---

## 왜 이걸 선택할까?

- **무적 AI** — Rust 엔진을 WebAssembly로 컴파일. 한 수당 100밀리초 미만. 행운을 빕니다.
- **브라우저에서 실행** — 앱 설치 불필요, 계정 생성 불필요. 모든 기기에서.
- **모바일 퍼스트** — 터치 조작에 최적화. 즉시 로딩.
- **11개 언어** — English, 繁體中文, 简体中文, 日本語, 한국어, Deutsch, Español, Français, Italiano, Nederlands, Português.
- **대국 기록과 리플레이** — 모든 대국 자동 저장. 과거 대국을 한 수씩 되돌아보기.

---

<details>
<summary><b>개발자 정보</b></summary>
<br />

```bash
git clone https://github.com/tombelieber/gomoku.git
cd gomoku
bun install
bun run build:engine   # Compile Rust → WASM
bun run dev            # http://localhost:5173
```

**필수 조건:** [Rust](https://rustup.rs/) · [Bun](https://bun.sh) · [wasm-pack](https://rustwasm.github.io/wasm-pack/installer/)

| 레이어 | 기술 |
|--------|------|
| 엔진 | Rust, WebAssembly, wasm-pack |
| 프론트엔드 | React 19, TypeScript, Zustand, Vite |
| 호스팅 | Cloudflare Pages |

자세한 내용은 [CONTRIBUTING.md](CONTRIBUTING.md)와 [ARCHITECTURE.md](docs/ARCHITECTURE.md)를 참조하세요.

</details>

---

<p align="center">
  <img src="https://img.shields.io/badge/Rust-WASM-orange?logo=rust" alt="Rust WASM" />
  <img src="https://img.shields.io/badge/React_19-TypeScript-blue?logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/License-MIT-yellow" alt="MIT License" />
</p>

<p align="center">
  <a href="https://github.com/tombelieber/gomoku">GitHub에서 스타</a> · <a href="https://open-gomoku.pages.dev">open-gomoku.pages.dev</a> · MIT License · <a href="https://github.com/tombelieber">Tom Tang</a> 제작
</p>
