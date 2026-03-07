import { useMemo } from "react";
import { loadHistory, type GameRecord } from "@/lib/game-history";
import { useReplay } from "@/hooks/useReplay";
import { useGame } from "@/hooks/useGame";

const DIFFICULTY_LABELS = ["簡單", "中等", "困難"] as const;

const SYSTEM_FONT =
  "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif";

function relativeDate(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffDays = Math.floor(diffMs / 86400000);
  if (diffDays === 0) return "今天";
  if (diffDays === 1) return "昨天";
  return `${d.getMonth() + 1}/${d.getDate()}`;
}

function resultLabel(winner: GameRecord["winner"]): { text: string; color: string } {
  switch (winner) {
    case "black":
      return { text: "勝", color: "#2d6a30" };
    case "white":
      return { text: "敗", color: "var(--red)" };
    case "draw":
      return { text: "和", color: "var(--accent)" };
  }
}

export function HistoryPanel() {
  const winner = useGame((s) => s.winner);
  const startReplay = useReplay((s) => s.startReplay);

  const history = useMemo(() => loadHistory(), [winner]);

  if (history.length === 0) return null;

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 440,
        fontFamily: SYSTEM_FONT,
        animation: "fadeIn 0.6s ease",
        opacity: 0.5,
        transition: "opacity 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.opacity = "1";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.opacity = "0.5";
      }}
    >
      {/* Header */}
      <div
        style={{
          fontSize: "0.78rem",
          fontWeight: 600,
          color: "var(--ink-light)",
          letterSpacing: "0.15em",
          padding: "0 4px 6px",
        }}
      >
        棋譜
      </div>

      {/* Scrollable list */}
      <div
        style={{
          maxHeight: 200,
          overflowY: "auto",
          borderTop: "1px solid rgba(139,69,19,0.1)",
        }}
      >
        {history.map((record) => {
          const { text: resultText, color: resultColor } = resultLabel(record.winner);
          const diffLabel =
            DIFFICULTY_LABELS[record.difficulty] ?? DIFFICULTY_LABELS[1];

          return (
            <div
              key={record.id}
              onClick={() => startReplay(record)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
                padding: "6px 4px",
                fontSize: "0.72rem",
                color: "var(--ink-light)",
                cursor: "pointer",
                borderBottom: "1px solid rgba(139,69,19,0.06)",
                transition: "background 0.15s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(139,69,19,0.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              {/* Result */}
              <span
                style={{
                  fontWeight: 600,
                  color: resultColor,
                  flexShrink: 0,
                  width: "1.2em",
                  textAlign: "center",
                }}
              >
                {resultText}
              </span>

              {/* Difficulty */}
              <span style={{ opacity: 0.7, flexShrink: 0 }}>{diffLabel}</span>

              {/* Move count */}
              <span style={{ opacity: 0.5, flexShrink: 0 }}>
                {record.totalMoves}手
              </span>

              {/* Spacer */}
              <span style={{ flex: 1 }} />

              {/* Date */}
              <span style={{ opacity: 0.4, flexShrink: 0 }}>
                {relativeDate(record.date)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
