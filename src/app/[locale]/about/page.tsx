import type { AppLocale } from '@/i18n/config';
import { getLocalizedMetadata } from '@/lib/seo';
import About from '@/components/About/About';
import MainLayOut from '@/layouts/MainLayOut';

type PageProps = {
  params: Promise<{ locale: AppLocale }>;
};

export const generateMetadata = async ({ params }: PageProps) => {
  const { locale } = await params;
  return getLocalizedMetadata({ locale, path: '/about', pageKey: 'about' });
};

const AboutPage = () => {
  return (
    <MainLayOut>
      <About />
    </MainLayOut>
  );
};

export default AboutPage;
