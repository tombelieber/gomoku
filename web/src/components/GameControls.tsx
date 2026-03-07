import { useState, useEffect, useMemo } from "react";
import { useGame } from "@/hooks/useGame";
import { useI18n } from "@/i18n/store";
import { getStats } from "@/lib/game-history";

export function GameControls() {
  const {
    reset,
    undo,
    winner,
    isDraw,
    isThinking,
    currentPlayer,
    isReady,
  } = useGame();
  const turnStartTime = useGame((s) => s.turnStartTime);
  const { t } = useI18n();

  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!turnStartTime || winner || isDraw) {
      setElapsed(0);
      return;
    }
    setElapsed(Math.floor((Date.now() - turnStartTime) / 1000));
    const id = setInterval(() => {
      setElapsed(Math.floor((Date.now() - (turnStartTime ?? Date.now())) / 1000));
    }, 1000);
    return () => clearInterval(id);
  }, [turnStartTime, winner, isDraw]);

  const timerText = `${Math.floor(elapsed / 60)}:${String(elapsed % 60).padStart(2, "0")}`;

  if (!isReady) {
    return (
      <div style={{ color: "var(--accent)", textAlign: "center", padding: "1rem 0" }}>
        {t.game.loading}
      </div>
    );
  }

  const isBlack = currentPlayer === "black";
  const stoneColor = isBlack ? "#1a1a1a" : "#f5f5f5";

  let statusText = "";
  if (winner === "black") statusText = t.game.status.blackWins;
  else if (winner === "white") statusText = t.game.status.whiteWins;
  else if (isDraw) statusText = t.game.status.draw;
  else statusText = isBlack ? t.game.status.yourTurnBlack : t.game.status.yourTurnWhite;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "clamp(6px, 1.5vw, 10px)",
        padding: "clamp(4px, 1vw, 8px) 0",
      }}
    >
      {/* Status + timer (vertical) */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.15rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem" }}>
          <span
            style={{
              display: "inline-block",
              width: "clamp(14px, 2dvh, 20px)",
              height: "clamp(14px, 2dvh, 20px)",
              borderRadius: "50%",
              background: stoneColor,
              boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
              flexShrink: 0,
            }}
          />
          <span style={{ fontSize: "clamp(0.9rem, 2dvh, 1.2rem)", color: "var(--ink-light)", whiteSpace: "nowrap" }}>
            {statusText}
          </span>
          {isThinking && (
            <div style={{ display: "flex", alignItems: "center", gap: "0.2rem", marginLeft: "0.2rem" }}>
              {[0, 0.2, 0.4].map((delay, i) => (
                <span
                  key={i}
                  style={{
                    display: "inline-block",
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: "var(--accent)",
                    animation: `thinkBounce 1.4s ease-in-out ${delay}s infinite`,
                  }}
                />
              ))}
            </div>
          )}
        </div>
        {turnStartTime && !winner && !isDraw && (
          <span style={{
            fontSize: "clamp(0.75rem, 1.5dvh, 0.9rem)",
            color: "var(--accent)",
            opacity: 0.5,
            fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
            fontVariantNumeric: "tabular-nums",
          }}>
            {timerText}
          </span>
        )}
      </div>

      {/* Stats bar */}
      <CompactStats />

      {/* Action buttons */}
      <div style={{ display: "flex", gap: "0.5rem", width: "100%", maxWidth: "clamp(280px, 40dvh, 400px)" }}>
        <button
          onClick={undo}
          disabled={isThinking || !!winner}
          style={{
            flex: 1,
            fontFamily: "'Noto Serif TC', serif",
            fontSize: "clamp(0.9rem, 2dvh, 1.15rem)",
            padding: "clamp(8px, 1.5dvh, 14px) 0",
            background: "var(--paper-dark)",
            color: "var(--ink-light)",
            borderRadius: 8,
            border: "none",
            letterSpacing: "0.05em",
            cursor: isThinking || !!winner ? "default" : "pointer",
            opacity: isThinking || !!winner ? 0.4 : 1,
            transition: "background 0.2s, color 0.2s",
          }}
        >
          {t.game.controls.undo}
        </button>
        <button
          onClick={reset}
          style={{
            flex: 1,
            fontFamily: "'Noto Serif TC', serif",
            fontSize: "clamp(0.9rem, 2dvh, 1.15rem)",
            padding: "clamp(8px, 1.5dvh, 14px) 0",
            background: "var(--paper-dark)",
            color: "var(--ink-light)",
            borderRadius: 8,
            border: "none",
            letterSpacing: "0.05em",
            cursor: "pointer",
            transition: "background 0.2s, color 0.2s",
          }}
        >
          {t.game.controls.newGame}
        </button>
      </div>
    </div>
  );
}

function CompactStats() {
  const { t } = useI18n();
  const winner = useGame((s) => s.winner);
  const stats = useMemo(() => getStats(), [winner]);
  const total = stats.wins + stats.losses + stats.draws;

  if (total === 0) return null;

  const items = [
    { label: t.history.labels.won, value: stats.wins, color: "#2d6a30" },
    { label: t.history.labels.lost, value: stats.losses, color: "var(--red)" },
    { label: t.history.labels.draw, value: stats.draws, color: "var(--accent)" },
  ];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "clamp(8px, 2vw, 14px)",
        fontSize: "clamp(0.75rem, 1.5dvh, 0.9rem)",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
        color: "var(--ink-light)",
        opacity: 0.7,
      }}
    >
      {items.map(({ label, value, color }, i) => (
        <span key={label} style={{ display: "flex", alignItems: "center", gap: "0.2em" }}>
          {i > 0 && <span style={{ marginRight: "clamp(4px, 1vw, 8px)", opacity: 0.3 }}>·</span>}
          <span style={{ fontWeight: 600, color, fontVariantNumeric: "tabular-nums" }}>{value}</span>
          <span>{label}</span>
        </span>
      ))}
    </div>
  );
}
