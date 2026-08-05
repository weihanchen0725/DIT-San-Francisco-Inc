import 'server-only';

import type { AppLocale } from './config';
import { locales } from './config';

type Dictionary = Record<string, unknown>;

const NAMESPACE_FILES = ['common', 'dictionary'] as const;

const loadDictionary = async (locale: AppLocale): Promise<Dictionary> => {
  const modules = await Promise.all(
    NAMESPACE_FILES.map((file) => import(`../assets/international/${locale}/${file}.json`))
  );

  return modules.reduce<Dictionary>((merged, module) => ({ ...merged, ...module.default }), {});
};

const dictionaries = Object.fromEntries(
  locales.map((locale) => [locale, () => loadDictionary(locale)])
) as Record<AppLocale, () => Promise<Dictionary>>;

export const getDictionary = async (locale: AppLocale) => dictionaries[locale]();
