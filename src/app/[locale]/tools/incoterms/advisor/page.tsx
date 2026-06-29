import type { AppLocale } from '@/i18n/config';
import { getLocalizedMetadata } from '@/lib/seo';
import Advisor from "@/components/Incoterms/Advisor/Advisor";

type PageProps = {
  params: Promise<{ locale: AppLocale }>;
};

export const generateMetadata = async ({ params }: PageProps) => {
  const { locale } = await params;
  return getLocalizedMetadata({
    locale,
    path: '/tools/incoterms/advisor',
    pageKey: 'incotermsAdvisor',
  });
};

const AdvisorPage = () => {
  return <Advisor />;
};

export default AdvisorPage;
