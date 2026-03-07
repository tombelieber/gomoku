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
      start: "Démarrer",
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
    back: "Retour",
  },
  gameEnd: {
    win: "Noir gagne !",
    lose: "Blanc gagne",
    draw: "Match nul !",
    playAgain: "Rejouer",
    review: "Revoir",
  },
  footer: {
    madeWith: "Fait avec",
    by: "par",
    starOnGithub: "Étoile sur GitHub",
  },
  stats: {
    title: "Bilan",
  },
  settings: {
    title: "Paramètres",
    difficulty: "Difficulté",
    language: "Langue",
    playAs: "Jouer en",
    playFirst: "Premier (Noir)",
    playSecond: "Second (Blanc)",
  },
};

export default fr;
