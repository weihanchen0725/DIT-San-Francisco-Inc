import localHeaderData from '@/assets/data/Header.data.json';
import logo from '@/assets/images/dolphin-logistics-logo.webp';
import logoDark from '@/assets/images/dolphin-logistics-logo-dark.webp';
import type { HeaderProps } from '@/types/HeaderProps';

import HeaderClient from './HeaderClient';

// Local JSON is the single source of truth for header content.
// Static imports give next/image intrinsic width/height.
const headerData = localHeaderData as unknown as HeaderProps;

const Header = () => <HeaderClient headerData={headerData} logoUrl={logo} darkLogoUrl={logoDark} />;

export default Header;
