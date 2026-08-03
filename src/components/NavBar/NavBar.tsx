'use client';

import { useMemo } from 'react';
import navClass from './NavBar.module.scss';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import navBarData from '@/assets/data/NavBar.data.json';
import useActiveSection from '@/hooks/useActiveSection';
import type { LinkProps } from '@/types/LinkProps';

interface NavBarProps {
  styleMode?: 'row' | 'column';
  startIndex?: number;
  endIndex?: number;
  ariaLabel?: string;
}

const navigationItems = navBarData as LinkProps[];

export const ACTIVE_NAV_ITEM_COUNT = navigationItems.filter((item) => item.isActive).length;

const NavBar = ({
  styleMode = 'row',
  startIndex = 0,
  endIndex = ACTIVE_NAV_ITEM_COUNT,
  ariaLabel,
}: NavBarProps) => {
  const translateNavBar = useTranslations('NavBar');
  const pathname = usePathname();
  const locale = useLocale();
  const visibleItems = navigationItems.filter((item) => item.isActive).slice(startIndex, endIndex);

  const isHomePage = pathname === `/${locale}` || pathname === '/';
  const getHref = (anchor: string | undefined) => {
    const resolved = anchor ?? '#';
    return isHomePage ? resolved : `/${locale}${resolved}`;
  };

  // Stable reference — prevents useEffect in useActiveSection from re-firing every render.
  const sectionIds = useMemo(() => navigationItems.map((item) => item?.Key ?? 'home'), []);

  const activeSection = useActiveSection(sectionIds);

  // On sub-pages (e.g. /tools/incoterms) the IntersectionObserver finds no matching
  // sections, so derive the active key from the first pathname segment instead.
  const pathnameKey = useMemo(() => {
    if (isHomePage) return '';
    const withoutLocale = pathname.startsWith(`/${locale}`)
      ? pathname.slice(`/${locale}`.length)
      : pathname;
    return withoutLocale.split('/').filter(Boolean)[0] ?? '';
  }, [isHomePage, pathname, locale]);

  const effectiveActive = isHomePage ? activeSection : pathnameKey;

  return (
    <nav className={navClass.nav} aria-label={ariaLabel}>
      <ul className={`${navClass.nav_list} ${navClass[styleMode]}`} data-style-mode={styleMode}>
        {visibleItems.map((item: LinkProps, index: number) => (
          <li
            key={item?.id ?? startIndex + index}
            className={effectiveActive === item?.Key ? navClass.active : ''}
          >
            <a
              href={getHref(item?.Value)}
              aria-disabled={item?.isEnabled === false}
              target={item?.isExternal ? '_blank' : '_self'}
              rel={item?.isExternal ? 'noopener noreferrer' : undefined}
            >
              {translateNavBar(item?.Key?.toLowerCase() ?? '')}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
