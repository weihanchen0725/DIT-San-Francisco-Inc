import { getTranslations } from 'next-intl/server';
import SectionHeading from '@/components/ui/SectionHeading';
import FreightShippingIcon from '@/assets/icons/FreightShippingIcon';
import WarehousingIcon from '@/assets/icons/WarehousingIcon';
import SupplyChainManagementIcon from '@/assets/icons/SupplyChainManagementIcon';
import TrackingSolutionIcon from '@/assets/icons/TrackingSolutionIcon';
import servicesClass from './Services.module.scss';

const SERVICE_KEYS = [
  { key: 'freight_shipping', Icon: FreightShippingIcon },
  { key: 'warehousing', Icon: WarehousingIcon },
  { key: 'supply_chain_management', Icon: SupplyChainManagementIcon },
  { key: 'tracking_solutions', Icon: TrackingSolutionIcon },
] as const;

type ServicesProps = {
  headingLevel?: 1 | 2;
  showDetails?: boolean;
};

const Services = async ({ headingLevel = 2, showDetails = false }: ServicesProps) => {
  const translateServices = await getTranslations('Services');
  const itemHeadingLevel = headingLevel === 1 ? 2 : 3;

  return (
    <section id="services" className={servicesClass.services} data-scroll-reveal="">
      <SectionHeading level={headingLevel} className={servicesClass.servicesTitle}>
        {translateServices('title')}
      </SectionHeading>
      <p className={servicesClass.servicesDescription}>{translateServices('description')}</p>
      <div className={servicesClass.servicesGrid}>
        {SERVICE_KEYS.map(({ key, Icon }, index) => (
          <article
            key={key}
            className={servicesClass.servicesCard}
            data-scroll-reveal-item=""
            style={{ '--scroll-item-index': index } as React.CSSProperties}
          >
            <div className={servicesClass.servicesIconWrapper}>
              <Icon className="w-8 h-8 text-brand-yellow" />
            </div>
            <SectionHeading level={itemHeadingLevel} className={servicesClass.servicesCardTitle}>
              {translateServices(`${key}_title`)}
            </SectionHeading>
            <p className={servicesClass.servicesCardDescription}>
              {translateServices(`${key}_desc`)}
            </p>
            {showDetails && (
              <dl className={servicesClass.servicesCardDetails}>
                <div>
                  <dt>{translateServices('ideal_for_label')}</dt>
                  <dd>{translateServices(`${key}_for`)}</dd>
                </div>
                <div>
                  <dt>{translateServices('provide_label')}</dt>
                  <dd>{translateServices(`${key}_provide`)}</dd>
                </div>
              </dl>
            )}
          </article>
        ))}
      </div>
    </section>
  );
};

export default Services;
