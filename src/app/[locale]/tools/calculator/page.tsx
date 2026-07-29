import { setRequestLocale } from 'next-intl/server';
import type { AppLocale } from '@/i18n/config';
import { getLocalizedMetadata } from '@/lib/seo';
import Calculator from "@/components/Calculator/Calculator";

type PageProps = {
  params: Promise<{ locale: AppLocale }>;
};

export const generateMetadata = async ({ params }: PageProps) => {
  const { locale } = await params;
  return getLocalizedMetadata({ locale, path: '/tools/calculator', pageKey: 'calculator' });
};

const CalculatorPage = async ({ params }: PageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);

  return <Calculator />
};

export default CalculatorPage;
