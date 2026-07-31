'use client';

import dynamic from 'next/dynamic';

import useInView from '@/hooks/useInView';

const LoadingIndicator = () => (
  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800">
    <div className="w-2.5 h-2.5 rounded-full bg-gray-400 animate-pulse" />
    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Loading...</span>
  </div>
);

const OpenIndicator = dynamic(() => import('./OpenIndicator'), {
  ssr: false,
  loading: LoadingIndicator,
});

const OpenIndicatorWrapper = () => {
  const { ref, inView } = useInView<HTMLDivElement>({ rootMargin: '600px 0px' });

  return (
    <div ref={ref} className="inline-block">
      {inView ? <OpenIndicator /> : <LoadingIndicator />}
    </div>
  );
};

export default OpenIndicatorWrapper;
