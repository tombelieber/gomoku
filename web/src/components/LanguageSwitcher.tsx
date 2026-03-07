import { useI18n } from "@/i18n/store";
import { SUPPORTED_LOCALES, LOCALE_LABELS, type Locale } from "@/i18n/types";

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();

  return (
    <select
      value={locale}
      onChange={(e) => setLocale(e.target.value as Locale)}
      aria-label="Language"
      style={{
        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif",
        fontSize: "0.9rem",
        padding: "8px 14px",
        borderRadius: 10,
        border: "1px solid rgba(139,69,19,0.15)",
        background: "rgba(139,69,19,0.04)",
        color: "var(--ink-light)",
        cursor: "pointer",
        outline: "none",
        appearance: "none",
        WebkitAppearance: "none",
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3E%3Cpath d='M0 2l4 4 4-4' fill='none' stroke='%238B4513' stroke-width='1.5'/%3E%3C/svg%3E\")",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 10px center",
        paddingRight: 28,
        transition: "border-color 0.2s, background 0.2s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLSelectElement).style.borderColor = "rgba(139,69,19,0.3)";
        (e.currentTarget as HTMLSelectElement).style.background = "rgba(139,69,19,0.08)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLSelectElement).style.borderColor = "rgba(139,69,19,0.15)";
        (e.currentTarget as HTMLSelectElement).style.background = "rgba(139,69,19,0.04)";
      }}
    >
      {SUPPORTED_LOCALES.map((loc) => (
        <option key={loc} value={loc} style={{ fontSize: "0.9rem" }}>
          {LOCALE_LABELS[loc]}
        </option>
      ))}
    </select>
  );
}
