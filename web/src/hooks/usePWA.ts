import { create } from "zustand";
import { registerSW } from "virtual:pwa-register";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const DISMISSED_KEY = "pwa-install-dismissed";

interface PWAState {
  installPrompt: BeforeInstallPromptEvent | null;
  needsUpdate: boolean;
  dismissed: boolean;
  isIOS: boolean;
  isInstalled: boolean;
  showIOSGuide: boolean;
  promptInstall: () => Promise<void>;
  updateApp: () => void;
  dismiss: () => void;
  setShowIOSGuide: (show: boolean) => void;
}

export const usePWA = create<PWAState>((set, get) => ({
  installPrompt: null,
  needsUpdate: false,
  dismissed: localStorage.getItem(DISMISSED_KEY) === "1",
  isIOS:
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent),
  isInstalled:
    typeof window !== "undefined" &&
    window.matchMedia("(display-mode: standalone)").matches,
  showIOSGuide: false,

  promptInstall: async () => {
    const { installPrompt } = get();
    if (!installPrompt) return;
    await installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === "accepted") {
      set({ installPrompt: null, isInstalled: true });
    }
  },

  updateApp: () => {
    _updateSW?.(true);
  },

  dismiss: () => {
    set({ dismissed: true });
    localStorage.setItem(DISMISSED_KEY, "1");
  },

  setShowIOSGuide: (show: boolean) => set({ showIOSGuide: show }),
}));

// Module-level initialization (runs once on import)
let _updateSW: ((reloadPage?: boolean) => Promise<void>) | null = null;

_updateSW = registerSW({
  onNeedRefresh() {
    usePWA.setState({ needsUpdate: true });
  },
  onOfflineReady() {},
});

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  usePWA.setState({ installPrompt: e as BeforeInstallPromptEvent });
});

// Detect when app gets installed
window.addEventListener("appinstalled", () => {
  usePWA.setState({ installPrompt: null, isInstalled: true });
});
