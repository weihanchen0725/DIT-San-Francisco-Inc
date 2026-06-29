import type { AppLocale } from '@/i18n/config';
import { getLocalizedMetadata } from '@/lib/seo';
import Services from '@/components/Services/Services';
import MainLayOut from '@/layouts/MainLayOut';

type PageProps = {
  params: Promise<{ locale: AppLocale }>;
};

export const generateMetadata = async ({ params }: PageProps) => {
  const { locale } = await params;
  return getLocalizedMetadata({ locale, path: '/services', pageKey: 'services' });
};

const ServicesPage = () => {
  return (
    <MainLayOut>
      <Services />
    </MainLayOut>
  );
};

export default ServicesPage;
