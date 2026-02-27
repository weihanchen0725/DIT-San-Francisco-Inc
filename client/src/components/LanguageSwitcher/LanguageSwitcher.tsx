"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import React, { ChangeEvent, useCallback } from "react";
import { ChevronDown, Globe } from "lucide-react";

import styles from "./LanguageSwitcher.module.scss";

// Supported languages configuration - easy to extend
const SUPPORTED_LANGUAGES = [
  { code: "en", label: "en" },
  { code: "zh-TW", label: "zh-TW" },
  // Add more languages here as needed
] as const;

type LanguageCode = (typeof SUPPORTED_LANGUAGES)[number]["code"];

interface LanguageSwitherProps {
  styleMode?: "row" | "column";
}

const LanguageSwitcher = ({ styleMode = "row" }: LanguageSwitherProps) => {
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
    <React.Fragment>
      {
        styleMode === "row" ? (
          <span className={`${styles.languageSwitcher}`}>
            <Globe className={styles.languageSwitcher_icon} />
            <span className={styles.languageSwitcher_selectWrap}>
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
              {translateCommon(lang.label).toUpperCase()}
            </option>
          ))}
        </select>
        <ChevronDown className={styles.languageSwitcher_chevron} />
      </span>
    </span>
        ) : (
          <span className={`${styles.languageSwitcher}`}>
            <span>Language</span>
            <div className={`${styles.languageSwitcher_columnMode}`}>
              <Globe className={styles.languageSwitcher_icon} />
            <span className={styles.languageSwitcher_selectWrap}>
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
                    {translateCommon(lang.label).toUpperCase()}
                  </option>
                ))}
              </select>
              <ChevronDown className={styles.languageSwitcher_chevron} />
            </span>
            </div>
          </span>
        )
      }
    </React.Fragment>
    
  );
};

export default LanguageSwitcher;
