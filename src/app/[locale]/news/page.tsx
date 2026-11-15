import { setRequestLocale } from 'next-intl/server';
import type { AppLocale } from '@/i18n/config';
import { getLocalizedMetadata } from '@/lib/seo';
import { getNewsArticles } from '@/lib/news';
import News from '@/components/News/News';
import MainLayOut from '@/layouts/MainLayOut';

type PageProps = {
  params: Promise<{ locale: AppLocale }>;
};

export const generateMetadata = async ({ params }: PageProps) => {
  const { locale } = await params;
  return getLocalizedMetadata({ locale, path: '/news', pageKey: 'news' });
};

const NewsPage = async ({ params }: PageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);

  // Always public; on API failure getNewsArticles returns [] and News shows its empty state.
  const articles = await getNewsArticles();

  return (
    <MainLayOut>
      <News articles={articles} />
    </MainLayOut>
  );
};

export default NewsPage;
