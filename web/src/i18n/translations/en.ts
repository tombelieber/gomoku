// web/src/i18n/translations/en.ts
import type { Translation } from "../types";

const en: Translation = {
  common: {
    appTitle: "GOMOKU",
  },
  game: {
    difficulty: {
      easy: "Easy",
      medium: "Medium",
      hard: "Hard",
    },
    status: {
      blackWins: "Black wins!",
      whiteWins: "White wins!",
      draw: "Draw!",
      yourTurnBlack: "Your turn — Black",
      yourTurnWhite: "Your turn — White",
    },
    controls: {
      undo: "Undo",
      newGame: "New Game",
    },
    ai: {
      thinking: "AI thinking",
    },
    loading: "Loading engine...",
  },
  history: {
    panel: {
      header: "Game Records",
    },
    labels: {
      won: "Won",
      lost: "Lost",
      draw: "Draw",
    },
    dates: {
      today: "Today",
      yesterday: "Yesterday",
    },
    moves: "moves",
  },
  gameEnd: {
    win: "Black wins!",
    lose: "White wins",
    draw: "Draw!",
    restartPrompt: "Click anywhere to start a new game",
  },
  footer: {
    madeWith: "Made with",
    by: "by",
    starOnGithub: "Star on GitHub",
  },
};

export default en;
