import { useEffect, useState } from "react";
import { Board } from "@/components/Board";
import { GameControls } from "@/components/GameControls";
import { ReplayControls } from "@/components/ReplayControls";
import { GameEndOverlay } from "@/components/GameEndOverlay";
import { SettingsSheet } from "@/components/SettingsSheet";
import { InstallBanner } from "@/components/InstallBanner";
import { useGame } from "@/hooks/useGame";
import { useReplay } from "@/hooks/useReplay";
import { useI18n } from "@/i18n/store";

declare const APP_VERSION: string;

export default function App() {
  const init = useGame((s) => s.init);
  const destroy = useGame((s) => s.destroy);
  const replayRecord = useReplay((s) => s.record);
  const replayBoard = useReplay((s) => s.board);
  const replayStep = useReplay((s) => s.step);
  const { t, locale } = useI18n();
  const isCJK = /^(zh|ja|ko)/.test(locale);
  const [starCount, setStarCount] = useState<number | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

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
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    fetch("https://api.github.com/repos/tombelieber/gomoku")
      .then((r) => r.ok ? r.json() : null)
      .then((data) => { if (data?.stargazers_count != null) setStarCount(data.stargazers_count); })
      .catch(() => {});
  }, []);

  return (
    <div
      className="app-root"
      style={{
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Header — compact title */}
      <header
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "clamp(6px, 1.5vw, 12px) 0 0",
          animation: "fadeIn 1.2s ease",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h1
            style={{
              fontFamily: isCJK
                ? "'ZCOOL KuaiLe', 'Noto Serif TC', serif"
                : "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif",
              fontSize: "clamp(1.6rem, 3.5dvh, 2.4rem)",
              fontWeight: isCJK ? 400 : 700,
              letterSpacing: isCJK ? "0.3em" : "0.18em",
              color: "var(--ink)",
              margin: 0,
              lineHeight: 1,
            }}
          >
            {t.common.brandTitle}
          </h1>
          <span
            style={{
              fontFamily: isCJK
                ? "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif"
                : "'ZCOOL KuaiLe', 'Noto Serif TC', serif",
              fontSize: "clamp(0.75rem, 1.5dvh, 1rem)",
              color: "var(--accent)",
              letterSpacing: isCJK ? "0.3em" : "0.2em",
              opacity: 0.7,
              marginTop: 2,
            }}
          >
            {isCJK ? "GOMOKU" : "五子棋"}
          </span>
        </div>
        <div
          style={{
            height: 1,
            width: "40%",
            maxWidth: 120,
            background: "linear-gradient(90deg, transparent, var(--accent), transparent)",
            marginTop: 4,
          }}
        />
      </header>

      {/* Board — fills available space */}
      <main
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 0,
          position: "relative",
          zIndex: 1,
        }}
      >
        <Board
          replayBoard={isReplaying ? replayBoard : undefined}
          replayLastMove={isReplaying ? replayLastMove : undefined}
        />
      </main>

      {/* Game controls / Replay controls */}
      <div style={{ position: "relative", zIndex: 1, padding: "0 clamp(8px, 2vw, 16px)" }}>
        {isReplaying ? <ReplayControls /> : <GameControls />}
      </div>

      {/* Settings gear bar */}
      <div
        className="settings-bar"
        onClick={() => setSettingsOpen(true)}
        role="button"
        aria-label="Settings"
        tabIndex={0}
      >
        <div style={{
          flex: 1,
          height: 1,
          background: "linear-gradient(90deg, transparent, var(--accent), transparent)",
          opacity: 0.3,
        }} />
        <svg className="settings-gear" style={{ width: "clamp(20px, 3dvh, 28px)", height: "clamp(20px, 3dvh, 28px)", opacity: 0.6 }} viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.32 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
        </svg>
        <div style={{
          flex: 1,
          height: 1,
          background: "linear-gradient(90deg, transparent, var(--accent), transparent)",
          opacity: 0.3,
        }} />
      </div>

      {/* Footer — compact attribution only */}
      <footer
        className="site-footer"
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.25em",
          padding: "4px 1rem calc(4px + env(safe-area-inset-bottom, 0px))",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif",
          fontSize: "clamp(0.7rem, 1.4dvh, 0.9rem)",
          fontWeight: 400,
          color: "var(--ink-light)",
          animation: "fadeIn 1.2s ease 0.8s both",
          letterSpacing: "0.01em",
          lineHeight: 1,
        }}
      >
        <span style={{ opacity: 0.6 }}>{t.footer.madeWith}</span>
        <span
          style={{
            color: "var(--red)",
            fontSize: "clamp(0.7rem, 1.4dvh, 0.9rem)",
            lineHeight: 1,
            animation: "heartbeat 2s ease-in-out infinite",
          }}
        >
          &#9829;
        </span>
        <span style={{ opacity: 0.6 }}>{t.footer.by}</span>
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
      </footer>

      {/* GitHub star CTA */}
      <a
        href="https://github.com/tombelieber/gomoku"
        target="_blank"
        rel="noopener noreferrer"
        className="github-cta"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "clamp(0.3rem, 0.8dvh, 0.5rem)",
          padding: "clamp(6px, 1dvh, 10px) clamp(14px, 3dvh, 24px)",
          margin: "0 auto",
          fontSize: "clamp(0.7rem, 1.3dvh, 0.85rem)",
          fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
          fontWeight: 500,
          color: "var(--ink-light)",
          background: "rgba(139,69,19,0.06)",
          border: "1px solid rgba(139,69,19,0.15)",
          borderRadius: 16,
          textDecoration: "none",
          lineHeight: 1,
          transition: "transform 0.15s ease, border-color 0.2s, background 0.2s",
          boxShadow: "none",
          position: "relative",
          zIndex: 1,
        }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="currentColor"
          style={{ flexShrink: 0 }}
        >
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" />
        </svg>
        <span>{t.footer.starOnGithub}</span>
        {starCount != null && (
          <>
            <span style={{ opacity: 0.4 }}>|</span>
            <span>{starCount}</span>
          </>
        )}
      </a>

      {/* Version */}
      <div
        style={{
          textAlign: "center",
          fontSize: "clamp(0.6rem, 1dvh, 0.7rem)",
          color: "var(--ink-light)",
          opacity: 0.3,
          padding: "clamp(2px, 0.5dvh, 6px) 0 calc(2px + env(safe-area-inset-bottom, 0px))",
          fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
          position: "relative",
          zIndex: 1,
        }}
      >
        v{APP_VERSION}
      </div>

      {/* Settings bottom sheet */}
      <SettingsSheet open={settingsOpen} onClose={() => setSettingsOpen(false)} />

      <GameEndOverlay />
      <InstallBanner />

      {/* Decorative seal — stays Chinese */}
      <div
        style={{
          position: "fixed",
          bottom: 16,
          right: 16,
          width: "clamp(40px, 6dvh, 56px)",
          height: "clamp(40px, 6dvh, 56px)",
          border: "2px solid var(--red)",
          borderRadius: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: "rotate(-8deg)",
          opacity: 0.35,
          fontFamily: "'ZCOOL KuaiLe', serif",
          fontSize: "clamp(0.9rem, 2dvh, 1.2rem)",
          color: "var(--red)",
        }}
      >
        棋
      </div>
    </div>
  );
}
