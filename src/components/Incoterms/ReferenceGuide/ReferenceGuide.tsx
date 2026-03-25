'use client';
import referenceClass from './ReferenceGuide.module.scss';
import referencePageData from './ReferenceGuide.PageData.json';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';
import { REFERENCE_GUIDE_TABLE_DATA, REFERENCE_GUIDE_TABLE_HEADERS } from './ReferenceGuide.TableData';

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

  const getModeIcon = (mode: 'any' | 'sea' | 'air' | 'land' | undefined) => {
    let component;
    
    switch (mode?.toLowerCase()) {
      case 'sea':
        component = <Icon icon="mdi:ship-wheel" width="24" height="24" />;
        break;
      case 'air':
        component = <Icon icon="mdi:airplane" width="24" height="24" />;
        break;
      case 'land':
        component = <Icon icon="mdi:truck" width="24" height="24" />;
        break;
      case 'any':
        component = <Icon icon="mdi:swap-horizontal-bold" width="24" height="24" />;
        break;
      default:
        component = null;
    }
    return component;
  }


  return (
    <section className={referenceClass['container']}>
      <div className={referenceClass['header']}>
        <div className={referenceClass['title']}>
          <h1>{referencePageData.Title}</h1>
          <p>{referencePageData.Description}</p>
        </div>
        <div className={referenceClass['buttons']}>
          <button className={referenceClass['button'] + ' ' + referenceClass['darkButton']}>
            {referencePageData.ActionButton1.Title}
          </button>
          <button className={referenceClass['button'] + ' ' + referenceClass['lightButton']} disabled>
            {referencePageData.ActionButton2.Title}
          </button>
          <button
            className={referenceClass['button'] + ' ' + referenceClass['lightButton']}
            onClick={() => handleRouting(2)}
          >
            {referencePageData.ActionButton3.Title}
          </button>
        </div>
      </div>
      <div className={referenceClass['content']}>
        <div className={referenceClass['table-header']}>
          {REFERENCE_GUIDE_TABLE_HEADERS.map((header, index) => (
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
                <span className={referenceClass['code-name-text']}>{row.codeName}</span>
                <span className={referenceClass['use-case-text']}>{row.useCase}</span>
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
                <SvgPropIcon icon={SellerPremisesIcon} size={48}  />
                <SvgPropIcon icon={PreCarriageIcon} size={48} />
                <SvgPropIcon icon={DeliveredNamedPlaceIcon} size={48} />
                <SvgPropIcon icon={PortofShipmentIcon} size={48} />
                <SvgPropIcon icon={OnBoardVesselLoadedIcon} size={48} />
                <SvgPropIcon icon={MainCarriageIcon} size={48} />
                <SvgPropIcon icon={OnBoardVesselIcon} size={48} />
                <SvgPropIcon icon={PortOfDestinationIcon} size={48} />
                <SvgPropIcon icon={TerminalIcon} size={48} />
                <SvgPropIcon icon={CarriageToNamedPlaceIcon} size={48} />
                <SvgPropIcon icon={BuyerPremisesIcon} size={48} />
                 {/*  */}
                <progress value={row.responsibilities?.seller ?? 0} max={1} className={referenceClass['responsibility-bar']}></progress>
                <span className={referenceClass['responsibility-seller']}>Seller</span>
                <span className={referenceClass['responsibility-buyer']}>Buyer</span>
              </div>
              <span className={referenceClass['risk']}>{row.risk}</span>
            </div>
          ))} 
        </div>
      </div>
    </section>
  );
};

export default ReferenceGuide;
