import type { Translation } from "../types";

const ko: Translation = {
  common: {
    appTitle: "오목",
    brandTitle: "오목",
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
      start: "시작",
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
    back: "돌아가기",
  },
  gameEnd: {
    win: "승리!",
    lose: "패배!",
    draw: "무승부!",
    playAgain: "다시 하기",
    review: "복기",
    displayChar: {
      win: "승",
      lose: "패",
      draw: "무",
    },
  },
  replay: {
    step: "{0} / {1} 수",
  },
  footer: {
    madeWith: "Made with",
    by: "by",
    starOnGithub: "GitHub에서 스타",
  },
  stats: {
    title: "전적",
  },
  settings: {
    title: "설정",
    difficulty: "난이도",
    language: "언어",
    playAs: "플레이",
    playFirst: "선공 (흑돌)",
    playSecond: "후공 (백돌)",
  },
};

export default ko;
