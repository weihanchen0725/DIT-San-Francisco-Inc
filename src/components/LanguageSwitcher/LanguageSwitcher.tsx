'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import React, { KeyboardEvent, useCallback, useEffect, useId, useRef, useState } from 'react';
import { Check, ChevronDown, Globe } from 'lucide-react';

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
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(() => locales.indexOf(locale));
  const wrapRef = useRef<HTMLSpanElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const listId = useId();

  const getLabel = (code: AppLocale) => translateCommon(code).toUpperCase();

  const openList = () => {
    setActiveIndex(locales.indexOf(locale));
    setIsOpen(true);
  };

  const closeList = () => {
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  // Handle language change by updating the URL path
  const handleLanguageChange = useCallback(
    (selectedLocale: AppLocale) => {
      setIsOpen(false);
      triggerRef.current?.focus();
      if (selectedLocale === locale) return;
      const newPath = pathName.replace(`/${locale}`, `/${selectedLocale}`);
      router.replace(newPath);
    },
    [locale, pathName, router]
  );

  // Move focus into the open list and close it on any pointer press outside the switcher
  useEffect(() => {
    if (!isOpen) return;
    listRef.current?.focus();

    const handlePointerDown = (event: PointerEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) setIsOpen(false);
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [isOpen]);

  const handleTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
    event.preventDefault();
    openList();
  };

  const handleListKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setActiveIndex((index) => Math.min(index + 1, locales.length - 1));
        break;
      case 'ArrowUp':
        event.preventDefault();
        setActiveIndex((index) => Math.max(index - 1, 0));
        break;
      case 'Home':
        event.preventDefault();
        setActiveIndex(0);
        break;
      case 'End':
        event.preventDefault();
        setActiveIndex(locales.length - 1);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        handleLanguageChange(locales[activeIndex]);
        break;
      case 'Escape':
        // Close only this list, not the header menu that may contain it
        event.preventDefault();
        event.stopPropagation();
        closeList();
        break;
      case 'Tab':
        setIsOpen(false);
        break;
    }
  };

  const renderDropdown = () => (
    <span ref={wrapRef} className={styles.languageSwitcherSelectWrap}>
      <button
        ref={triggerRef}
        type="button"
        id="language-select"
        className={styles.languageSwitcherSelect}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={isOpen ? listId : undefined}
        aria-label={`${translateCommon('select_language')}: ${getLabel(locale)}`}
        onClick={() => (isOpen ? closeList() : openList())}
        onKeyDown={handleTriggerKeyDown}
      >
        {getLabel(locale)}
      </button>
      <ChevronDown className={styles.languageSwitcherChevron} data-open={isOpen} />
      {isOpen ? (
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          tabIndex={-1}
          aria-label={translateCommon('select_language')}
          aria-activedescendant={`${listId}-${locales[activeIndex]}`}
          className={styles.languageSwitcherPanel}
          onKeyDown={handleListKeyDown}
        >
          {locales.map((code, index) => (
            <li
              key={code}
              id={`${listId}-${code}`}
              role="option"
              aria-selected={code === locale}
              data-active={index === activeIndex}
              className={styles.languageSwitcherOption}
              onClick={() => handleLanguageChange(code)}
              onMouseEnter={() => setActiveIndex(index)}
            >
              <span>{getLabel(code)}</span>
              {code === locale ? (
                <Check className={styles.languageSwitcherCheck} aria-hidden="true" />
              ) : null}
            </li>
          ))}
        </ul>
      ) : null}
    </span>
  );

  return (
    <React.Fragment>
      {styleMode === 'row' ? (
        <span className={styles.languageSwitcher} data-layout="row">
          <Globe className={styles.languageSwitcherIcon} />
          {renderDropdown()}
        </span>
      ) : (
        <span className={styles.languageSwitcher} data-layout="column">
          <span>{languageTranslate('caption')}</span>
          <div className={`${styles.languageSwitcherColumnMode}`}>
            <Globe className={styles.languageSwitcherIcon} />
            {renderDropdown()}
          </div>
        </span>
      )}
    </React.Fragment>
  );
};

export default LanguageSwitcher;
