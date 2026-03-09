import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import homeClass from './Home.module.scss';
import HomeParallax from './HomeParallax';

import cargoShip from '../../assets/images/cargo_ship_invert.svg';
import cargoPlane from '../../assets/images/cargo_plane.svg';
import goldenGate from '../../assets/images/golden_gate.svg';

import Image from 'next/image';

const Home = async () => {
  const translateCompany = await getTranslations('Company');
  const translateHome = await getTranslations('Home');

  return (
    <section id="home" className={homeClass.home}>
      {/* Hero Section */}
      <div className={homeClass.hero}>
        {/* Left — text content */}
        <div className={homeClass.hero_content}>
          <h1 className={homeClass.hero_title}>
            {translateHome('welcome')}{' '}
            <span className={homeClass.hero_title_1}>{translateCompany('Name')}</span>
          </h1>
          <p>{translateHome('description')}</p>

          {/* CTA Buttons */}
          <div className={homeClass.ctaBar}>
            {/* <Link
              href="/services"
              className="px-8 py-4 rounded-lg bg-brand-yellow text-brand-navy font-semibold hover:bg-brand-yellow-hover shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {translateHome('our_services')}
            </Link> */}
            <Link href="#contact" className={homeClass.ctaButton}>
              {translateHome('contact')}
            </Link>
          </div>
        </div>

        {/* Right — image collage (scroll-driven parallax via HomeParallax) */}
        <HomeParallax>
          {/* Plane: top of the stack — flies upward on scroll */}
          <Image
            src={cargoPlane}
            alt="Cargo Plane"
            className={`${homeClass.image} ${homeClass.cargoPlane}`}
          />
          {/* Golden Gate: centre backdrop — static */}
          <Image
            src={goldenGate}
            alt="Golden Gate"
            className={`${homeClass.image} ${homeClass.goldenGate}`}
          />
          {/* Ship: below the golden gate — sails downward on scroll */}
          <Image
            src={cargoShip}
            alt="Cargo Ship"
            className={`${homeClass.image} ${homeClass.cargoShip}`}
          />
        </HomeParallax>
      </div>

      {/* Features Section */}
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
      </div> */}
    </section>
  );
};

export default Home;
