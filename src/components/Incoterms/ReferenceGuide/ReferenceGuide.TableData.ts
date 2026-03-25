interface TableData {
    id: number;
    title: string;
    code?: string;
    codeName?: string;
    useCase?: string;
    mode?: 'any' | 'sea' | 'air' | 'land';
    responsibilities?: {
        buyer: number;
        seller: number;
    };
    risk?: string;
}
export const REFERENCE_GUIDE_TABLE_DATA: TableData[] = [
    {
        id: 1,
        title: 'exw',
        code: 'exw',
        codeName: 'Ex Works',
        useCase: 'Domestic trade or high-control buyer arrangement.',
        mode: 'any',
        responsibilities: {
            buyer: 1/11,
            seller: 10/11,
        },
        risk: 'Buyer assumes all risk once goods are made available at the seller’s premises.',
    },
    {
        id: 2,
        title: 'fca',
        code: 'fca',
        codeName: 'Free Carrier',
        useCase: 'Containerized cargo where seller delivers to a terminal / carrier.',
        mode: 'any',
        responsibilities: {
            buyer: 2/11,
            seller: 9/11,
        },
        risk: 'Once goods are delivered to the carrier / terminal, risk transfers to buyer.',
    },
    {
        id: 3,
        title: 'cpt',
        code: 'cpt',
        codeName: 'Carriage Paid To',
        useCase: 'Air freight or multiple-mode shipments to a specific destination.',
        mode: 'any',
        responsibilities: {
            buyer: 2/11,
            seller: 9/11,
        },
        risk: 'Risk transfers to buyer once goods are handed over to the first carrier.', 
    },
    {
        id: 3,
        title: 'cpt',
        code: 'cpt',
        codeName: 'Carriage Paid To',
        useCase: 'Air freight or multiple-mode shipments to a specific destination.',
        mode: 'any',
        responsibilities: {
            buyer: 2/11,
            seller: 9/11,
        },
        risk: 'Risk transfers to buyer once goods are handed over to the first carrier.', 
    },
    {
        id: 3,
        title: 'cpt',
        code: 'cpt',
        codeName: 'Carriage Paid To',
        useCase: 'Air freight or multiple-mode shipments to a specific destination.',
        mode: 'any',
        responsibilities: {
            buyer: 2/11,
            seller: 9/11,
        },
        risk: 'Risk transfers to buyer once goods are handed over to the first carrier.', 
    },
    {
        id: 3,
        title: 'cpt',
        code: 'cpt',
        codeName: 'Carriage Paid To',
        useCase: 'Air freight or multiple-mode shipments to a specific destination.',
        mode: 'any',
        responsibilities: {
            buyer: 2/11,
            seller: 9/11,
        },
        risk: 'Risk transfers to buyer once goods are handed over to the first carrier.', 
    },
    {
        id: 3,
        title: 'cpt',
        code: 'cpt',
        codeName: 'Carriage Paid To',
        useCase: 'Air freight or multiple-mode shipments to a specific destination.',
        mode: 'any',
        responsibilities: {
            buyer: 2/11,
            seller: 9/11,
        },
        risk: 'Risk transfers to buyer once goods are handed over to the first carrier.', 
    }
]

export const REFERENCE_GUIDE_TABLE_HEADERS = [
    { id: 'code', label: 'Code' },
    { id: 'codeName', label: 'Full Name & Use Case' },
    { id: 'mode', label: 'Mode' },
    { id: 'responsibilities', label: 'Responsibility (Seller vs Buyer)' },
    { id: 'risk', label: 'Risk Transfer Point' },
];