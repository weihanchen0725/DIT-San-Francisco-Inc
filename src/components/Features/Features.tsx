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
}

const Features = (featureProp: FeaturesProps) => {
  const { icon, title, description, href, isDisabled, target, rel, titleLevel = 3 } = featureProp;

  const content = (
    <>
      <div className={featuresClass['icon-wrapper']}>{icon}</div>
      <SectionHeading level={titleLevel} className={featuresClass['title']}>
        {title}
      </SectionHeading>
      <p className={featuresClass['description']}>{description}</p>
    </>
  );

  return href && !isDisabled ? (
    <a
      href={href}
      className={featuresClass['wrapper']}
      aria-disabled="false"
      target={target}
      rel={rel}
    >
      {content}
    </a>
  ) : (
    <div className={featuresClass['wrapper']} aria-disabled={isDisabled ? 'true' : 'false'}>
      {content}
    </div>
  );
};

export default Features;
