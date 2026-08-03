import type { ShowcaseKind } from '@/lib/showcase';

import styles from './InfiniteShowcase.module.scss';

type ShowcaseItem = {
  name: string;
  descriptor: string;
  isFictional: true;
};

type InfiniteShowcaseProps = {
  kind: ShowcaseKind;
  title: string;
  notice: string;
  items: ShowcaseItem[];
};

const InfiniteShowcase = ({ kind, title, notice, items }: InfiniteShowcaseProps) => {
  if (items.length === 0) {
    return null;
  }

  const repeatedItems = [...items, ...items];

  return (
    <section
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
      <div className={styles.viewport} aria-label={notice}>
        <ul className={styles.track}>
          {repeatedItems.map((item, index) => (
            <li
              key={`${kind}-${item.name}-${index}`}
              className={styles.card}
              aria-hidden={index >= items.length}
              data-scroll-reveal-item=""
              style={{ '--scroll-item-index': index % items.length } as React.CSSProperties}
            >
              <span className={styles.mark} aria-hidden="true">
                {item.name
                  .split(' ')
                  .slice(0, 2)
                  .map((word) => word[0])
                  .join('')}
              </span>
              <span>
                <strong className={styles.name}>{item.name}</strong>
                <small className={styles.descriptor}>{item.descriptor}</small>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default InfiniteShowcase;
