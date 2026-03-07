import { useEffect, useState } from "react";
import { Board } from "@/components/Board";
import { GameControls } from "@/components/GameControls";
import { GameEndOverlay } from "@/components/GameEndOverlay";
import { HistoryPanel } from "@/components/HistoryPanel";
import { ReplayControls } from "@/components/ReplayControls";
import { useGame } from "@/hooks/useGame";
import { useReplay } from "@/hooks/useReplay";

export default function App() {
  const init = useGame((s) => s.init);
  const destroy = useGame((s) => s.destroy);
  const [starCount, setStarCount] = useState<number | null>(null);
  const replayRecord = useReplay((s) => s.record);
  const replayBoard = useReplay((s) => s.board);
  const replayStep = useReplay((s) => s.step);
  const isReplaying = !!replayRecord;

  const replayLastMove =
    replayRecord && replayStep > 0
      ? replayRecord.moves[replayStep - 1]
      : null;

  useEffect(() => {
    init();
    return () => destroy();
  }, [init, destroy]);

  useEffect(() => {
    fetch("https://api.github.com/repos/tombelieber/gomoku")
      .then((r) => r.ok ? r.json() : null)
      .then((data) => { if (data?.stargazers_count != null) setStarCount(data.stargazers_count); })
      .catch(() => {});
  }, []);

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

        {isReplaying ? (
          <>
            <Board replayBoard={replayBoard} replayLastMove={replayLastMove} />
            <ReplayControls />
          </>
        ) : (
          <>
            <Board />
            <GameControls />
            <HistoryPanel />
          </>
        )}
      </div>

      {/* Footer signature */}
      <footer
        className="site-footer"
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.6rem",
          padding: "2.5rem 1rem 1.5rem",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif",
          fontSize: "0.72rem",
          fontWeight: 400,
          color: "var(--ink-light)",
          animation: "fadeIn 1.2s ease 0.8s both",
          letterSpacing: "0.01em",
        }}
      >
        {/* Made with love line */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.25em",
            lineHeight: 1,
          }}
        >
          <span style={{ opacity: 0.6 }}>Made with</span>
          <span
            style={{
              color: "var(--red)",
              fontSize: "0.68rem",
              lineHeight: 1,
              animation: "heartbeat 2s ease-in-out infinite",
            }}
          >
            &#9829;
          </span>
          <span style={{ opacity: 0.6 }}>by</span>
          <a
            href="https://tomtang3.ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
            style={{
              color: "var(--ink-light)",
              textDecoration: "none",
              fontWeight: 600,
              transition: "color 0.2s",
            }}
          >
            Tom Tang
          </a>
        </div>

        {/* GitHub star pill */}
        <a
          href="https://github.com/tombelieber/gomoku"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-star"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.35rem",
            color: "var(--ink-light)",
            textDecoration: "none",
            fontSize: "0.68rem",
            fontWeight: 500,
            padding: "5px 14px",
            borderRadius: 20,
            border: "1px solid rgba(139,69,19,0.15)",
            background: "rgba(139,69,19,0.04)",
            transition: "border-color 0.2s, background 0.2s, color 0.2s",
            lineHeight: 1,
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="currentColor"
            style={{ flexShrink: 0, opacity: 0.7 }}
          >
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" />
          </svg>
          <span>Star on GitHub</span>
          {starCount != null && (
            <>
              <span style={{ opacity: 0.3, margin: "0 0.1rem" }}>|</span>
              <span style={{ fontWeight: 600 }}>{starCount}</span>
            </>
          )}
        </a>
      </footer>

      <GameEndOverlay />

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
