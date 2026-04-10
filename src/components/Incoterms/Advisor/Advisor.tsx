'use client';
import advisorClass from './Advisor.module.scss';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Icon } from '@iconify/react';

type Role = 'seller' | 'buyer' | null;
type Scope = 'international' | 'domestic' | null;
type Goal = 'minimize-risk' | 'maximize-control' | 'simple-logistics' | 'lowest-cost' | null;
type TransportMode = 'sea' | 'air' | 'rail' | 'road' | 'multi';
type InsurancePref = 'self' | 'seller' | 'none';

const GOALS = [
  { value: 'minimize-risk' as const, icon: 'material-symbols:security', labelKey: 'advisor_q3_minimize_risk' as const },
  { value: 'maximize-control' as const, icon: 'material-symbols:settings-suggest', labelKey: 'advisor_q3_maximize_control' as const },
  { value: 'simple-logistics' as const, icon: 'material-symbols:speed', labelKey: 'advisor_q3_simple_logistics' as const },
  { value: 'lowest-cost' as const, icon: 'material-symbols:savings', labelKey: 'advisor_q3_lowest_cost' as const },
];

const TRANSPORT_MODES: { value: TransportMode; icon: string; labelKey: 'advisor_s2_mode_sea' | 'advisor_s2_mode_air' | 'advisor_s2_mode_rail' | 'advisor_s2_mode_road' | 'advisor_s2_mode_multi' }[] = [
  { value: 'sea', icon: 'material-symbols:directions-boat', labelKey: 'advisor_s2_mode_sea' },
  { value: 'air', icon: 'material-symbols:flight', labelKey: 'advisor_s2_mode_air' },
  { value: 'rail', icon: 'material-symbols:train', labelKey: 'advisor_s2_mode_rail' },
  { value: 'road', icon: 'material-symbols:local-shipping', labelKey: 'advisor_s2_mode_road' },
  { value: 'multi', icon: 'material-symbols:layers', labelKey: 'advisor_s2_mode_multi' },
];

interface RiskStop {
  label: string;
  owner: 'seller' | 'buyer';
}

interface IncoResult {
  code: string;
  fullName: string;
  description: string;
  confidence: number;
  sellerPct: number;
  buyerPct: number;
  reasons: string[];
  riskJourney: RiskStop[];
}

