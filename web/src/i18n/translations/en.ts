// web/src/i18n/translations/en.ts
import type { Translation } from "../types";

const en: Translation = {
  common: {
    appTitle: "GOMOKU",
    brandTitle: "GOMOKU",
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
      start: "Start",
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
    back: "Return",
  },
  gameEnd: {
    win: "You win!",
    lose: "You lose!",
    draw: "Draw!",
    playAgain: "Play Again",
    review: "Review",
    displayChar: {
      win: "WIN",
      lose: "LOSS",
      draw: "DRAW",
    },
  },
  replay: {
    step: "Move {0} / {1}",
  },
  footer: {
    madeWith: "Made with",
    by: "by",
    starOnGithub: "Star on GitHub",
  },
  stats: {
    title: "Record",
  },
  settings: {
    title: "Settings",
    difficulty: "Difficulty",
    language: "Language",
    playAs: "Play as",
    playFirst: "First (Black)",
    playSecond: "Second (White)",
  },
  pwa: {
    installTitle: "Play offline",
    installAction: "Install App",
    iosGuide: "Tap Share then \"Add to Home Screen\"",
    updateAvailable: "Update available",
    updateAction: "Refresh",
    dismiss: "Not now",
    installed: "Installed",
  },
};

export default en;
