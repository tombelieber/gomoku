import { useEffect, useMemo, useState } from "react";
import { useGame } from "@/hooks/useGame";
import { useI18n } from "@/i18n/store";

export function GameEndOverlay() {
  const { winner, isDraw, reset } = useGame();
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

  const isPlayerWin = winner === "black";
  const isAiWin = winner === "white";

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

  if (!visible) return null;

  let mainChar: string;
  let subtitle: string;
  let bgGradient: string;
  let charStyle: React.CSSProperties;

  if (isPlayerWin) {
    mainChar = "\u52DD";
    subtitle = t.gameEnd.winSubtitle;
    bgGradient =
      "radial-gradient(ellipse at center, rgba(196,154,60,0.12) 0%, rgba(26,16,8,0.7) 100%)";
    charStyle = {
      color: "#C49A3C",
      textShadow: "0 0 60px rgba(196,154,60,0.5), 0 4px 24px rgba(0,0,0,0.4)",
    };
  } else if (isAiWin) {
    mainChar = "\u6557";
    subtitle = t.gameEnd.loseSubtitle;
    bgGradient =
      "radial-gradient(ellipse at center, rgba(26,16,8,0.3) 0%, rgba(26,16,8,0.78) 100%)";
    charStyle = {
      color: "var(--ink-light)",
      textShadow: "0 4px 24px rgba(0,0,0,0.5)",
    };
  } else {
    mainChar = "\u548C";
    subtitle = t.gameEnd.drawSubtitle;
    bgGradient =
      "radial-gradient(ellipse at center, rgba(139,69,19,0.08) 0%, rgba(26,16,8,0.6) 100%)";
    charStyle = {
      color: "var(--accent)",
      textShadow: "0 4px 24px rgba(0,0,0,0.3)",
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
        cursor: "pointer",
      }}
      onClick={reset}
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

      <div
        style={{
          fontFamily: "'Noto Serif TC', serif",
          fontSize: "0.9rem",
          color: "var(--paper)",
          opacity: 0.5,
          marginTop: "1.5rem",
          letterSpacing: "0.15em",
          animation: "fadeIn 0.6s ease 1s both",
        }}
      >
        {t.gameEnd.clickToRestart}
      </div>

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
