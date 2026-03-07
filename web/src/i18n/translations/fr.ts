import type { Translation } from "../types";

const fr: Translation = {
  common: {
    appTitle: "GOMOKU",
  },
  game: {
    difficulty: {
      easy: "Facile",
      medium: "Moyen",
      hard: "Difficile",
    },
    status: {
      blackWins: "Noir gagne !",
      whiteWins: "Blanc gagne !",
      draw: "Match nul !",
      yourTurnBlack: "Ton tour — Noir",
      yourTurnWhite: "Ton tour — Blanc",
    },
    controls: {
      undo: "Annuler",
      newGame: "Nouvelle partie",
    },
    ai: {
      thinking: "IA réfléchit",
    },
    loading: "Chargement du moteur...",
  },
  history: {
    panel: {
      header: "Historique des parties",
    },
    labels: {
      won: "Gagné",
      lost: "Perdu",
      draw: "Nul",
    },
    dates: {
      today: "Aujourd'hui",
      yesterday: "Hier",
    },
    moves: "coups",
  },
  gameEnd: {
    win: "Noir gagne !",
    lose: "Blanc gagne",
    draw: "Match nul !",
    restartPrompt: "Cliquez n'importe où pour une nouvelle partie",
  },
  footer: {
    madeWith: "Fait avec",
    by: "par",
    starOnGithub: "Étoile sur GitHub",
  },
  settings: {
    title: "Paramètres",
    difficulty: "Difficulté",
    language: "Langue",
  },
};

export default fr;
