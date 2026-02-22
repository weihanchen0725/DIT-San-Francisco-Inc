import { getTranslations } from "next-intl/server";
import Features from "../Features/Features";
import FreightShippingIcon from "@/assets/icons/FreightShippingIcon";
import WarehousingIcon from "@/assets/icons/WarehousingIcon";
import SupplyChainManagementIcon from "@/assets/icons/SupplyChainManagementIcon";
import TrackingSolutionIcon from "@/assets/icons/TrackingSolutionIcon";

const Services = async () => {
  const translateServices = await getTranslations('Services');

  return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <h2 className="text-4xl font-bold text-brand-navy dark:text-white tracking-tight">{translateServices('title')}</h2>
        <p className="mt-6 text-lg sm:text-xl text-brand-gray dark:text-gray-300 max-w-2xl leading-relaxed">
          {translateServices('description')}
        </p>
        {/* Add service details here */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Features icon={<FreightShippingIcon className="w-8 h-8 text-brand-yellow" />} title={translateServices("freight_shipping_title")} description={translateServices("freight_shipping_desc")} />
          <Features icon={<WarehousingIcon className="w-8 h-8 text-brand-yellow" />} title={translateServices("warehousing_title")} description={translateServices("warehousing_desc")} />
          <Features icon={<SupplyChainManagementIcon className="w-8 h-8 text-brand-yellow" />} title={translateServices("supply_chain_management_title")} description={translateServices("supply_chain_management_desc")} />
          <Features icon={<TrackingSolutionIcon className="w-8 h-8 text-brand-yellow" />} title={translateServices("tracking_solutions_title")} description={translateServices("tracking_solutions_desc")} />
        </div>
      </div>
  );
};

export default Services;
