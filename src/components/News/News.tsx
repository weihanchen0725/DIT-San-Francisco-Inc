import { getTranslations } from 'next-intl/server';
import SectionHeading from '@/components/ui/SectionHeading';
import newsClass from './News.module.scss';

const News = async ({ headingLevel = 2 }: { headingLevel?: 1 | 2 }) => {
  const translateNews = await getTranslations('News');
  const itemHeadingLevel = headingLevel === 1 ? 2 : 3;
  return (
    <section id="news" className={newsClass.news} data-scroll-reveal="">
      <SectionHeading level={headingLevel} className={newsClass.news_title}>
        {translateNews('title')}
      </SectionHeading>
      <p className={newsClass.news_description}>{translateNews('description')}</p>
      {/* Add news articles here */}
      <div className={newsClass.news_grid}>
        <div
          className={newsClass.news_card}
          data-scroll-reveal-item=""
          style={{ '--scroll-item-index': 0 } as React.CSSProperties}
        >
          <div className={newsClass.news_card_iconWrap}>
            <svg
              className={newsClass.news_card_iconSvg}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
          </div>
          <SectionHeading level={itemHeadingLevel} className={newsClass.news_card_title}>
            News Article 1
          </SectionHeading>
          <p className={newsClass.news_card_description}>Summary of the first news article.</p>
        </div>
        <div
          className={newsClass.news_card}
          data-scroll-reveal-item=""
          style={{ '--scroll-item-index': 1 } as React.CSSProperties}
        >
          <div className={newsClass.news_card_iconWrap}>
            <svg
              className={newsClass.news_card_iconSvg}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
          </div>
          <SectionHeading level={itemHeadingLevel} className={newsClass.news_card_title}>
            News Article 2
          </SectionHeading>
          <p className={newsClass.news_card_description}>Summary of the second news article.</p>
        </div>
        <div
          className={newsClass.news_card}
          data-scroll-reveal-item=""
          style={{ '--scroll-item-index': 2 } as React.CSSProperties}
        >
          <div className={newsClass.news_card_iconWrap}>
            <svg
              className={newsClass.news_card_iconSvg}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
          </div>
          <SectionHeading level={itemHeadingLevel} className={newsClass.news_card_title}>
            News Article 3
          </SectionHeading>
          <p className={newsClass.news_card_description}>Summary of the third news article.</p>
        </div>
      </div>
    </section>
  );
};

export default News;
