export type GameState = {
  board: number[][];
  winner: string | null;
  isDraw?: boolean;
  currentPlayer: string;
};

type Callback = (state: GameState) => void;

export class EngineBridge {
  private worker: Worker;
  private onState: Callback;
  private onReady: (() => void) | null = null;
  private onAiMove: ((result: { x: number; y: number; winner: string | null }) => void) | null = null;

  constructor(onState: Callback) {
    this.onState = onState;
    this.worker = new Worker(
      new URL("@/workers/engine.worker.ts", import.meta.url),
      { type: "module" },
    );
    this.worker.onmessage = (e) => this.handleMessage(e.data);
  }

  private handleMessage(msg: Record<string, unknown>) {
    switch (msg.type) {
      case "ready":
        this.onState(msg as unknown as GameState);
        this.onReady?.();
        break;
      case "move_result":
        this.onState(msg as unknown as GameState);
        break;
      case "ai_result":
        this.onState(msg as unknown as GameState);
        this.onAiMove?.(msg.result as { x: number; y: number; winner: string | null });
        break;
      case "state":
        this.onState(msg as unknown as GameState);
        break;
    }
  }

  init(): Promise<void> {
    return new Promise((resolve) => {
      this.onReady = resolve;
      this.worker.postMessage({ type: "init" });
    });
  }

  playMove(x: number, y: number) {
    this.worker.postMessage({ type: "play_move", x, y });
  }

  aiMove(difficulty: number): Promise<{ x: number; y: number; winner: string | null }> {
    return new Promise((resolve) => {
      this.onAiMove = resolve;
      this.worker.postMessage({ type: "ai_move", difficulty });
    });
  }

  undo() {
    this.worker.postMessage({ type: "undo" });
  }

  reset() {
    this.worker.postMessage({ type: "reset" });
  }

  destroy() {
    this.worker.terminate();
  }
}
