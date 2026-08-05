import { getTranslations } from 'next-intl/server';
import { Building2, FileCheck2, Network, Ship } from 'lucide-react';

import SectionHeading from '@/components/ui/SectionHeading';
import aboutClass from './About.module.scss';

const IMPORTKEY_URL = 'https://importkey.com/i/dit-san-francisco-inc';
const FMC_OTI_URL = 'https://www2.fmc.gov/oti/';

const About = async ({ headingLevel = 2 }: { headingLevel?: 1 | 2 }) => {
  const translateAbout = await getTranslations('About');
  const translateCredibility = await getTranslations('Credibility');
  const facts = [
    {
      label: translateCredibility('founded_label'),
      value: translateCredibility('founded_value'),
      icon: Building2,
      href: undefined,
    },
    {
      label: translateCredibility('identity_label'),
      value: translateCredibility('identity_value'),
      icon: Network,
      href: undefined,
    },
    {
      label: translateCredibility('license_label'),
      value: translateCredibility('license_value'),
      icon: FileCheck2,
      href: FMC_OTI_URL,
    },
  ];

  return (
    <section
      id="about"
      className={aboutClass.About}
      aria-labelledby="about-title"
      data-scroll-reveal=""
    >
      <div className={aboutClass.About_intro}>
        <SectionHeading level={headingLevel} className={aboutClass.About_title}>
          <span id="about-title">{translateAbout('title')}</span>
        </SectionHeading>
        <p className={aboutClass.About_description}>{translateAbout('description')}</p>
      </div>

      <div className={aboutClass.About_verification}>
        <dl className={aboutClass.About_facts}>
          {facts.map(({ label, value, icon: Icon, href }, index) => (
            <div
              key={label}
              className={aboutClass.About_fact}
              data-scroll-reveal-item=""
              style={{ '--scroll-item-index': index } as React.CSSProperties}
            >
              <Icon aria-hidden="true" />
              <dt>{label}</dt>
              <dd>
                {href ? (
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    <strong>{value}</strong>
                  </a>
                ) : (
                  <strong>{value}</strong>
                )}
              </dd>
            </div>
          ))}
          <div
            className={aboutClass.About_fact}
            data-scroll-reveal-item=""
            style={{ '--scroll-item-index': facts.length } as React.CSSProperties}
          >
            <Ship aria-hidden="true" />
            <dt>{translateCredibility('trade_label')}</dt>
            <dd>
              <a href={IMPORTKEY_URL} target="_blank" rel="noopener noreferrer">
                {translateCredibility('trade_value')}
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
};

export default About;
