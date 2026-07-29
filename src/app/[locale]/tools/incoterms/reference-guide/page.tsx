import { setRequestLocale } from 'next-intl/server';
import type { AppLocale } from '@/i18n/config';
import { getLocalizedMetadata } from '@/lib/seo';
import ReferenceGuide from '@/components/Incoterms/ReferenceGuide/ReferenceGuide';

type PageProps = {
  params: Promise<{ locale: AppLocale }>;
};

export const generateMetadata = async ({ params }: PageProps) => {
  const { locale } = await params;
  return getLocalizedMetadata({
    locale,
    path: '/tools/incoterms/reference-guide',
    pageKey: 'incotermsReferenceGuide',
  });
};

const ReferenceGuidePage = async ({ params }: PageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ReferenceGuide />;
};

export default ReferenceGuidePage;
