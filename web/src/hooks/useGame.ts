import { create } from "zustand";
import { EngineBridge, type GameState } from "@/lib/engine-bridge";

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

    set({ lastPlayerMove: { x, y } });
    const moveState = await bridge.playMove(x, y);

    if (moveState.winner || moveState.isDraw) return;

    set({ isThinking: true });
    const result = await bridge.aiMove(difficulty);
    set({
      isThinking: false,
      lastAiMove: result ? { x: result.x, y: result.y } : null,
    });
  },

  undo: () => get().bridge?.undo(),

  reset: () => {
    get().bridge?.reset();
    set({ winner: null, isDraw: false, isThinking: false, lastAiMove: null, lastPlayerMove: null });
  },

  setDifficulty: (d) => set({ difficulty: d }),

  destroy: () => {
    get().bridge?.destroy();
    set({ bridge: null, isReady: false, isThinking: false });
  },
}));
