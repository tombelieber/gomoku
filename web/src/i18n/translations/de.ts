import type { Translation } from "../types";

const de: Translation = {
  subtitle: "GOMOKU",
  difficulty: {
    easy: "Leicht",
    medium: "Mittel",
    hard: "Schwer",
  },
  loading: "Engine wird geladen...",
  status: {
    blackWins: "Schwarz gewinnt!",
    whiteWins: "Weiß gewinnt!",
    draw: "Unentschieden!",
    yourTurnBlack: "Du bist dran — Schwarz",
    yourTurnWhite: "Du bist dran — Weiß",
  },
  aiThinking: "KI denkt nach",
  undo: "Rückgängig",
  newGame: "Neues Spiel",
  gameEnd: {
    winSubtitle: "Schwarz gewinnt!",
    loseSubtitle: "Weiß gewinnt",
    drawSubtitle: "Unentschieden!",
    clickToRestart: "Klicke irgendwo für ein neues Spiel",
  },
  footer: {
    madeWith: "Erstellt mit",
    by: "von",
    starOnGithub: "Stern auf GitHub",
  },
};

export default de;
