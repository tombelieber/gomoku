import { create } from "zustand";
import type { GameRecord } from "@/lib/game-history";

type ReplayStore = {
  record: GameRecord | null;
  step: number;
  isPlaying: boolean;
  board: number[][];

  startReplay: (record: GameRecord) => void;
  stopReplay: () => void;
  goToStep: (step: number) => void;
  stepForward: () => void;
  stepBack: () => void;
  togglePlay: () => void;
};

const SIZE = 15;
const emptyBoard = (): number[][] =>
  Array.from({ length: SIZE }, () => Array(SIZE).fill(0));

function buildBoard(moves: GameRecord["moves"], upTo: number): number[][] {
  const board = emptyBoard();
  for (let i = 0; i < upTo && i < moves.length; i++) {
    const m = moves[i];
    board[m.y][m.x] = m.player === "black" ? 1 : 2;
  }
  return board;
}

export const useReplay = create<ReplayStore>((set, get) => ({
  record: null,
  step: 0,
  isPlaying: false,
  board: emptyBoard(),

  startReplay: (record) =>
    set({ record, step: 0, board: emptyBoard(), isPlaying: false }),

  stopReplay: () =>
    set({ record: null, step: 0, board: emptyBoard(), isPlaying: false }),

  goToStep: (step) => {
    const { record } = get();
    if (!record) return;
    const clamped = Math.max(0, Math.min(step, record.moves.length));
    set({ step: clamped, board: buildBoard(record.moves, clamped) });
  },

  stepForward: () => {
    const { step, record } = get();
    if (!record || step >= record.moves.length) return;
    get().goToStep(step + 1);
  },

  stepBack: () => {
    const { step } = get();
    if (step <= 0) return;
    get().goToStep(step - 1);
  },

  togglePlay: () => set((s) => ({ isPlaying: !s.isPlaying })),
}));
