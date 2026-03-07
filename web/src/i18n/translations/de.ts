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
      start: "Start",
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
    back: "Zurück",
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
  stats: {
    title: "Bilanz",
  },
  settings: {
    title: "Einstellungen",
    difficulty: "Schwierigkeit",
    language: "Sprache",
    playAs: "Spielen als",
    playFirst: "Erster (Schwarz)",
    playSecond: "Zweiter (Weiß)",
  },
};

export default de;
