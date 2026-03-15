import 'server-only';

import type { AppLocale } from './config';

type Dictionary = Record<string, unknown>;

const dictionaries: Record<AppLocale, () => Promise<Dictionary>> = {
  en: async () => {
    const common = await import('../assets/international/en/common.json');
    const auth = await import('../assets/international/en/auth.json');
    const dashboard = await import('../assets/international/en/dashboard.json');
    const dictionary = await import('../assets/international/en/dictionary.json');

    return {
      ...common.default,
      ...auth.default,
      ...dashboard.default,
      ...dictionary.default,
    };
  },
  'zh-TW': async () => {
    const common = await import('../assets/international/zh-TW/common.json');
    const auth = await import('../assets/international/zh-TW/auth.json');
    const dashboard = await import('../assets/international/zh-TW/dashboard.json');
    const dictionary = await import('../assets/international/zh-TW/dictionary.json');

    return {
      ...common.default,
      ...auth.default,
      ...dashboard.default,
      ...dictionary.default,
    };
  },
};

export const getDictionary = async (locale: AppLocale) => dictionaries[locale]();
