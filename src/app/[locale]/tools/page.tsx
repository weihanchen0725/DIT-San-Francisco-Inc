import type { AppLocale } from '@/i18n/config';
import { getLocalizedMetadata } from '@/lib/seo';
import Tools from '@/components/Tools/Tools';
import MainLayOut from '@/layouts/MainLayOut';

type PageProps = {
  params: Promise<{ locale: AppLocale }>;
};

export const generateMetadata = async ({ params }: PageProps) => {
  const { locale } = await params;
  return getLocalizedMetadata({ locale, path: '/tools', pageKey: 'tools' });
};

const ToolsPage = () => {
  return (
    <MainLayOut>
      <Tools />
    </MainLayOut>
  );
};

export default ToolsPage;
