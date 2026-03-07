import { useState, useCallback } from "react";
import { useGame } from "@/hooks/useGame";

const SIZE = 15;
const CELL = 34;
const PAD = 27;
const R = CELL * 0.43;
const TOTAL = 540;

const STAR_COORDS = [3, 7, 11];

export function Board() {
  const { board, playMove, winner, isThinking, lastAiMove, currentPlayer } =
    useGame();

  const [hoveredCell, setHoveredCell] = useState<string | null>(null);

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
            <filter id="woodGrain">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.04 0.003"
                numOctaves={5}
                seed={3}
                result="noise"
              />
              <feColorMatrix
                type="saturate"
                values="0"
                in="noise"
                result="gray"
              />
              <feBlend in="SourceGraphic" in2="gray" mode="multiply" />
            </filter>
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

          {/* Wood background */}
          <rect
            width={TOTAL}
            height={TOTAL}
            rx={2}
            fill="#D4A056"
            filter="url(#woodGrain)"
          />

          {/* Grid lines */}
          {Array.from({ length: SIZE }, (_, i) => (
            <g key={`lines-${i}`}>
              <line
                x1={cx(0)}
                y1={cy(i)}
                x2={cx(SIZE - 1)}
                y2={cy(i)}
                stroke="#5a3a1a"
                strokeWidth={0.7}
                opacity={0.7}
              />
              <line
                x1={cx(i)}
                y1={cy(0)}
                x2={cx(i)}
                y2={cy(SIZE - 1)}
                stroke="#5a3a1a"
                strokeWidth={0.7}
                opacity={0.7}
              />
            </g>
          ))}

          {/* Star points */}
          {STAR_COORDS.flatMap((sx) =>
            STAR_COORDS.map((sy) => (
              <circle
                key={`star-${sx}-${sy}`}
                cx={cx(sx)}
                cy={cy(sy)}
                r={3}
                fill="#5a3a1a"
                opacity={0.7}
              />
            )),
          )}

          {/* Stones */}
          {board.map((row, y) =>
            row.map((cell, x) => {
              if (cell === 0) return null;
              const isBlack = cell === 1;
              return (
                <circle
                  key={`stone-${x}-${y}`}
                  className="stone-placed"
                  cx={cx(x)}
                  cy={cy(y)}
                  r={R}
                  fill={isBlack ? "url(#blackStone)" : "url(#whiteStone)"}
                  stroke={isBlack ? undefined : "#bbb"}
                  strokeWidth={isBlack ? undefined : 0.5}
                  style={{ animation: "stoneDrop 0.3s ease-out both" }}
                />
              );
            }),
          )}

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

          {/* Tap targets */}
          {board.map((row, y) =>
            row.map((cell, x) => {
              if (cell !== 0) return null;
              const key = `${x}-${y}`;
              return (
                <rect
                  key={`tap-${key}`}
                  className="tap-target"
                  x={cx(x) - CELL / 2}
                  y={cy(y) - CELL / 2}
                  width={CELL}
                  height={CELL}
                  fill={
                    hoveredCell === key
                      ? "rgba(139, 69, 19, 0.08)"
                      : "transparent"
                  }
                  onClick={() => handleClick(x, y)}
                  onMouseEnter={() => setHoveredCell(key)}
                  onMouseLeave={() => setHoveredCell(null)}
                  style={{ cursor: "pointer" }}
                />
              );
            }),
          )}
        </svg>
      </div>
    </div>
  );
}
