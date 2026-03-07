import { useEffect } from "react";
import { Board } from "@/components/Board";
import { GameControls } from "@/components/GameControls";
import { useGame } from "@/hooks/useGame";

export default function App() {
  const init = useGame((s) => s.init);
  const destroy = useGame((s) => s.destroy);

  useEffect(() => {
    init();
    return () => destroy();
  }, [init, destroy]);

  return (
    <div
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Main container */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          padding: 16,
          width: "100%",
          maxWidth: 440,
          animation: "fadeIn 1.2s ease",
        }}
      >
        {/* Title */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h1
            style={{
              fontFamily: "'ZCOOL KuaiLe', 'Noto Serif TC', serif",
              fontSize: "2.2rem",
              letterSpacing: "0.3em",
              color: "var(--ink)",
              margin: 0,
            }}
          >
            五子棋
          </h1>
          {/* Decorative underline */}
          <div
            style={{
              height: 2,
              width: "80%",
              background: "linear-gradient(90deg, transparent, var(--accent), transparent)",
              marginTop: 4,
            }}
          />
        </div>

        {/* Subtitle */}
        <span
          style={{
            fontSize: "0.75rem",
            color: "var(--accent)",
            letterSpacing: "0.5em",
            marginTop: -8,
            opacity: 0.7,
          }}
        >
          GOMOKU
        </span>

        <Board />
        <GameControls />
      </div>

      {/* Decorative seal */}
      <div
        style={{
          position: "fixed",
          bottom: 16,
          right: 16,
          width: 48,
          height: 48,
          border: "2px solid var(--red)",
          borderRadius: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: "rotate(-8deg)",
          opacity: 0.35,
          fontFamily: "'ZCOOL KuaiLe', serif",
          fontSize: "1rem",
          color: "var(--red)",
        }}
      >
        棋
      </div>
    </div>
  );
}
