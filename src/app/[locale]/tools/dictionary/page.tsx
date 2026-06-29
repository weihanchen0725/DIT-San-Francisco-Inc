import type { AppLocale } from '@/i18n/config';
import { getLocalizedMetadata } from '@/lib/seo';
import Dictionary from '@/components/Dictionary/Dictionary';

type PageProps = {
  params: Promise<{ locale: AppLocale }>;
};

export const generateMetadata = async ({ params }: PageProps) => {
  const { locale } = await params;
  return getLocalizedMetadata({ locale, path: '/tools/dictionary', pageKey: 'dictionary' });
};

const DictionaryPage = async () => {
  return <Dictionary />;
};

export default DictionaryPage;
