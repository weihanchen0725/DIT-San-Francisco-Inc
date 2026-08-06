'use client';

import { Menu, X } from 'lucide-react';
import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import type { StaticImageData } from 'next/image';

import headerClass from './Header.module.scss';
import NavBar, { ACTIVE_NAV_ITEM_COUNT } from '../NavBar/NavBar';
import CTABar from '../CTABar/CTABar';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import { useTranslations } from 'next-intl';
import type { HeaderProps } from '@/types/HeaderProps';

type HeaderClientProps = {
  headerData: HeaderProps;
  logoUrl: string | StaticImageData;
  darkLogoUrl: string | StaticImageData;
};

const MENU_COLLAPSE_BREAKPOINT_PX = 1260;
const NAVIGATION_STEP_PX = 80;
const FIRST_NAVIGATION_STEP_PX = 1120;

type HeaderLayout = {
  inlineNavCount: number;
  showInlineContact: boolean;
};

const getHeaderLayout = (width: number): HeaderLayout => {
  const hiddenNavCount =
    width > FIRST_NAVIGATION_STEP_PX
      ? 0
      : Math.min(
          ACTIVE_NAV_ITEM_COUNT,
          Math.floor((FIRST_NAVIGATION_STEP_PX - width) / NAVIGATION_STEP_PX) + 1
        );

  return {
    inlineNavCount: ACTIVE_NAV_ITEM_COUNT - hiddenNavCount,
    showInlineContact: width > MENU_COLLAPSE_BREAKPOINT_PX,
  };
};

const DEFAULT_HEADER_LAYOUT: HeaderLayout = {
  inlineNavCount: 0,
  showInlineContact: false,
};

