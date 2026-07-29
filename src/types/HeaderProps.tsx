import type { LinkProps } from '@/types/LinkProps';
import type { LogoProps } from '@/types/LogoProps';

export interface HeaderProps {
  id?: string;
  Name?: string;
  Logo?: LogoProps;
  Navigations?: LinkProps[];
  CTA?: LinkProps[];
}
