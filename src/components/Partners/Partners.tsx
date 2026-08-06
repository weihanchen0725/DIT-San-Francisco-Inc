import { getTranslations } from 'next-intl/server';

import InfiniteShowcase from '@/components/Showcase/InfiniteShowcase';
import { getFictionalShowcaseItems } from '@/lib/showcase';

const Partners = async () => {
  const items = getFictionalShowcaseItems('partners');

  if (items.length === 0) {
    return null;
  }

  const t = await getTranslations('Showcase');

  return (
    <InfiniteShowcase
      kind="partners"
      title={t('partners_title')}
      notice={t('development_notice')}
      pauseLabel={t('pause_label')}
      items={items}
    />
  );
};

export default Partners;
