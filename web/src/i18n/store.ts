import { create } from "zustand";
import type { Translation, Locale } from "./types";
import en from "./translations/en";
import zhTW from "./translations/zh-TW";
import zhCN from "./translations/zh-CN";
import ja from "./translations/ja";
import ko from "./translations/ko";
import de from "./translations/de";
import es from "./translations/es";
import fr from "./translations/fr";
import pt from "./translations/pt";
import it from "./translations/it";
import nl from "./translations/nl";
import { detectLocale, persistLocale } from "./detect";

const translations: Record<Locale, Translation> = {
  en,
  "zh-TW": zhTW,
  "zh-CN": zhCN,
  ja,
  ko,
  de,
  es,
  fr,
  pt,
  it,
  nl,
};

const initialLocale = detectLocale();

type I18nStore = {
  locale: Locale;
  t: Translation;
  setLocale: (locale: Locale) => void;
};

export const useI18n = create<I18nStore>((set) => ({
  locale: initialLocale,
  t: translations[initialLocale],
  setLocale: (locale: Locale) => {
    persistLocale(locale);
    document.documentElement.lang = locale;
    set({ locale, t: translations[locale] });
  },
}));

// Expose for automation (screenshot pipeline, testing)
(window as any).__gomokuSetLocale = (locale: string) => {
  if (locale in translations) {
    useI18n.getState().setLocale(locale as Locale);
  }
};
