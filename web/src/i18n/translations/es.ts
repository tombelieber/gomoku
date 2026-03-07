import type { Translation } from "../types";

const es: Translation = {
  common: {
    appTitle: "GOMOKU",
    brandTitle: "GOMOKU",
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
    back: "Volver",
  },
  gameEnd: {
    win: "¡Ganaste!",
    lose: "¡Perdiste!",
    draw: "¡Empate!",
    playAgain: "Jugar de nuevo",
    review: "Revisar",
    displayChar: {
      win: "VICTORIA",
      lose: "DERROTA",
      draw: "EMPATE",
    },
  },
  replay: {
    step: "Jugada {0} / {1}",
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
  pwa: {
    installTitle: "Jugar sin conexión",
    installAction: "Instalar app",
    iosGuide: "Toca Compartir y luego \"Añadir a pantalla de inicio\"",
    updateAvailable: "Actualización disponible",
    updateAction: "Actualizar",
    dismiss: "Ahora no",
    installed: "Instalada",
    iosStep1: "Toca",
    iosStep2: "Desplaza y toca",
    iosHomeScreen: "Añadir a pantalla de inicio",
    iosStep3: "Toca",
    iosAdd: "Añadir",
  },
};

export default es;
