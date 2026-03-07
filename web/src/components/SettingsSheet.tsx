import { useRef, useEffect, useCallback, useMemo } from "react";
import { useGame } from "@/hooks/useGame";
import { useReplay } from "@/hooks/useReplay";
import { useI18n } from "@/i18n/store";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { HistoryPanel } from "@/components/HistoryPanel";
import { getStats } from "@/lib/game-history";

declare const APP_VERSION: string;

type Props = {
  open: boolean;
  onClose: () => void;
};

export function SettingsSheet({ open, onClose }: Props) {
  const { difficulty, setDifficulty, reset, playerColor, setPlayerColor } = useGame();
  const replayRecord = useReplay((s) => s.record);
  const { t } = useI18n();

  // Auto-close sheet when replay starts (from HistoryPanel click)
  useEffect(() => {
    if (replayRecord) onClose();
  }, [replayRecord, onClose]);

  const sheetRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);
  const currentTranslateY = useRef(0);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    currentTranslateY.current = 0;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    const deltaY = e.touches[0].clientY - touchStartY.current;
    if (deltaY > 0 && sheetRef.current) {
      currentTranslateY.current = deltaY;
      sheetRef.current.style.transform = `translateY(${deltaY}px)`;
      sheetRef.current.style.transition = "none";
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!sheetRef.current) return;
    if (currentTranslateY.current > 100) {
      onClose();
    } else {
      sheetRef.current.style.transform = "translateY(0)";
      sheetRef.current.style.transition = "transform 0.3s cubic-bezier(0.32,0.72,0,1)";
    }
    currentTranslateY.current = 0;
  }, [onClose]);

  if (!open) return null;

  const difficultyLabels = [
    t.game.difficulty.easy,
    t.game.difficulty.medium,
    t.game.difficulty.hard,
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(26,16,8,0.4)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          zIndex: 1000,
          animation: "fadeIn 0.25s ease",
        }}
      />

      {/* Sheet */}
      <div
        ref={sheetRef}
        className="settings-sheet"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "var(--paper)",
          borderRadius: "16px 16px 0 0",
          padding: "calc(24px + env(safe-area-inset-top, 0px)) 24px calc(24px + env(safe-area-inset-bottom, 0px))",
          zIndex: 1001,
          maxHeight: "85dvh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column" as const,
          animation: "sheetSlideUp 0.35s cubic-bezier(0.32,0.72,0,1)",
          boxShadow: "0 -4px 32px rgba(0,0,0,0.12)",
        }}
      >
        {/* Drag handle — only this area triggers swipe-to-dismiss */}
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "4px 0 16px",
            cursor: "grab",
            touchAction: "none",
          }}
        >
          <div
            style={{
              width: 36,
              height: 4,
              borderRadius: 2,
              background: "var(--ink-light)",
              opacity: 0.25,
            }}
          />
        </div>

        {/* Scrollable content */}
        <div
          ref={scrollRef}
          style={{
            flex: 1,
            overflowY: "auto",
            minHeight: 0,
            WebkitOverflowScrolling: "touch",
          }}
        >
        {/* Title */}
        <h2
          style={{
            fontFamily: "'Noto Serif TC', serif",
            fontSize: "1.25rem",
            fontWeight: 700,
            color: "var(--ink)",
            margin: "0 0 20px",
            letterSpacing: "0.05em",
          }}
        >
          {t.settings.title}
        </h2>

        {/* Play as section */}
        <div style={{ marginBottom: 20 }}>
          <label style={{
            display: "block",
            fontSize: "0.85rem",
            fontWeight: 600,
            color: "var(--ink-light)",
            marginBottom: 8,
            letterSpacing: "0.03em",
          }}>
            {t.settings.playAs}
          </label>
          <div style={{
            display: "flex",
            background: "var(--paper-dark)",
            borderRadius: 10,
            padding: 3,
            gap: 2,
          }}>
            {([
              { value: "black" as const, label: t.settings.playFirst },
              { value: "white" as const, label: t.settings.playSecond },
            ]).map(({ value, label }) => {
              const isActive = playerColor === value;
              return (
                <button
                  key={value}
                  onClick={() => {
                    setPlayerColor(value);
                    reset();
                  }}
                  style={{
                    flex: 1,
                    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif",
                    fontSize: "0.9rem",
                    fontWeight: isActive ? 600 : 400,
                    padding: "8px 0",
                    border: "none",
                    borderRadius: 8,
                    background: isActive ? "#fff" : "transparent",
                    color: isActive ? "var(--ink)" : "var(--ink-light)",
                    cursor: "pointer",
                    transition: "background 0.2s, color 0.2s, box-shadow 0.2s",
                    boxShadow: isActive ? "0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)" : "none",
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Difficulty section */}
        <div style={{ marginBottom: 20 }}>
          <label
            style={{
              display: "block",
              fontSize: "0.85rem",
              fontWeight: 600,
              color: "var(--ink-light)",
              marginBottom: 8,
              letterSpacing: "0.03em",
            }}
          >
            {t.settings.difficulty}
          </label>
          <div
            style={{
              display: "flex",
              background: "var(--paper-dark)",
              borderRadius: 10,
              padding: 3,
              gap: 2,
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
                    flex: 1,
                    fontFamily:
                      "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif",
                    fontSize: "0.9rem",
                    fontWeight: isActive ? 600 : 400,
                    padding: "8px 0",
                    border: "none",
                    borderRadius: 8,
                    background: isActive ? "#fff" : "transparent",
                    color: isActive ? "var(--ink)" : "var(--ink-light)",
                    cursor: "pointer",
                    transition:
                      "background 0.2s, color 0.2s, box-shadow 0.2s",
                    boxShadow: isActive
                      ? "0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)"
                      : "none",
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Language section */}
        <div style={{ marginBottom: 20 }}>
          <label
            style={{
              display: "block",
              fontSize: "0.85rem",
              fontWeight: 600,
              color: "var(--ink-light)",
              marginBottom: 8,
              letterSpacing: "0.03em",
            }}
          >
            {t.settings.language}
          </label>
          <LanguageSwitcher />
        </div>

        {/* Stats summary */}
        <StatsSection />

        {/* Game history */}
        <HistoryPanel />

        {/* Version — bottom padding */}
        <div
          style={{
            textAlign: "center",
            fontSize: "0.75rem",
            color: "var(--ink-light)",
            opacity: 0.4,
            paddingTop: 12,
            fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
          }}
        >
          v{APP_VERSION}
        </div>
        </div>{/* end scrollable content */}
      </div>
    </>
  );
}

function StatsSection() {
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
    <div style={{ marginBottom: 20 }}>
      <label
        style={{
          display: "block",
          fontSize: "0.85rem",
          fontWeight: 600,
          color: "var(--ink-light)",
          marginBottom: 8,
          letterSpacing: "0.03em",
        }}
      >
        {t.stats.title}
      </label>
      <div
        style={{
          display: "flex",
          background: "var(--paper-dark)",
          borderRadius: 10,
          padding: "10px 0",
          gap: 2,
        }}
      >
        {items.map(({ label, value, color }) => (
          <div
            key={label}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <span
              style={{
                fontSize: "1.4rem",
                fontWeight: 700,
                color,
                fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
                fontVariantNumeric: "tabular-nums",
                lineHeight: 1,
              }}
            >
              {value}
            </span>
            <span
              style={{
                fontSize: "0.75rem",
                color: "var(--ink-light)",
                fontWeight: 500,
              }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
