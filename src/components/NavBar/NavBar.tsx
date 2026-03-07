'use client';

import React from 'react';
import navClass from './NavBar.module.scss';
import { useTranslations } from 'next-intl';
import navBarData from '@/assets/data/NavBar.data.json';

interface NavBarProps {
  styleMode?: 'row' | 'column';
}

// This is a simplified version of the NavBar component. You can expand it with the logic from NavBar.v01.tsx as needed.
const NavBar = ({ styleMode = 'row' }: NavBarProps) => {
  // Fall back to local NavBar.data.json when no list is passed from the parent.
  const resolvedList: LinkProps[] = navBarData as LinkProps[];
  const translateNavBar = useTranslations('NavBar');

  return (
    <nav className={navClass.nav}>
      {/* Add your navigation items here */}
      <ul className={`${navClass.nav_list} ${navClass[styleMode]}`} data-style-mode={styleMode}>
        {resolvedList?.map((item: LinkProps, index: number) => (
          <React.Fragment key={item?.id ?? index}>
            {item?.isActive && (
              <li>
                <a
                  href={item?.Value}
                  aria-disabled={item?.isEnabled === false}
                  target={item?.isExternal ? '_blank' : '_self'}
                  rel={item?.isExternal ? 'noopener noreferrer' : undefined}
                >
                  {translateNavBar(item?.Key?.toLowerCase() ?? '')}
                </a>
              </li>
            )}
          </React.Fragment>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
