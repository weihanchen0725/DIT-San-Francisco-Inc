interface TableData {
    id: number;
    title: string;
    code: string;
    mode?: 'any' | 'sea' | 'air' | 'land';
    responsibilities?: {
        buyer: number;
        seller: number;
    };
}
export const REFERENCE_GUIDE_TABLE_DATA: TableData[] = [
    {
        id: 1,
        title: 'exw',
        code: 'exw',
        mode: 'any',
        responsibilities: {
            seller: 1/11,
            buyer: 10/11,
        },
    },
    {
        id: 2,
        title: 'fca',
        code: 'fca',
        mode: 'any',
        responsibilities: {
            seller: 3/11,
            buyer: 8/11,
        },
    },
    {
        id: 3,
        title: 'fas',
        code: 'fas',
        mode: 'sea',
        responsibilities: {
            seller: 4/11,
            buyer: 7/11,
        },
    },
    {
        id: 4,
        title: 'fob',
        code: 'fob',
        mode: 'sea',
        responsibilities: {
            seller: 5/11,
            buyer: 6/11,
        },
    },
    {
        id: 5,
        title: 'cfr',
        code: 'cfr',
        mode: 'sea',
        responsibilities: {
            seller: 6/11,
            buyer: 5/11,
        },
    },
    {
        id: 6,
        title: 'cpt',
        code: 'cpt',
        mode: 'any',
        responsibilities: {
            seller: 6/11,
            buyer: 5/11,
        },
    },
    {
        id: 7,
        title: 'cif',
        code: 'cif',
        mode: 'sea',
        responsibilities: {
            seller: 7/11,
            buyer: 4/11,
        },
    },
    {
        id: 8,
        title: 'cip',
        code: 'cip',
        mode: 'any',
        responsibilities: {
            seller: 7/11,
            buyer: 4/11,
        },
    },
    {
        id: 9,
        title: 'dap',
        code: 'dap',
        mode: 'any',
        responsibilities: {
            seller: 9/11,
            buyer: 2/11,
        },
    },
    {
        id: 10,
        title: 'dpu',
        code: 'dpu',
        mode: 'any',
        responsibilities: {
            seller: 10/11,
            buyer: 1/11,
        },
    },
    {
        id: 11,
        title: 'ddp',
        code: 'ddp',
        mode: 'any',
        responsibilities: {
            seller: 11/11,
            buyer: 0,
        },
    }
]