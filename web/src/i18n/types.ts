export interface Translation {
  subtitle: string;
  difficulty: {
    easy: string;
    medium: string;
    hard: string;
  };
  loading: string;
  status: {
    blackWins: string;
    whiteWins: string;
    draw: string;
    yourTurnBlack: string;
    yourTurnWhite: string;
  };
  aiThinking: string;
  undo: string;
  newGame: string;
  gameEnd: {
    winSubtitle: string;
    loseSubtitle: string;
    drawSubtitle: string;
    clickToRestart: string;
  };
  footer: {
    madeWith: string;
    by: string;
    starOnGithub: string;
  };
}

export const SUPPORTED_LOCALES = [
  "en", "zh-TW", "zh-CN", "ja", "ko", "de", "es", "fr", "pt", "it", "nl",
] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  "zh-TW": "繁體中文",
  "zh-CN": "简体中文",
  ja: "日本語",
  ko: "한국어",
  de: "Deutsch",
  es: "Español",
  fr: "Français",
  pt: "Português",
  it: "Italiano",
  nl: "Nederlands",
};
