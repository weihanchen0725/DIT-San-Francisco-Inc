import type { CSSProperties } from 'react';

import type { ShowcaseItem, ShowcaseKind } from '@/lib/showcase';
import styles from './InfiniteShowcase.module.scss';

type InfiniteShowcaseProps = {
  kind: ShowcaseKind;
  title: string;
  notice: string;
  pauseLabel: string;
  items: readonly ShowcaseItem[];
};

type ShowcaseListProps = {
  kind: ShowcaseKind;
  items: readonly ShowcaseItem[];
  duplicate?: boolean;
};

const getInitials = (name: string) =>
  name
    .split(' ')
    .slice(0, 2)
    .map((word) => word[0])
    .join('');

const ShowcaseList = ({ kind, items, duplicate = false }: ShowcaseListProps) => (
  <ul className={`${styles.list} ${duplicate ? styles.duplicate : ''}`} aria-hidden={duplicate}>
    {items.map((item, index) => (
      <li
        key={`${kind}-${item.name}`}
        className={styles.card}
        data-scroll-reveal-item=""
        style={{ '--scroll-item-index': index } as CSSProperties}
      >
        <span className={styles.mark} aria-hidden="true">
          {getInitials(item.name)}
        </span>
        <span className={styles.copy}>
          <strong className={styles.name}>{item.name}</strong>
          <small className={styles.descriptor}>{item.descriptor}</small>
        </span>
      </li>
    ))}
  </ul>
);

const InfiniteShowcase = ({ kind, title, notice, pauseLabel, items }: InfiniteShowcaseProps) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <section
      id={kind}
      className={styles.showcase}
      aria-labelledby={`${kind}-showcase-title`}
      data-scroll-reveal=""
    >
      <div className={styles.header}>
        <h2 id={`${kind}-showcase-title`} className={styles.title}>
          {title}
        </h2>
        <p className={styles.notice}>{notice}</p>
      </div>
      <div className={styles.viewport} role="region" aria-label={pauseLabel} tabIndex={0}>
        <div className={styles.track}>
          <ShowcaseList kind={kind} items={items} />
          <ShowcaseList kind={kind} items={items} duplicate />
        </div>
      </div>
    </section>
  );
};

export default InfiniteShowcase;
