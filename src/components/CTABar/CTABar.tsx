'use client';

import React from 'react';
import ctaClass from './CTABar.module.scss';
import { useTranslations } from 'next-intl';
import ctaBarData from '@/assets/data/CTABar.data.json';

interface CTAProps {
  styleMode?: 'row' | 'column';
  ctaLinks?: LinkProps[];
}

const CTABar = ({ styleMode = 'row', ctaLinks: ctaLinksProp }: CTAProps) => {
  const translateCTABar = useTranslations('CTABar');
  // Prefer prop data (from CMS via Header); fall back to local CTABar.data.json.
  const ctaLinks: LinkProps[] = (ctaLinksProp ?? ctaBarData) as LinkProps[];

  const renderLinks = () =>
    ctaLinks?.map((cta: LinkProps, index: number) => {
      if (!cta?.isActive) {
        return null;
      }

      const isPrimary = index === 0;

      return (
        <li key={`cta-item-${cta?.id || index}`}>
          <a
            className={`${ctaClass?.ctaBar_button} ${isPrimary ? ctaClass?.ctaBar_button_primary : ctaClass?.ctaBar_button_secondary} ${cta?.isEnabled === false ? ctaClass?.ctaBar_button_disabled : ''}`}
            href={cta?.Value}
            aria-disabled={cta?.isEnabled === false}
            target={cta?.isExternal ? '_blank' : '_self'}
            rel={cta?.isExternal ? 'noopener noreferrer' : undefined}
          >
            {translateCTABar(cta?.Key?.toLowerCase() ?? '')}
          </a>
        </li>
      );
    });

  return (
    <React.Fragment>
      {styleMode === 'row' ? (
        <div className={ctaClass?.ctaBar}>
          <ul className={ctaClass?.ctaBar_list}>{renderLinks()}</ul>
        </div>
      ) : (
        <div className={`${ctaClass?.ctaBar}`}>
          <ul className={`${ctaClass?.ctaBar_list} ${ctaClass?.ctaBar_list_column}`}>
            {renderLinks()}
          </ul>
        </div>
      )}
    </React.Fragment>
  );
};

export default CTABar;
