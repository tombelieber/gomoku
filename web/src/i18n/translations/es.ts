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
    restartPrompt: "Haz clic en cualquier lugar para nueva partida",
  },
  footer: {
    madeWith: "Hecho con",
    by: "por",
    starOnGithub: "Estrella en GitHub",
  },
  settings: {
    title: "Ajustes",
    difficulty: "Dificultad",
    language: "Idioma",
  },
};

export default es;
