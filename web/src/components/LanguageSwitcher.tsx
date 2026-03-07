import { useState, useRef, useEffect, useCallback } from "react";
import { useI18n } from "@/i18n/store";
import { SUPPORTED_LOCALES, LOCALE_LABELS } from "@/i18n/types";

const FONT =
  "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif";

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) close();
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, close]);

  return (
    <div ref={ref} style={{ position: "relative", width: "100%" }}>
      {/* Trigger */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Language"
        aria-expanded={open}
        style={{
          width: "100%",
          fontFamily: FONT,
          fontSize: "1rem",
          padding: "10px 16px",
          paddingRight: 32,
          borderRadius: 10,
          border: "1px solid rgba(139,69,19,0.15)",
          background: "rgba(139,69,19,0.04)",
          color: "var(--ink-light)",
          cursor: "pointer",
          outline: "none",
          textAlign: "left",
          position: "relative",
          transition: "border-color 0.2s, background 0.2s",
        }}
      >
        {LOCALE_LABELS[locale]}
        <svg
          style={{
            position: "absolute",
            right: 12,
            top: "50%",
            transform: `translateY(-50%) rotate(${open ? "180deg" : "0"})`,
            transition: "transform 0.2s",
          }}
          width="10"
          height="10"
          viewBox="0 0 8 8"
          fill="none"
          stroke="#8B4513"
          strokeWidth="1.5"
        >
          <path d="M0 2l4 4 4-4" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          style={{
            position: "absolute",
            bottom: "calc(100% + 4px)",
            left: 0,
            right: 0,
            background: "var(--paper)",
            border: "1px solid rgba(139,69,19,0.15)",
            borderRadius: 10,
            boxShadow: "0 -4px 20px rgba(0,0,0,0.1)",
            maxHeight: 220,
            overflowY: "auto",
            zIndex: 10,
            padding: "4px 0",
          }}
        >
          {SUPPORTED_LOCALES.map((loc) => {
            const isActive = loc === locale;
            return (
              <button
                key={loc}
                onClick={() => {
                  setLocale(loc);
                  close();
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  fontFamily: FONT,
                  fontSize: "1rem",
                  padding: "10px 16px",
                  border: "none",
                  background: isActive ? "rgba(139,69,19,0.08)" : "transparent",
                  color: isActive ? "var(--ink)" : "var(--ink-light)",
                  fontWeight: isActive ? 600 : 400,
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) => {
                  if (!isActive)
                    e.currentTarget.style.background = "rgba(139,69,19,0.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = isActive
                    ? "rgba(139,69,19,0.08)"
                    : "transparent";
                }}
              >
                <span>{LOCALE_LABELS[loc]}</span>
                {isActive && (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
