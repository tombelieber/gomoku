import { useGame } from "@/hooks/useGame";

const CELL_SIZE = 36;
const BOARD_SIZE = 15;
const PADDING = CELL_SIZE / 2;
const TOTAL = CELL_SIZE * (BOARD_SIZE - 1) + CELL_SIZE;

export function Board() {
  const { board, playMove, winner, isThinking, lastAiMove, currentPlayer } =
    useGame();

  const handleClick = (x: number, y: number) => {
    if (winner || isThinking || currentPlayer !== "black") return;
    if (board[y][x] !== 0) return;
    playMove(x, y);
  };

  return (
    <div className="flex items-center justify-center p-2">
      <svg
        viewBox={`0 0 ${TOTAL} ${TOTAL}`}
        className="w-full max-w-[min(95vw,560px)] aspect-square touch-none"
        style={{ background: "#DEB887" }}
      >
        {/* Grid lines */}
        {Array.from({ length: BOARD_SIZE }, (_, i) => (
          <g key={`lines-${i}`}>
            <line
              x1={PADDING}
              y1={PADDING + i * CELL_SIZE}
              x2={PADDING + (BOARD_SIZE - 1) * CELL_SIZE}
              y2={PADDING + i * CELL_SIZE}
              stroke="#333"
              strokeWidth={0.5}
            />
            <line
              x1={PADDING + i * CELL_SIZE}
              y1={PADDING}
              x2={PADDING + i * CELL_SIZE}
              y2={PADDING + (BOARD_SIZE - 1) * CELL_SIZE}
              stroke="#333"
              strokeWidth={0.5}
            />
          </g>
        ))}

        {/* Star points */}
        {[3, 7, 11].flatMap((x) =>
          [3, 7, 11].map((y) => (
            <circle
              key={`star-${x}-${y}`}
              cx={PADDING + x * CELL_SIZE}
              cy={PADDING + y * CELL_SIZE}
              r={3}
              fill="#333"
            />
          )),
        )}

        {/* Stones */}
        {board.map((row, y) =>
          row.map((cell, x) => {
            if (cell === 0) return null;
            const isLastAi =
              lastAiMove && lastAiMove.x === x && lastAiMove.y === y;
            return (
              <circle
                key={`${x}-${y}`}
                cx={PADDING + x * CELL_SIZE}
                cy={PADDING + y * CELL_SIZE}
                r={CELL_SIZE * 0.42}
                fill={cell === 1 ? "#111" : "#f5f5f5"}
                stroke={isLastAi ? "#ef4444" : cell === 1 ? "#000" : "#ccc"}
                strokeWidth={isLastAi ? 2 : 0.5}
              />
            );
          }),
        )}

        {/* Tap targets (invisible) */}
        {board.map((row, y) =>
          row.map((cell, x) => {
            if (cell !== 0) return null;
            return (
              <rect
                key={`tap-${x}-${y}`}
                x={PADDING + x * CELL_SIZE - CELL_SIZE / 2}
                y={PADDING + y * CELL_SIZE - CELL_SIZE / 2}
                width={CELL_SIZE}
                height={CELL_SIZE}
                fill="transparent"
                onClick={() => handleClick(x, y)}
              />
            );
          }),
        )}
      </svg>
    </div>
  );
}
