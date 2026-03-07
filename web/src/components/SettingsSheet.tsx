import { useRef, useEffect, useCallback } from "react";
import { useGame } from "@/hooks/useGame";
import { useReplay } from "@/hooks/useReplay";
import { useI18n } from "@/i18n/store";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { HistoryPanel } from "@/components/HistoryPanel";

declare const APP_VERSION: string;

type Props = {
  open: boolean;
  onClose: () => void;
};

export function SettingsSheet({ open, onClose }: Props) {
  const { difficulty, setDifficulty, reset } = useGame();
  const replayRecord = useReplay((s) => s.record);
  const { t } = useI18n();

  // Auto-close sheet when replay starts (from HistoryPanel click)
  useEffect(() => {
    if (replayRecord) onClose();
  }, [replayRecord, onClose]);

  const sheetRef = useRef<HTMLDivElement>(null);
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
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
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
          animation: "sheetSlideUp 0.35s cubic-bezier(0.32,0.72,0,1)",
          boxShadow: "0 -4px 32px rgba(0,0,0,0.12)",
        }}
      >
        {/* Drag handle */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 16,
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
      </div>
    </>
  );
}
