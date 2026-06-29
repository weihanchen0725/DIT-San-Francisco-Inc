import type { AppLocale } from '@/i18n/config';
import { getLocalizedMetadata } from '@/lib/seo';
import Contact from '@/components/Contact/Contact';
import MainLayOut from '@/layouts/MainLayOut';

type PageProps = {
  params: Promise<{ locale: AppLocale }>;
};

export const generateMetadata = async ({ params }: PageProps) => {
  const { locale } = await params;
  return getLocalizedMetadata({ locale, path: '/contact', pageKey: 'contact' });
};

const ContactPage = () => {
  return (
    <MainLayOut>
      <Contact />
    </MainLayOut>
  );
};

export default ContactPage;
