import type { Translation } from "../types";

const it: Translation = {
  subtitle: "GOMOKU",
  difficulty: {
    easy: "Facile",
    medium: "Medio",
    hard: "Difficile",
  },
  loading: "Caricamento motore...",
  status: {
    blackWins: "Nero vince!",
    whiteWins: "Bianco vince!",
    draw: "Pareggio!",
    yourTurnBlack: "Il tuo turno — Nero",
    yourTurnWhite: "Il tuo turno — Bianco",
  },
  aiThinking: "IA sta pensando",
  undo: "Annulla",
  newGame: "Nuova partita",
  gameEnd: {
    winSubtitle: "Nero vince!",
    loseSubtitle: "Bianco vince",
    drawSubtitle: "Pareggio!",
    clickToRestart: "Clicca ovunque per una nuova partita",
  },
  footer: {
    madeWith: "Fatto con",
    by: "da",
    starOnGithub: "Stella su GitHub",
  },
};

export default it;
