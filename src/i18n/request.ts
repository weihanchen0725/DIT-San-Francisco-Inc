import { getRequestConfig } from 'next-intl/server';
import { isValidLocale } from './config';
import { getDictionary } from './dictionaries';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;
  const activeLocale = locale && isValidLocale(locale) ? locale : routing.defaultLocale;

  return {
    locale: activeLocale,
    messages: await getDictionary(activeLocale),
  };
});
