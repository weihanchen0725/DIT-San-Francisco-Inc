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
      <option key={code} value={code} className={styles.languageSwitcherOption}>
        {translateCommon(code).toUpperCase()}
      </option>
    ));

  return (
    <React.Fragment>
      {styleMode === 'row' ? (
        <span className={styles.languageSwitcher} data-layout="row">
          <Globe className={styles.languageSwitcherIcon} />
          <span className={styles.languageSwitcherSelectWrap}>
            <select
              id="language-select"
              value={locale}
              onChange={handleLanguageChange}
              className={styles.languageSwitcherSelect}
              aria-label={translateCommon('select_language')}
            >
              {renderOptions()}
            </select>
            <ChevronDown className={styles.languageSwitcherChevron} />
          </span>
        </span>
      ) : (
        <span className={styles.languageSwitcher} data-layout="column">
          <span>{languageTranslate('caption')}</span>
          <div className={`${styles.languageSwitcherColumnMode}`}>
            <Globe className={styles.languageSwitcherIcon} />
            <span className={styles.languageSwitcherSelectWrap}>
              <select
                id="language-select"
                value={locale}
                onChange={handleLanguageChange}
                className={styles.languageSwitcherSelect}
                aria-label={translateCommon('select_language')}
              >
                {renderOptions()}
              </select>
              <ChevronDown className={styles.languageSwitcherChevron} />
            </span>
          </div>
        </span>
      )}
    </React.Fragment>
  );
};

export default LanguageSwitcher;
