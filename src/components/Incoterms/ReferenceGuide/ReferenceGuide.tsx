'use client';
import referenceClass from './ReferenceGuide.module.scss';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';
import { REFERENCE_GUIDE_TABLE_DATA } from './ReferenceGuide.TableData';

import SellerPremisesIcon from '@/assets/icons/Incoterms/SellerPremisesIcon';
import PreCarriageIcon from '@/assets/icons/Incoterms/PreCarriageIcon';
import DeliveredNamedPlaceIcon from '@/assets/icons/Incoterms/DeliveredNamedPlaceIcon';
import PortofShipmentIcon from '@/assets/icons/Incoterms/PortofShipmentIcon';
import OnBoardVesselLoadedIcon from '@/assets/icons/Incoterms/OnBoardVesselLoadedIcon';
import MainCarriageIcon from '@/assets/icons/Incoterms/MainCarriageIcon';
import OnBoardVesselIcon from '@/assets/icons/Incoterms/OnBoardVesselIcon';
import PortOfDestinationIcon from '@/assets/icons/Incoterms/PortofDestinationIcon';
import TerminalIcon from '@/assets/icons/Incoterms/TerminalIcon';
import CarriageToNamedPlaceIcon from '@/assets/icons/Incoterms/CarriageToNamedPlaceIcon';
import BuyerPremisesIcon from '@/assets/icons/Incoterms/BuyerPremisesIcon';

