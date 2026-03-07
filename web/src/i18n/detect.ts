import { SUPPORTED_LOCALES, type Locale } from "./types";

const STORAGE_KEY = "gomoku-locale";

export function detectLocale(): Locale {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && (SUPPORTED_LOCALES as readonly string[]).includes(stored)) {
    return stored as Locale;
  }

  const nav = navigator.language;
  if ((SUPPORTED_LOCALES as readonly string[]).includes(nav)) {
    return nav as Locale;
  }

  const prefix = nav.split("-")[0];
  const match = SUPPORTED_LOCALES.find(
    (l) => l === prefix || l.startsWith(prefix + "-"),
  );
  if (match) return match;

  return "en";
}

export function persistLocale(locale: Locale): void {
  localStorage.setItem(STORAGE_KEY, locale);
}
