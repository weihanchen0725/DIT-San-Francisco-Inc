import { setRequestLocale } from 'next-intl/server';
import type { AppLocale } from '@/i18n/config';
import { getLocalizedMetadata } from '@/lib/seo';
import About from '@/components/About/About';

type PageProps = {
  params: Promise<{ locale: AppLocale }>;
};

export const generateMetadata = async ({ params }: PageProps) => {
  const { locale } = await params;
  return getLocalizedMetadata({ locale, path: '/about', pageKey: 'about' });
};

const AboutPage = async ({ params }: PageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);

  return <About headingLevel={1} />;
};

export default AboutPage;
