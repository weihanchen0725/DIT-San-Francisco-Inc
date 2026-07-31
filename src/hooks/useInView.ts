'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Observes whether an element has entered the viewport.
 *
 * Used to defer the load of below-the-fold, interaction-heavy components
 * (e.g. the map) until the user actually scrolls toward them — keeping
 * their JavaScript out of the critical path.
 */
const useInView = <T extends HTMLElement>(options?: IntersectionObserverInit) => {
  const ref = useRef<T | null>(null);
  // Keep the server and first client render identical to avoid hydration work.
  const [inView, setInView] = useState(false);
  // Keep options in a ref so the effect below runs exactly once.
  const optionsRef = useRef(options);

  useEffect(() => {
    const element = ref.current;
    if (!element || inView) return;

    if (typeof IntersectionObserver === 'undefined') {
      const frameId = requestAnimationFrame(() => setInView(true));
      return () => cancelAnimationFrame(frameId);
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect(); // One-shot: once visible, stay visible.
      }
    }, optionsRef.current);

    observer.observe(element);
    return () => observer.disconnect();
  }, [inView]);

  return { ref, inView };
};

export default useInView;
