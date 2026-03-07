import { useEffect } from "react";
import { useReplay } from "@/hooks/useReplay";

const DIFFICULTY_LABELS = ["簡單", "中等", "困難"] as const;
const SYSTEM_FONT =
  "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif";

function resultText(winner: "black" | "white" | "draw"): string {
  switch (winner) {
    case "black":
      return "黑棋勝";
    case "white":
      return "白棋勝";
    case "draw":
      return "和棋";
  }
}

type TransportButtonProps = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
};

function TransportButton({ label, onClick, disabled }: TransportButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        fontFamily: SYSTEM_FONT,
        fontSize: "0.9rem",
        width: 40,
        height: 36,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid var(--accent)",
        background: "transparent",
        color: disabled ? "rgba(139,69,19,0.3)" : "var(--accent)",
        borderRadius: 24,
        cursor: disabled ? "default" : "pointer",
        transition: "background 0.2s, color 0.2s",
        lineHeight: 1,
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.background = "rgba(139,69,19,0.08)";
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
      }}
    >
      {label}
    </button>
  );
}

export function ReplayControls() {
  const { record, step, isPlaying, stepForward, stepBack, goToStep, togglePlay, stopReplay } =
    useReplay();

  // Auto-play effect
  useEffect(() => {
    if (!isPlaying || !record) return;
    const id = setInterval(() => {
      const { step, record, togglePlay } = useReplay.getState();
      if (!record || step >= record.moves.length) {
        togglePlay();
        return;
      }
      useReplay.getState().stepForward();
    }, 600);
    return () => clearInterval(id);
  }, [isPlaying, record]);

  if (!record) return null;

  const totalMoves = record.moves.length;
  const atStart = step === 0;
  const atEnd = step >= totalMoves;
  const diffLabel = DIFFICULTY_LABELS[record.difficulty] ?? DIFFICULTY_LABELS[1];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        alignItems: "center",
        animation: "fadeIn 0.6s ease",
      }}
    >
      {/* Game info line */}
      <div
        style={{
          fontFamily: "'Noto Serif TC', serif",
          fontSize: "0.9rem",
          color: "var(--ink-light)",
          letterSpacing: "0.1em",
        }}
      >
        {resultText(record.winner)} · {diffLabel}
      </div>

      {/* Step counter */}
      <div
        style={{
          fontFamily: "'Noto Serif TC', serif",
          fontSize: "1rem",
          color: "var(--ink)",
        }}
      >
        第 {step} / {totalMoves} 手
      </div>

      {/* Transport buttons */}
      <div style={{ display: "flex", gap: "0.4rem" }}>
        <TransportButton
          label={"|◁"}
          onClick={() => goToStep(0)}
          disabled={atStart}
        />
        <TransportButton
          label={"◁"}
          onClick={stepBack}
          disabled={atStart}
        />
        <TransportButton
          label={isPlaying ? "❚❚" : "▶"}
          onClick={togglePlay}
        />
        <TransportButton
          label={"▷"}
          onClick={stepForward}
          disabled={atEnd}
        />
        <TransportButton
          label={"▷|"}
          onClick={() => goToStep(totalMoves)}
          disabled={atEnd}
        />
      </div>

      {/* Return button */}
      <button
        onClick={stopReplay}
        style={{
          fontFamily: "'Noto Serif TC', serif",
          fontSize: "0.85rem",
          padding: "8px 24px",
          background: "var(--paper-dark)",
          color: "var(--ink-light)",
          borderRadius: 4,
          border: "none",
          letterSpacing: "0.1em",
          cursor: "pointer",
          transition: "background 0.2s, color 0.2s, box-shadow 0.2s, transform 0.1s",
        }}
        onMouseEnter={(e) => {
          const btn = e.currentTarget;
          btn.style.background = "var(--wood-light)";
          btn.style.color = "var(--ink)";
          btn.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
        }}
        onMouseLeave={(e) => {
          const btn = e.currentTarget;
          btn.style.background = "var(--paper-dark)";
          btn.style.color = "var(--ink-light)";
          btn.style.boxShadow = "none";
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.transform = "scale(0.97)";
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        返回
      </button>
    </div>
  );
}
