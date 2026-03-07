import { useGame } from "@/hooks/useGame";
import { useI18n } from "@/i18n/store";

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
  const { t } = useI18n();

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
        alignItems: "center",
        justifyContent: "center",
        gap: "clamp(0.5rem, 2vw, 1rem)",
        padding: "clamp(4px, 1vw, 8px) 0",
      }}
    >
      {/* Status */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", flex: 1, minWidth: 0 }}>
        <span
          style={{
            display: "inline-block",
            width: 14,
            height: 14,
            borderRadius: "50%",
            background: stoneColor,
            boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
            flexShrink: 0,
          }}
        />
        <span style={{ fontSize: "0.9rem", color: "var(--ink-light)", whiteSpace: "nowrap" }}>
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

      {/* Action buttons */}
      <div style={{ display: "flex", gap: "0.4rem", flexShrink: 0 }}>
        <button
          onClick={undo}
          disabled={isThinking || !!winner}
          style={{
            fontFamily: "'Noto Serif TC', serif",
            fontSize: "0.85rem",
            padding: "6px 14px",
            background: "var(--paper-dark)",
            color: "var(--ink-light)",
            borderRadius: 4,
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
            fontFamily: "'Noto Serif TC', serif",
            fontSize: "0.85rem",
            padding: "6px 14px",
            background: "var(--paper-dark)",
            color: "var(--ink-light)",
            borderRadius: 4,
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
