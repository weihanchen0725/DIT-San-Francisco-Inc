export type Role = 'seller' | 'buyer' | null;
export type Scope = 'international' | 'domestic' | null;
export type Goal = 'minimize-risk' | 'maximize-control' | 'simple-logistics' | 'lowest-cost' | null;
export type TransportMode = 'sea' | 'air' | 'rail' | 'road' | 'multi';
export type InsurancePref = 'self' | 'seller' | 'none';

export type RiskStop = {
  label: string;
  owner: 'seller' | 'buyer';
};

export type IncoResult = {
  code: string;
  fullName: string;
  description: string;
  confidence: number;
  sellerPct: number;
  buyerPct: number;
  reasons: string[];
  riskJourney: RiskStop[];
};

export type Scenario = {
  role: Role;
  scope: Scope;
  goal: Goal;
  transportMode: TransportMode;
  exportCustoms: boolean;
  intlFreight: boolean;
  doorToDoor: boolean;
  insurance: InsurancePref;
};

const INCO_DB: Record<string, IncoResult> = {
  EXW: {
    code: 'EXW',
    fullName: 'Ex Works',
    confidence: 92,
    sellerPct: 10,
    buyerPct: 90,
    description:
      'The seller makes goods available at their premises. The buyer bears all costs and risks from that point.',
    reasons: [
      'Domestic shipment — no export clearance needed',
      'Buyer assumes full transport responsibility',
      'Simplest arrangement for the seller',
    ],
    riskJourney: [
      { label: 'Factory', owner: 'seller' },
      { label: 'Export', owner: 'buyer' },
      { label: 'Port', owner: 'buyer' },
      { label: 'Transit', owner: 'buyer' },
      { label: 'Destination', owner: 'buyer' },
    ],
  },
  DDP: {
    code: 'DDP',
    fullName: 'Delivered Duty Paid',
    confidence: 88,
    sellerPct: 90,
    buyerPct: 10,
    description:
      'Maximum seller responsibility — seller delivers goods cleared for import at the named destination.',
    reasons: [
      'Door-to-door delivery matches your requirement',
      'Seller handles both export and import customs',
      'Your preferred insurance arrangement is covered',
    ],
    riskJourney: [
      { label: 'Factory', owner: 'seller' },
      { label: 'Export', owner: 'seller' },
      { label: 'Port', owner: 'seller' },
      { label: 'Transit', owner: 'seller' },
      { label: 'Destination', owner: 'seller' },
    ],
  },
  CIP: {
    code: 'CIP',
    fullName: 'Carriage and Insurance Paid To',
    confidence: 87,
    sellerPct: 55,
    buyerPct: 45,
    description:
      'Seller pays freight and insurance to the named destination. Risk transfers when goods are handed to the first carrier.',
    reasons: [
      'Air freight or intermodal matches CIP',
      'Seller-arranged insurance included',
      'Single carrier handover point simplifies liability',
    ],
    riskJourney: [
      { label: 'Factory', owner: 'seller' },
      { label: 'Export', owner: 'seller' },
      { label: 'Carrier', owner: 'buyer' },
      { label: 'Transit', owner: 'buyer' },
      { label: 'Destination', owner: 'buyer' },
    ],
  },
  CPT: {
    code: 'CPT',
    fullName: 'Carriage Paid To',
    confidence: 85,
    sellerPct: 45,
    buyerPct: 55,
    description:
      'Seller pays freight to the named destination. Risk transfers when goods are handed to the first carrier.',
    reasons: [
      'Air freight or multi-modal transport is a natural fit for CPT',
      'Buyer arranges their own insurance',
      'Flexible handover point for mixed transport modes',
    ],
    riskJourney: [
      { label: 'Factory', owner: 'seller' },
      { label: 'Export', owner: 'seller' },
      { label: 'Carrier', owner: 'buyer' },
      { label: 'Transit', owner: 'buyer' },
      { label: 'Destination', owner: 'buyer' },
    ],
  },
  CIF: {
    code: 'CIF',
    fullName: 'Cost, Insurance and Freight',
    confidence: 87,
    sellerPct: 50,
    buyerPct: 50,
    description:
      'Seller pays freight and insurance to destination port; risk transfers when goods are loaded on board.',
    reasons: [
      "Sea freight matches CIF's port-to-port model",
      'Seller-arranged insurance meets your preference',
      'Commonly used in bulk and container shipments',
    ],
    riskJourney: [
      { label: 'Factory', owner: 'seller' },
      { label: 'Export', owner: 'seller' },
      { label: 'On Board', owner: 'buyer' },
      { label: 'Transit', owner: 'buyer' },
      { label: 'Dest. Port', owner: 'buyer' },
    ],
  },
  FCA: {
    code: 'FCA',
    fullName: 'Free Carrier',
    confidence: 84,
    sellerPct: 35,
    buyerPct: 65,
    description:
      'Seller delivers goods to a named carrier or place; risk transfers at that point — flexible for all transport modes.',
    reasons: [
      'Buyer-controlled logistics reduce your risk exposure',
      'Flexible for any transport mode',
      'Clear risk handover at a named point',
    ],
    riskJourney: [
      { label: 'Factory', owner: 'seller' },
      { label: 'Export', owner: 'seller' },
      { label: 'Carrier', owner: 'buyer' },
      { label: 'Transit', owner: 'buyer' },
      { label: 'Destination', owner: 'buyer' },
    ],
  },
  FOB: {
    code: 'FOB',
    fullName: 'Free On Board',
    confidence: 83,
    sellerPct: 40,
    buyerPct: 60,
    description:
      'Seller loads goods on board the vessel; risk transfers at that point. Buyer arranges ocean freight.',
    reasons: [
      'Sea freight is the natural mode for FOB',
      'Widely accepted in international trade contracts',
      'Seller handles export — buyer manages ocean freight',
    ],
    riskJourney: [
      { label: 'Factory', owner: 'seller' },
      { label: 'Export', owner: 'seller' },
      { label: 'On Board', owner: 'seller' },
      { label: 'Transit', owner: 'buyer' },
      { label: 'Dest. Port', owner: 'buyer' },
    ],
  },
};

/**
 * Determines the recommended Incoterm code from shipment scenario inputs.
 * Decision tree mirroring the logic previously embedded in the Advisor component.
 */
export const recommendIncoterm = (scenario: Scenario): IncoResult => {
  const { role, scope, goal, transportMode, exportCustoms, intlFreight, doorToDoor, insurance } =
    scenario;

  let code: string;

  if (scope === 'domestic') {
    code = 'EXW';
  } else if (doorToDoor && exportCustoms && intlFreight && insurance !== 'self') {
    code = 'DDP';
  } else if ((transportMode === 'air' || transportMode === 'multi') && insurance !== 'none') {
    code = 'CIP';
  } else if (transportMode === 'air' || transportMode === 'multi') {
    code = 'CPT';
  } else if (transportMode === 'sea' && insurance !== 'self') {
    code = 'CIF';
  } else if (goal === 'minimize-risk' || role === 'buyer') {
    code = 'FCA';
  } else {
    code = 'FOB';
  }

  return INCO_DB[code];
};
