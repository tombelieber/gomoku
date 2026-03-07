import { create } from "zustand";
import { EngineBridge, type GameState } from "@/lib/engine-bridge";
import { saveGame } from "@/lib/game-history";

type Difficulty = 0 | 1 | 2;

type GameStore = {
  board: number[][];
  winner: string | null;
  isDraw: boolean;
  currentPlayer: string;
  difficulty: Difficulty;
  isThinking: boolean;
  isReady: boolean;
  lastAiMove: { x: number; y: number } | null;
  lastPlayerMove: { x: number; y: number } | null;
  moveLog: { x: number; y: number; player: "black" | "white"; thinkMs?: number }[];
  playerColor: "black" | "white";
  waitingToStart: boolean;
  turnStartTime: number | null;

  bridge: EngineBridge | null;
  init: () => Promise<void>;
  playMove: (x: number, y: number) => Promise<void>;
  undo: () => void;
  reset: () => void;
  setDifficulty: (d: Difficulty) => void;
  setPlayerColor: (color: "black" | "white") => void;
  startGame: () => Promise<void>;
  destroy: () => void;
};

const emptyBoard = () => Array.from({ length: 15 }, () => Array(15).fill(0));

export const useGame = create<GameStore>((set, get) => ({
  board: emptyBoard(),
  winner: null,
  isDraw: false,
  currentPlayer: "black",
  difficulty: 1,
  isThinking: false,
  isReady: false,
  lastAiMove: null,
  lastPlayerMove: null,
  moveLog: [],
  playerColor: "black",
  waitingToStart: false,
  turnStartTime: null,
  bridge: null,

  init: async () => {
    const bridge = new EngineBridge((state: GameState) => {
      set({
        board: state.board,
        winner: state.winner,
        isDraw: state.isDraw ?? false,
        currentPlayer: state.currentPlayer,
      });
    });
    set({ bridge });
    try {
      await bridge.init();
      set({ isReady: true, turnStartTime: get().playerColor === "black" ? Date.now() : null });
    } catch {
      bridge.destroy();
      set({ bridge: null, isReady: false });
    }
  },

  playMove: async (x: number, y: number) => {
    const { bridge, winner, isThinking, difficulty, playerColor, turnStartTime } = get();
    if (!bridge || winner || isThinking) return;

    const aiColor = playerColor === "black" ? "white" : "black";
    const thinkMs = turnStartTime ? Date.now() - turnStartTime : 0;

    set((s) => ({
      lastPlayerMove: { x, y },
      moveLog: [...s.moveLog, { x, y, player: playerColor as "black" | "white", thinkMs }],
    }));
    const moveState = await bridge.playMove(x, y);

    if (moveState.winner || moveState.isDraw) {
      const log = get().moveLog;
      saveGame({
        moves: log,
        winner: moveState.winner ? (moveState.winner as "black" | "white") : "draw",
        difficulty,
        playerColor,
      });
      set({ turnStartTime: null });
      return;
    }

    set({ isThinking: true, turnStartTime: Date.now() });
    const result = await bridge.aiMove(difficulty);
    const aiThinkMs = Date.now() - (get().turnStartTime ?? Date.now());
    set((s) => ({
      isThinking: false,
      lastAiMove: result ? { x: result.x, y: result.y } : null,
      moveLog: result
        ? [...s.moveLog, { x: result.x, y: result.y, player: aiColor as "black" | "white", thinkMs: aiThinkMs }]
        : s.moveLog,
      turnStartTime: Date.now(),
    }));

    const state = get();
    if (state.winner || state.isDraw) {
      saveGame({
        moves: state.moveLog,
        winner: state.winner ? (state.winner as "black" | "white") : "draw",
        difficulty: state.difficulty,
        playerColor,
      });
      set({ turnStartTime: null });
    }
  },

  undo: () => {
    get().bridge?.undo();
    // Engine undoes 2 moves (player + AI) — trim moveLog to match
    set((s) => ({
      turnStartTime: Date.now(),
      lastAiMove: null,
      lastPlayerMove: null,
      moveLog: s.moveLog.slice(0, -2),
    }));
  },

  reset: () => {
    get().bridge?.reset();
    const playerColor = get().playerColor;
    set({
      winner: null,
      isDraw: false,
      isThinking: false,
      lastAiMove: null,
      lastPlayerMove: null,
      moveLog: [],
      waitingToStart: playerColor === "white",
      turnStartTime: playerColor === "black" ? Date.now() : null,
    });
  },

  setDifficulty: (d) => set({ difficulty: d }),

  setPlayerColor: (color) => set({ playerColor: color }),

  startGame: async () => {
    const { bridge, difficulty, waitingToStart } = get();
    if (!bridge || !waitingToStart) return;

    set({ waitingToStart: false, isThinking: true, turnStartTime: Date.now() });
    const result = await bridge.aiMove(difficulty);
    const thinkMs = Date.now() - (get().turnStartTime ?? Date.now());
    set((s) => ({
      isThinking: false,
      lastAiMove: result ? { x: result.x, y: result.y } : null,
      moveLog: result
        ? [...s.moveLog, { x: result.x, y: result.y, player: "black" as const, thinkMs }]
        : s.moveLog,
      turnStartTime: Date.now(),
    }));
  },

  destroy: () => {
    get().bridge?.destroy();
    set({ bridge: null, isReady: false, isThinking: false });
  },
}));
