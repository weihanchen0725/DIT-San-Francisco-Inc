import GetHeader from '@/services/Global/GetHeader/GetHeader';
import GetBaseURL from '@/services/GetBaseURL';
import localHeaderData from '@/assets/data/Header.data.json';
import fallbackLogo from '@/assets/images/dolphin-logistics-logo.webp';

import HeaderClient from './HeaderClient';

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
  // Falls back to local Header.data.json when the CMS is unreachable.
  const headerData = await dataLoader();
  const logoPath = headerData?.Logo?.image?.url;
  const logoUrl = logoPath
    ? logoPath.startsWith('http')
      ? logoPath
      : GetBaseURL(logoPath)
    : (fallbackLogo.src ?? fallbackLogo);

  // Client component handles browser-only concerns (scroll state + animation).
  return <HeaderClient headerData={headerData} logoUrl={logoUrl} />;
};

export default Header;
