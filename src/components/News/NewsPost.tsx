import { getFormatter, getLocale, getTranslations } from 'next-intl/server';
import Link from 'next/link';
import SectionHeading from '@/components/ui/SectionHeading';
import { getBodyParagraphs, type NewsPost as NewsPostData } from '@/lib/news';
import newsClass from './News.module.scss';

type NewsPostProps = {
  post: NewsPostData;
};

const NewsPost = async ({ post }: NewsPostProps) => {
  const translateNews = await getTranslations('News');
  const format = await getFormatter();
  const locale = await getLocale();
  const paragraphs = getBodyParagraphs(post.body);
  // ctaUrl comes from the CMS, so only http(s) links render.
  const ctaUrl = post.ctaUrl && /^https?:\/\//i.test(post.ctaUrl) ? post.ctaUrl : undefined;

  return (
    <article className={newsClass.news}>
      <Link className={newsClass.newsBack} href={`/${locale}/news`}>
        {translateNews('back')}
      </Link>
      {post.publishedAt && (
        <time className={newsClass.newsDate} dateTime={post.publishedAt}>
          {format.dateTime(new Date(post.publishedAt), {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
      )}
      <SectionHeading level={1} className={newsClass.newsTitle}>
        {post.title}
      </SectionHeading>
      {post.excerpt && <p className={newsClass.newsDescription}>{post.excerpt}</p>}
      {paragraphs.length > 0 && (
        <div className={newsClass.newsBody}>
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      )}
      {ctaUrl && post.ctaLabel && (
        <a className={newsClass.newsCta} href={ctaUrl} target="_blank" rel="noopener noreferrer">
          {post.ctaLabel}
        </a>
      )}
    </article>
  );
};

export default NewsPost;
