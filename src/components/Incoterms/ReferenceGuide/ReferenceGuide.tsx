'use client';
import referenceClass from './ReferenceGuide.module.scss';
import { useRouter } from 'next/navigation';
import { ArrowLeftRight, Plane, Ship, Truck, type LucideIcon } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { REFERENCE_GUIDE_TABLE_DATA } from './ReferenceGuide.TableData';

/** Transport-mode icons rendered in the route diagram. */
const MODE_ICONS = {
  sea: Ship,
  air: Plane,
  land: Truck,
  any: ArrowLeftRight,
} satisfies Record<string, LucideIcon>;
const ReferenceGuide = () => {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('Incoterms');
  const modeLabels = {
    any: 'Any mode of transport',
    sea: 'Sea and inland waterway transport',
    air: 'Air transport',
    land: 'Land transport',
  } as const;

  const tableHeaders = [
    { id: 'code', label: t('col_code') },
    { id: 'codeName', label: t('col_code_name') },
    { id: 'mode', label: t('col_mode') },
    { id: 'risk', label: t('col_risk') },
  ];

  const handleRouting = (index: number) => {
    switch (index) {
      case 1:
        router.push(`/${locale}/tools/incoterms/reference-guide`);
        break;
      case 2:
        router.push(`/${locale}/tools/incoterms/advisor`);
        break;
      default:
        break;
    }
  };

  const getModeLabel = (mode: 'any' | 'sea' | 'air' | 'land') => {
    try {
      return t(`mode_${mode}`);
    } catch {
      return modeLabels[mode];
    }
  };

  const getModeIcon = (mode: 'any' | 'sea' | 'air' | 'land' | undefined) => {
    const modeKey = mode?.toLowerCase() as keyof typeof MODE_ICONS | undefined;
    if (!modeKey || !MODE_ICONS[modeKey]) return null;

    const ModeIcon = MODE_ICONS[modeKey];
    const label = getModeLabel(modeKey);

    return (
      <span
        className={referenceClass['modeIconWrapper']}
        data-mode-label={label}
        title={label}
        role="img"
        aria-label={label}
      >
        <ModeIcon width={24} height={24} />
      </span>
    );
  };

  return (
    <section className={referenceClass['container']}>
      <div className={referenceClass['header']}>
        <div className={referenceClass['title']}>
          <h1>{t('reference_guide_title')}</h1>
          <p>{t('reference_guide_description')}</p>
          <p>{t('disclaimer')}</p>
        </div>
        <div className={referenceClass['buttons']}>
          <button
            className={referenceClass['button'] + ' ' + referenceClass['lightButton']}
            onClick={() => handleRouting(2)}
          >
            {t('btn_switch_to_advisor')}
          </button>
        </div>
      </div>
      <div className={referenceClass['content']}>
        <div className={referenceClass['tableHeader']}>
          {tableHeaders.map((header, index) => (
            <span
              key={`${header.id}-${index}`}
              className={referenceClass['tableHeaderItem'] + ' ' + referenceClass[header.id]}
            >
              {header.label}
            </span>
          ))}
        </div>
        <div className={referenceClass['tableBody']}>
          {REFERENCE_GUIDE_TABLE_DATA.map((row) => (
            <div key={row.id} className={referenceClass['tableRow']}>
              <span className={referenceClass['code']}>{row.code}</span>
              <div className={referenceClass['codeName']}>
                <span className={referenceClass['codeNameText']}>{t(`${row.code}_name`)}</span>
                <span className={referenceClass['useCaseText']}>{t(`${row.code}_use_case`)}</span>
              </div>
              <span className={referenceClass['mode']}>{getModeIcon(row?.mode)}</span>
              <span className={referenceClass['risk']}>{t(`${row.code}_risk`)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReferenceGuide;
