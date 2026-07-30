'use client';
import advisorClass from './Advisor.module.scss';
import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';
import {
  recommendIncoterm,
  type Role,
  type Scope,
  type Goal,
  type TransportMode,
  type InsurancePref,
  type IncoResult,
} from '@/lib/incoterms-engine';

const GOALS = [
  {
    value: 'minimize-risk' as const,
    icon: 'material-symbols:security',
    labelKey: 'advisor_q3_minimize_risk' as const,
  },
  {
    value: 'maximize-control' as const,
    icon: 'material-symbols:settings-suggest',
    labelKey: 'advisor_q3_maximize_control' as const,
  },
  {
    value: 'simple-logistics' as const,
    icon: 'material-symbols:speed',
    labelKey: 'advisor_q3_simple_logistics' as const,
  },
  {
    value: 'lowest-cost' as const,
    icon: 'material-symbols:savings',
    labelKey: 'advisor_q3_lowest_cost' as const,
  },
];

const TRANSPORT_MODES: {
  value: TransportMode;
  icon: string;
  labelKey:
    | 'advisor_s2_mode_sea'
    | 'advisor_s2_mode_air'
    | 'advisor_s2_mode_rail'
    | 'advisor_s2_mode_road'
    | 'advisor_s2_mode_multi';
}[] = [
  { value: 'sea', icon: 'material-symbols:directions-boat', labelKey: 'advisor_s2_mode_sea' },
  { value: 'air', icon: 'material-symbols:flight', labelKey: 'advisor_s2_mode_air' },
  { value: 'rail', icon: 'material-symbols:train', labelKey: 'advisor_s2_mode_rail' },
  { value: 'road', icon: 'material-symbols:local-shipping', labelKey: 'advisor_s2_mode_road' },
  { value: 'multi', icon: 'material-symbols:layers', labelKey: 'advisor_s2_mode_multi' },
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
                <p className={advisorClass['question-label']}>{t('advisor_q1_label')}</p>
                <h3 id="advisor-role-question" className={advisorClass['question-title']}>
                  {t('advisor_q1_title')}
                </h3>
                <div
                  className={advisorClass['grid-2']}
                  role="group"
                  aria-labelledby="advisor-role-question"
                >
                  <button
                    type="button"
                    aria-pressed={role === 'seller'}
                    className={`${advisorClass['role-card']} ${role === 'seller' ? advisorClass['selected'] : ''}`}
                    onClick={() => {
                      setRole('seller');
                      setStepOneError(false);
                    }}
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
                    type="button"
                    aria-pressed={role === 'buyer'}
                    className={`${advisorClass['role-card']} ${role === 'buyer' ? advisorClass['selected'] : ''}`}
                    onClick={() => {
                      setRole('buyer');
                      setStepOneError(false);
                    }}
                  >
                    {role === 'buyer' && (
                      <div className={advisorClass['check-icon']}>
                        <Icon icon="material-symbols:check-circle" />
                      </div>
                    )}
                    <Icon
                      icon="material-symbols:shopping-cart"
                      className={advisorClass['card-icon']}
                    />
                    <p className={advisorClass['card-title']}>{t('advisor_q1_buyer_title')}</p>
                    <p className={advisorClass['card-desc']}>{t('advisor_q1_buyer_desc')}</p>
                  </button>
                </div>
              </section>

              {/* Q2: Scope Selection */}
              <section className={advisorClass['question']}>
                <p className={advisorClass['question-label']}>{t('advisor_q2_label')}</p>
                <h3 id="advisor-scope-question" className={advisorClass['question-title']}>
                  {t('advisor_q2_title')}
                </h3>
                <div
                  className={advisorClass['scope-grid']}
                  role="group"
                  aria-labelledby="advisor-scope-question"
                >
                  <button
                    type="button"
                    aria-pressed={scope === 'international'}
                    className={`${advisorClass['scope-card']} ${scope === 'international' ? advisorClass['selected'] : ''}`}
                    onClick={() => {
                      setScope('international');
                      setStepOneError(false);
                    }}
                  >
                    <div
                      className={`${advisorClass['scope-icon-wrap']} ${scope === 'international' ? advisorClass['icon-active'] : ''}`}
                    >
                      <Icon icon="material-symbols:public" />
                    </div>
                    <div className={advisorClass['scope-text']}>
                      <p className={advisorClass['card-title']}>
                        {t('advisor_q2_international_title')}
                      </p>
                      <p className={advisorClass['card-desc']}>
                        {t('advisor_q2_international_desc')}
                      </p>
                    </div>
                  </button>
                  <button
                    type="button"
                    aria-pressed={scope === 'domestic'}
                    className={`${advisorClass['scope-card']} ${scope === 'domestic' ? advisorClass['selected'] : ''}`}
                    onClick={() => {
                      setScope('domestic');
                      setStepOneError(false);
                    }}
                  >
                    <div
                      className={`${advisorClass['scope-icon-wrap']} ${scope === 'domestic' ? advisorClass['icon-active'] : ''}`}
                    >
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
                <p className={advisorClass['question-label']}>{t('advisor_q3_label')}</p>
                <h3 id="advisor-goal-question" className={advisorClass['question-title']}>
                  {t('advisor_q3_title')}
                </h3>
                <div
                  className={advisorClass['goal-grid']}
                  role="group"
                  aria-labelledby="advisor-goal-question"
                >
                  {GOALS.map(({ value, icon, labelKey }) => (
                    <button
                      type="button"
                      aria-pressed={goal === value}
                      key={value}
                      className={`${advisorClass['goal-card']} ${goal === value ? advisorClass['selected'] : ''}`}
                      onClick={() => {
                        setGoal(value);
                        setStepOneError(false);
                      }}
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
              {stepOneError && (
                <p className={advisorClass['validation-error']} role="alert">
                  {t('advisor_required_error')}
                </p>
              )}
              <button
                type="button"
                className={advisorClass['continue-btn']}
                onClick={handleContinue}
                disabled={!canContinue}
              >
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
                  <Icon
                    icon="material-symbols:directions-boat"
                    className={advisorClass['s2-panel-icon']}
                  />
                  <h3 id="advisor-transport-question">{t('advisor_s2_transport_title')}</h3>
                </div>
                <div
                  className={advisorClass['transport-grid']}
                  role="group"
                  aria-labelledby="advisor-transport-question"
                >
                  {TRANSPORT_MODES.map(({ value, icon, labelKey }) => (
                    <button
                      type="button"
                      aria-pressed={transportMode === value}
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
                  <Icon
                    icon="material-symbols:assignment-turned-in"
                    className={advisorClass['s2-panel-icon']}
                  />
                  <h3>{t('advisor_s2_resp_title')}</h3>
                </div>
                <div className={advisorClass['toggle-list']}>
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
                  <Icon
                    icon="material-symbols:security"
                    className={advisorClass['s2-panel-icon']}
                  />
                  <h3>{t('advisor_s2_insurance_title')}</h3>
                </div>
                <div className={advisorClass['segmented-control']}>
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
                onClick={() => {
                  setStep(1);
                  setRole(null);
                  setScope(null);
                  setGoal(null);
                  setResult(null);
                }}
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
                    <span>
                      {result.confidence}% {t('advisor_r_confidence')}
                    </span>
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
                      <Icon
                        icon="material-symbols:check-circle"
                        className={advisorClass['r-reason-icon']}
                      />
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={advisorClass['r-resp-panel']}>
                <h3 className={advisorClass['r-section-title']}>{t('advisor_r_resp_title')}</h3>
                <div className={advisorClass['r-resp-labels']}>
                  <span>
                    {t('advisor_r_resp_seller')} {result.sellerPct}%
                  </span>
                  <span>
                    {t('advisor_r_resp_buyer')} {result.buyerPct}%
                  </span>
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
                <span className={advisorClass['r-risk-label-seller']}>
                  {t('advisor_r_risk_seller')}
                </span>
                <div className={advisorClass['r-journey']}>
                  {result.riskJourney.map((stop, i) => {
                    const isTransfer = i > 0 && result.riskJourney[i - 1].owner !== stop.owner;
                    return (
                      <div
                        key={i}
                        className={`${advisorClass['r-stop']} ${advisorClass[stop.owner === 'seller' ? 'r-seller-stop' : 'r-buyer-stop']}`}
                      >
                        <div
                          className={`${advisorClass['r-stop-dot']} ${isTransfer ? advisorClass['r-pulse'] : ''}`}
                        />
                        {i < result.riskJourney.length - 1 && (
                          <div
                            className={`${advisorClass['r-stop-line']} ${advisorClass[stop.owner === 'seller' ? 'r-seller-line' : 'r-buyer-line']}`}
                          />
                        )}
                        <span className={advisorClass['r-stop-label']}>{stop.label}</span>
                      </div>
                    );
                  })}
                </div>
                <span className={advisorClass['r-risk-label-buyer']}>
                  {t('advisor_r_risk_buyer')}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className={advisorClass['r-actions']}>
              <button
                className={advisorClass['r-quote-btn']}
                onClick={() => router.push(`/${locale}/contact`)}
              >
                <Icon icon="material-symbols:request-quote" />
                <span>{t('advisor_r_quote_btn')}</span>
              </button>
              <button
                className={advisorClass['r-compare-btn']}
                onClick={() => router.push(`/${locale}/tools/incoterms/reference-guide`)}
              >
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