const INCO_DB: Record<string, IncoResult> = {
  EXW: {
    code: 'EXW', fullName: 'Ex Works', confidence: 92, sellerPct: 10, buyerPct: 90,
    description: 'The seller makes goods available at their premises. The buyer bears all costs and risks from that point.',
    reasons: ['Domestic shipment — no export clearance needed', 'Buyer assumes full transport responsibility', 'Simplest arrangement for the seller'],
    riskJourney: [
      { label: 'Factory', owner: 'seller' }, { label: 'Export', owner: 'buyer' },
      { label: 'Port', owner: 'buyer' }, { label: 'Transit', owner: 'buyer' }, { label: 'Destination', owner: 'buyer' },
    ],
  },
  DDP: {
    code: 'DDP', fullName: 'Delivered Duty Paid', confidence: 88, sellerPct: 90, buyerPct: 10,
    description: 'Maximum seller responsibility — seller delivers goods cleared for import at the named destination.',
    reasons: ['Door-to-door delivery matches your requirement', 'Seller handles both export and import customs', 'Your preferred insurance arrangement is covered'],
    riskJourney: [
      { label: 'Factory', owner: 'seller' }, { label: 'Export', owner: 'seller' },
      { label: 'Port', owner: 'seller' }, { label: 'Transit', owner: 'seller' }, { label: 'Destination', owner: 'seller' },
    ],
  },
  CIP: {
    code: 'CIP', fullName: 'Carriage and Insurance Paid To', confidence: 85, sellerPct: 55, buyerPct: 45,
    description: 'Seller pays freight and insurance to named destination; risk transfers when goods are delivered to the first carrier.',
    reasons: ['Air or multimodal transport aligns with CIP coverage', 'Seller-provided insurance matches your preference', 'Broad Institute Cargo Clause A insurance included'],
    riskJourney: [
      { label: 'Factory', owner: 'seller' }, { label: 'Export', owner: 'seller' },
      { label: 'Carrier', owner: 'buyer' }, { label: 'Transit', owner: 'buyer' }, { label: 'Destination', owner: 'buyer' },
    ],
  },
  CPT: {
    code: 'CPT', fullName: 'Carriage Paid To', confidence: 82, sellerPct: 45, buyerPct: 55,
    description: 'Seller arranges and pays for carriage to the named destination; risk transfers at first carrier handover.',
    reasons: ['Suitable for air and multimodal shipments', 'Seller covers freight costs to destination', 'Buyer manages their own insurance coverage'],
    riskJourney: [
      { label: 'Factory', owner: 'seller' }, { label: 'Export', owner: 'seller' },
      { label: 'Carrier', owner: 'buyer' }, { label: 'Transit', owner: 'buyer' }, { label: 'Destination', owner: 'buyer' },
    ],
  },
  CIF: {
    code: 'CIF', fullName: 'Cost, Insurance and Freight', confidence: 87, sellerPct: 50, buyerPct: 50,
    description: "Seller pays freight and insurance to destination port; risk transfers when goods are loaded on board.",
    reasons: ["Sea freight matches CIF's port-to-port model", 'Seller-arranged insurance meets your preference', 'Commonly used in bulk and container shipments'],
    riskJourney: [
      { label: 'Factory', owner: 'seller' }, { label: 'Export', owner: 'seller' },
      { label: 'On Board', owner: 'buyer' }, { label: 'Transit', owner: 'buyer' }, { label: 'Dest. Port', owner: 'buyer' },
    ],
  },
  FCA: {
    code: 'FCA', fullName: 'Free Carrier', confidence: 84, sellerPct: 35, buyerPct: 65,
    description: 'Seller delivers goods to a named carrier or place; risk transfers at that point — flexible for all transport modes.',
    reasons: ['Buyer-controlled logistics reduce your risk exposure', 'Flexible for any transport mode', 'Clear risk handover at a named point'],
    riskJourney: [
      { label: 'Factory', owner: 'seller' }, { label: 'Export', owner: 'seller' },
      { label: 'Carrier', owner: 'buyer' }, { label: 'Transit', owner: 'buyer' }, { label: 'Destination', owner: 'buyer' },
    ],
  },
  FOB: {
    code: 'FOB', fullName: 'Free On Board', confidence: 83, sellerPct: 40, buyerPct: 60,
    description: "Seller loads goods on board the vessel; risk transfers at the ship's rail at the named port of shipment.",
    reasons: ['Sea freight is the natural mode for FOB', 'Widely accepted in international trade contracts', 'Seller handles export — buyer manages ocean freight'],
    riskJourney: [
      { label: 'Factory', owner: 'seller' }, { label: 'Export', owner: 'seller' },
      { label: 'On Board', owner: 'seller' }, { label: 'Transit', owner: 'buyer' }, { label: 'Dest. Port', owner: 'buyer' },
    ],
  },
};

function calcResult(
  role: Role, scope: Scope, goal: Goal, transportMode: TransportMode,
  exportCustoms: boolean, intlFreight: boolean, doorToDoor: boolean, insurance: InsurancePref
): IncoResult {
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
}

