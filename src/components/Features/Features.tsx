import type { ReactNode } from 'react';

import featuresClass from './Features.module.scss';

interface FeaturesProps {
  icon: ReactNode;
  title: string;
  description: string;
  href?: string;
  isDisabled?: boolean;
  target?: string;
  rel?: string;
}

const Features = (featureProp: FeaturesProps) => {
  const { icon, title, description, href, isDisabled, target, rel } = featureProp;

  return (
    <>
      {href && !isDisabled ? (
        <a
          href={href ?? '#'}
          className={featuresClass['wrapper']}
          aria-disabled={isDisabled ? 'true' : 'false'}
          target={target}
          rel={rel}
        >
          <div className={featuresClass['icon-wrapper']}>{icon}</div>
          <h3 className={featuresClass['title']}>{title}</h3>
          <p className={featuresClass['description']}>{description}</p>
        </a>
      ) : (
        <div className={featuresClass['wrapper']} aria-disabled={isDisabled ? 'true' : 'false'}>
          <div className={featuresClass['icon-wrapper']}>{icon}</div>
          <h3 className={featuresClass['title']}>{title}</h3>
          <p className={featuresClass['description']}>{description}</p>
        </div>
      )}
    </>
  );
};

export default Features;
