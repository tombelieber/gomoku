import type { Translation } from "../types";

const fr: Translation = {
  common: {
    appTitle: "GOMOKU",
    brandTitle: "GOMOKU",
  },
  game: {
    difficulty: {
      easy: "Facile",
      medium: "Moyen",
      hard: "Difficile",
      expert: "Expert",
      master: "Maître",
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
    win: "Victoire !",
    lose: "Défaite !",
    draw: "Match nul !",
    playAgain: "Rejouer",
    review: "Revoir",
    displayChar: {
      win: "GAGNÉ",
      lose: "PERDU",
      draw: "NUL",
    },
  },
  replay: {
    step: "Coup {0} / {1}",
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
  pwa: {
    installTitle: "Jouer hors ligne",
    installAction: "Installer l'appli",
    iosGuide: "Appuyez sur Partager puis \"Sur l'écran d'accueil\"",
    updateAvailable: "Mise à jour disponible",
    updateAction: "Rafraîchir",
    dismiss: "Plus tard",
    installed: "Installée",
    iosStep1: "Appuyez sur",
    iosStep2: "Faites défiler et appuyez sur",
    iosHomeScreen: "Sur l'écran d'accueil",
    iosStep3: "Appuyez sur",
    iosAdd: "Ajouter",
  },
};

export default fr;
