import { getTranslations } from 'next-intl/server';
import type { CSSProperties } from 'react';

import {
  COVERAGE_CODES,
  GLOBAL_SERVICE_LOCATIONS,
  type CoverageCode,
  type GlobalServiceLocation,
} from './GlobalService.data';
import styles from './GlobalService.module.scss';

const MAP_TOP_LATITUDE = 85;
const MAP_BOTTOM_LATITUDE = -60;

type PinStyle = CSSProperties & { '--pin-segments': string; '--pin-drop-index': number };

// San Francisco drops first; every other pin then rains down left to right.
const PIN_DROP_ORDER = (() => {
  const order = new Map<string, number>();
  order.set('san-francisco', 0);

  const rest = GLOBAL_SERVICE_LOCATIONS.filter((location) => location.id !== 'san-francisco').sort(
    (a, b) => a.longitude - b.longitude
  );
  rest.forEach((location, index) => order.set(location.id, index + 1));

  return order;
})();

const coverageTranslationKeys: Record<CoverageCode, string> = {
  O: 'office_label',
  D: 'direct_label',
  G: 'gateway_label',
  W: 'warehouse_label',
};

const getPinGradient = (coverage: readonly CoverageCode[]) => {
  const segmentSize = 100 / coverage.length;
  const segments = coverage.map((code, index) => {
    const start = (index * segmentSize).toFixed(3);
    const end = ((index + 1) * segmentSize).toFixed(3);
    return `var(--coverage-${code.toLowerCase()}) ${start}% ${end}%`;
  });

  return coverage.length === 1
    ? `var(--coverage-${coverage[0].toLowerCase()})`
    : `conic-gradient(${segments.join(', ')})`;
};

const getPinStyle = ({ id, latitude, longitude, coverage }: GlobalServiceLocation): PinStyle => ({
  left: `${(((longitude + 180) / 360) * 100).toFixed(3)}%`,
  top: `${(((MAP_TOP_LATITUDE - latitude) / (MAP_TOP_LATITUDE - MAP_BOTTOM_LATITUDE)) * 100).toFixed(3)}%`,
  '--pin-segments': getPinGradient(coverage),
  '--pin-drop-index': PIN_DROP_ORDER.get(id) ?? 0,
});

const getPinClassName = ({ latitude, longitude }: GlobalServiceLocation) =>
  [
    styles.pin,
    latitude > 40 ? styles.pinNorth : '',
    longitude < -90 ? styles.pinWest : '',
    longitude > 90 ? styles.pinEast : '',
  ]
    .filter(Boolean)
    .join(' ');

const GlobalService = async () => {
  const t = await getTranslations('GlobalService');

  return (
    <section
      className={styles.globalService}
      aria-labelledby="global-service-title"
      data-scroll-reveal=""
    >
      <div className={styles.header}>
        <p className={styles.eyebrow}>{t('eyebrow')}</p>
        <h2 id="global-service-title" className={styles.title}>
          {t('title')}
        </h2>
        <p className={styles.description}>{t('description')}</p>
      </div>
      <div
        className={styles.mapWrap}
        data-testid="global-service-map"
        aria-hidden="true"
      >
        <aside className={styles.legend}>
          {COVERAGE_CODES.map((code) => (
            <span
              key={code}
              className={styles.legendItem}
              data-testid="coverage-legend-item"
              data-legend-code={code}
            >
              <span
                className={styles.legendCode}
                style={{ backgroundColor: `var(--coverage-${code.toLowerCase()})` }}
                aria-hidden="true"
              >
                {code}
              </span>
              <span>{t(coverageTranslationKeys[code])}</span>
            </span>
          ))}
        </aside>

        {GLOBAL_SERVICE_LOCATIONS.map((location) => {
          const displayName = location.code ? `${location.name} (${location.code})` : location.name;
          const regionText = location.state
            ? `${location.state}, ${location.country}`
            : location.country;

          return (
            <span
              key={location.id}
              className={getPinClassName(location)}
              data-hub-pin={location.id}
              data-coverage={location.coverage.join('')}
              style={getPinStyle(location)}
            >
              {location.id === 'san-francisco' && (
                <span
                  className={styles.hqBadge}
                  data-testid="hq-badge"
                  aria-hidden="true"
                  title={t('headquarters_label')}
                />
              )}
              <span className={styles.pinVisual} aria-hidden="true" />
              <span className={styles.tooltip}>
                <strong>{displayName}</strong>
                <span>
                  {location.regionLevel
                    ? t('region_level_detail', { country: location.country })
                    : regionText}
                </span>
                <span className={styles.tooltipCodes}>
                  {location.coverage.map((code) => (
                    <span
                      key={code}
                      className={styles.tooltipCode}
                      style={{ backgroundColor: `var(--coverage-${code.toLowerCase()})` }}
                    >
                      {code}
                    </span>
                  ))}
                </span>
              </span>
            </span>
          );
        })}
      </div>
    </section>
  );
};

export default GlobalService;
