import { useGame } from "@/hooks/useGame";
import { useI18n } from "@/i18n/store";

export function GameControls() {
  const {
    difficulty,
    setDifficulty,
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
      <div style={{ color: "var(--accent)", textAlign: "center", padding: "2rem 0" }}>
        {t.game.loading}
      </div>
    );
  }

  const isBlack = currentPlayer === "black";
  const stoneColor = isBlack ? "#1a1a1a" : "#f5f5f5";

  const difficultyLabels = [t.game.difficulty.easy, t.game.difficulty.medium, t.game.difficulty.hard];

  let statusText = "";
  if (winner === "black") statusText = t.game.status.blackWins;
  else if (winner === "white") statusText = t.game.status.whiteWins;
  else if (isDraw) statusText = t.game.status.draw;
  else statusText = isBlack ? t.game.status.yourTurnBlack : t.game.status.yourTurnWhite;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", alignItems: "center" }}>
      {/* Status line + thinking indicator */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.6rem",
          animation: "fadeIn 0.6s ease 0.5s both",
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: 18,
            height: 18,
            borderRadius: "50%",
            background: stoneColor,
            boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
            flexShrink: 0,
          }}
        />
        <span style={{ fontSize: "1.1rem", color: "var(--ink-light)" }}>{statusText}</span>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.35rem",
            fontSize: "1rem",
            color: "var(--accent)",
            visibility: isThinking ? "visible" : "hidden",
            opacity: isThinking ? 1 : 0,
            transition: "opacity 0.25s ease",
            marginLeft: "0.25rem",
          }}
        >
          <span>{t.game.ai.thinking}</span>
          {[0, 0.2, 0.4].map((delay, i) => (
            <span
              key={i}
              style={{
                display: "inline-block",
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--accent)",
                animation: `thinkBounce 1.4s ease-in-out ${delay}s infinite`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Difficulty buttons */}
      <div
        style={{
          display: "flex",
          gap: "0.6rem",
          animation: "fadeIn 0.6s ease 0.6s both",
        }}
      >
        {difficultyLabels.map((label, i) => {
          const isActive = difficulty === i;
          return (
            <button
              key={i}
              onClick={() => {
                setDifficulty(i as 0 | 1 | 2);
                reset();
              }}
              style={{
                fontFamily: "'Noto Serif TC', serif",
                fontSize: "1rem",
                padding: "10px 24px",
                border: "1px solid var(--accent)",
                background: isActive ? "var(--accent)" : "transparent",
                color: isActive ? "var(--paper)" : "var(--accent)",
                borderRadius: 24,
                letterSpacing: "0.1em",
                cursor: "pointer",
                transition: "background 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "rgba(139,69,19,0.08)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                }
              }}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Action buttons */}
      <div
        style={{
          display: "flex",
          gap: "0.6rem",
          animation: "fadeIn 0.6s ease 0.7s both",
        }}
      >
        <button
          onClick={undo}
          disabled={isThinking || !!winner}
          style={{
            fontFamily: "'Noto Serif TC', serif",
            fontSize: "1rem",
            padding: "10px 24px",
            background: "var(--paper-dark)",
            color: "var(--ink-light)",
            borderRadius: 4,
            border: "none",
            letterSpacing: "0.1em",
            cursor: isThinking || !!winner ? "default" : "pointer",
            opacity: isThinking || !!winner ? 0.4 : 1,
            transition: "background 0.2s, color 0.2s, box-shadow 0.2s, transform 0.1s",
          }}
          onMouseEnter={(e) => {
            if (!isThinking && !winner) {
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.background = "var(--wood-light)";
              btn.style.color = "var(--ink)";
              btn.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
            }
          }}
          onMouseLeave={(e) => {
            const btn = e.currentTarget as HTMLButtonElement;
            btn.style.background = "var(--paper-dark)";
            btn.style.color = "var(--ink-light)";
            btn.style.boxShadow = "none";
          }}
          onMouseDown={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.97)";
          }}
          onMouseUp={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
          }}
        >
          {t.game.controls.undo}
        </button>
        <button
          onClick={reset}
          style={{
            fontFamily: "'Noto Serif TC', serif",
            fontSize: "1rem",
            padding: "10px 24px",
            background: "var(--paper-dark)",
            color: "var(--ink-light)",
            borderRadius: 4,
            border: "none",
            letterSpacing: "0.1em",
            cursor: "pointer",
            transition: "background 0.2s, color 0.2s, box-shadow 0.2s, transform 0.1s",
          }}
          onMouseEnter={(e) => {
            const btn = e.currentTarget as HTMLButtonElement;
            btn.style.background = "var(--wood-light)";
            btn.style.color = "var(--ink)";
            btn.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
          }}
          onMouseLeave={(e) => {
            const btn = e.currentTarget as HTMLButtonElement;
            btn.style.background = "var(--paper-dark)";
            btn.style.color = "var(--ink-light)";
            btn.style.boxShadow = "none";
          }}
          onMouseDown={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.97)";
          }}
          onMouseUp={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
          }}
        >
          {t.game.controls.newGame}
        </button>
      </div>
    </div>
  );
}
