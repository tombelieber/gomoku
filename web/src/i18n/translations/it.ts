import type { Translation } from "../types";

const it: Translation = {
  common: {
    appTitle: "GOMOKU",
    brandTitle: "GOMOKU",
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
    win: "Hai vinto!",
    lose: "Hai perso!",
    draw: "Pareggio!",
    playAgain: "Gioca ancora",
    review: "Rivedi",
    displayChar: {
      win: "VINTO",
      lose: "PERSO",
      draw: "PARI",
    },
  },
  replay: {
    step: "Mossa {0} / {1}",
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
  pwa: {
    installTitle: "Gioca offline",
    installAction: "Installa app",
    iosGuide: "Tocca Condividi e poi \"Aggiungi alla schermata Home\"",
    updateAvailable: "Aggiornamento disponibile",
    updateAction: "Aggiorna",
    dismiss: "Non ora",
    installed: "Installata",
    iosStep1: "Tocca",
    iosStep2: "Scorri e tocca",
    iosHomeScreen: "Aggiungi alla schermata Home",
    iosStep3: "Tocca",
    iosAdd: "Aggiungi",
  },
};

export default it;
