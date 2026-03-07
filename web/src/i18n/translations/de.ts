import type { Translation } from "../types";

const de: Translation = {
  common: {
    appTitle: "GOMOKU",
    brandTitle: "GOMOKU",
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
    win: "Du gewinnst!",
    lose: "Du verlierst!",
    draw: "Unentschieden!",
    playAgain: "Nochmal spielen",
    review: "Nachspiel",
    displayChar: {
      win: "SIEG",
      lose: "VERLOREN",
      draw: "REMIS",
    },
  },
  replay: {
    step: "Zug {0} / {1}",
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
  pwa: {
    installTitle: "Offline spielen",
    installAction: "App installieren",
    iosGuide: "Tippe auf Teilen, dann \"Zum Home-Bildschirm\"",
    updateAvailable: "Update verfügbar",
    updateAction: "Aktualisieren",
    dismiss: "Später",
    installed: "Installiert",
    iosStep1: "Tippe auf",
    iosStep2: "Scrolle & tippe auf",
    iosHomeScreen: "Zum Home-Bildschirm",
    iosStep3: "Tippe auf",
    iosAdd: "Hinzufügen",
  },
};

export default de;
