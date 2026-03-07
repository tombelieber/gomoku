import { usePWA } from "@/hooks/usePWA";
import { useI18n } from "@/i18n/store";
import { useGame } from "@/hooks/useGame";

export function InstallBanner() {
  const { canShowInstall, needsUpdate, isIOS, promptInstall, updateApp, dismiss } = usePWA();
  const { t } = useI18n();
  const winner = useGame((s) => s.winner);

  // Show update banner immediately when available
  if (needsUpdate) {
    return (
      <Banner>
        <span style={{ flex: 1, fontWeight: 600, fontSize: "0.85rem", color: "var(--ink)" }}>
        {t.pwa.updateAvailable}
      </span>
        <BannerButton onClick={updateApp}>{t.pwa.updateAction}</BannerButton>
      </Banner>
    );
  }

  // Show install banner only after first game ends (winner is set)
  if (!canShowInstall || !winner) return null;

  return (
    <Banner onDismiss={dismiss} dismissLabel={t.pwa.dismiss}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, minWidth: 0 }}>
        <img
          src="/icon-192.png"
          alt=""
          style={{ width: 36, height: 36, borderRadius: 8, flexShrink: 0 }}
        />
        <div style={{ minWidth: 0 }}>
          <div style={{
            fontWeight: 600,
            fontSize: "0.85rem",
            color: "var(--ink)",
            lineHeight: 1.2,
          }}>
            {t.pwa.installTitle}
          </div>
          {isIOS && (
            <div style={{
              fontSize: "0.75rem",
              color: "var(--ink-light)",
              marginTop: 2,
              lineHeight: 1.3,
            }}>
              {t.pwa.iosGuide}
            </div>
          )}
        </div>
      </div>
      {!isIOS && (
        <BannerButton onClick={promptInstall}>
          {t.pwa.installAction}
        </BannerButton>
      )}
    </Banner>
  );
}

function Banner({
  children,
  onDismiss,
  dismissLabel,
}: {
  children: React.ReactNode;
  onDismiss?: () => void;
  dismissLabel?: string;
}) {
  return (
    <div style={{
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 999,
      padding: "0 12px calc(12px + env(safe-area-inset-bottom, 0px))",
      animation: "sheetSlideUp 0.35s cubic-bezier(0.32,0.72,0,1)",
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "12px 14px",
        background: "var(--paper)",
        border: "1px solid rgba(139,69,19,0.15)",
        borderRadius: 14,
        boxShadow: "0 4px 24px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.08)",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif",
      }}>
        {children}
        {onDismiss && (
          <button
            onClick={onDismiss}
            aria-label={dismissLabel || "Dismiss"}
            style={{
              background: "none",
              border: "none",
              padding: 4,
              cursor: "pointer",
              color: "var(--ink-light)",
              opacity: 0.5,
              fontSize: "1.1rem",
              lineHeight: 1,
              flexShrink: 0,
            }}
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

function BannerButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "var(--accent)",
        color: "#fff",
        border: "none",
        borderRadius: 8,
        padding: "8px 14px",
        fontSize: "0.8rem",
        fontWeight: 600,
        cursor: "pointer",
        whiteSpace: "nowrap",
        flexShrink: 0,
        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
      }}
    >
      {children}
    </button>
  );
}
