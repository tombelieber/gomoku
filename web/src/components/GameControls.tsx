import { useGame } from "@/hooks/useGame";

const DIFFICULTY_LABELS = ["簡單", "中等", "困難"] as const;

export function GameControls() {
  const { difficulty, setDifficulty, reset, undo, winner, isDraw, isThinking, currentPlayer, isReady } =
    useGame();

  if (!isReady) {
    return (
      <div className="text-center text-stone-400 py-8">載入引擎中...</div>
    );
  }

  return (
    <div className="flex flex-col gap-4 px-4 w-full max-w-md mx-auto">
      {/* Status */}
      <div className="text-center text-lg font-medium">
        {winner === "black" && "黑棋勝！"}
        {winner === "white" && "白棋勝！"}
        {isDraw && "和棋！"}
        {!winner && !isDraw && isThinking && "AI 思考中..."}
        {!winner && !isDraw && !isThinking && currentPlayer === "black" && "你嘅回合（黑棋）"}
      </div>

      {/* Difficulty */}
      <div className="flex gap-2 justify-center">
        {DIFFICULTY_LABELS.map((label, i) => (
          <button
            key={label}
            onClick={() => {
              setDifficulty(i as 0 | 1 | 2);
              reset();
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              difficulty === i
                ? "bg-amber-600 text-white"
                : "bg-stone-700 text-stone-300 hover:bg-stone-600"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-2 justify-center">
        <button
          onClick={undo}
          disabled={isThinking || !!winner}
          className="px-4 py-2 rounded-lg bg-stone-700 text-stone-300 hover:bg-stone-600 disabled:opacity-40 text-sm"
        >
          悔棋
        </button>
        <button
          onClick={reset}
          className="px-4 py-2 rounded-lg bg-stone-700 text-stone-300 hover:bg-stone-600 text-sm"
        >
          開新局
        </button>
      </div>
    </div>
  );
}
