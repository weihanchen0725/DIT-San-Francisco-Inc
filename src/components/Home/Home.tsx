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
        <div className={homeClass.heroContent}>
          <h1 className={homeClass.heroTitle}>
            {translateHome('headline')}{' '}
            <span className={homeClass.heroTitleLocation}>
              {translateHome('headline_location')}
            </span>
          </h1>
          <p>{translateHome('description')}</p>

          {/* CTA Buttons */}
          <div className={homeClass.ctaBar}>
            <Link href="#contact" className={homeClass.ctaButton}>
              {translateHome('contact')}
            </Link>
          </div>
        </div>

        {/* Right - transport collage with progressive CSS scroll motion */}
        <HomeParallax>
          <div
            className={`${homeClass.imageLayer} ${homeClass.planeLayer}`}
            data-hero-motion-layer="plane"
            aria-hidden="true"
          >
            <Image
              src={cargoPlane}
              alt=""
              sizes="(max-width: 767px) 0px, (max-width: 960px) 50vw, 25vw"
              className={`${homeClass.image} ${homeClass.cargoPlane}`}
            />
          </div>
          <div
            className={`${homeClass.imageLayer} ${homeClass.bridgeLayer}`}
            data-hero-motion-layer="bridge"
            aria-hidden="true"
          >
            <Image
              src={goldenGate}
              alt=""
              priority
              fetchPriority="high"
              sizes="(max-width: 767px) 0px, (max-width: 960px) 84vw, 50vw"
              className={`${homeClass.image} ${homeClass.goldenGate}`}
            />
          </div>
          <div
            className={`${homeClass.imageLayer} ${homeClass.shipLayer}`}
            data-hero-motion-layer="ship"
            aria-hidden="true"
          >
            <Image
              src={cargoShip}
              alt=""
              sizes="(max-width: 767px) 0px, (max-width: 960px) 57vw, 34vw"
              className={`${homeClass.image} ${homeClass.cargoShip}`}
            />
          </div>
        </HomeParallax>
      </div>
    </section>
  );
};

export default Home;
