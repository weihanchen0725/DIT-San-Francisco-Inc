import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import type { AppLocale } from '@/i18n/config';
import { getLocalizedMetadata } from '@/lib/seo';
import { getNewsPost } from '@/lib/news';
import NewsPost from '@/components/News/NewsPost';
import MainLayOut from '@/layouts/MainLayOut';

type PageProps = {
  params: Promise<{ locale: AppLocale; slug: string }>;
};

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const { locale, slug } = await params;
  const base = await getLocalizedMetadata({ locale, path: `/news/${slug}`, pageKey: 'news' });
  // Next.js memoizes this GET, so the page below reuses the same response.
  const post = await getNewsPost(slug);

  if (!post) {
    return base;
  }

  const title = post.seoTitle || post.title;
  const description = post.metaDescription || post.excerpt || base.description;

  return {
    ...base,
    title,
    description,
    openGraph: {
      ...base.openGraph,
      type: 'article',
      title,
      description: description ?? undefined,
      publishedTime: post.publishedAt ?? undefined,
    },
    twitter: { ...base.twitter, title, description: description ?? undefined },
  };
};

const NewsPostPage = async ({ params }: PageProps) => {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = await getNewsPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <MainLayOut>
      <NewsPost post={post} />
    </MainLayOut>
  );
};

export default NewsPostPage;
