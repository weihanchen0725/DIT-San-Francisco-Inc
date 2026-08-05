'use client';
import advisorClass from './Advisor.module.scss';
import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ArrowLeftRight,
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Factory,
  FileText,
  Gauge,
  Globe,
  Layers,
  MapPin,
  PiggyBank,
  Plane,
  RefreshCw,
  Settings2,
  ShieldCheck,
  Ship,
  ShoppingCart,
  TrainFront,
  Truck,
  type LucideIcon,
} from 'lucide-react';
import {
  recommendIncoterm,
  type Role,
  type Scope,
  type Goal,
  type TransportMode,
  type InsurancePref,
  type IncoResult,
} from '@/lib/incoterms-engine';

/**
 * Semantic icon keys used by the data-driven option cards (goals & transport
 * modes). Keeping the mapping here — rather than icon strings in the data —
 * keeps the data readable and the icons tree-shakeable.
 */
const ICONS = {
  security: ShieldCheck,
  settings: Settings2,
  speed: Gauge,
  savings: PiggyBank,
  ship: Ship,
  plane: Plane,
  train: TrainFront,
  truck: Truck,
  layers: Layers,
} satisfies Record<string, LucideIcon>;

const AdvisorIcon = ({ name, className }: { name: keyof typeof ICONS; className?: string }) => {
  const Cmp = ICONS[name];
  return <Cmp className={className} />;
};

const GOALS = [
  {
    value: 'minimize-risk' as const,
    icon: 'security' as const,
    labelKey: 'advisor_q3_minimize_risk' as const,
  },
  {
    value: 'maximize-control' as const,
    icon: 'settings' as const,
    labelKey: 'advisor_q3_maximize_control' as const,
  },
  {
    value: 'simple-logistics' as const,
    icon: 'speed' as const,
    labelKey: 'advisor_q3_simple_logistics' as const,
  },
  {
    value: 'lowest-cost' as const,
    icon: 'savings' as const,
    labelKey: 'advisor_q3_lowest_cost' as const,
  },
];

const TRANSPORT_MODES: {
  value: TransportMode;
  icon: keyof typeof ICONS;
  labelKey:
    | 'advisor_s2_mode_sea'
    | 'advisor_s2_mode_air'
    | 'advisor_s2_mode_rail'
    | 'advisor_s2_mode_road'
    | 'advisor_s2_mode_multi';
}[] = [
  { value: 'sea', icon: 'ship', labelKey: 'advisor_s2_mode_sea' },
  { value: 'air', icon: 'plane', labelKey: 'advisor_s2_mode_air' },
  { value: 'rail', icon: 'train', labelKey: 'advisor_s2_mode_rail' },
  { value: 'road', icon: 'truck', labelKey: 'advisor_s2_mode_road' },
  { value: 'multi', icon: 'layers', labelKey: 'advisor_s2_mode_multi' },
];

