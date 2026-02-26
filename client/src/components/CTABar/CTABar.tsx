import React from "react";
import ctaClass from './CTABar.module.scss';

interface CTAProps {
    ctaLinks: LinkProps[];
}

const CTABar = ({ ctaLinks }: CTAProps) => {
  return (
    <div className={ctaClass?.ctaBar}>
      <ul className={ctaClass?.ctaBar_list}>
        {ctaLinks?.map((cta: LinkProps, index: number) => {
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
                target={cta?.isExternal ? "_blank" : "_self"}
                rel={cta?.isExternal ? "noopener noreferrer" : undefined}
              >
                {cta?.Key}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CTABar;