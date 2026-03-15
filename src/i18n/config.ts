export const locales = ['en', 'zh-TW'] as const;

export type AppLocale = (typeof locales)[number];

export const defaultLocale: AppLocale = 'en';

export const isValidLocale = (value: string): value is AppLocale =>
  locales.includes(value as AppLocale);
