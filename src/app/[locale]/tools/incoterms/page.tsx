import type { AppLocale } from '@/i18n/config';
import { getLocalizedMetadata } from '@/lib/seo';
import IncoTerms from '@/components/Incoterms/Incoterms';

type PageProps = {
  params: Promise<{ locale: AppLocale }>;
};

export const generateMetadata = async ({ params }: PageProps) => {
  const { locale } = await params;
  return getLocalizedMetadata({ locale, path: '/tools/incoterms', pageKey: 'incoterms' });
};

const IncoTermsPage = () => {
  return <IncoTerms />;
};

export default IncoTermsPage;
