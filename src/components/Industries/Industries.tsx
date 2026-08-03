import { Boxes, Cpu, PackageCheck, Wrench } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import SectionHeading from '@/components/ui/SectionHeading';
import styles from './Industries.module.scss';

const icons = [Cpu, PackageCheck, Wrench, Boxes];

const Industries = async () => {
  const t = await getTranslations('Industries');
  const items = t.raw('items') as Array<{ title: string; description: string }>;

  return (
    <section className={styles.industries} aria-labelledby="industries-title" data-scroll-reveal="">
      <div className={styles.header}>
        <SectionHeading level={2} className={styles.title}>
          <span id="industries-title">{t('title')}</span>
        </SectionHeading>
        <p className={styles.description}>{t('description')}</p>
      </div>
      <div className={styles.grid}>
        {items.map((item, index) => {
          const Icon = icons[index] ?? Boxes;
          return (
            <article
              key={item.title}
              className={styles.card}
              data-scroll-reveal-item=""
              style={{ '--scroll-item-index': index } as React.CSSProperties}
            >
              <span className={styles.icon} aria-hidden="true">
                <Icon />
              </span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          );
        })}
      </div>
      <p className={styles.disclaimer}>{t('disclaimer')}</p>
    </section>
  );
};

export default Industries;
