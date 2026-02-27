"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

import headerClass from "./Header.module.scss";
import NavBar from "../NavBar/NavBar";
import CTABar from "../CTABar/CTABar";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";

type HeaderClientProps = {
  headerData: HeaderProps;
  logoUrl: string;
};

const MENU_COLLAPSE_BREAKPOINT_PX = 1120;
const NAV_COLLAPSE_BREAKPOINT_PX = 896;
const NAME_COLLAPSE_BREAKPOINT_PX = 640;

const getHeaderCollapseTier = (width: number) => {
  if (width <= NAME_COLLAPSE_BREAKPOINT_PX) {
    return 3;
  }

  if (width <= NAV_COLLAPSE_BREAKPOINT_PX) {
    return 2;
  }

  if (width <= MENU_COLLAPSE_BREAKPOINT_PX) {
    return 1;
  }

  return 0;
};

const HeaderClient = ({ headerData, logoUrl }: HeaderClientProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [collapseTier, setCollapseTier] = useState(0);
  const menuPanelId = useId();

  // Reference to the sticky header for reading height and writing CSS vars.
  const headerRef = useRef<HTMLElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const menuPanelRef = useRef<HTMLDivElement | null>(null);
  // Mirror scroll progress to avoid unnecessary style writes.
  const scrollProgressRef = useRef(0);
  
  // Effect to handle scroll state for the header's "scrolled" visual style.
  useEffect(() => {
    let animationFrameId: number | null = null;

    const syncPaddingBaseline = () => {
      const headerElement = headerRef.current;

      if (!headerElement) {
        return;
      }

      const computedStyle = getComputedStyle(headerElement);
      const paddingBlockStart = Number.parseFloat(computedStyle.paddingTop);
      const paddingInlineStart = Number.parseFloat(computedStyle.paddingLeft);

      if (Number.isFinite(paddingBlockStart)) {
        headerElement.style.setProperty(
          "--header-padding-block-start",
          `${paddingBlockStart}px`,
        );
      }

      if (Number.isFinite(paddingInlineStart)) {
        headerElement.style.setProperty(
          "--header-padding-inline-start",
          `${paddingInlineStart}px`,
        );
      }
    };

    const updateScrolledState = () => {
      animationFrameId = null;
      const currentScrollY = window.scrollY;

      // Increase background intensity from 0 -> 1 over one header-height of scroll.
      const headerHeight = headerRef.current?.offsetHeight ?? 0;
      const nextScrollProgress =
        headerHeight > 0 ? Math.min(currentScrollY / headerHeight, 1) : 0;

      if (Math.abs(scrollProgressRef.current - nextScrollProgress) < 0.001) {
        return;
      }

      scrollProgressRef.current = nextScrollProgress;
      const headerElement = headerRef.current;

      if (!headerElement) {
        return;
      }

      headerElement.style.setProperty(
        "--header-scroll-progress",
        nextScrollProgress.toString(),
      );
      headerElement.style.setProperty(
        "--header-backdrop-saturate",
        `${100 + 60 * nextScrollProgress}%`,
      );
      headerElement.style.setProperty(
        "--header-backdrop-blur",
        `${10 * nextScrollProgress}px`,
      );
      headerElement.style.setProperty(
        "--header-shadow-highlight-opacity",
        `${0.35 * nextScrollProgress}`,
      );
      headerElement.style.setProperty(
        "--header-shadow-depth-mix",
        `${30 * nextScrollProgress}%`,
      );
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
      const nextCollapseTier = getHeaderCollapseTier(headerWidth);

      setCollapseTier((prevTier) => {
        if (prevTier === nextCollapseTier) {
          return prevTier;
        }

        return nextCollapseTier;
      });

      if (nextCollapseTier === 0) {
        setIsMenuOpen(false);
      }
    };

    // Sync initial state on load, then update during scrolling.
    syncPaddingBaseline();
    updateScrolledState();
    handleResize();
    window.addEventListener("scroll", queueUpdate, { passive: true });
    window.addEventListener("resize", handleResize);

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
      window.removeEventListener("scroll", queueUpdate);
      window.removeEventListener("resize", handleResize);
      resizeObserver?.disconnect();

      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

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

    document.addEventListener("click", handleOutsideMenuClick);

    return () => {
      document.removeEventListener("click", handleOutsideMenuClick);
    };
  }, [isMenuOpen]);

  return (
    <header ref={headerRef} className={headerClass.header}>
      {/* Brand — always visible (name hides at very narrow widths via CSS) */}
      <div className={headerClass.header_content}>
        {logoUrl ? (
          <img
            src={logoUrl}
            alt={headerData.Logo?.image?.alternativeText ?? "Logo"}
            className={headerClass.header_logo}
          />
        ) : null}
        {collapseTier < 3 ? (
          <span className={headerClass.header_name}>({headerData?.Name})</span>
        ) : null}
      </div>

      {collapseTier < 2 ? (
        <div className={headerClass.header_nav}>
          <NavBar NavigationList={headerData?.Navigations ?? []} />
        </div>
      ) : null}

      {collapseTier < 1 ? (
        <div className={headerClass.header_contact}>
          <CTABar ctaLinks={headerData?.CTA ?? []} />
          <ThemeSwitcher />
          <LanguageSwitcher />
        </div>
      ) : null}

      {collapseTier > 0 ? (
        <button
          ref={menuButtonRef}
          type="button"
          className={headerClass.header_menuButton}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-expanded={isMenuOpen}
          aria-controls={menuPanelId}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      ) : null}

      {/* Dropdown panel — render only while menu is open */}
      {isMenuOpen && collapseTier > 0 ? (
        <div
          ref={menuPanelRef}
          id={menuPanelId}
          className={`${headerClass.header_menuPanel} ${headerClass.header_menuPanelOpen}`}
          onClickCapture={(event) => {
            if (!(event.target as HTMLElement).closest("a")) return;
            setIsMenuOpen(false);
          }}
        >
          {collapseTier >= 2 ? (
            <div className={headerClass.header_menuPanelNav}>
              <NavBar NavigationList={headerData?.Navigations ?? []} styleMode="column" />
            </div>
          ) : null}
          {collapseTier >= 1 ? (
            <div className={headerClass.header_menuPanelContact}>
              <CTABar ctaLinks={headerData?.CTA ?? []} styleMode="column" />
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