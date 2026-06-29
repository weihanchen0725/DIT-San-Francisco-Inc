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

const ReferenceGuidePage = () => {
  return <ReferenceGuide />;
};

export default ReferenceGuidePage;