const Advisor = () => {
  const t = useTranslations('Incoterms');
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Step 1 state
  const [role, setRole] = useState<Role>(null);
  const [scope, setScope] = useState<Scope>(null);
  const [goal, setGoal] = useState<Goal>(null);

  // Step 2 state
  const [transportMode, setTransportMode] = useState<TransportMode>('sea');
  const [exportCustoms, setExportCustoms] = useState(true);
  const [intlFreight, setIntlFreight] = useState(false);
  const [doorToDoor, setDoorToDoor] = useState(true);
  const [insurance, setInsurance] = useState<InsurancePref>('self');

  const [result, setResult] = useState<IncoResult | null>(null);

  const handleCalculate = () => {
    setResult(calcResult(role, scope, goal, transportMode, exportCustoms, intlFreight, doorToDoor, insurance));
    setStep(3);
  };

  return (
    <section className={advisorClass['container']}>
      <div className={advisorClass['questions-column']}>

        {step === 1 && (
          <>
            {/* Header */}
            <header className={advisorClass['header']}>
              <h1>{t('advisor_header')}</h1>
              <p>{t('advisor_intro')}</p>
            </header>

            <div className={advisorClass['questions']}>

              {/* Q1: Role Selection */}
              <section className={advisorClass['question']}>
                <label className={advisorClass['question-label']}>{t('advisor_q1_label')}</label>
                <h3 className={advisorClass['question-title']}>{t('advisor_q1_title')}</h3>
                <div className={advisorClass['grid-2']}>
                  <button
                    className={`${advisorClass['role-card']} ${role === 'seller' ? advisorClass['selected'] : ''}`}
                    onClick={() => setRole('seller')}
                  >
                    {role === 'seller' && (
                      <div className={advisorClass['check-icon']}>
                        <Icon icon="material-symbols:check-circle" />
                      </div>
                    )}
                    <Icon icon="material-symbols:factory" className={advisorClass['card-icon']} />
                    <p className={advisorClass['card-title']}>{t('advisor_q1_seller_title')}</p>
                    <p className={advisorClass['card-desc']}>{t('advisor_q1_seller_desc')}</p>
                  </button>
                  <button
                    className={`${advisorClass['role-card']} ${role === 'buyer' ? advisorClass['selected'] : ''}`}
                    onClick={() => setRole('buyer')}
                  >
                    {role === 'buyer' && (
                      <div className={advisorClass['check-icon']}>
                        <Icon icon="material-symbols:check-circle" />
                      </div>
                    )}
                    <Icon icon="material-symbols:shopping-cart" className={advisorClass['card-icon']} />
                    <p className={advisorClass['card-title']}>{t('advisor_q1_buyer_title')}</p>
                    <p className={advisorClass['card-desc']}>{t('advisor_q1_buyer_desc')}</p>
                  </button>
                </div>
              </section>

              {/* Q2: Scope Selection */}
              <section className={advisorClass['question']}>
                <label className={advisorClass['question-label']}>{t('advisor_q2_label')}</label>
                <h3 className={advisorClass['question-title']}>{t('advisor_q2_title')}</h3>
                <div className={advisorClass['scope-grid']}>
                  <button
                    className={`${advisorClass['scope-card']} ${scope === 'international' ? advisorClass['selected'] : ''}`}
                    onClick={() => setScope('international')}
                  >
                    <div className={`${advisorClass['scope-icon-wrap']} ${scope === 'international' ? advisorClass['icon-active'] : ''}`}>
                      <Icon icon="material-symbols:public" />
                    </div>
                    <div className={advisorClass['scope-text']}>
                      <p className={advisorClass['card-title']}>{t('advisor_q2_international_title')}</p>
                      <p className={advisorClass['card-desc']}>{t('advisor_q2_international_desc')}</p>
                    </div>
                  </button>
                  <button
                    className={`${advisorClass['scope-card']} ${scope === 'domestic' ? advisorClass['selected'] : ''}`}
                    onClick={() => setScope('domestic')}
                  >
                    <div className={`${advisorClass['scope-icon-wrap']} ${scope === 'domestic' ? advisorClass['icon-active'] : ''}`}>
                      <Icon icon="material-symbols:home-pin" />
                    </div>
                    <div className={advisorClass['scope-text']}>
                      <p className={advisorClass['card-title']}>{t('advisor_q2_domestic_title')}</p>
                      <p className={advisorClass['card-desc']}>{t('advisor_q2_domestic_desc')}</p>
                    </div>
                  </button>
                </div>
              </section>

              {/* Q3: Goal Selection */}
              <section className={advisorClass['question']}>
                <label className={advisorClass['question-label']}>{t('advisor_q3_label')}</label>
                <h3 className={advisorClass['question-title']}>{t('advisor_q3_title')}</h3>
                <div className={advisorClass['goal-grid']}>
                  {GOALS.map(({ value, icon, labelKey }) => (
                    <button
                      key={value}
                      className={`${advisorClass['goal-card']} ${goal === value ? advisorClass['selected'] : ''}`}
                      onClick={() => setGoal(value)}
                    >
                      <Icon icon={icon} className={advisorClass['goal-icon']} />
                      <span className={advisorClass['goal-label']}>{t(labelKey)}</span>
                    </button>
                  ))}
                </div>
              </section>

            </div>

            {/* Footer */}
            <div className={advisorClass['footer']}>
              <button className={advisorClass['continue-btn']} onClick={() => setStep(2)}>
                <span>{t('advisor_continue')}</span>
                <Icon icon="material-symbols:arrow-forward" />
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            {/* Step 2 Header */}
            <section className={advisorClass['s2-header']}>
              <span className={advisorClass['s2-badge']}>{t('advisor_s2_badge')}</span>
              <h1>{t('advisor_s2_title')}</h1>
              <p>{t('advisor_s2_description')}</p>
            </section>

            <div className={advisorClass['s2-configurator']}>

              {/* Transport Mode */}
              <div className={advisorClass['s2-panel']}>
                <div className={advisorClass['s2-panel-header']}>
                  <Icon icon="material-symbols:directions-boat" className={advisorClass['s2-panel-icon']} />
                  <h3>{t('advisor_s2_transport_title')}</h3>
                </div>
                <div className={advisorClass['transport-grid']}>
                  {TRANSPORT_MODES.map(({ value, icon, labelKey }) => (
                    <button
                      key={value}
                      className={`${advisorClass['transport-btn']} ${transportMode === value ? advisorClass['active'] : ''}`}
                      onClick={() => setTransportMode(value)}
                    >
                      <Icon icon={icon} className={advisorClass['transport-icon']} />
                      <span>{t(labelKey)}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Responsibilities */}
              <div className={advisorClass['s2-panel']}>
                <div className={advisorClass['s2-panel-header']}>
                  <Icon icon="material-symbols:assignment-turned-in" className={advisorClass['s2-panel-icon']} />
                  <h3>{t('advisor_s2_resp_title')}</h3>
                </div>
                <div className={advisorClass['toggle-list']}>
                  {(
                    [
                      { label: t('advisor_s2_resp1_label'), question: t('advisor_s2_resp1_question'), value: exportCustoms, setter: setExportCustoms },
                      { label: t('advisor_s2_resp2_label'), question: t('advisor_s2_resp2_question'), value: intlFreight, setter: setIntlFreight },
                      { label: t('advisor_s2_resp3_label'), question: t('advisor_s2_resp3_question'), value: doorToDoor, setter: setDoorToDoor },
                    ] as { label: string; question: string; value: boolean; setter: (v: boolean) => void }[]
                  ).map(({ label, question, value, setter }) => (
                    <div key={label} className={advisorClass['toggle-row']}>
                      <div>
                        <p className={advisorClass['toggle-label']}>{label}</p>
                        <p className={advisorClass['toggle-question']}>{question}</p>
                      </div>
                      <button
                        role="switch"
                        aria-checked={value}
                        className={`${advisorClass['toggle-track']} ${value ? advisorClass['toggle-on'] : ''}`}
                        onClick={() => setter(!value)}
                      >
                        <span className={advisorClass['toggle-thumb']} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Insurance Preference */}
              <div className={advisorClass['s2-panel']}>
                <div className={advisorClass['s2-panel-header']}>
                  <Icon icon="material-symbols:security" className={advisorClass['s2-panel-icon']} />
                  <h3>{t('advisor_s2_insurance_title')}</h3>
                </div>
                <div className={advisorClass['segmented-control']}>
                  {(
                    [
                      { value: 'self', labelKey: 'advisor_s2_insurance_self' },
                      { value: 'seller', labelKey: 'advisor_s2_insurance_seller' },
                      { value: 'none', labelKey: 'advisor_s2_insurance_none' },
                    ] as { value: InsurancePref; labelKey: 'advisor_s2_insurance_self' | 'advisor_s2_insurance_seller' | 'advisor_s2_insurance_none' }[]
                  ).map(({ value, labelKey }) => (
                    <button
                      key={value}
                      className={`${advisorClass['seg-btn']} ${insurance === value ? advisorClass['seg-active'] : ''}`}
                      onClick={() => setInsurance(value)}
                    >
                      {t(labelKey)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <div className={advisorClass['s2-nav']}>
                <button className={advisorClass['prev-btn']} onClick={() => setStep(1)}>
                  <Icon icon="material-symbols:arrow-back" />
                  <span>{t('advisor_s2_btn_previous')}</span>
                </button>
                <button className={advisorClass['calc-btn']} onClick={handleCalculate}>
                  <span>{t('advisor_s2_btn_calculate')}</span>
                  <Icon icon="material-symbols:chevron-right" />
                </button>
              </div>

            </div>
          </>
        )}

        {step === 3 && result && (
          <>
            {/* Result Header */}
            <div className={advisorClass['r-header']}>
              <span className={advisorClass['r-optimal-badge']}>{t('advisor_r_optimal')}</span>
              <button
                className={advisorClass['r-restart-btn']}
                onClick={() => { setStep(1); setRole(null); setScope(null); setGoal(null); setResult(null); }}
              >
                <Icon icon="material-symbols:refresh" />
                <span>{t('advisor_r_restart')}</span>
              </button>
            </div>

            {/* Main Result Card */}
            <div className={advisorClass['r-main-card']}>
              <div className={advisorClass['r-code-row']}>
                <span className={advisorClass['r-code']}>{result.code}</span>
                <div className={advisorClass['r-code-info']}>
                  <p className={advisorClass['r-full-name']}>{result.fullName}</p>
                  <div className={advisorClass['r-confidence-badge']}>
                    <Icon icon="material-symbols:verified" />
                    <span>{result.confidence}% {t('advisor_r_confidence')}</span>
                  </div>
                </div>
              </div>
              <p className={advisorClass['r-description']}>{result.description}</p>
            </div>

            {/* Bento Grid */}
            <div className={advisorClass['r-bento']}>
              <div className={advisorClass['r-why']}>
                <h3 className={advisorClass['r-section-title']}>{t('advisor_r_why_title')}</h3>
                <ul className={advisorClass['r-reasons']}>
                  {result.reasons.map((reason, i) => (
                    <li key={i} className={advisorClass['r-reason-item']}>
                      <Icon icon="material-symbols:check-circle" className={advisorClass['r-reason-icon']} />
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={advisorClass['r-resp-panel']}>
                <h3 className={advisorClass['r-section-title']}>{t('advisor_r_resp_title')}</h3>
                <div className={advisorClass['r-resp-labels']}>
                  <span>{t('advisor_r_resp_seller')} {result.sellerPct}%</span>
                  <span>{t('advisor_r_resp_buyer')} {result.buyerPct}%</span>
                </div>
                <div className={advisorClass['r-bars']}>
                  <div
                    className={`${advisorClass['r-bar-fill']} ${advisorClass['seller-fill']}`}
                    style={{ width: `${result.sellerPct}%` }}
                  />
                  <div
                    className={`${advisorClass['r-bar-fill']} ${advisorClass['buyer-fill']}`}
                    style={{ width: `${result.buyerPct}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Risk Transfer Journey */}
            <div className={advisorClass['r-risk-section']}>
              <h3 className={advisorClass['r-section-title']}>{t('advisor_r_risk_title')}</h3>
              <div className={advisorClass['r-journey-wrap']}>
                <span className={advisorClass['r-risk-label-seller']}>{t('advisor_r_risk_seller')}</span>
                <div className={advisorClass['r-journey']}>
                  {result.riskJourney.map((stop, i) => {
                    const isTransfer = i > 0 && result.riskJourney[i - 1].owner !== stop.owner;
                    return (
                      <div
                        key={i}
                        className={`${advisorClass['r-stop']} ${advisorClass[stop.owner === 'seller' ? 'r-seller-stop' : 'r-buyer-stop']}`}
                      >
                        <div className={`${advisorClass['r-stop-dot']} ${isTransfer ? advisorClass['r-pulse'] : ''}`} />
                        {i < result.riskJourney.length - 1 && (
                          <div className={`${advisorClass['r-stop-line']} ${advisorClass[stop.owner === 'seller' ? 'r-seller-line' : 'r-buyer-line']}`} />
                        )}
                        <span className={advisorClass['r-stop-label']}>{stop.label}</span>
                      </div>
                    );
                  })}
                </div>
                <span className={advisorClass['r-risk-label-buyer']}>{t('advisor_r_risk_buyer')}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className={advisorClass['r-actions']}>
              <button className={advisorClass['r-quote-btn']}>
                <Icon icon="material-symbols:request-quote" />
                <span>{t('advisor_r_quote_btn')}</span>
              </button>
              <button className={advisorClass['r-compare-btn']}>
                <span>{t('advisor_r_compare_btn')}</span>
                <Icon icon="material-symbols:compare-arrows" />
              </button>
            </div>
          </>
        )}

      </div>
    </section>
  );
};

export default Advisor;

