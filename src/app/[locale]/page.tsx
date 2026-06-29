import type { AppLocale } from '@/i18n/config';
import { getLocalizedMetadata } from '@/lib/seo';
import About from '@/components/About/About';
import Clients from '@/components/Clients/Clients';
import Contact from '@/components/Contact/Contact';
import Home from '@/components/Home/Home';
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

const HomePage = async () => {
  return (
    <React.Fragment>
      <Home />
      <About />
      <Partners />
      <Services />
      <Tools />
      <News />
      <Clients />
      <Contact />
    </React.Fragment>
  );
};

export default HomePage;
