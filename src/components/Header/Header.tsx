import GetHeader from '@/services/Global/GetHeader/GetHeader';
import GetBaseURL from '@/services/GetBaseURL';
import localHeaderData from '@/assets/data/Header.data.json';
import fallbackLogo from '@/assets/images/dolphin-logistics-logo.webp';
import fallbackLogoDark from '@/assets/images/dolphin-logistics-logo-dark.png';

import HeaderClient from './HeaderClient';

const resolveMediaUrl = (url: string | undefined): string | null => {
  if (!url) return null;
  return url.startsWith('http') ? url : GetBaseURL(url);
};

const dataLoader = async (): Promise<HeaderProps> => {
  try {
    const { data } = await GetHeader();
    if (data?.Header) {
      return data.Header as HeaderProps;
    }
  } catch {
    // CMS unavailable — fall through to local data
  }
  return localHeaderData as unknown as HeaderProps;
};

const Header = async () => {
  // Server component: fetch CMS-backed header data once per request/render.
  // Falls back to local assets when the CMS is unreachable.
  const headerData = await dataLoader();

  const logoUrl =
    resolveMediaUrl(headerData?.Logo?.image?.url) ?? (fallbackLogo.src as string);

  const darkLogoUrl =
    resolveMediaUrl(headerData?.Logo?.imageDark?.url) ?? (fallbackLogoDark.src as string);

  return <HeaderClient headerData={headerData} logoUrl={logoUrl} darkLogoUrl={darkLogoUrl} />;
};

export default Header;
