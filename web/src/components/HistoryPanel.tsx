// web/src/components/HistoryPanel.tsx
import { useMemo } from "react";
import { loadHistory, type GameRecord } from "@/lib/game-history";
import { useReplay } from "@/hooks/useReplay";
import { useGame } from "@/hooks/useGame";
import { useI18n } from "@/i18n/store";
import type { Translation } from "@/i18n/types";

const SYSTEM_FONT =
  "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif";

function relativeDate(iso: string, t: Translation): string {
  const d = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffDays = Math.floor(diffMs / 86400000);
  if (diffDays === 0) return t.history.dates.today;
  if (diffDays === 1) return t.history.dates.yesterday;
  return `${d.getMonth() + 1}/${d.getDate()}`;
}

function resultLabel(record: GameRecord, t: Translation): { text: string; color: string } {
  const humanColor = record.playerColor ?? "black"; // backward compat
  if (record.winner === "draw") {
    return { text: t.history.labels.draw, color: "var(--accent)" };
  }
  if (record.winner === humanColor) {
    return { text: t.history.labels.won, color: "#2d6a30" };
  }
  return { text: t.history.labels.lost, color: "var(--red)" };
}

export function HistoryPanel() {
  const { t } = useI18n();
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
      }}
    >
      {/* Header */}
      <div
        style={{
          fontSize: "0.85rem",
          fontWeight: 600,
          color: "var(--ink-light)",
          letterSpacing: "0.15em",
          padding: "0 4px 6px",
        }}
      >
        {t.history.panel.header}
      </div>

      {/* Scrollable list */}
      <div
        style={{
          maxHeight: 180,
          overflowY: "auto",
          borderTop: "1px solid rgba(139,69,19,0.1)",
          paddingBottom: 12,
        }}
      >
        {history.map((record, index) => {
          const gameNumber = history.length - index;
          const { text: resultText, color: resultColor } = resultLabel(record, t);
          const diffLabels = [t.game.difficulty.easy, t.game.difficulty.medium, t.game.difficulty.hard];
          const diffLabel = diffLabels[record.difficulty] ?? diffLabels[1];

          return (
            <div
              key={record.id}
              onClick={() => startReplay(record)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
                padding: "6px 4px",
                fontSize: "0.85rem",
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
              {/* Game number */}
              <span style={{ color: "var(--accent)", opacity: 0.6, flexShrink: 0 }}>
                #{gameNumber}
              </span>

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
              <span style={{ flexShrink: 0 }}>{diffLabel}</span>

              {/* Move count */}
              <span style={{ flexShrink: 0 }}>
                {record.totalMoves} {t.history.moves}
              </span>

              {/* Spacer */}
              <span style={{ flex: 1 }} />

              {/* Date */}
              <span style={{ flexShrink: 0, color: "var(--accent)" }}>
                {relativeDate(record.date, t)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
