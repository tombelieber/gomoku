import { useEffect, useState } from "react";
import { Board } from "@/components/Board";
import { GameControls } from "@/components/GameControls";
import { GameEndOverlay } from "@/components/GameEndOverlay";
import { SettingsSheet } from "@/components/SettingsSheet";
import { useGame } from "@/hooks/useGame";
import { useI18n } from "@/i18n/store";

export default function App() {
  const init = useGame((s) => s.init);
  const destroy = useGame((s) => s.destroy);
  const { t, locale } = useI18n();
  const [starCount, setStarCount] = useState<number | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

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
        <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
          <h1
            style={{
              fontFamily: "'ZCOOL KuaiLe', 'Noto Serif TC', serif",
              fontSize: "1.6rem",
              letterSpacing: "0.3em",
              color: "var(--ink)",
              margin: 0,
            }}
          >
            五子棋
          </h1>
          <span
            style={{
              fontSize: "0.75rem",
              color: "var(--accent)",
              letterSpacing: "0.3em",
              opacity: 0.7,
            }}
          >
            {t.common.appTitle}
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
        <Board />
      </main>

      {/* Game controls */}
      <div style={{ position: "relative", zIndex: 1, padding: "0 clamp(8px, 2vw, 16px)" }}>
        <GameControls />
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
        <svg className="settings-gear" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.6 }}>
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
          fontSize: "0.75rem",
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
            fontSize: "0.75rem",
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

      {/* Settings bottom sheet */}
      <SettingsSheet open={settingsOpen} onClose={() => setSettingsOpen(false)} starCount={starCount} />

      <GameEndOverlay />

      {/* Decorative seal — stays Chinese */}
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
