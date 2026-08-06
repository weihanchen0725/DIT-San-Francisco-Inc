export type ShowcaseKind = 'partners';

export type ShowcaseItem = {
  name: string;
  descriptor: string;
  isFictional: true;
};

const fictionalShowcaseItems: Record<ShowcaseKind, readonly ShowcaseItem[]> = {
  partners: [
    { name: 'Pacific Bridge Cargo', descriptor: 'Ocean network', isFictional: true },
    { name: 'Northstar Air Link', descriptor: 'Air network', isFictional: true },
    { name: 'Golden Gate Warehousing', descriptor: 'Warehouse network', isFictional: true },
    { name: 'Harborline Customs', descriptor: 'Trade support', isFictional: true },
    { name: 'Transbay Distribution', descriptor: 'Regional delivery', isFictional: true },
    { name: 'Blue Current Freight', descriptor: 'Freight network', isFictional: true },
  ],
};

export const getFictionalShowcaseItems = (
  kind: ShowcaseKind,
  environment = process.env.NODE_ENV
): readonly ShowcaseItem[] => (environment === 'development' ? fictionalShowcaseItems[kind] : []);
