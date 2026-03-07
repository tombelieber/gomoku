import type { Translation } from "../types";

const ja: Translation = {
  common: {
    appTitle: "五目並べ",
  },
  game: {
    difficulty: {
      easy: "かんたん",
      medium: "ふつう",
      hard: "むずかしい",
    },
    status: {
      blackWins: "黒の勝ち！",
      whiteWins: "白の勝ち！",
      draw: "引き分け！",
      yourTurnBlack: "あなたの番 — 黒",
      yourTurnWhite: "あなたの番 — 白",
    },
    controls: {
      undo: "待った",
      newGame: "新しい対局",
    },
    ai: {
      thinking: "AI 思考中",
    },
    loading: "エンジン読み込み中...",
  },
  history: {
    panel: {
      header: "対局記録",
    },
    labels: {
      won: "勝",
      lost: "負",
      draw: "平",
    },
    dates: {
      today: "今日",
      yesterday: "昨日",
    },
    moves: "手",
  },
  gameEnd: {
    win: "黒の勝ち！",
    lose: "白の勝ち",
    draw: "引き分け！",
    restartPrompt: "クリックして新しい対局を開始",
  },
  footer: {
    madeWith: "Made with",
    by: "by",
    starOnGithub: "GitHub でスター",
  },
};

export default ja;
