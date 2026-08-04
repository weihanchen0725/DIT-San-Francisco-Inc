'use client';

import dynamic from 'next/dynamic';

import useInView from '@/hooks/useInView';

const Map = dynamic(() => import('@/components/Map/Map'), {
  ssr: false,
  loading: () => (
    <div className="h-[280px] w-full bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse flex items-center justify-center">
      <span className="text-gray-600 dark:text-gray-300">Loading map...</span>
    </div>
  ),
});

/**
 * Wraps the Leaflet map so its (large) JavaScript bundle is only fetched
 * and parsed once the map approaches the viewport — keeping it out of the
 * critical path on first load.
 */
const MapWrapper = () => {
  const { ref, inView } = useInView<HTMLDivElement>({
    rootMargin: '600px 0px', // Start loading just before the map scrolls into view.
  });

  if (!inView) {
    // Keep the card's height stable until the map is ready (prevents CLS).
    return <div ref={ref} className="h-[280px] w-full" aria-hidden="true" />;
  }

  return (
    <div ref={ref}>
      <Map />
    </div>
  );
};

export default MapWrapper;
