import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Features from "../Features/Features";
import FastDeliveryIcon from "@/assets/icons/FastDeliveryIcon";
import SecureHandleIcon from "@/assets/icons/SecureHandleIcon";
import GlobalReachIcon from "@/assets/icons/GlobalReachIcon";
import homeClass from './Home.module.scss';

const Home = async () => {
  const translateCompany = await getTranslations("Company");
  const translateHome = await getTranslations("Home");
  
  return (
    <section id="home" className={homeClass.home}>
      {/* Hero Section */}
      <div className={homeClass.hero}>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-navy dark:text-white tracking-tight">
          {translateHome("welcome")}{" "}
          <span className="text-brand-yellow">{translateCompany("Name")}</span>
        </h1>
        <p>
          {translateHome("description")}
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/services"
            className="px-8 py-4 rounded-lg bg-brand-yellow text-brand-navy font-semibold hover:bg-brand-yellow-hover shadow-lg hover:shadow-xl transition-all duration-200"
          >
            {translateHome("our_services")}
          </Link>
          <Link
            href="/contact"
            className="px-8 py-4 rounded-lg border-2 border-brand-navy dark:border-brand-yellow text-brand-navy dark:text-brand-yellow font-semibold hover:bg-brand-navy hover:text-white dark:hover:bg-brand-yellow dark:hover:text-brand-navy transition-all duration-200"
          >
            {translateHome("contact")}
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Features
          icon={<FastDeliveryIcon className="w-8 h-8 text-brand-yellow" />}
          title={translateHome("fast_delivery_title")}
          description={translateHome("fast_delivery_desc")}
        />
        <Features
          icon={<SecureHandleIcon className="w-8 h-8 text-brand-yellow" />}
          title={translateHome("secure_handling_title")}
          description={translateHome("secure_handling_desc")}
        />
        <Features
          icon={<GlobalReachIcon className="w-8 h-8 text-brand-yellow" />}
          title={translateHome("global_reach_title")}
          description={translateHome("global_reach_desc")}
        />
      </div>
    </section>
  );
};

export default Home;
