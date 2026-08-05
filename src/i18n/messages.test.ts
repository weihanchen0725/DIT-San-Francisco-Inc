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

  it('uses a quote-focused primary action in both locales', () => {
    expect(enMessages.Home.headline).toBe('International freight forwarding from');
    expect(enMessages.Home.headline_location).toBe('Fremont, California');
    expect(enMessages.Home.contact).toBe('Request a Freight Quote');
    expect(enMessages.CTABar.tracking).toBe('Track a Shipment');
    expect(enMessages.CTABar.join_us).toBe('Request a Freight Quote');
    expect(zhTwMessages.Home.headline).toBe('從加州 Fremont 出發的');
    expect(zhTwMessages.Home.headline_location).toBe('國際貨運代理服務');
    expect(zhTwMessages.Home.contact).toBe('申請貨運報價');
    expect(zhTwMessages.CTABar.tracking).toBe('追蹤貨件');
    expect(zhTwMessages.CTABar.join_us).toBe('申請貨運報價');
  });

  it('defines current FMC credibility copy in both locales', () => {
    expect(enMessages.Credibility.founded_value).toContain('2021');
    expect(enMessages.Credibility.license_value).toContain('29166');
    expect(zhTwMessages.Credibility.founded_value).toContain('2021');
    expect(zhTwMessages.Credibility.license_value).toContain('29166');
  });

  it('defines buyer-useful service details in both locales', () => {
    for (const messages of [enMessages, zhTwMessages]) {
      expect(messages.Services.freight_shipping_for).toBeTruthy();
      expect(messages.Services.freight_shipping_provide).toBeTruthy();
      expect(messages.Services.warehousing_for).toBeTruthy();
      expect(messages.Services.supply_chain_management_provide).toBeTruthy();
      expect(messages.Services.tracking_solutions_for).toBeTruthy();
      expect(messages.Services.ideal_for_label).toBeTruthy();
      expect(messages.Services.provide_label).toBeTruthy();
    }
  });

  it('defines footer content in both locales', () => {
    for (const messages of [enMessages, zhTwMessages]) {
      expect(messages.Footer.company_line_2).toContain('29166');
      expect(messages.Footer.services_heading).toBeTruthy();
      expect(messages.Footer.quote_cta).toBeTruthy();
    }
  });

  it('does not ship placeholder news, fictional partners, or nonexistent tools', () => {
    for (const messages of [enMessages, zhTwMessages]) {
      expect(messages).not.toHaveProperty('News');
      expect(messages).not.toHaveProperty('Showcase');
      expect(messages.Metadata).not.toHaveProperty('news');
      expect(messages.NavBar).not.toHaveProperty('news');
      expect(messages.Tools).not.toHaveProperty('schedule_pickup_desc');
      expect(messages.Tools).not.toHaveProperty('route_optimization_title');
      expect(messages.Tools).not.toHaveProperty('route_optimization_desc');
    }
  });

  it('defines production-safe industries and global service copy in both locales', () => {
    expect(enMessages.Industries.title).toBe('Industries We Support');
    expect(enMessages.Industries.items).toHaveLength(4);
    expect(enMessages.GlobalService.title).toBe('Global Service');
    expect(enMessages.GlobalService.direct_routes).toContain('TYO');
    expect(zhTwMessages.Industries.items).toHaveLength(4);
    expect(zhTwMessages.GlobalService.direct_routes).toContain('TYO');
  });
});