const HeaderClient = ({ headerData, logoUrl, darkLogoUrl }: HeaderClientProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [headerLayout, setHeaderLayout] = useState(DEFAULT_HEADER_LAYOUT);
  const menuPanelId = useId();
  const translateHeader = useTranslations('Header');
  const translateNavBar = useTranslations('NavBar');
  const pathname = usePathname();
  const { inlineNavCount, showInlineContact } = headerLayout;
  const hasOverflowNavigation = inlineNavCount < ACTIVE_NAV_ITEM_COUNT;
  const hasMenu = !showInlineContact || hasOverflowNavigation;

  // Reference to the sticky header for reading height and writing CSS vars.
  const headerRef = useRef<HTMLElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const menuPanelRef = useRef<HTMLDivElement | null>(null);
  // Mirror scroll progress to avoid unnecessary style writes.
  const scrollProgressRef = useRef(0);

  // Effect to handle scroll state for the header's "scrolled" visual style.
  useLayoutEffect(() => {
    let animationFrameId: number | null = null;

    const syncPaddingBaseline = () => {
      const headerElement = headerRef.current;

      if (!headerElement) {
        return;
      }

      const currentScrollY = window.scrollY;
      const headerHeight = headerElement?.offsetHeight ?? 0;
      const nextScrollProgress = headerHeight > 0 ? Math.min(currentScrollY / headerHeight, 1) : 0;

      const computedStyle = getComputedStyle(headerElement);
      const paddingBlockStart = Number.parseFloat(computedStyle.paddingTop);
      const paddingInlineStart = Number.parseFloat(computedStyle.paddingLeft);

      if (Math.abs(scrollProgressRef.current - nextScrollProgress) < 0.001) {
        return;
      }

      if (Number.isFinite(paddingBlockStart)) {
        headerElement.style.setProperty('--header-padding-block-start', `${paddingBlockStart}px`);
      }

      if (Number.isFinite(paddingInlineStart)) {
        headerElement.style.setProperty('--header-padding-inline-start', `${paddingInlineStart}px`);
      }
    };

    const updateScrolledState = () => {
      animationFrameId = null;
      const currentScrollY = window.scrollY;

      // Increase background intensity from 0 -> 1 over one header-height of scroll.
      const headerHeight = headerRef.current?.offsetHeight ?? 0;
      const nextScrollProgress = headerHeight > 0 ? Math.min(currentScrollY / headerHeight, 1) : 0;

      if (Math.abs(scrollProgressRef.current - nextScrollProgress) < 0.001) {
        return;
      }

      scrollProgressRef.current = nextScrollProgress;
      const headerElement = headerRef.current;

      if (!headerElement) {
        return;
      }

      headerElement.style.setProperty('--header-scroll-progress', nextScrollProgress.toString());
      headerElement.style.setProperty(
        '--header-backdrop-saturate',
        `${100 + 60 * nextScrollProgress}%`
      );
      headerElement.style.setProperty('--header-backdrop-blur', `${10 * nextScrollProgress}px`);
      headerElement.style.setProperty(
        '--header-shadow-highlight-opacity',
        `${0.35 * nextScrollProgress}`
      );
      headerElement.style.setProperty('--header-shadow-depth-mix', `${30 * nextScrollProgress}%`);
    };

    const queueUpdate = () => {
      if (animationFrameId !== null) {
        return;
      }

      // Batch scroll reads/writes to animation frames for smoother performance.
      animationFrameId = window.requestAnimationFrame(updateScrolledState);
    };

    const handleResize = () => {
      // Recompute baseline paddings as responsive breakpoints can change them.
      syncPaddingBaseline();
      queueUpdate();

      const headerWidth = headerRef.current?.offsetWidth ?? window.innerWidth;
      const nextLayout = getHeaderLayout(headerWidth);

      setHeaderLayout((previousLayout) => {
        if (
          previousLayout.inlineNavCount === nextLayout.inlineNavCount &&
          previousLayout.showInlineContact === nextLayout.showInlineContact
        ) {
          return previousLayout;
        }

        return nextLayout;
      });

      if (nextLayout.showInlineContact && nextLayout.inlineNavCount === ACTIVE_NAV_ITEM_COUNT) {
        setIsMenuOpen(false);
      }
    };

    // Sync initial state on load, then update during scrolling.
    syncPaddingBaseline();
    updateScrolledState();
    handleResize();
    window.addEventListener('scroll', queueUpdate, { passive: true });
    window.addEventListener('resize', handleResize);

    const headerElement = headerRef.current;
    const resizeObserver =
      headerElement === null
        ? null
        : new ResizeObserver(() => {
            handleResize();
          });

    if (resizeObserver && headerElement) {
      resizeObserver.observe(headerElement);
    }

    return () => {
      // Cleanup listener on unmount.
      window.removeEventListener('scroll', queueUpdate);
      window.removeEventListener('resize', handleResize);
      resizeObserver?.disconnect();

      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  // Re-sync header background when route changes and browser restores scroll
  // without dispatching a scroll event (e.g., navigating back to landing page).
  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      const headerElement = headerRef.current;

      if (!headerElement) {
        return;
      }

      const currentScrollY = window.scrollY;
      const headerHeight = headerElement.offsetHeight;
      const nextScrollProgress = headerHeight > 0 ? Math.min(currentScrollY / headerHeight, 1) : 0;

      scrollProgressRef.current = nextScrollProgress;
      headerElement.style.setProperty('--header-scroll-progress', nextScrollProgress.toString());
      headerElement.style.setProperty(
        '--header-backdrop-saturate',
        `${100 + 60 * nextScrollProgress}%`
      );
      headerElement.style.setProperty('--header-backdrop-blur', `${10 * nextScrollProgress}px`);
      headerElement.style.setProperty(
        '--header-shadow-highlight-opacity',
        `${0.35 * nextScrollProgress}`
      );
      headerElement.style.setProperty('--header-shadow-depth-mix', `${30 * nextScrollProgress}%`);
    });

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [pathname]);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const handleOutsideMenuClick = (event: MouseEvent) => {
      const clickTarget = event.target;

      if (!(clickTarget instanceof Node)) {
        return;
      }

      const clickedInsidePanel = menuPanelRef.current?.contains(clickTarget);
      const clickedMenuButton = menuButtonRef.current?.contains(clickTarget);

      if (clickedInsidePanel || clickedMenuButton) {
        return;
      }

      setIsMenuOpen(false);
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setIsMenuOpen(false);
      menuButtonRef.current?.focus();
    };

    document.addEventListener('click', handleOutsideMenuClick);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('click', handleOutsideMenuClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMenuOpen]);

  return (
    <header
      ref={headerRef}
      className={`${headerClass.header} ${isMenuOpen ? headerClass.headerMenuOpen : ''}`}
    >
      {/* Brand — always visible (name hides at very narrow widths via CSS) */}
      <div className={headerClass.headerContent}>
        {/* Two images rendered; CSS toggles visibility based on .dark on <html> */}
        <Image
          src={logoUrl}
          alt={translateHeader(headerData.Logo?.image?.alternativeText ?? '')}
          className={`${headerClass.headerLogo} ${headerClass.headerLogoLight}`}
          sizes="125px"
        />
        <Image
          src={darkLogoUrl}
          alt={translateHeader(headerData.Logo?.image?.alternativeText ?? '')}
          className={`${headerClass.headerLogo} ${headerClass.headerLogoDark}`}
          aria-hidden="true"
          sizes="125px"
        />
        <span className={headerClass.headerName}>({translateHeader(headerData?.Name ?? '')})</span>
      </div>

      {inlineNavCount > 0 ? (
        <div className={headerClass.headerNav}>
          <NavBar endIndex={inlineNavCount} ariaLabel={translateNavBar('primary_navigation')} />
        </div>
      ) : null}

      {showInlineContact ? (
        <div className={headerClass.headerContact}>
          <CTABar ctaLinks={headerData?.CTA} />
          <ThemeSwitcher />
          <LanguageSwitcher />
        </div>
      ) : null}

      {hasMenu ? (
        <div
          className={`${headerClass.headerMenuButtonWrapper} ${inlineNavCount === 0 ? headerClass.narrow : ''}`}
        >
          <button
            ref={menuButtonRef}
            type="button"
            className={headerClass.headerMenuButton}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-expanded={isMenuOpen}
            aria-controls={menuPanelId}
            aria-label={translateHeader(isMenuOpen ? 'close_menu' : 'open_menu')}
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      ) : null}

      {/* Dropdown panel — render only while menu is open */}
      {isMenuOpen && hasMenu ? (
        <div
          ref={menuPanelRef}
          id={menuPanelId}
          className={`${headerClass.headerMenuPanel} ${headerClass.headerMenuPanelOpen}`}
          onClickCapture={(event) => {
            if (!(event.target as HTMLElement).closest('a')) return;
            setIsMenuOpen(false);
          }}
        >
          {hasOverflowNavigation ? (
            <div className={headerClass.headerMenuPanelNav}>
              <NavBar
                styleMode="column"
                startIndex={inlineNavCount}
                ariaLabel={translateNavBar(
                  inlineNavCount === 0 ? 'primary_navigation' : 'more_navigation'
                )}
              />
            </div>
          ) : null}
          {!showInlineContact ? (
            <div className={headerClass.headerMenuPanelContact}>
              <CTABar ctaLinks={headerData?.CTA} styleMode="column" />
              <ThemeSwitcher styleMode="column" />
              <LanguageSwitcher styleMode="column" />
            </div>
          ) : null}
        </div>
      ) : null}
    </header>
  );
};

export default HeaderClient;
