import { describe, expect, it } from 'vitest';

import enMessages from '@/assets/international/en/common.json';
import zhTwMessages from '@/assets/international/zh-TW/common.json';

const getKeyPaths = (value: unknown, prefix = ''): string[] => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return prefix ? [prefix] : [];
  }

  return Object.entries(value).flatMap(([key, child]) =>
    getKeyPaths(child, prefix ? `${prefix}.${key}` : key)
  );
};

describe('localized messages', () => {
  it('keeps English and Traditional Chinese message keys in sync', () => {
    expect(getKeyPaths(zhTwMessages).sort()).toEqual(getKeyPaths(enMessages).sort());
  });

  it('defines metadata copy for localized tool pages', () => {
    expect(enMessages.Metadata.dictionary.title).toBeTruthy();
    expect(enMessages.Metadata.calculator.title).toBeTruthy();
    expect(enMessages.Metadata.incoterms.title).toBeTruthy();
    expect(zhTwMessages.Metadata.dictionary.title).toBeTruthy();
    expect(zhTwMessages.Metadata.calculator.title).toBeTruthy();
    expect(zhTwMessages.Metadata.incoterms.title).toBeTruthy();
  });
});
