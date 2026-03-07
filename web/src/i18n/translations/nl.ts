import type { Translation } from "../types";

const nl: Translation = {
  subtitle: "GOMOKU",
  difficulty: {
    easy: "Makkelijk",
    medium: "Gemiddeld",
    hard: "Moeilijk",
  },
  loading: "Engine laden...",
  status: {
    blackWins: "Zwart wint!",
    whiteWins: "Wit wint!",
    draw: "Gelijkspel!",
    yourTurnBlack: "Jouw beurt — Zwart",
    yourTurnWhite: "Jouw beurt — Wit",
  },
  aiThinking: "AI denkt na",
  undo: "Ongedaan maken",
  newGame: "Nieuw spel",
  gameEnd: {
    winSubtitle: "Zwart wint!",
    loseSubtitle: "Wit wint",
    drawSubtitle: "Gelijkspel!",
    clickToRestart: "Klik ergens om een nieuw spel te starten",
  },
  footer: {
    madeWith: "Gemaakt met",
    by: "door",
    starOnGithub: "Ster op GitHub",
  },
};

export default nl;
