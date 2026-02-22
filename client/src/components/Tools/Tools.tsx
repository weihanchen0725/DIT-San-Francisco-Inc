import Features from "../Features/Features";
import TrackingSystemIcon from "@/assets/icons/TrackingSystemIcon";
import InventoryManagementIcon from "@/assets/icons/InventoryManagementIcon";
import RouteOptimizationIcon from "@/assets/icons/RouteOptimizationIcon";
import CostCalculatorIcon from "@/assets/icons/CostCalculatorIcon";
import SchedulePickupIcon from "@/assets/icons/SchedulePickupIcon";
import { getTranslations } from "next-intl/server";

const Tools = async () => {
  const translateTools = await getTranslations('Tools');

  return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-brand-navy dark:text-white tracking-tight">{translateTools("title")}</h2>
        <p className="mt-6 text-lg sm:text-xl text-brand-gray dark:text-gray-300 max-w-2xl leading-relaxed">
          {translateTools("description")}
        </p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Features icon={<TrackingSystemIcon className="w-8 h-8 text-brand-yellow" />} title={translateTools("tracking_title")} description={translateTools("tracking_desc")} />
          <Features icon={<InventoryManagementIcon className="w-8 h-8 text-brand-yellow" />} title={translateTools("inventory_management_title")} description={translateTools("inventory_management_desc")} />
          <Features icon={<RouteOptimizationIcon className="w-8 h-8 text-brand-yellow" />} title={translateTools("route_optimization_title")} description={translateTools("route_optimization_desc")} />
          <Features icon={<CostCalculatorIcon className="w-8 h-8 text-brand-yellow" />} title={translateTools("cost_calculator_title")} description={translateTools("cost_calculator_desc")} />
          <Features icon={<SchedulePickupIcon className="w-8 h-8 text-brand-yellow" />} title={translateTools("schedule_pickup_title")} description={translateTools("schedule_pickup_desc")} />
        </div>
      </div>
  );
};

export default Tools;
