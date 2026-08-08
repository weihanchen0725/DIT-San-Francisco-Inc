import type { ReactNode } from 'react';
import homeClass from './Home.module.scss';

/**
 * Server-rendered shell for the hero's progressive CSS motion.
 * The collage stays fully visible when scroll timelines are unavailable.
 */
const HomeParallax = ({ children }: { children: ReactNode }) => {
  return (
    <div className={homeClass.heroImages} data-testid="hero-motion">
      {children}
    </div>
  );
};

export default HomeParallax;
