import { setRequestLocale } from 'next-intl/server';
import type { AppLocale } from '@/i18n/config';
import { getLocalizedMetadata } from '@/lib/seo';
import About from '@/components/About/About';
import Contact from '@/components/Contact/Contact';
import GlobalService from '@/components/GlobalService/GlobalService';
import Home from '@/components/Home/Home';
import Industries from '@/components/Industries/Industries';
import { getNewsArticles } from '@/lib/news';
import News from '@/components/News/News';
import Partners from '@/components/Partners/Partners';
import Services from '@/components/Services/Services';
import Tools from '@/components/Tools/Tools';
import React from 'react';

type PageProps = {
  params: Promise<{ locale: AppLocale }>;
};

export const generateMetadata = async ({ params }: PageProps) => {
  const { locale } = await params;
  return getLocalizedMetadata({ locale, path: '', pageKey: 'home' });
};

const HomePage = async ({ params }: PageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);
  // Homepage always fetches the four newest posts; the API already returns newest first.
  const articles = await getNewsArticles(4);

  return (
    <React.Fragment>
      <Home />
      <About />
      <Partners />
      <Services showDetails />
      <GlobalService />
      <Industries />
      {/* Hidden only when the posts API returns nothing (or fails), so no empty news card ships. */}
      {articles.length > 0 ? <News articles={articles} headingLevel={2} /> : null}
      <Tools />
      <Contact />
    </React.Fragment>
  );
};

export default HomePage;
