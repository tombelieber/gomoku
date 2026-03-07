import type { Translation } from "../types";

const it: Translation = {
  common: {
    appTitle: "GOMOKU",
  },
  game: {
    difficulty: {
      easy: "Facile",
      medium: "Medio",
      hard: "Difficile",
    },
    status: {
      blackWins: "Nero vince!",
      whiteWins: "Bianco vince!",
      draw: "Pareggio!",
      yourTurnBlack: "Il tuo turno — Nero",
      yourTurnWhite: "Il tuo turno — Bianco",
    },
    controls: {
      undo: "Annulla",
      newGame: "Nuova partita",
      start: "Inizia",
    },
    ai: {
      thinking: "IA sta pensando",
    },
    loading: "Caricamento motore...",
  },
  history: {
    panel: {
      header: "Storico delle partite",
    },
    labels: {
      won: "Vinto",
      lost: "Perso",
      draw: "Pareggio",
    },
    dates: {
      today: "Oggi",
      yesterday: "Ieri",
    },
    moves: "mosse",
    back: "Indietro",
  },
  gameEnd: {
    win: "Nero vince!",
    lose: "Bianco vince",
    draw: "Pareggio!",
    playAgain: "Gioca ancora",
    review: "Rivedi",
  },
  footer: {
    madeWith: "Fatto con",
    by: "da",
    starOnGithub: "Stella su GitHub",
  },
  stats: {
    title: "Bilancio",
  },
  settings: {
    title: "Impostazioni",
    difficulty: "Difficoltà",
    language: "Lingua",
    playAs: "Gioca come",
    playFirst: "Primo (Nero)",
    playSecond: "Secondo (Bianco)",
  },
};

export default it;
