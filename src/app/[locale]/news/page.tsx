import type { AppLocale } from '@/i18n/config';
import { getLocalizedMetadata } from '@/lib/seo';
import News from '@/components/News/News';
import MainLayOut from '@/layouts/MainLayOut';

type PageProps = {
  params: Promise<{ locale: AppLocale }>;
};

export const generateMetadata = async ({ params }: PageProps) => {
  const { locale } = await params;
  return getLocalizedMetadata({ locale, path: '/news', pageKey: 'news' });
};

const NewsPage = () => {
  return (
    <MainLayOut>
      <News />
    </MainLayOut>
  );
};

export default NewsPage;