import { SvgPropIcon } from '@/components/Icon/SvgPropIconBase';
const ReferenceGuide = () => {
  const router = useRouter();
  const t = useTranslations('Incoterms');
  const modeLabels = {
    any: 'Any mode of transport',
    sea: 'Sea and inland waterway transport',
    air: 'Air transport',
    land: 'Land transport',
  } as const;

  const getResponsibilityPercentages = (seller: number, buyer: number) => {
    return `${Math.round(seller * 100)}% / ${Math.round(buyer * 100)}%`;
  };

  const tableHeaders = [
    { id: 'code', label: t('col_code') },
    { id: 'codeName', label: t('col_code_name') },
    { id: 'mode', label: t('col_mode') },
    { id: 'responsibilities', label: t('col_responsibilities') },
    { id: 'risk', label: t('col_risk') },
  ];

  const handleRouting = (index: number) => {
    switch (index) {
      case 1:
        router.push('/tools/incoterms/reference-guide');
        break;
      case 2:
        router.push('/tools/incoterms/advisor');
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
    let icon;
    let label = '';

    switch (mode?.toLowerCase()) {
      case 'sea':
        icon = <Icon icon="mdi:ship-wheel" width="24" height="24" />;
        label = getModeLabel('sea');
        break;
      case 'air':
        icon = <Icon icon="mdi:airplane" width="24" height="24" />;
        label = getModeLabel('air');
        break;
      case 'land':
        icon = <Icon icon="mdi:truck" width="24" height="24" />;
        label = getModeLabel('land');
        break;
      case 'any':
        icon = <Icon icon="mdi:swap-horizontal-bold" width="24" height="24" />;
        label = getModeLabel('any');
        break;
      default:
        return null;
    }

    return (
      <span
        className={referenceClass['mode-icon-wrapper']}
        data-mode-label={label}
        title={label}
        aria-label={label}
      >
        {icon}
      </span>
    );
  };


  return (
    <section className={referenceClass['container']}>
      <div className={referenceClass['header']}>
        <div className={referenceClass['title']}>
          <h1>{t('reference_guide_title')}</h1>
          <p>{t('reference_guide_description')}</p>
        </div>
        <div className={referenceClass['buttons']}>
          <button className={referenceClass['button'] + ' ' + referenceClass['darkButton']}>
            {t('btn_download_pdf')}
          </button>
          <button className={referenceClass['button'] + ' ' + referenceClass['lightButton']} disabled>
            {t('btn_print_summary')}
          </button>
          <button
            className={referenceClass['button'] + ' ' + referenceClass['lightButton']}
            onClick={() => handleRouting(2)}
          >
            {t('btn_switch_to_advisor')}
          </button>
        </div>
      </div>
      <div className={referenceClass['content']}>
        <div className={referenceClass['table-header']}>
          {tableHeaders.map((header, index) => (
            <span key={`${header.id}-${index}`} className={referenceClass['table-header-item'] + ' ' + referenceClass[header.id]}>
              {header.label}
            </span>
          ))}
        </div>
        <div className={referenceClass['table-body']}>
          {REFERENCE_GUIDE_TABLE_DATA.map((row) => (
            <div key={row.id} className={referenceClass['table-row']}>
              <span className={referenceClass['code']}>{row.code}</span>
              <div className={referenceClass['code-name']}>
                <span className={referenceClass['code-name-text']}>{t(`${row.code}_name`)}</span>
                <span className={referenceClass['use-case-text']}>{t(`${row.code}_use_case`)}</span>
              </div>
              <span className={referenceClass['mode']}>{getModeIcon(row?.mode)}</span>
              <div className={referenceClass['responsibilities']}>
                {/* <Icon icon="lucide:package-open" width="24" height="24" />
                <Icon icon="mdi:truck-cargo-container" width="24" height="24" />
                <Icon icon="mdi:warehouse" width="24" height="24" />
                <Icon icon="streamline-ultimate:shipment-cargo-boat-bold" width="24" height="24" />
                <Icon icon="streamline-ultimate:shipment-cargo-boat" width="24" height="24" />
                <Icon icon="mdi:ocean" width="24" height="24" />
                <Icon icon="streamline-ultimate:shipment-cargo-boat" width="24" height="24" />
                <Icon icon="streamline-ultimate:shipment-cargo-boat-bold" width="24" height="24" />
                <Icon icon="mdi:warehouse" width="24" height="24" />
                <Icon icon="carbon:delivery" width="24" height="24" />
                <Icon icon="mdi:company" width="24" height="24" /> */}
                {/*  */}
                <SvgPropIcon icon={SellerPremisesIcon} size={48} tooltip={t('tooltip_seller_premises')} />
                <SvgPropIcon icon={PreCarriageIcon} size={48} tooltip={t('tooltip_pre_carriage')} />
                <SvgPropIcon icon={DeliveredNamedPlaceIcon} size={48} tooltip={t('tooltip_delivered_named_place')} />
                <SvgPropIcon icon={PortofShipmentIcon} size={48} tooltip={t('tooltip_port_of_shipment')} />
                <SvgPropIcon icon={OnBoardVesselLoadedIcon} size={48} tooltip={t('tooltip_on_board_vessel_loaded')} />
                <SvgPropIcon icon={MainCarriageIcon} size={48} tooltip={t('tooltip_main_carriage')} />
                <SvgPropIcon icon={OnBoardVesselIcon} size={48} tooltip={t('tooltip_on_board_vessel')} />
                <SvgPropIcon icon={PortOfDestinationIcon} size={48} tooltip={t('tooltip_port_of_destination')} />
                <SvgPropIcon icon={TerminalIcon} size={48} tooltip={t('tooltip_terminal')} />
                <SvgPropIcon icon={CarriageToNamedPlaceIcon} size={48} tooltip={t('tooltip_carriage_to_named_place')} />
                <SvgPropIcon icon={BuyerPremisesIcon} size={48} tooltip={t('tooltip_buyer_premises')} />
                 {/*  */}
                <progress value={row.responsibilities?.seller ?? 0} max={1} className={referenceClass['responsibility-bar']}></progress>
                <span className={referenceClass['responsibility-seller']}>{t('label_seller')}</span>
                <span className={referenceClass['responsibility-percentages']}>
                  {getResponsibilityPercentages(row.responsibilities?.seller ?? 0, row.responsibilities?.buyer ?? 0)}
                </span>
                <span className={referenceClass['responsibility-buyer']}>{t('label_buyer')}</span>
              </div>
              <span className={referenceClass['risk']}>{t(`${row.code}_risk`)}</span>
            </div>
          ))} 
        </div>
      </div>
    </section>
  );
};

export default ReferenceGuide;
