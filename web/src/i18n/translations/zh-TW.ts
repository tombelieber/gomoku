import type { Translation } from "../types";

const zhTW: Translation = {
  subtitle: "GOMOKU",
  difficulty: {
    easy: "簡單",
    medium: "中等",
    hard: "困難",
  },
  loading: "載入引擎中...",
  status: {
    blackWins: "黑棋勝！",
    whiteWins: "白棋勝！",
    draw: "和棋！",
    yourTurnBlack: "你的回合 — 黑棋",
    yourTurnWhite: "你的回合 — 白棋",
  },
  aiThinking: "AI 思考中",
  undo: "悔棋",
  newGame: "開新局",
  gameEnd: {
    winSubtitle: "黑棋勝！",
    loseSubtitle: "白棋勝",
    drawSubtitle: "和棋！",
    clickToRestart: "點擊任意處開新局",
  },
  footer: {
    madeWith: "用心製作",
    by: "by",
    starOnGithub: "在 GitHub 上加星",
  },
};

export default zhTW;
