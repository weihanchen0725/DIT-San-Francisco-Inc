import { setRequestLocale } from 'next-intl/server';
import type { AppLocale } from '@/i18n/config';
import { getLocalizedMetadata } from '@/lib/seo';
import About from '@/components/About/About';
import Contact from '@/components/Contact/Contact';
import GlobalService from '@/components/GlobalService/GlobalService';
import Home from '@/components/Home/Home';
import Industries from '@/components/Industries/Industries';
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

  return (
    <React.Fragment>
      <Home />
      <About />
      <Partners />
      <Services />
      <GlobalService />
      <Industries />
      <Tools />
      <Contact />
    </React.Fragment>
  );
};

export default HomePage;
