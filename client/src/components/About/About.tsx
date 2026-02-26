import { getTranslations } from "next-intl/server";
import aboutClass from './About.module.scss';

const About = async () => {
  const translateAbout = await getTranslations("About");
  return (
    <section id="about" className={aboutClass.About}>
      <h2 className="text-4xl font-bold text-brand-navy dark:text-white tracking-tight">
        {translateAbout("title")}
      </h2>
      <p className="mt-6 text-lg text-brand-gray dark:text-gray-300 leading-relaxed max-w-3xl">
        {translateAbout("description")}
      </p>
    </section>
  );
};

export default About;
