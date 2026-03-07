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
  },
  gameEnd: {
    win: "Zwart wint!",
    lose: "Wit wint",
    draw: "Gelijkspel!",
    restartPrompt: "Klik ergens om een nieuw spel te starten",
  },
  footer: {
    madeWith: "Gemaakt met",
    by: "door",
    starOnGithub: "Ster op GitHub",
  },
};

export default nl;
