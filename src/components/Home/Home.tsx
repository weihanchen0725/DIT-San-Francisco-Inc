import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import homeClass from './Home.module.scss';
import HomeParallax from './HomeParallax';

import cargoShip from '../../assets/images/cargo_ship_invert.svg';
import cargoPlane from '../../assets/images/cargo_plane.svg';
import goldenGate from '../../assets/images/golden_gate.svg';

import Image from 'next/image';

const Home = async () => {
  const translateHome = await getTranslations('Home');

  return (
    <section id="home" className={homeClass.home}>
      {/* Hero Section */}
      <div className={homeClass.hero}>
        {/* Left — text content */}
        <div className={homeClass.hero_content}>
          <h1 className={homeClass.hero_title}>
            {translateHome('headline')}{' '}
            <span className={homeClass.hero_title_1}>{translateHome('headline_location')}</span>
          </h1>
          <p>{translateHome('description')}</p>

          {/* CTA Buttons */}
          <div className={homeClass.ctaBar}>
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
            alt=""
            aria-hidden="true"
            sizes="(max-width: 768px) 0px, 38vw"
            className={`${homeClass.image} ${homeClass.cargoPlane}`}
          />
          {/* Golden Gate: centre backdrop — static */}
          <Image
            src={goldenGate}
            alt=""
            aria-hidden="true"
            priority
            fetchPriority="high"
            sizes="(max-width: 768px) 0px, 50vw"
            className={`${homeClass.image} ${homeClass.goldenGate}`}
          />
          {/* Ship: below the golden gate — sails downward on scroll */}
          <Image
            src={cargoShip}
            alt=""
            aria-hidden="true"
            sizes="(max-width: 768px) 0px, 38vw"
            className={`${homeClass.image} ${homeClass.cargoShip}`}
          />
        </HomeParallax>
      </div>
    </section>
  );
};

export default Home;
