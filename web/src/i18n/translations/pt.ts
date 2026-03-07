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
      start: "Iniciar",
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
    back: "Voltar",
  },
  gameEnd: {
    win: "Vitória!",
    lose: "Derrota!",
    draw: "Empate!",
    playAgain: "Jogar novamente",
    review: "Revisar",
    displayChar: {
      win: "VITÓRIA",
      lose: "DERROTA",
      draw: "EMPATE",
    },
  },
  replay: {
    step: "Jogada {0} / {1}",
  },
  footer: {
    madeWith: "Feito com",
    by: "por",
    starOnGithub: "Estrela no GitHub",
  },
  stats: {
    title: "Placar",
  },
  settings: {
    title: "Configurações",
    difficulty: "Dificuldade",
    language: "Idioma",
    playAs: "Jogar como",
    playFirst: "Primeiro (Pretas)",
    playSecond: "Segundo (Brancas)",
  },
};

export default pt;
