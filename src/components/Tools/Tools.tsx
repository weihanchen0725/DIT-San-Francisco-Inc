import Features from '../Features/Features';
import TrackingSystemIcon from '@/assets/icons/TrackingSystemIcon';
import InventoryManagementIcon from '@/assets/icons/InventoryManagementIcon';
import RouteOptimizationIcon from '@/assets/icons/RouteOptimizationIcon';
import CostCalculatorIcon from '@/assets/icons/CostCalculatorIcon';
import { getLocale, getTranslations } from 'next-intl/server';
import toolsClass from './Tools.module.scss';
import ctaBarData from '@/assets/data/CTABar.data.json';


const Tools = async () => {
  const locale = await getLocale();
  const translateTools = await getTranslations('Tools');
  const localizedPath = (path: string) => `/${locale}${path}`;

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
          href={localizedPath('/tools/dictionary')}
          rel="noopener noreferrer"
          
        />
        <Features
          icon={<RouteOptimizationIcon className={toolsClass['icon']} />}
          title={translateTools('incoterms_title')}
          description={translateTools('incoterms_desc')}
          href={localizedPath('/tools/incoterms')}
          rel="noopener noreferrer"
        />
        <Features
          icon={<CostCalculatorIcon className={toolsClass['icon']} />}
          title={translateTools('cost_calculator_title')}
          description={translateTools('cost_calculator_desc')}
          href={localizedPath('/tools/calculator')}
        />
      </div>
    </section>
  );
};

export default Tools;
