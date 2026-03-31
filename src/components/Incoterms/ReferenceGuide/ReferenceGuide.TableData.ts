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
            buyer: 1/11,
            seller: 10/11,
        },
    },
    {
        id: 2,
        title: 'fca',
        code: 'fca',
        mode: 'any',
        responsibilities: {
            buyer: 2/11,
            seller: 9/11,
        },
    },
    {
        id: 3,
        title: 'cpt',
        code: 'cpt',
        mode: 'any',
        responsibilities: {
            buyer: 2/11,
            seller: 9/11,
        },
    },
    {
        id: 4,
        title: 'cip',
        code: 'cip',
        mode: 'any',
        responsibilities: {
            buyer: 2/11,
            seller: 9/11,
        },
    },
    {
        id: 5,
        title: 'dat',
        code: 'dat',
        mode: 'any',
        responsibilities: {
            buyer: 2/11,
            seller: 9/11,
        },
    },
    {
        id: 6,
        title: 'dap',
        code: 'dap',
        mode: 'sea',
        responsibilities: {
            buyer: 2/11,
            seller: 9/11,
        },
    },
    {
        id: 7,
        title: 'ddp',
        code: 'ddp',
        mode: 'any',
        responsibilities: {
            buyer: 2/11,
            seller: 9/11,
        },
    }
]