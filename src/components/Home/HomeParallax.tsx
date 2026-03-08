'use client';

import { useEffect, useRef } from 'react';
import homeClass from './Home.module.scss';

/**
 * Attaches a scroll listener that drives --plane-offset / --ship-offset
 * CSS custom properties on the collage container.
 *
 * Movement starts at scrollY = 0 and freezes once the #home section
 * has fully scrolled past the viewport.
 *   Plane  → northwest (up + left)
 *   Ship   → southeast (down + right)
 */
const HomeParallax = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const progressRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Walk up to find the #home section so we can measure its bounds.
    const section = container.closest('#home') as HTMLElement | null;
    if (!section) return;

    const MAX_OFFSET_PX = 80; // maximum travel distance at progress = 1
    // x-to-y ratio — 0.55 ≈ 29° diagonal angle
    const X_RATIO = 0.55;

    // Measure section's document-relative top once on mount so that
    // progress = 0 at scrollY = 0 and progress = 1 when the section
    // bottom has scrolled level with the viewport top.
    const sectionDocTop = section.getBoundingClientRect().top + window.scrollY;
    const totalRange = sectionDocTop + section.offsetHeight;

    const applyOffset = () => {
      rafRef.current = null;

      const raw = window.scrollY / (totalRange || 1);
      const progress = Math.max(0, Math.min(1, raw));

      // Only update when progress actually changes to avoid unnecessary writes.
      if (Math.abs(progress - progressRef.current) < 0.001) return;
      progressRef.current = progress;

      const yOffset = progress * MAX_OFFSET_PX;
      const xOffset = yOffset * X_RATIO;

      // Plane — northwest: y goes up (SCSS negates), x goes left (SCSS subtracts)
      container.style.setProperty('--plane-offset-y', `${yOffset}px`);
      container.style.setProperty('--plane-offset-x', `${xOffset}px`);

      // Ship — southeast: y goes down (SCSS adds), x goes right (SCSS adds)
      container.style.setProperty('--ship-offset-y', `${yOffset}px`);
      container.style.setProperty('--ship-offset-x', `${xOffset}px`);
    };

    const onScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = window.requestAnimationFrame(applyOffset);
    };

    // Seed with current position on mount.
    applyOffset();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div ref={containerRef} className={homeClass.hero_images}>
      {children}
    </div>
  );
};

export default HomeParallax;
