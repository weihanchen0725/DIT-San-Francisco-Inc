import { getTranslations } from 'next-intl/server';
import Features from '../Features/Features';
import FreightShippingIcon from '@/assets/icons/FreightShippingIcon';
import WarehousingIcon from '@/assets/icons/WarehousingIcon';
import SupplyChainManagementIcon from '@/assets/icons/SupplyChainManagementIcon';
import TrackingSolutionIcon from '@/assets/icons/TrackingSolutionIcon';

import servicesClass from './Services.module.scss';

const Services = async () => {
  const translateServices = await getTranslations('Services');

  return (
    <section id="services" className={servicesClass.services}>
      <h2 className={servicesClass.services_title}>
        {translateServices('title')}
      </h2>
      <p className={servicesClass.services_description}>
        {translateServices('description')}
      </p>
      {/* Add service details here */}
      <div className={servicesClass.services_grid}>
        <Features
          icon={<FreightShippingIcon className="w-8 h-8 text-brand-yellow" />}
          title={translateServices('freight_shipping_title')}
          description={translateServices('freight_shipping_desc')}
        />
        <Features
          icon={<WarehousingIcon className="w-8 h-8 text-brand-yellow" />}
          title={translateServices('warehousing_title')}
          description={translateServices('warehousing_desc')}
        />
        <Features
          icon={<SupplyChainManagementIcon className="w-8 h-8 text-brand-yellow" />}
          title={translateServices('supply_chain_management_title')}
          description={translateServices('supply_chain_management_desc')}
        />
        <Features
          icon={<TrackingSolutionIcon className="w-8 h-8 text-brand-yellow" />}
          title={translateServices('tracking_solutions_title')}
          description={translateServices('tracking_solutions_desc')}
        />
      </div>
    </section>
  );
};

export default Services;
