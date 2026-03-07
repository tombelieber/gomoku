import type { Translation } from "../types";

const pt: Translation = {
  subtitle: "GOMOKU",
  difficulty: {
    easy: "Fácil",
    medium: "Médio",
    hard: "Difícil",
  },
  loading: "Carregando motor...",
  status: {
    blackWins: "Pretas vencem!",
    whiteWins: "Brancas vencem!",
    draw: "Empate!",
    yourTurnBlack: "Sua vez — Pretas",
    yourTurnWhite: "Sua vez — Brancas",
  },
  aiThinking: "IA pensando",
  undo: "Desfazer",
  newGame: "Nova partida",
  gameEnd: {
    winSubtitle: "Pretas vencem!",
    loseSubtitle: "Brancas vencem",
    drawSubtitle: "Empate!",
    clickToRestart: "Clique em qualquer lugar para nova partida",
  },
  footer: {
    madeWith: "Feito com",
    by: "por",
    starOnGithub: "Estrela no GitHub",
  },
};

export default pt;
