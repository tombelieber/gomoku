import type { Translation } from "../types";

const zhTW: Translation = {
  common: {
    appTitle: "GOMOKU",
  },
  game: {
    difficulty: {
      easy: "簡單",
      medium: "中等",
      hard: "困難",
    },
    status: {
      blackWins: "黑棋勝！",
      whiteWins: "白棋勝！",
      draw: "和棋！",
      yourTurnBlack: "你的回合 — 黑棋",
      yourTurnWhite: "你的回合 — 白棋",
    },
    controls: {
      undo: "悔棋",
      newGame: "開新局",
      start: "開始",
    },
    ai: {
      thinking: "AI 思考中",
    },
    loading: "載入引擎中...",
  },
  history: {
    panel: {
      header: "遊戲記錄",
    },
    labels: {
      won: "贏",
      lost: "輸",
      draw: "平",
    },
    dates: {
      today: "今天",
      yesterday: "昨天",
    },
    moves: "步",
    back: "返回",
  },
  gameEnd: {
    win: "黑棋勝！",
    lose: "白棋勝",
    draw: "和棋！",
    playAgain: "再來一局",
    review: "覆盤",
  },
  footer: {
    madeWith: "用心製作",
    by: "by",
    starOnGithub: "在 GitHub 上加星",
  },
  stats: {
    title: "勝敗紀錄",
  },
  settings: {
    title: "設定",
    difficulty: "難度",
    language: "語言",
    playAs: "執棋",
    playFirst: "先手 (黑)",
    playSecond: "後手 (白)",
  },
};

export default zhTW;
