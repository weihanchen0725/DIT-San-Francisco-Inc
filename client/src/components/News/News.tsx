import { getTranslations } from "next-intl/server";

const News = async () => {
  const translateNews = await getTranslations('News');
  return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-brand-navy dark:text-white tracking-tight">{translateNews("title")}</h2>
        <p className="mt-6 text-lg sm:text-xl text-brand-gray dark:text-gray-300 max-w-2xl leading-relaxed">
          {translateNews("description")}
        </p>
        {/* Add news articles here */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-8 rounded-2xl bg-white dark:bg-[#111127] border border-gray-100 dark:border-brand-navy-light hover:shadow-xl hover:border-brand-yellow dark:hover:border-brand-yellow transition-all duration-300">
            <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-brand-yellow/15 dark:bg-brand-yellow/20">
              <svg className="w-8 h-8 text-brand-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-brand-navy dark:text-white">
              News Article 1
            </h3>
            <p className="mt-3 text-brand-gray dark:text-gray-400 leading-relaxed">
              Summary of the first news article.
            </p>
          </div>
          <div className="text-center p-8 rounded-2xl bg-white dark:bg-[#111127] border border-gray-100 dark:border-brand-navy-light hover:shadow-xl hover:border-brand-yellow dark:hover:border-brand-yellow transition-all duration-300">
            <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-brand-yellow/15 dark:bg-brand-yellow/20">
              <svg className="w-8 h-8 text-brand-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-brand-navy dark:text-white">
              News Article 2
            </h3>
            <p className="mt-3 text-brand-gray dark:text-gray-400 leading-relaxed">
              Summary of the second news article.
            </p>
          </div>
          <div className="text-center p-8 rounded-2xl bg-white dark:bg-[#111127] border border-gray-100 dark:border-brand-navy-light hover:shadow-xl hover:border-brand-yellow dark:hover:border-brand-yellow transition-all duration-300">
            <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-brand-yellow/15 dark:bg-brand-yellow/20">
              <svg className="w-8 h-8 text-brand-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-brand-navy dark:text-white">
              News Article 3
            </h3>
            <p className="mt-3 text-brand-gray dark:text-gray-400 leading-relaxed">
              Summary of the third news article.
            </p>
          </div>
        </div>
      </div>
  );
};

export default News;
