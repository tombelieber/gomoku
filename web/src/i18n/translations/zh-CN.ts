import type { Translation } from "../types";

const zhCN: Translation = {
  subtitle: "GOMOKU",
  difficulty: {
    easy: "简单",
    medium: "中等",
    hard: "困难",
  },
  loading: "加载引擎中...",
  status: {
    blackWins: "黑棋胜！",
    whiteWins: "白棋胜！",
    draw: "平局！",
    yourTurnBlack: "你的回合 — 黑棋",
    yourTurnWhite: "你的回合 — 白棋",
  },
  aiThinking: "AI 思考中",
  undo: "悔棋",
  newGame: "新局",
  gameEnd: {
    winSubtitle: "黑棋胜！",
    loseSubtitle: "白棋胜",
    drawSubtitle: "平局！",
    clickToRestart: "点击任意处开始新局",
  },
  footer: {
    madeWith: "用心制作",
    by: "by",
    starOnGithub: "在 GitHub 上加星",
  },
};

export default zhCN;
