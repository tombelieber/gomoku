// web/src/hooks/useTranslation.ts
import { useLocaleStore } from "@/stores/locale";
import type { Translation } from "@/i18n/types";
import en from "@/i18n/translations/en";
import zhTW from "@/i18n/translations/zh-TW";
import zhCN from "@/i18n/translations/zh-CN";
import ja from "@/i18n/translations/ja";
import ko from "@/i18n/translations/ko";
import de from "@/i18n/translations/de";
import es from "@/i18n/translations/es";
import fr from "@/i18n/translations/fr";
import pt from "@/i18n/translations/pt";
import it from "@/i18n/translations/it";
import nl from "@/i18n/translations/nl";

const translations: Record<string, Translation> = {
  en, "zh-TW": zhTW, "zh-CN": zhCN, ja, ko, de, es, fr, pt, it, nl,
};

export function useTranslation() {
  const locale = useLocaleStore((s) => s.locale);
  return translations[locale];
}
