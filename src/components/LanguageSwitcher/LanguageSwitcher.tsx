'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import React, { ChangeEvent, useCallback } from 'react';
import { ChevronDown, Globe } from 'lucide-react';

import { locales, type AppLocale } from '@/i18n/config';
import styles from './LanguageSwitcher.module.scss';

interface LanguageSwitcherProps {
  styleMode?: 'row' | 'column';
}

const LanguageSwitcher = ({ styleMode = 'row' }: LanguageSwitcherProps) => {
  const translateCommon = useTranslations('Common');
  const locale = useLocale() as AppLocale;
  const router = useRouter();
  const pathName = usePathname();
  const languageTranslate = useTranslations('Language');
  // Handle language change by updating the URL path
  const handleLanguageChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const selectedLocale = event.target.value;
      const newPath = pathName.replace(`/${locale}`, `/${selectedLocale}`);
      router.replace(newPath);
    },
    [locale, pathName, router]
  );

  const renderOptions = () =>
    locales.map((code) => (
      <option key={code} value={code} className={styles.languageSwitcher_option}>
        {translateCommon(code).toUpperCase()}
      </option>
    ));

  return (
    <React.Fragment>
      {styleMode === 'row' ? (
        <span className={`${styles.languageSwitcher}`}>
          <Globe className={styles.languageSwitcher_icon} />
          <span className={styles.languageSwitcher_selectWrap}>
            <select
              id="language-select"
              value={locale}
              onChange={handleLanguageChange}
              className={styles.languageSwitcher_select}
              aria-label={translateCommon('select_language')}
            >
              {renderOptions()}
            </select>
            <ChevronDown className={styles.languageSwitcher_chevron} />
          </span>
        </span>
      ) : (
        <span className={`${styles.languageSwitcher}`}>
          <span>{languageTranslate('caption')}</span>
          <div className={`${styles.languageSwitcher_columnMode}`}>
            <Globe className={styles.languageSwitcher_icon} />
            <span className={styles.languageSwitcher_selectWrap}>
              <select
                id="language-select"
                value={locale}
                onChange={handleLanguageChange}
                className={styles.languageSwitcher_select}
                aria-label={translateCommon('select_language')}
              >
                {renderOptions()}
              </select>
              <ChevronDown className={styles.languageSwitcher_chevron} />
            </span>
          </div>
        </span>
      )}
    </React.Fragment>
  );
};

export default LanguageSwitcher;
