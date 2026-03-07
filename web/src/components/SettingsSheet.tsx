import { useRef, useEffect, useCallback } from "react";
import { useGame } from "@/hooks/useGame";
import { useI18n } from "@/i18n/store";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

type Props = {
  open: boolean;
  onClose: () => void;
  starCount: number | null;
};

export function SettingsSheet({ open, onClose, starCount }: Props) {
  const { difficulty, setDifficulty, reset } = useGame();
  const { t } = useI18n();

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
          padding: "24px 24px calc(24px + env(safe-area-inset-bottom, 0px))",
          zIndex: 1001,
          maxHeight: "70dvh",
          overflowY: "auto",
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

        {/* Divider */}
        <div
          style={{
            height: 1,
            background:
              "linear-gradient(90deg, transparent, var(--accent), transparent)",
            margin: "8px 0 16px",
          }}
        />

        {/* GitHub link */}
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
            fontSize: "0.85rem",
            fontWeight: 500,
            padding: "8px 16px",
            borderRadius: 20,
            border: "1px solid rgba(139,69,19,0.15)",
            background: "rgba(139,69,19,0.04)",
            transition:
              "border-color 0.2s, background 0.2s, color 0.2s",
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
          <span>{t.footer.starOnGithub}</span>
          {starCount != null && (
            <>
              <span style={{ opacity: 0.3, margin: "0 0.1rem" }}>|</span>
              <span style={{ fontWeight: 600 }}>{starCount}</span>
            </>
          )}
        </a>
      </div>
    </>
  );
}
