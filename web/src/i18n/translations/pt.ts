import type { Translation } from "../types";

const pt: Translation = {
  common: {
    appTitle: "GOMOKU",
  },
  game: {
    difficulty: {
      easy: "Fácil",
      medium: "Médio",
      hard: "Difícil",
    },
    status: {
      blackWins: "Pretas vencem!",
      whiteWins: "Brancas vencem!",
      draw: "Empate!",
      yourTurnBlack: "Sua vez — Pretas",
      yourTurnWhite: "Sua vez — Brancas",
    },
    controls: {
      undo: "Desfazer",
      newGame: "Nova partida",
    },
    ai: {
      thinking: "IA pensando",
    },
    loading: "Carregando motor...",
  },
  history: {
    panel: {
      header: "Histórico de partidas",
    },
    labels: {
      won: "Ganhou",
      lost: "Perdeu",
      draw: "Empate",
    },
    dates: {
      today: "Hoje",
      yesterday: "Ontem",
    },
    moves: "movimentos",
  },
  gameEnd: {
    win: "Pretas vencem!",
    lose: "Brancas vencem",
    draw: "Empate!",
    restartPrompt: "Clique em qualquer lugar para nova partida",
  },
  footer: {
    madeWith: "Feito com",
    by: "por",
    starOnGithub: "Estrela no GitHub",
  },
};

export default pt;
