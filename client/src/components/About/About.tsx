import { getTranslations } from "next-intl/server";

const About = async () => {
  const translateAbout = await getTranslations('About');
  return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <h2 className="text-4xl font-bold text-brand-navy dark:text-white tracking-tight">{translateAbout('title')}</h2>
        <p className="mt-6 text-lg text-brand-gray dark:text-gray-300 leading-relaxed max-w-3xl">{translateAbout('description') }</p>
      </div>
  );
};

export default About;
