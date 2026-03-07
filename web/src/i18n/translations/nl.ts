import type { Translation } from "../types";

const nl: Translation = {
  common: {
    appTitle: "GOMOKU",
  },
  game: {
    difficulty: {
      easy: "Makkelijk",
      medium: "Gemiddeld",
      hard: "Moeilijk",
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
    win: "Zwart wint!",
    lose: "Wit wint",
    draw: "Gelijkspel!",
    playAgain: "Opnieuw spelen",
    review: "Terugkijken",
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
};

export default nl;
