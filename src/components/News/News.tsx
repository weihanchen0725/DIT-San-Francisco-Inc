import { getFormatter, getLocale, getTranslations } from 'next-intl/server';
import Link from 'next/link';
import SectionHeading from '@/components/ui/SectionHeading';
import type { NewsArticle } from '@/lib/news';
import newsClass from './News.module.scss';

type NewsProps = {
  articles: NewsArticle[];
  headingLevel?: 1 | 2;
};

const News = async ({ articles, headingLevel = 1 }: NewsProps) => {
  const translateNews = await getTranslations('News');
  const format = await getFormatter();
  const locale = await getLocale();
  const itemHeadingLevel = headingLevel === 1 ? 2 : 3;

  return (
    <section id="news" className={newsClass.news} data-scroll-reveal="">
      <SectionHeading level={headingLevel} className={newsClass.newsTitle}>
        {translateNews('title')}
      </SectionHeading>
      <p className={newsClass.newsDescription}>{translateNews('description')}</p>

      {articles.length > 0 ? (
        <div className={newsClass.newsGrid}>
          {articles.map((article, index) => (
            <article
              key={article.id}
              className={newsClass.newsCard}
              data-scroll-reveal-item=""
              style={{ '--scroll-item-index': index } as React.CSSProperties}
            >
              {article.publishedAt && (
                <time className={newsClass.newsDate} dateTime={article.publishedAt}>
                  {format.dateTime(new Date(article.publishedAt), {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </time>
              )}
              <SectionHeading level={itemHeadingLevel} className={newsClass.newsCardTitle}>
                {article.slug ? (
                  <Link href={`/${locale}/news/${encodeURIComponent(article.slug)}`}>
                    {article.title}
                  </Link>
                ) : article.sourceUrl ? (
                  <a href={article.sourceUrl} target="_blank" rel="noopener noreferrer">
                    {article.title}
                  </a>
                ) : (
                  article.title
                )}
              </SectionHeading>
              {article.excerpt && (
                <p className={newsClass.newsCardDescription}>{article.excerpt}</p>
              )}
            </article>
          ))}
        </div>
      ) : (
        <p className={newsClass.newsEmpty}>{translateNews('empty')}</p>
      )}
    </section>
  );
};

export default News;
