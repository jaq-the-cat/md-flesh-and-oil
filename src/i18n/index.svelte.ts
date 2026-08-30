import { en_us } from "./en_us";

export type Localization = typeof en_us;

const LOCALES = { en_us };
export type Locale = keyof typeof LOCALES;

let active = $state<Locale>("en_us");

/** Read inside markup so the UI re-renders when the locale changes. */
export function localization(): Localization {
  return LOCALES[active];
}

export function setLocale(locale: Locale) {
  active = locale;
}
