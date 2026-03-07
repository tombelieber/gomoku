export interface Translation {
  common: {
    appTitle: string;
  };
  game: {
    difficulty: {
      easy: string;
      medium: string;
      hard: string;
    };
    status: {
      blackWins: string;
      whiteWins: string;
      draw: string;
      yourTurnBlack: string;
      yourTurnWhite: string;
    };
    controls: {
      undo: string;
      newGame: string;
      start: string;
    };
    ai: {
      thinking: string;
    };
    loading: string;
  };
  history: {
    panel: {
      header: string;
    };
    labels: {
      won: string;
      lost: string;
      draw: string;
    };
    dates: {
      today: string;
      yesterday: string;
    };
    moves: string;
  };
  gameEnd: {
    win: string;
    lose: string;
    draw: string;
    playAgain: string;
    review: string;
  };
  footer: {
    madeWith: string;
    by: string;
    starOnGithub: string;
  };
  stats: {
    title: string;
  };
  settings: {
    title: string;
    difficulty: string;
    language: string;
    playAs: string;
    playFirst: string;
    playSecond: string;
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
