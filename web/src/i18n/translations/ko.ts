import type { Translation } from "../types";

const ko: Translation = {
  common: {
    appTitle: "오목",
  },
  game: {
    difficulty: {
      easy: "쉬움",
      medium: "보통",
      hard: "어려움",
    },
    status: {
      blackWins: "흑돌 승리!",
      whiteWins: "백돌 승리!",
      draw: "무승부!",
      yourTurnBlack: "당신의 차례 — 흑돌",
      yourTurnWhite: "당신의 차례 — 백돌",
    },
    controls: {
      undo: "무르기",
      newGame: "새 게임",
    },
    ai: {
      thinking: "AI 생각 중",
    },
    loading: "엔진 로딩 중...",
  },
  history: {
    panel: {
      header: "게임 기록",
    },
    labels: {
      won: "승리",
      lost: "패배",
      draw: "무승부",
    },
    dates: {
      today: "오늘",
      yesterday: "어제",
    },
    moves: "수",
  },
  gameEnd: {
    win: "흑돌 승리!",
    lose: "백돌 승리",
    draw: "무승부!",
    restartPrompt: "아무 곳이나 클릭하여 새 게임 시작",
  },
  footer: {
    madeWith: "Made with",
    by: "by",
    starOnGithub: "GitHub에서 스타",
  },
};

export default ko;
