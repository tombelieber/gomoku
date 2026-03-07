import type { Translation } from "../types";

const es: Translation = {
  common: {
    appTitle: "GOMOKU",
  },
  game: {
    difficulty: {
      easy: "Fácil",
      medium: "Medio",
      hard: "Difícil",
    },
    status: {
      blackWins: "¡Negras ganan!",
      whiteWins: "¡Blancas ganan!",
      draw: "¡Empate!",
      yourTurnBlack: "Tu turno — Negras",
      yourTurnWhite: "Tu turno — Blancas",
    },
    controls: {
      undo: "Deshacer",
      newGame: "Nueva partida",
      start: "Iniciar",
    },
    ai: {
      thinking: "IA pensando",
    },
    loading: "Cargando motor...",
  },
  history: {
    panel: {
      header: "Historial de partidas",
    },
    labels: {
      won: "Ganado",
      lost: "Perdido",
      draw: "Empate",
    },
    dates: {
      today: "Hoy",
      yesterday: "Ayer",
    },
    moves: "movimientos",
  },
  gameEnd: {
    win: "¡Negras ganan!",
    lose: "Blancas ganan",
    draw: "¡Empate!",
    playAgain: "Jugar de nuevo",
    review: "Revisar",
  },
  footer: {
    madeWith: "Hecho con",
    by: "por",
    starOnGithub: "Estrella en GitHub",
  },
  stats: {
    title: "Récord",
  },
  settings: {
    title: "Ajustes",
    difficulty: "Dificultad",
    language: "Idioma",
    playAs: "Jugar como",
    playFirst: "Primero (Negras)",
    playSecond: "Segundo (Blancas)",
  },
};

export default es;