const Advisor = () => {
  const t = useTranslations('Incoterms');
  const locale = useLocale();
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Step 1 state
  const [role, setRole] = useState<Role>(null);
  const [scope, setScope] = useState<Scope>(null);
  const [goal, setGoal] = useState<Goal>(null);
  const [stepOneError, setStepOneError] = useState(false);

  // Step 2 state
  const [transportMode, setTransportMode] = useState<TransportMode>('sea');
  const [exportCustoms, setExportCustoms] = useState(true);
  const [intlFreight, setIntlFreight] = useState(false);
  const [doorToDoor, setDoorToDoor] = useState(true);
  const [insurance, setInsurance] = useState<InsurancePref>('self');

  const [result, setResult] = useState<IncoResult | null>(null);
  const canContinue = role !== null && scope !== null && goal !== null;

  const handleContinue = () => {
    if (!canContinue) {
      setStepOneError(true);
      return;
    }

    setStepOneError(false);
    setStep(2);
  };

  const handleCalculate = () => {
    if (!canContinue) {
      setStepOneError(true);
      setStep(1);
      return;
    }

    const result = recommendIncoterm({
      role,
      scope,
      goal,
      transportMode,
      exportCustoms,
      intlFreight,
      doorToDoor,
      insurance,
    });
    setResult(result);
    setStep(3);
  };

  return (
    <section className={advisorClass['container']}>
      <div className={advisorClass['questionsColumn']}>
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
                <p className={advisorClass['questionLabel']}>{t('advisor_q1_label')}</p>
                <h2 id="advisor-role-question" className={advisorClass['questionTitle']}>
                  {t('advisor_q1_title')}
                </h2>
                <div
                  className={advisorClass['grid2']}
                  role="group"
                  aria-labelledby="advisor-role-question"
                >
                  <button
                    type="button"
                    aria-pressed={role === 'seller'}
                    className={`${advisorClass['roleCard']} ${role === 'seller' ? advisorClass['selected'] : ''}`}
                    onClick={() => {
                      setRole('seller');
                      setStepOneError(false);
                    }}
                  >
                    {role === 'seller' && (
                      <div className={advisorClass['checkIcon']}>
                        <CheckCircle2 />
                      </div>
                    )}
                    <Factory className={advisorClass['cardIcon']} />
                    <p className={advisorClass['cardTitle']}>{t('advisor_q1_seller_title')}</p>
                    <p className={advisorClass['cardDesc']}>{t('advisor_q1_seller_desc')}</p>
                  </button>
                  <button
                    type="button"
                    aria-pressed={role === 'buyer'}
                    className={`${advisorClass['roleCard']} ${role === 'buyer' ? advisorClass['selected'] : ''}`}
                    onClick={() => {
                      setRole('buyer');
                      setStepOneError(false);
                    }}
                  >
                    {role === 'buyer' && (
                      <div className={advisorClass['checkIcon']}>
                        <CheckCircle2 />
                      </div>
                    )}
                    <ShoppingCart className={advisorClass['cardIcon']} />
                    <p className={advisorClass['cardTitle']}>{t('advisor_q1_buyer_title')}</p>
                    <p className={advisorClass['cardDesc']}>{t('advisor_q1_buyer_desc')}</p>
                  </button>
                </div>
              </section>

              {/* Q2: Scope Selection */}
              <section className={advisorClass['question']}>
                <p className={advisorClass['questionLabel']}>{t('advisor_q2_label')}</p>
                <h2 id="advisor-scope-question" className={advisorClass['questionTitle']}>
                  {t('advisor_q2_title')}
                </h2>
                <div
                  className={advisorClass['scopeGrid']}
                  role="group"
                  aria-labelledby="advisor-scope-question"
                >
                  <button
                    type="button"
                    aria-pressed={scope === 'international'}
                    className={`${advisorClass['scopeCard']} ${scope === 'international' ? advisorClass['selected'] : ''}`}
                    onClick={() => {
                      setScope('international');
                      setStepOneError(false);
                    }}
                  >
                    <div
                      className={`${advisorClass['scopeIconWrap']} ${scope === 'international' ? advisorClass['iconActive'] : ''}`}
                    >
                      <Globe />
                    </div>
                    <div className={advisorClass['scopeText']}>
                      <p className={advisorClass['cardTitle']}>
                        {t('advisor_q2_international_title')}
                      </p>
                      <p className={advisorClass['cardDesc']}>
                        {t('advisor_q2_international_desc')}
                      </p>
                    </div>
                  </button>
                  <button
                    type="button"
                    aria-pressed={scope === 'domestic'}
                    className={`${advisorClass['scopeCard']} ${scope === 'domestic' ? advisorClass['selected'] : ''}`}
                    onClick={() => {
                      setScope('domestic');
                      setStepOneError(false);
                    }}
                  >
                    <div
                      className={`${advisorClass['scopeIconWrap']} ${scope === 'domestic' ? advisorClass['iconActive'] : ''}`}
                    >
                      <MapPin />
                    </div>
                    <div className={advisorClass['scopeText']}>
                      <p className={advisorClass['cardTitle']}>{t('advisor_q2_domestic_title')}</p>
                      <p className={advisorClass['cardDesc']}>{t('advisor_q2_domestic_desc')}</p>
                    </div>
                  </button>
                </div>
              </section>

              {/* Q3: Goal Selection */}
              <section className={advisorClass['question']}>
                <p className={advisorClass['questionLabel']}>{t('advisor_q3_label')}</p>
                <h2 id="advisor-goal-question" className={advisorClass['questionTitle']}>
                  {t('advisor_q3_title')}
                </h2>
                <div
                  className={advisorClass['goalGrid']}
                  role="group"
                  aria-labelledby="advisor-goal-question"
                >
                  {GOALS.map(({ value, icon, labelKey }) => (
                    <button
                      type="button"
                      aria-pressed={goal === value}
                      key={value}
                      className={`${advisorClass['goalCard']} ${goal === value ? advisorClass['selected'] : ''}`}
                      onClick={() => {
                        setGoal(value);
                        setStepOneError(false);
                      }}
                    >
                      <AdvisorIcon name={icon} className={advisorClass['goalIcon']} />
                      <span className={advisorClass['goalLabel']}>{t(labelKey)}</span>
                    </button>
                  ))}
                </div>
              </section>
            </div>

            {/* Footer */}
            <div className={advisorClass['footer']}>
              {stepOneError && (
                <p className={advisorClass['validationError']} role="alert">
                  {t('advisor_required_error')}
                </p>
              )}
              <button
                type="button"
                className={advisorClass['continueBtn']}
                onClick={handleContinue}
                disabled={!canContinue}
              >
                <span>{t('advisor_continue')}</span>
                <ArrowRight />
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            {/* Step 2 Header */}
            <section className={advisorClass['s2Header']}>
              <span className={advisorClass['s2Badge']}>{t('advisor_s2_badge')}</span>
              <h1>{t('advisor_s2_title')}</h1>
              <p>{t('advisor_s2_description')}</p>
            </section>

            <div className={advisorClass['s2Configurator']}>
              {/* Transport Mode */}
              <div className={advisorClass['s2Panel']}>
                <div className={advisorClass['s2PanelHeader']}>
                  <Ship className={advisorClass['s2PanelIcon']} />
                  <h2 id="advisor-transport-question">{t('advisor_s2_transport_title')}</h2>
                </div>
                <div
                  className={advisorClass['transportGrid']}
                  role="group"
                  aria-labelledby="advisor-transport-question"
                >
                  {TRANSPORT_MODES.map(({ value, icon, labelKey }) => (
                    <button
                      type="button"
                      aria-pressed={transportMode === value}
                      key={value}
                      className={`${advisorClass['transportBtn']} ${transportMode === value ? advisorClass['active'] : ''}`}
                      onClick={() => setTransportMode(value)}
                    >
                      <AdvisorIcon name={icon} className={advisorClass['transportIcon']} />
                      <span>{t(labelKey)}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Responsibilities */}
              <div className={advisorClass['s2Panel']}>
                <div className={advisorClass['s2PanelHeader']}>
                  <ClipboardCheck className={advisorClass['s2PanelIcon']} />
                  <h2>{t('advisor_s2_resp_title')}</h2>
                </div>
                <div className={advisorClass['toggleList']}>
                  {(
                    [
                      {
                        label: t('advisor_s2_resp1_label'),
                        question: t('advisor_s2_resp1_question'),
                        value: exportCustoms,
                        setter: setExportCustoms,
                      },
                      {
                        label: t('advisor_s2_resp2_label'),
                        question: t('advisor_s2_resp2_question'),
                        value: intlFreight,
                        setter: setIntlFreight,
                      },
                      {
                        label: t('advisor_s2_resp3_label'),
                        question: t('advisor_s2_resp3_question'),
                        value: doorToDoor,
                        setter: setDoorToDoor,
                      },
                    ] as {
                      label: string;
                      question: string;
                      value: boolean;
                      setter: (v: boolean) => void;
                    }[]
                  ).map(({ label, question, value, setter }) => (
                    <div key={label} className={advisorClass['toggleRow']}>
                      <div>
                        <p className={advisorClass['toggleLabel']}>{label}</p>
                        <p className={advisorClass['toggleQuestion']}>{question}</p>
                      </div>
                      <button
                        role="switch"
                        aria-checked={value}
                        className={`${advisorClass['toggleTrack']} ${value ? advisorClass['toggleOn'] : ''}`}
                        onClick={() => setter(!value)}
                      >
                        <span className={advisorClass['toggleThumb']} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Insurance Preference */}
              <div className={advisorClass['s2Panel']}>
                <div className={advisorClass['s2PanelHeader']}>
                  <ShieldCheck className={advisorClass['s2PanelIcon']} />
                  <h2>{t('advisor_s2_insurance_title')}</h2>
                </div>
                <div className={advisorClass['segmentedControl']}>
                  {(
                    [
                      { value: 'self', labelKey: 'advisor_s2_insurance_self' },
                      { value: 'seller', labelKey: 'advisor_s2_insurance_seller' },
                      { value: 'none', labelKey: 'advisor_s2_insurance_none' },
                    ] as {
                      value: InsurancePref;
                      labelKey:
                        | 'advisor_s2_insurance_self'
                        | 'advisor_s2_insurance_seller'
                        | 'advisor_s2_insurance_none';
                    }[]
                  ).map(({ value, labelKey }) => (
                    <button
                      key={value}
                      className={`${advisorClass['segBtn']} ${insurance === value ? advisorClass['segActive'] : ''}`}
                      onClick={() => setInsurance(value)}
                    >
                      {t(labelKey)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <div className={advisorClass['s2Nav']}>
                <button className={advisorClass['prevBtn']} onClick={() => setStep(1)}>
                  <ArrowLeft />
                  <span>{t('advisor_s2_btn_previous')}</span>
                </button>
                <button className={advisorClass['calcBtn']} onClick={handleCalculate}>
                  <span>{t('advisor_s2_btn_calculate')}</span>
                  <ChevronRight />
                </button>
              </div>
            </div>
          </>
        )}

        {step === 3 && result && (
          <>
            {/* Result Header */}
            <div className={advisorClass['rHeader']}>
              <div className={advisorClass['rHeadingGroup']}>
                <h1>{t('advisor_r_result_title')}</h1>
                <span className={advisorClass['rOptimalBadge']}>{t('advisor_r_optimal')}</span>
              </div>
              <button
                className={advisorClass['rRestartBtn']}
                onClick={() => {
                  setStep(1);
                  setRole(null);
                  setScope(null);
                  setGoal(null);
                  setResult(null);
                }}
              >
                <RefreshCw />
                <span>{t('advisor_r_restart')}</span>
              </button>
            </div>

            {/* Main Result Card */}
            <div className={advisorClass['rMainCard']}>
              <div className={advisorClass['rCodeRow']}>
                <span className={advisorClass['rCode']}>{result.code}</span>
                <div className={advisorClass['rCodeInfo']}>
                  <p className={advisorClass['rFullName']}>{result.fullName}</p>
                  <div className={advisorClass['rConfidenceBadge']}>
                    <BadgeCheck />
                    <span>
                      {result.confidence}% {t('advisor_r_confidence')}
                    </span>
                  </div>
                </div>
              </div>
              <p className={advisorClass['rDescription']}>{result.description}</p>
              <p className={advisorClass['rDescription']}>{t('disclaimer')}</p>
            </div>

            {/* Bento Grid */}
            <div className={advisorClass['rBento']}>
              <div className={advisorClass['rWhy']}>
                <h2 className={advisorClass['rSectionTitle']}>{t('advisor_r_why_title')}</h2>
                <ul className={advisorClass['rReasons']}>
                  {result.reasons.map((reason, i) => (
                    <li key={i} className={advisorClass['rReasonItem']}>
                      <CheckCircle2 className={advisorClass['rReasonIcon']} />
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={advisorClass['rRespPanel']}>
                <h2 className={advisorClass['rSectionTitle']}>{t('advisor_r_resp_title')}</h2>
                <div className={advisorClass['rRespLabels']}>
                  <span>
                    {t('advisor_r_resp_seller')} {result.sellerPct}%
                  </span>
                  <span>
                    {t('advisor_r_resp_buyer')} {result.buyerPct}%
                  </span>
                </div>
                <div className={advisorClass['rBars']}>
                  <div
                    className={`${advisorClass['rBarFill']} ${advisorClass['sellerFill']}`}
                    style={{ width: `${result.sellerPct}%` }}
                  />
                  <div
                    className={`${advisorClass['rBarFill']} ${advisorClass['buyerFill']}`}
                    style={{ width: `${result.buyerPct}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Risk Transfer Journey */}
            <div className={advisorClass['rRiskSection']}>
              <h2 className={advisorClass['rSectionTitle']}>{t('advisor_r_risk_title')}</h2>
              <div className={advisorClass['rJourneyWrap']}>
                <span className={advisorClass['rRiskLabelSeller']}>
                  {t('advisor_r_risk_seller')}
                </span>
                <div className={advisorClass['rJourney']}>
                  {result.riskJourney.map((stop, i) => {
                    const isTransfer = i > 0 && result.riskJourney[i - 1].owner !== stop.owner;
                    return (
                      <div
                        key={i}
                        className={`${advisorClass['rStop']} ${advisorClass[stop.owner === 'seller' ? 'rSellerStop' : 'rBuyerStop']}`}
                      >
                        <div
                          className={`${advisorClass['rStopDot']} ${isTransfer ? advisorClass['rPulse'] : ''}`}
                        />
                        {i < result.riskJourney.length - 1 && (
                          <div
                            className={`${advisorClass['rStopLine']} ${advisorClass[stop.owner === 'seller' ? 'rSellerLine' : 'rBuyerLine']}`}
                          />
                        )}
                        <span className={advisorClass['rStopLabel']}>{stop.label}</span>
                      </div>
                    );
                  })}
                </div>
                <span className={advisorClass['rRiskLabelBuyer']}>{t('advisor_r_risk_buyer')}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className={advisorClass['rActions']}>
              <button
                className={advisorClass['rQuoteBtn']}
                onClick={() => router.push(`/${locale}/contact`)}
              >
                <FileText />
                <span>{t('advisor_r_quote_btn')}</span>
              </button>
              <button
                className={advisorClass['rCompareBtn']}
                onClick={() => router.push(`/${locale}/tools/incoterms/reference-guide`)}
              >
                <span>{t('advisor_r_compare_btn')}</span>
                <ArrowLeftRight />
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Advisor;
