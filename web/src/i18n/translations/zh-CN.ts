import type { Translation } from "../types";

const zhCN: Translation = {
  common: {
    appTitle: "GOMOKU",
  },
  game: {
    difficulty: {
      easy: "简单",
      medium: "中等",
      hard: "困难",
    },
    status: {
      blackWins: "黑棋胜！",
      whiteWins: "白棋胜！",
      draw: "平局！",
      yourTurnBlack: "你的回合 — 黑棋",
      yourTurnWhite: "你的回合 — 白棋",
    },
    controls: {
      undo: "悔棋",
      newGame: "新局",
    },
    ai: {
      thinking: "AI 思考中",
    },
    loading: "加载引擎中...",
  },
  history: {
    panel: {
      header: "游戏记录",
    },
    labels: {
      won: "赢",
      lost: "输",
      draw: "平",
    },
    dates: {
      today: "今天",
      yesterday: "昨天",
    },
    moves: "步",
  },
  gameEnd: {
    win: "黑棋胜！",
    lose: "白棋胜",
    draw: "平局！",
    playAgain: "再来一局",
    review: "复盘",
  },
  footer: {
    madeWith: "用心制作",
    by: "by",
    starOnGithub: "在 GitHub 上加星",
  },
  settings: {
    title: "设置",
    difficulty: "难度",
    language: "语言",
  },
};

export default zhCN;
