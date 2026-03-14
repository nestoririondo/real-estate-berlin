import { locales } from "@/i18n";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://realestateinberlin.nestoririondo.com";

export const buildAlternates = (path: string) => ({
  languages: Object.fromEntries([
    ...locales.map((locale) => [locale, `${SITE_URL}/${locale}${path}`]),
    ["x-default", `${SITE_URL}/en${path}`],
  ]) as Record<string, string>,
});
