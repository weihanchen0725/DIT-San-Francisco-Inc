export type Role = 'seller' | 'buyer' | null;
export type Scope = 'international' | 'domestic' | null;
export type Goal = 'minimize-risk' | 'maximize-control' | 'simple-logistics' | 'lowest-cost' | null;
export type TransportMode = 'sea' | 'air' | 'rail' | 'road' | 'multi';
export type InsurancePref = 'self' | 'seller' | 'none';

export type RecommendedIncotermCode = 'EXW' | 'DDP' | 'CIP' | 'CPT' | 'CIF' | 'FCA' | 'FOB';

export type IncoResult = {
  code: RecommendedIncotermCode;
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

/**
 * Determines the recommended Incoterm code from shipment scenario inputs.
 * This is a product heuristic, not an ICC-authored score or allocation model.
 * Descriptions and risk-transfer guidance are rendered from the localized,
 * canonical Incoterms content instead of being duplicated here.
 */
export const recommendIncoterm = (scenario: Scenario): IncoResult => {
  const { role, scope, goal, transportMode, exportCustoms, intlFreight, doorToDoor, insurance } =
    scenario;

  let code: RecommendedIncotermCode;

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

  return { code };
};
