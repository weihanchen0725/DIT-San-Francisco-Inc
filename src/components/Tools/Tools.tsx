import Features from '../Features/Features';
import TrackingSystemIcon from '@/assets/icons/TrackingSystemIcon';
import InventoryManagementIcon from '@/assets/icons/InventoryManagementIcon';
import RouteOptimizationIcon from '@/assets/icons/RouteOptimizationIcon';
import CostCalculatorIcon from '@/assets/icons/CostCalculatorIcon';
import { getLocale, getTranslations } from 'next-intl/server';
import SectionHeading from '@/components/ui/SectionHeading';
import toolsClass from './Tools.module.scss';
import ctaBarData from '@/assets/data/CTABar.data.json';

const Tools = async ({ headingLevel = 2 }: { headingLevel?: 1 | 2 }) => {
  const locale = await getLocale();
  const translateTools = await getTranslations('Tools');
  const localizedPath = (path: string) => `/${locale}${path}`;
  const itemHeadingLevel = headingLevel === 1 ? 2 : 3;

  return (
    <section id="tools" className={toolsClass['tools']}>
      <SectionHeading level={headingLevel} className={toolsClass['title']}>
        {translateTools('title')}
      </SectionHeading>
      <p className={toolsClass['description']}>{translateTools('description')}</p>
      <div className={toolsClass['grid']}>
        <Features
          icon={<TrackingSystemIcon className={toolsClass['icon']} />}
          title={translateTools('tracking_title')}
          description={translateTools('tracking_desc')}
          href={ctaBarData[0]?.Value ?? '#tools'}
          target="_blank"
          rel="noopener noreferrer"
          titleLevel={itemHeadingLevel}
        />
        <Features
          icon={<InventoryManagementIcon className={toolsClass['icon']} />}
          title={translateTools('dictionary_title')}
          description={translateTools('dictionary_desc')}
          href={localizedPath('/tools/dictionary')}
          rel="noopener noreferrer"
          titleLevel={itemHeadingLevel}
        />
        <Features
          icon={<RouteOptimizationIcon className={toolsClass['icon']} />}
          title={translateTools('incoterms_title')}
          description={translateTools('incoterms_desc')}
          href={localizedPath('/tools/incoterms')}
          rel="noopener noreferrer"
          titleLevel={itemHeadingLevel}
        />
        <Features
          icon={<CostCalculatorIcon className={toolsClass['icon']} />}
          title={translateTools('cost_calculator_title')}
          description={translateTools('cost_calculator_desc')}
          href={localizedPath('/tools/calculator')}
          titleLevel={itemHeadingLevel}
        />
      </div>
    </section>
  );
};

export default Tools;
