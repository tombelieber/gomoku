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
  moveLog: { x: number; y: number; player: "black" | "white" }[];

  bridge: EngineBridge | null;
  init: () => Promise<void>;
  playMove: (x: number, y: number) => Promise<void>;
  undo: () => void;
  reset: () => void;
  setDifficulty: (d: Difficulty) => void;
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
      set({ isReady: true });
    } catch {
      bridge.destroy();
      set({ bridge: null, isReady: false });
    }
  },

  playMove: async (x: number, y: number) => {
    const { bridge, winner, isThinking, difficulty } = get();
    if (!bridge || winner || isThinking) return;

    set((s) => ({
      lastPlayerMove: { x, y },
      moveLog: [...s.moveLog, { x, y, player: "black" as const }],
    }));
    const moveState = await bridge.playMove(x, y);

    if (moveState.winner || moveState.isDraw) {
      const log = get().moveLog;
      saveGame({
        moves: log,
        winner: moveState.winner ? (moveState.winner as "black" | "white") : "draw",
        difficulty,
      });
      return;
    }

    set({ isThinking: true });
    const result = await bridge.aiMove(difficulty);
    set((s) => ({
      isThinking: false,
      lastAiMove: result ? { x: result.x, y: result.y } : null,
      moveLog: result
        ? [...s.moveLog, { x: result.x, y: result.y, player: "white" as const }]
        : s.moveLog,
    }));

    const state = get();
    if (state.winner || state.isDraw) {
      saveGame({
        moves: state.moveLog,
        winner: state.winner ? (state.winner as "black" | "white") : "draw",
        difficulty: state.difficulty,
      });
    }
  },

  undo: () => get().bridge?.undo(),

  reset: () => {
    get().bridge?.reset();
    set({ winner: null, isDraw: false, isThinking: false, lastAiMove: null, lastPlayerMove: null, moveLog: [] });
  },

  setDifficulty: (d) => set({ difficulty: d }),

  destroy: () => {
    get().bridge?.destroy();
    set({ bridge: null, isReady: false, isThinking: false });
  },
}));
