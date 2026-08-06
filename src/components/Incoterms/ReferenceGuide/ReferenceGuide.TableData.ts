interface TableData {
  id: number;
  code: string;
  mode?: 'any' | 'sea' | 'air' | 'land';
}
export const REFERENCE_GUIDE_TABLE_DATA: TableData[] = [
  {
    id: 1,
    code: 'exw',
    mode: 'any',
  },
  {
    id: 2,
    code: 'fca',
    mode: 'any',
  },
  {
    id: 3,
    code: 'fas',
    mode: 'sea',
  },
  {
    id: 4,
    code: 'fob',
    mode: 'sea',
  },
  {
    id: 5,
    code: 'cfr',
    mode: 'sea',
  },
  {
    id: 6,
    code: 'cpt',
    mode: 'any',
  },
  {
    id: 7,
    code: 'cif',
    mode: 'sea',
  },
  {
    id: 8,
    code: 'cip',
    mode: 'any',
  },
  {
    id: 9,
    code: 'dap',
    mode: 'any',
  },
  {
    id: 10,
    code: 'dpu',
    mode: 'any',
  },
  {
    id: 11,
    code: 'ddp',
    mode: 'any',
  },
];
