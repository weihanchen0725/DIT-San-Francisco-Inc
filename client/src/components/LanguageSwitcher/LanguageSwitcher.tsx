"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useCallback } from "react";
import { Globe } from "lucide-react";

import styles from "./LanguageSwitcher.module.scss";

// Supported languages configuration - easy to extend
const SUPPORTED_LANGUAGES = [
  { code: "en", label: "english" },
  { code: "zh-TW", label: "traditional_chinese" },
  // Add more languages here as needed
] as const;

type LanguageCode = (typeof SUPPORTED_LANGUAGES)[number]["code"];

const LanguageSwitcher = () => {
  const translateCommon = useTranslations("Common");
  const locale = useLocale() as LanguageCode;
  const router = useRouter();
  const pathName = usePathname();

  // Handle language change by updating the URL path
  const handleLanguageChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const selectedLocale = event.target.value;
      const newPath = pathName.replace(`/${locale}`, `/${selectedLocale}`);
      router.replace(newPath);
    },
    [locale, pathName, router],
  );

  return (
    <span className={styles.languageSwitcher}>
      <Globe className={styles.languageSwitcher_icon} />
      <select
        id="language-select"
        value={locale}
        onChange={handleLanguageChange}
        className={styles.languageSwitcher_select}
        aria-label={translateCommon("select_language")}
      >
        {SUPPORTED_LANGUAGES.map((lang) => (
          <option
            key={lang.code}
            value={lang.code}
            className={styles.languageSwitcher_option}
          >
            {translateCommon(lang.label)}
          </option>
        ))}
      </select>
    </span>
  );
};

export default LanguageSwitcher;
