import type { Translation } from "../types";

const fr: Translation = {
  subtitle: "GOMOKU",
  difficulty: {
    easy: "Facile",
    medium: "Moyen",
    hard: "Difficile",
  },
  loading: "Chargement du moteur...",
  status: {
    blackWins: "Noir gagne !",
    whiteWins: "Blanc gagne !",
    draw: "Match nul !",
    yourTurnBlack: "Ton tour — Noir",
    yourTurnWhite: "Ton tour — Blanc",
  },
  aiThinking: "IA réfléchit",
  undo: "Annuler",
  newGame: "Nouvelle partie",
  gameEnd: {
    winSubtitle: "Noir gagne !",
    loseSubtitle: "Blanc gagne",
    drawSubtitle: "Match nul !",
    clickToRestart: "Cliquez n'importe où pour une nouvelle partie",
  },
  footer: {
    madeWith: "Fait avec",
    by: "par",
    starOnGithub: "Étoile sur GitHub",
  },
};

export default fr;
