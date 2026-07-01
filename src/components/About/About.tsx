import { getTranslations } from 'next-intl/server';
import aboutClass from './About.module.scss';

const About = async () => {
  const translateAbout = await getTranslations('About');
  return (
    <section id="about" className={aboutClass.About}>
      <h2 className={aboutClass.About_title}>
        {translateAbout('title')}
      </h2>
      <p className={aboutClass.About_description}>
        {translateAbout('description')}
      </p>
    </section>
  );
};

export default About;
