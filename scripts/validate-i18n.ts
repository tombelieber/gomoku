import { SUPPORTED_LOCALES } from "../web/src/i18n/types";
import en from "../web/src/i18n/translations/en";

function getKeys(obj: any, prefix = ""): Set<string> {
  const keys = new Set<string>();
  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === "object" && obj[key] !== null) {
      getKeys(obj[key], fullKey).forEach((k) => keys.add(k));
    } else {
      keys.add(fullKey);
    }
  }
  return keys;
}

const enKeys = getKeys(en);

async function validateLanguage(locale: string) {
  try {
    const module = await import(`../web/src/i18n/translations/${locale}.ts`);
    const translation = module.default;
    const localeKeys = getKeys(translation);

    const missing = [...enKeys].filter((k) => !localeKeys.has(k));
    if (missing.length > 0) {
      console.error(`❌ ${locale}: Missing keys: ${missing.join(", ")}`);
      return false;
    }
    console.log(`✓ ${locale}: All keys present`);
    return true;
  } catch (e) {
    console.error(`❌ ${locale}: Failed to load - ${e.message}`);
    return false;
  }
}

async function main() {
  const results = await Promise.all(
    SUPPORTED_LOCALES.map((locale) => validateLanguage(locale))
  );

  if (!results.every((r) => r)) {
    process.exit(1);
  }
  console.log("\n✓ All translations complete!");
}

main();
