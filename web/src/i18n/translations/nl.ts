import type { Translation } from "../types";

const nl: Translation = {
  common: {
    appTitle: "GOMOKU",
    brandTitle: "GOMOKU",
  },
  game: {
    difficulty: {
      easy: "Makkelijk",
      medium: "Gemiddeld",
      hard: "Moeilijk",
      expert: "Expert",
      master: "Meester",
    },
    status: {
      blackWins: "Zwart wint!",
      whiteWins: "Wit wint!",
      draw: "Gelijkspel!",
      yourTurnBlack: "Jouw beurt — Zwart",
      yourTurnWhite: "Jouw beurt — Wit",
    },
    controls: {
      undo: "Ongedaan maken",
      newGame: "Nieuw spel",
      start: "Start",
    },
    ai: {
      thinking: "AI denkt na",
    },
    loading: "Engine laden...",
  },
  history: {
    panel: {
      header: "Speelgeschiedenis",
    },
    labels: {
      won: "Gewonnen",
      lost: "Verloren",
      draw: "Gelijkspel",
    },
    dates: {
      today: "Vandaag",
      yesterday: "Gisteren",
    },
    moves: "zetten",
    back: "Terug",
  },
  gameEnd: {
    win: "Gewonnen!",
    lose: "Verloren!",
    draw: "Gelijkspel!",
    playAgain: "Opnieuw spelen",
    review: "Terugkijken",
    displayChar: {
      win: "WINST",
      lose: "VERLIES",
      draw: "GELIJK",
    },
  },
  replay: {
    step: "Zet {0} / {1}",
  },
  footer: {
    madeWith: "Gemaakt met",
    by: "door",
    starOnGithub: "Ster op GitHub",
  },
  stats: {
    title: "Stand",
  },
  settings: {
    title: "Instellingen",
    difficulty: "Moeilijkheid",
    language: "Taal",
    playAs: "Speel als",
    playFirst: "Eerste (Zwart)",
    playSecond: "Tweede (Wit)",
  },
  pwa: {
    installTitle: "Offline spelen",
    installAction: "App installeren",
    iosGuide: "Tik op Deel en dan \"Zet op beginscherm\"",
    updateAvailable: "Update beschikbaar",
    updateAction: "Vernieuwen",
    dismiss: "Later",
    installed: "Geïnstalleerd",
    iosStep1: "Tik op",
    iosStep2: "Scroll & tik op",
    iosHomeScreen: "Zet op beginscherm",
    iosStep3: "Tik op",
    iosAdd: "Voeg toe",
  },
};

export default nl;
