import type { ReactNode } from 'react';

import SectionHeading from '@/components/ui/SectionHeading';
import featuresClass from './Features.module.scss';

interface FeaturesProps {
  icon: ReactNode;
  title: string;
  description: string;
  href?: string;
  isDisabled?: boolean;
  target?: string;
  rel?: string;
  titleLevel?: 2 | 3;
  revealIndex?: number;
  variant?: 'default' | 'featured';
}

const Features = (featureProp: FeaturesProps) => {
  const {
    icon,
    title,
    description,
    href,
    isDisabled,
    target,
    rel,
    titleLevel = 3,
    revealIndex,
    variant = 'default',
  } = featureProp;
  const revealProps =
    revealIndex === undefined
      ? {}
      : {
          'data-scroll-reveal-item': '',
          style: { '--scroll-item-index': revealIndex } as React.CSSProperties,
        };

  const content = (
    <>
      <div className={featuresClass['iconWrapper']}>{icon}</div>
      <SectionHeading level={titleLevel} className={featuresClass['title']}>
        {title}
      </SectionHeading>
      <p className={featuresClass['description']}>{description}</p>
    </>
  );

  return href && !isDisabled ? (
    <a
      href={href}
      className={`${featuresClass['wrapper']} ${variant === 'featured' ? featuresClass['featured'] : ''}`}
      aria-disabled="false"
      target={target}
      rel={rel}
      {...revealProps}
    >
      {content}
    </a>
  ) : (
    <div
      className={featuresClass['wrapper']}
      aria-disabled={isDisabled ? 'true' : 'false'}
      {...revealProps}
    >
      {content}
    </div>
  );
};

export default Features;
