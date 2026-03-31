import Features from '../Features/Features';
import TrackingSystemIcon from '@/assets/icons/TrackingSystemIcon';
import InventoryManagementIcon from '@/assets/icons/InventoryManagementIcon';
import RouteOptimizationIcon from '@/assets/icons/RouteOptimizationIcon';
import CostCalculatorIcon from '@/assets/icons/CostCalculatorIcon';
import SchedulePickupIcon from '@/assets/icons/SchedulePickupIcon';
import { getTranslations } from 'next-intl/server';
import toolsClass from './Tools.module.scss';
import ctaBarData from '@/assets/data/CTABar.data.json';


const Tools = async () => {
  const translateTools = await getTranslations('Tools');

  return (
    <section id="tools" className={toolsClass['tools']}>
      <h2 className={toolsClass['title']}>
        {translateTools('title')}
      </h2>
      <p className={toolsClass['description']}>
        {translateTools('description')}
      </p>
      <div className={toolsClass['grid']}>
        <Features
          icon={<TrackingSystemIcon className={toolsClass['icon']} />}
          title={translateTools('tracking_title')}
          description={translateTools('tracking_desc')}
          href={ctaBarData[0]?.Value ?? '#tools'}
          target="_blank"
          rel="noopener noreferrer"
        />
        <Features
          icon={<InventoryManagementIcon className={toolsClass['icon']} />}
          title={translateTools('dictionary_title')}
          description={translateTools('dictionary_desc')}
          href="/tools/dictionary"
          rel="noopener noreferrer"
          
        />
        <Features
          icon={<RouteOptimizationIcon className={toolsClass['icon']} />}
          title={translateTools('incoterms_title')}
          description={translateTools('incoterms_desc')}
          href="/tools/incoterms"
          rel="noopener noreferrer"
        />
        {/* <Features
          icon={<CostCalculatorIcon className={toolsClass['icon']} />}
          title={translateTools('cost_calculator_title')}
          description={translateTools('cost_calculator_desc')}
        />
        <Features
          icon={<SchedulePickupIcon className={toolsClass['icon']} />}
          title={translateTools('schedule_pickup_title')}
          description={translateTools('schedule_pickup_desc')}
        /> */}
      </div>
    </section>
  );
};

export default Tools;
