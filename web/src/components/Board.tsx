import { useCallback, useMemo } from "react";
import { useGame } from "@/hooks/useGame";

const SIZE = 15;
const CELL = 34;
const PAD = 27;
const R = CELL * 0.43;
const TOTAL = 540;

const STAR_COORDS = [3, 7, 11];

// Pre-compute static grid lines and star points (never changes)
const gridLines = Array.from({ length: SIZE }, (_, i) => {
  const pos = PAD + i * CELL;
  return { i, pos };
});

const starPoints = STAR_COORDS.flatMap((sx) =>
  STAR_COORDS.map((sy) => ({
    key: `star-${sx}-${sy}`,
    cx: PAD + sx * CELL,
    cy: PAD + sy * CELL,
  })),
);

export function Board() {
  const { board, playMove, winner, isThinking, lastAiMove, lastPlayerMove, currentPlayer } =
    useGame();

  const handleClick = useCallback(
    (x: number, y: number) => {
      if (winner || isThinking || currentPlayer !== "black") return;
      if (board[y][x] !== 0) return;
      playMove(x, y);
    },
    [winner, isThinking, currentPlayer, board, playMove],
  );

  const cx = (x: number) => PAD + x * CELL;
  const cy = (y: number) => PAD + y * CELL;

  // Determine which stone was most recently placed (for animation)
  const lastMove = lastAiMove ?? lastPlayerMove;

  // Memoize stone and tap-target lists to avoid re-creating arrays every render
  const stones = useMemo(() => {
    const result: { x: number; y: number; isBlack: boolean }[] = [];
    for (let y = 0; y < SIZE; y++) {
      for (let x = 0; x < SIZE; x++) {
        const cell = board[y][x];
        if (cell !== 0) {
          result.push({ x, y, isBlack: cell === 1 });
        }
      }
    }
    return result;
  }, [board]);

  const emptycells = useMemo(() => {
    const result: { x: number; y: number }[] = [];
    for (let y = 0; y < SIZE; y++) {
      for (let x = 0; x < SIZE; x++) {
        if (board[y][x] === 0) {
          result.push({ x, y });
        }
      }
    }
    return result;
  }, [board]);

  return (
    <div
      className="board-frame"
      style={{
        background: "linear-gradient(145deg, #C49A3C, #A07828)",
        padding: 6,
        borderRadius: 4,
        boxShadow:
          "0 8px 32px rgba(26,16,8,0.25), 0 2px 8px rgba(26,16,8,0.15), inset 0 1px 0 rgba(255,255,255,0.15)",
        animation: "boardAppear 0.8s ease 0.3s both",
      }}
    >
      <div
        className="board-surface"
        style={{
          position: "relative",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <svg
          viewBox={`0 0 ${TOTAL} ${TOTAL}`}
          style={{
            width: "min(92vw, 400px)",
            height: "min(92vw, 400px)",
            touchAction: "none",
            display: "block",
          }}
        >
          <defs>
            <radialGradient id="blackStone" cx="40%" cy="35%">
              <stop offset="0%" stopColor="#555" />
              <stop offset="50%" stopColor="#222" />
              <stop offset="100%" stopColor="#0a0a0a" />
            </radialGradient>
            <radialGradient id="whiteStone" cx="40%" cy="35%">
              <stop offset="0%" stopColor="#fff" />
              <stop offset="60%" stopColor="#f0ece4" />
              <stop offset="100%" stopColor="#d4cfc4" />
            </radialGradient>
          </defs>

          {/* Wood background — simple gradient instead of expensive feTurbulence */}
          <rect width={TOTAL} height={TOTAL} rx={2} fill="url(#woodBg)" />
          <defs>
            <linearGradient id="woodBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#DBA95A" />
              <stop offset="30%" stopColor="#D4A056" />
              <stop offset="60%" stopColor="#C89648" />
              <stop offset="100%" stopColor="#D4A056" />
            </linearGradient>
          </defs>
          {/* Subtle grain lines using lightweight stripes */}
          <rect
            width={TOTAL}
            height={TOTAL}
            rx={2}
            fill="url(#grainPattern)"
            opacity={0.08}
          />
          <defs>
            <pattern id="grainPattern" width="4" height="4" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="4" y2="4" stroke="#5a3a1a" strokeWidth="0.5" />
            </pattern>
          </defs>

          {/* Grid lines */}
          {gridLines.map(({ i, pos }) => (
            <g key={`lines-${i}`}>
              <line
                x1={cx(0)}
                y1={pos}
                x2={cx(SIZE - 1)}
                y2={pos}
                stroke="#5a3a1a"
                strokeWidth={0.7}
                opacity={0.7}
              />
              <line
                x1={pos}
                y1={cy(0)}
                x2={pos}
                y2={cy(SIZE - 1)}
                stroke="#5a3a1a"
                strokeWidth={0.7}
                opacity={0.7}
              />
            </g>
          ))}

          {/* Star points */}
          {starPoints.map(({ key, cx, cy }) => (
            <circle
              key={key}
              cx={cx}
              cy={cy}
              r={3}
              fill="#5a3a1a"
              opacity={0.7}
            />
          ))}

          {/* Stones — only the latest stone gets the drop animation */}
          {stones.map(({ x, y, isBlack }) => {
            const isLatest = lastMove?.x === x && lastMove?.y === y;
            return (
              <circle
                key={`stone-${x}-${y}`}
                className={isLatest ? "stone-new" : undefined}
                cx={cx(x)}
                cy={cy(y)}
                r={R}
                fill={isBlack ? "url(#blackStone)" : "url(#whiteStone)"}
                stroke={isBlack ? undefined : "#bbb"}
                strokeWidth={isBlack ? undefined : 0.5}
              />
            );
          })}

          {/* Last move marker */}
          {lastAiMove && (
            <circle
              className="last-marker"
              cx={cx(lastAiMove.x)}
              cy={cy(lastAiMove.y)}
              r={4}
              fill="#A0342E"
              style={{ animation: "pulse 2s ease-in-out infinite" }}
            />
          )}

          {/* Tap targets — use CSS :hover instead of React state */}
          {emptyCards(emptycells, handleClick, cx, cy)}
        </svg>
      </div>
    </div>
  );
}

/** Render tap targets without hover state — uses CSS :hover for zero-cost highlighting */
function emptyCards(
  cells: { x: number; y: number }[],
  handleClick: (x: number, y: number) => void,
  cx: (x: number) => number,
  cy: (y: number) => number,
) {
  return cells.map(({ x, y }) => (
    <rect
      key={`tap-${x}-${y}`}
      className="tap-target"
      x={cx(x) - CELL / 2}
      y={cy(y) - CELL / 2}
      width={CELL}
      height={CELL}
      fill="transparent"
      onClick={() => handleClick(x, y)}
      style={{ cursor: "pointer" }}
    />
  ));
}
