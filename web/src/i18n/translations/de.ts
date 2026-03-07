import type { Translation } from "../types";

const de: Translation = {
  common: {
    appTitle: "GOMOKU",
  },
  game: {
    difficulty: {
      easy: "Leicht",
      medium: "Mittel",
      hard: "Schwer",
    },
    status: {
      blackWins: "Schwarz gewinnt!",
      whiteWins: "Weiß gewinnt!",
      draw: "Unentschieden!",
      yourTurnBlack: "Du bist dran — Schwarz",
      yourTurnWhite: "Du bist dran — Weiß",
    },
    controls: {
      undo: "Rückgängig",
      newGame: "Neues Spiel",
    },
    ai: {
      thinking: "KI denkt nach",
    },
    loading: "Engine wird geladen...",
  },
  history: {
    panel: {
      header: "Spielverlauf",
    },
    labels: {
      won: "Gewonnen",
      lost: "Verloren",
      draw: "Unentschieden",
    },
    dates: {
      today: "Heute",
      yesterday: "Gestern",
    },
    moves: "Züge",
  },
  gameEnd: {
    win: "Schwarz gewinnt!",
    lose: "Weiß gewinnt",
    draw: "Unentschieden!",
    playAgain: "Nochmal spielen",
    review: "Nachspiel",
  },
  footer: {
    madeWith: "Erstellt mit",
    by: "von",
    starOnGithub: "Stern auf GitHub",
  },
  settings: {
    title: "Einstellungen",
    difficulty: "Schwierigkeit",
    language: "Sprache",
  },
};

export default de;
