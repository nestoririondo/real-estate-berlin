"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { locales, type Locale } from "@/i18n";

const languageNames: Record<Locale, string> = {
  en: "🇬🇧 English",
  de: "🇩🇪 Deutsch",
  es: "🇪🇸 Español",
  pt: "🇵🇹 Português",
  it: "🇮🇹 Italiano",
};

const LanguageSelector = () => {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: string) => {
    // Remove current locale from pathname and add new one
    const pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/";
    router.push(`/${newLocale}${pathWithoutLocale}`);
    router.refresh();
  };

  return (
    <Select value={locale} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-[140px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="z-[70]">
        {locales.map((loc) => (
          <SelectItem key={loc} value={loc}>
            {languageNames[loc]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export { LanguageSelector };
