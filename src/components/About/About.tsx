import { getTranslations } from 'next-intl/server';
import SectionHeading from '@/components/ui/SectionHeading';
import aboutClass from './About.module.scss';

const About = async ({ headingLevel = 2 }: { headingLevel?: 1 | 2 }) => {
  const translateAbout = await getTranslations('About');
  return (
    <section id="about" className={aboutClass.About}>
      <SectionHeading level={headingLevel} className={aboutClass.About_title}>
        {translateAbout('title')}
      </SectionHeading>
      <p className={aboutClass.About_description}>{translateAbout('description')}</p>
    </section>
  );
};

export default About;
