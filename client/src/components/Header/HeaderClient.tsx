"use client";

import { useEffect, useRef } from "react";

import headerClass from "./Header.module.scss";
import NavBar from "../NavBar/NavBar";
import CTABar from "../CTABar/CTABar";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";

type HeaderClientProps = {
  headerData: HeaderProps;
  logoUrl: string;
};

const HeaderClient = ({ headerData, logoUrl }: HeaderClientProps) => {
  // Reference to the sticky header for reading height and writing CSS vars.
  const headerRef = useRef<HTMLElement | null>(null);
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
    };

    // Sync initial state on load, then update during scrolling.
    syncPaddingBaseline();
    updateScrolledState();
    window.addEventListener("scroll", queueUpdate, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      // Cleanup listener on unmount.
      window.removeEventListener("scroll", queueUpdate);
      window.removeEventListener("resize", handleResize);

      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className={headerClass.header}
    >
      <div className={headerClass.header_content}>
        {logoUrl ? (
          <img
            src={logoUrl}
            alt={headerData.Logo?.image?.alternativeText ?? "Logo"}
            className="h-16 w-auto"
          />
        ) : null}
        <span>({headerData?.Name})</span>
      </div>
      <NavBar NavigationList={headerData?.Navigations ?? []} />
      <CTABar ctaLinks={headerData?.CTA ?? []} />
      <ThemeSwitcher />
      <LanguageSwitcher />
    </header>
  );
};

export default HeaderClient;