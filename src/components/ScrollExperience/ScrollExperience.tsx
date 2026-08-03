'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const REVEAL_SELECTOR = '[data-scroll-reveal]';

const ScrollExperience = () => {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.setAttribute('data-scroll-enhanced', 'true');
    const sections = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR));

    if (sections.length === 0) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      sections.forEach((section) => section.setAttribute('data-scroll-visible', 'true'));
      return;
    }

    if (typeof IntersectionObserver === 'undefined') {
      sections.forEach((section) => section.setAttribute('data-scroll-visible', 'true'));
      return;
    }

    const revealSection = (section: Element) => {
      section.setAttribute('data-scroll-visible', 'true');
      observer.unobserve(section);
    };
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) revealSection(entry.target);
        });
      },
      {
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.08,
      }
    );
    let animationFrameId: number | null = null;

    const revealPassedSections = () => {
      animationFrameId = null;
      const revealLine = window.innerHeight * 0.9;

      sections.forEach((section) => {
        if (
          !section.hasAttribute('data-scroll-visible') &&
          section.getBoundingClientRect().top < revealLine
        ) {
          revealSection(section);
        }
      });
    };
    const queueRevealCheck = () => {
      if (animationFrameId !== null) return;
      animationFrameId = requestAnimationFrame(revealPassedSections);
    };

    sections.forEach((section) => observer.observe(section));
    revealPassedSections();
    window.addEventListener('scroll', queueRevealCheck, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', queueRevealCheck);
      if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
    };
  }, [pathname]);

  return null;
};

export default ScrollExperience;
