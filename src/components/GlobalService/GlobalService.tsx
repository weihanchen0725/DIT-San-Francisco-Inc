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

type PinStyle = CSSProperties & { '--pin-segments': string };

const coverageTranslationKeys: Record<CoverageCode, string> = {
  O: 'office_label',
  S: 'schedule_label',
  D: 'direct_label',
  N: 'network_label',
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

const getPinStyle = ({ latitude, longitude, coverage }: GlobalServiceLocation): PinStyle => ({
  left: `${(((longitude + 180) / 360) * 100).toFixed(3)}%`,
  top: `${(((MAP_TOP_LATITUDE - latitude) / (MAP_TOP_LATITUDE - MAP_BOTTOM_LATITUDE)) * 100).toFixed(3)}%`,
  '--pin-segments': getPinGradient(coverage),
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
            <span key={code} className={styles.legendItem} data-testid="coverage-legend-item">
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

          return (
            <span
              key={location.id}
              className={getPinClassName(location)}
              data-hub-pin={location.id}
              data-coverage={location.coverage.join('')}
              style={getPinStyle(location)}
            >
              <span className={styles.pinVisual} aria-hidden="true" />
              <span className={styles.tooltip}>
                <strong>{displayName}</strong>
                <span>
                  {location.countryLevel
                    ? t('country_level_detail', { country: location.country })
                    : location.country}
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
      <details className={styles.directory}>
        <summary className={styles.directorySummary}>
          {t('directory_summary', { count: GLOBAL_SERVICE_LOCATIONS.length })}
        </summary>
        <ul className={styles.directoryList}>
          {GLOBAL_SERVICE_LOCATIONS.map((location) => {
            const displayName = location.code
              ? `${location.name} (${location.code})`
              : location.name;
            const coverageText = location.coverage
              .map((code) => t(coverageTranslationKeys[code]))
              .join(', ');

            return (
              <li key={location.id}>
                <strong>{displayName}</strong>
                <span>{location.country}</span>
                <span>{coverageText}</span>
              </li>
            );
          })}
        </ul>
      </details>
    </section>
  );
};

export default GlobalService;
