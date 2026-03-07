import { useEffect, useMemo, useState } from "react";
import { useGame } from "@/hooks/useGame";
import { useReplay } from "@/hooks/useReplay";
import { loadHistory } from "@/lib/game-history";
import { useI18n } from "@/i18n/store";

export function GameEndOverlay() {
  const { winner, isDraw, reset } = useGame();
  const startReplay = useReplay((s) => s.startReplay);
  const { t } = useI18n();
  const [visible, setVisible] = useState(false);

  const isGameOver = !!winner || isDraw;

  useEffect(() => {
    if (isGameOver) {
      const timer = setTimeout(() => setVisible(true), 500);
      return () => clearTimeout(timer);
    }
    setVisible(false);
  }, [isGameOver]);

  const playerColor = useGame((s) => s.playerColor);
  const isPlayerWin = winner === playerColor;
  const isAiWin = winner !== null && winner !== playerColor;

  const particles = useMemo(() => {
    if (!isPlayerWin) return [];
    return Array.from({ length: 28 }, (_, i) => ({
      id: i,
      left: `${((i * 37 + 13) % 100)}%`,
      delay: `${(i * 0.09).toFixed(2)}s`,
      duration: `${2.2 + (i % 7) * 0.4}s`,
      size: 4 + (i % 5) * 2,
      hue: 32 + (i % 8) * 4,
      lightness: 48 + (i % 6) * 5,
      isRound: i % 3 !== 0,
      drift: ((i % 5) - 2) * 30,
    }));
  }, [isPlayerWin]);

  const handleReview = (e: React.MouseEvent) => {
    e.stopPropagation();
    const history = loadHistory();
    if (history.length > 0) {
      startReplay(history[0]);
      reset();
    }
  };

  if (!visible) return null;

  let mainChar: string;
  let subtitle: string;
  let bgGradient: string;
  let charStyle: React.CSSProperties;

  if (isPlayerWin) {
    mainChar = "\u52DD";
    subtitle = t.gameEnd.win;
    bgGradient =
      "radial-gradient(ellipse at center, rgba(196,154,60,0.25) 0%, rgba(26,16,8,0.88) 100%)";
    charStyle = {
      color: "#EDCB6A",
      textShadow:
        "0 0 80px rgba(237,203,106,0.6), 0 0 40px rgba(196,154,60,0.5), 0 4px 24px rgba(0,0,0,0.6)",
    };
  } else if (isAiWin) {
    mainChar = "\u6557";
    subtitle = t.gameEnd.lose;
    bgGradient =
      "radial-gradient(ellipse at center, rgba(26,16,8,0.55) 0%, rgba(26,16,8,0.92) 100%)";
    charStyle = {
      color: "#E8E0D4",
      textShadow:
        "0 0 60px rgba(232,224,212,0.35), 0 4px 24px rgba(0,0,0,0.7)",
    };
  } else {
    mainChar = "\u548C";
    subtitle = t.gameEnd.draw;
    bgGradient =
      "radial-gradient(ellipse at center, rgba(139,69,19,0.2) 0%, rgba(26,16,8,0.85) 100%)";
    charStyle = {
      color: "#D4B896",
      textShadow:
        "0 0 60px rgba(212,184,150,0.35), 0 4px 24px rgba(0,0,0,0.5)",
    };
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: bgGradient,
        animation: "overlayFadeIn 0.6s ease both",
      }}
    >
      <div
        style={{
          fontFamily: "'ZCOOL KuaiLe', serif",
          fontSize: "clamp(6rem, 22vw, 11rem)",
          lineHeight: 1,
          animation: isAiWin
            ? "charRevealShake 0.8s cubic-bezier(0.16, 1, 0.3, 1) both"
            : "charReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) both",
          ...charStyle,
        }}
      >
        {mainChar}
      </div>

      <div
        style={{
          fontFamily: "'Noto Serif TC', serif",
          fontSize: "1.1rem",
          color: "var(--paper)",
          letterSpacing: "0.3em",
          marginTop: "0.5rem",
          opacity: 0.9,
          animation: "subtitleSlideUp 0.6s ease 0.35s both",
        }}
      >
        {subtitle}
      </div>
      {isPlayerWin && (
        <div style={{ fontSize: "1.3rem", marginTop: "0.4rem", color: "var(--paper)", opacity: 0.9, animation: "subtitleSlideUp 0.6s ease 0.5s both" }}>
          ٩(˃̶͈̀௰˂̶͈́)و✧
        </div>
      )}
      {isAiWin && (
        <div style={{ fontSize: "1.3rem", marginTop: "0.4rem", color: "var(--paper)", opacity: 0.9, animation: "subtitleSlideUp 0.6s ease 0.5s both" }}>
          (╯°□°)╯︵ ┻━┻
        </div>
      )}

      <div
        style={{
          width: "clamp(80px, 20vw, 140px)",
          height: 1,
          background:
            "linear-gradient(90deg, transparent, var(--paper-dark), transparent)",
          marginTop: "1rem",
          opacity: 0.4,
          animation: "fadeIn 0.6s ease 0.6s both",
        }}
      />

      {/* Primary CTA — Play Again */}
      <button
        onClick={(e) => { e.stopPropagation(); reset(); }}
        style={{
          fontFamily: "'Noto Serif TC', serif",
          fontSize: "1.1rem",
          padding: "12px 40px",
          marginTop: "1.5rem",
          background: "rgba(255,255,255,0.18)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          color: "var(--paper)",
          border: "1px solid rgba(255,255,255,0.3)",
          borderRadius: 28,
          letterSpacing: "0.25em",
          cursor: "pointer",
          animation: "fadeIn 0.6s ease 0.8s both",
          transition: "background 0.2s, border-color 0.2s, transform 0.15s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(255,255,255,0.28)";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.45)";
          e.currentTarget.style.transform = "scale(1.04)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(255,255,255,0.18)";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        {t.gameEnd.playAgain}
      </button>

      {/* Secondary — Review */}
      <button
        onClick={handleReview}
        style={{
          fontFamily: "'Noto Serif TC', serif",
          fontSize: "0.9rem",
          padding: "8px 28px",
          marginTop: "0.75rem",
          background: "rgba(255,255,255,0.08)",
          color: "var(--paper)",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: 24,
          letterSpacing: "0.2em",
          cursor: "pointer",
          opacity: 0.7,
          animation: "fadeIn 0.6s ease 1s both",
          transition: "opacity 0.2s, background 0.2s, border-color 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = "1";
          e.currentTarget.style.background = "rgba(255,255,255,0.14)";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = "0.7";
          e.currentTarget.style.background = "rgba(255,255,255,0.08)";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
        }}
      >
        {t.gameEnd.review}
      </button>

      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: p.left,
            top: "-3%",
            width: p.size,
            height: p.size,
            background: `hsl(${p.hue}, 70%, ${p.lightness}%)`,
            borderRadius: p.isRound ? "50%" : "1px",
            animation: `confettiFall ${p.duration} ease-in ${p.delay} both`,
            opacity: 0,
            ["--drift" as string]: `${p.drift}px`,
          }}
        />
      ))}
    </div>
  );
}
