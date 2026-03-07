import { usePWA } from "@/hooks/usePWA";
import { useI18n } from "@/i18n/store";
import { useGame } from "@/hooks/useGame";

export function InstallBanner() {
  const { needsUpdate, isIOS, isInstalled, dismissed, installPrompt, showIOSGuide } = usePWA();
  const promptInstall = usePWA((s) => s.promptInstall);
  const updateApp = usePWA((s) => s.updateApp);
  const dismiss = usePWA((s) => s.dismiss);
  const setShowIOSGuide = usePWA((s) => s.setShowIOSGuide);
  const { t } = useI18n();
  const hasPlayed = useGame((s) => s.moveLog.length > 0);

  const canShowInstall = !isInstalled && !dismissed && (!!installPrompt || isIOS);

  return (
    <>
      {/* iOS guide modal — always mountable (triggered from Settings or banner) */}
      {showIOSGuide && <IOSGuideModal onClose={() => setShowIOSGuide(false)} />}

      {/* Update banner */}
      {needsUpdate && (
        <Banner>
          <span style={{ flex: 1, fontWeight: 600, fontSize: "0.85rem", color: "var(--ink)" }}>
            {t.pwa.updateAvailable}
          </span>
          <BannerButton onClick={updateApp}>{t.pwa.updateAction}</BannerButton>
        </Banner>
      )}

      {/* Install banner — after user's first move */}
      {canShowInstall && hasPlayed && (
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
            </div>
          </div>
          {isIOS ? (
            <BannerButton onClick={() => setShowIOSGuide(true)}>
              {t.pwa.installAction}
            </BannerButton>
          ) : (
            <BannerButton onClick={promptInstall}>
              {t.pwa.installAction}
            </BannerButton>
          )}
        </Banner>
      )}
    </>
  );
}

function IOSGuideModal({ onClose }: { onClose: () => void }) {
  const { t } = useI18n();

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(26,16,8,0.5)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          zIndex: 2000,
          animation: "fadeIn 0.25s ease",
        }}
      />
      <div style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 2001,
        padding: "0 16px calc(24px + env(safe-area-inset-bottom, 0px))",
        animation: "sheetSlideUp 0.35s cubic-bezier(0.32,0.72,0,1)",
      }}>
        <div style={{
          background: "var(--paper)",
          borderRadius: 16,
          padding: "24px 20px",
          boxShadow: "0 8px 40px rgba(0,0,0,0.2)",
          fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif",
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 20,
          }}>
            <img
              src="/icon-192.png"
              alt=""
              style={{ width: 48, height: 48, borderRadius: 12 }}
            />
            <div>
              <div style={{ fontWeight: 700, fontSize: "1rem", color: "var(--ink)" }}>
                {t.pwa.installTitle}
              </div>
              <div style={{ fontSize: "0.8rem", color: "var(--ink-light)", marginTop: 2 }}>
                {t.pwa.iosGuide}
              </div>
            </div>
          </div>

          {/* Step 1: Tap Share */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: "var(--paper-dark)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--accent)" }}>1</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.85rem", color: "var(--ink)" }}>
              <span>{t.pwa.iosStep1}</span>
              {/* iOS Share icon */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" />
                <polyline points="16 6 12 2 8 6" />
                <line x1="12" y1="2" x2="12" y2="15" />
              </svg>
            </div>
          </div>

          {/* Step 2: Add to Home Screen */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: "var(--paper-dark)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--accent)" }}>2</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.85rem", color: "var(--ink)" }}>
              <span>{t.pwa.iosStep2}</span>
              {/* Plus-in-square icon */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <line x1="12" y1="8" x2="12" y2="16" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
              <span style={{ fontWeight: 600 }}>{t.pwa.iosHomeScreen}</span>
            </div>
          </div>

          {/* Step 3: Confirm */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: "var(--paper-dark)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--accent)" }}>3</span>
            </div>
            <div style={{ fontSize: "0.85rem", color: "var(--ink)" }}>
              <span>{t.pwa.iosStep3} </span>
              <span style={{ fontWeight: 700, color: "var(--accent)" }}>{t.pwa.iosAdd}</span>
            </div>
          </div>

          {/* Arrow pointing down to Safari bar */}
          <div style={{
            display: "flex",
            justifyContent: "center",
            opacity: 0.4,
            animation: "bounceDown 1.5s ease-in-out infinite",
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <polyline points="19 12 12 19 5 12" />
            </svg>
          </div>
        </div>
      </div>
    </>
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
