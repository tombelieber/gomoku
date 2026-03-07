import init, { Game } from "@/wasm/engine/gomoku_engine";

let game: Game | null = null;

type Command =
  | { type: "init" }
  | { type: "play_move"; x: number; y: number }
  | { type: "ai_move"; difficulty: number }
  | { type: "undo" }
  | { type: "reset" }
  | { type: "get_state" };

self.onmessage = async (e: MessageEvent<Command>) => {
  const cmd = e.data;

  if (cmd.type === "init") {
    try {
      await init();
      game = new Game();
      self.postMessage({ type: "ready", board: game.get_board(), currentPlayer: game.current_player(), winner: null });
    } catch (err) {
      self.postMessage({ type: "error", message: String(err) });
    }
    return;
  }

  if (!game) return;

  switch (cmd.type) {
    case "play_move": {
      const ok = game.play_move(cmd.x, cmd.y);
      self.postMessage({
        type: "move_result",
        ok,
        board: game.get_board(),
        winner: game.get_winner(),
        isDraw: game.is_draw(),
        currentPlayer: game.current_player(),
      });
      break;
    }
    case "ai_move": {
      const result = game.ai_move(cmd.difficulty);
      self.postMessage({
        type: "ai_result",
        result,
        board: game.get_board(),
        winner: game.get_winner(),
        isDraw: game.is_draw(),
        currentPlayer: game.current_player(),
      });
      break;
    }
    case "undo": {
      // Undo twice (player + AI)
      game.undo();
      game.undo();
      self.postMessage({
        type: "state",
        board: game.get_board(),
        winner: game.get_winner(),
        currentPlayer: game.current_player(),
      });
      break;
    }
    case "reset": {
      game.reset();
      self.postMessage({
        type: "state",
        board: game.get_board(),
        winner: null,
        currentPlayer: game.current_player(),
      });
      break;
    }
    case "get_state": {
      self.postMessage({
        type: "state",
        board: game.get_board(),
        winner: game.get_winner(),
        currentPlayer: game.current_player(),
      });
      break;
    }
  }
};
