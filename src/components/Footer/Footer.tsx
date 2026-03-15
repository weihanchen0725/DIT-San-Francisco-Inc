import { useTranslations } from 'next-intl';
import { Icon } from '@iconify/react';
import footerClass from './Footer.module.scss';

const Footer = () => {
  // Translations
  const translateCommon = useTranslations('Common');

  return (
    <footer className={footerClass.footer}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-300 dark:text-brand-gray">
            &copy; {new Date().getFullYear()} DIT San Francisco Inc.{' '}
            {translateCommon('all_rights_reserved')}
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-sm text-gray-300 dark:text-brand-gray hover:text-brand-yellow transition-colors"
            >
              {translateCommon('privacy')}
            </a>
            <span className="text-brand-navy-light dark:text-gray-600">|</span>
            <a
              href="#"
              className="text-sm text-gray-300 dark:text-brand-gray hover:text-brand-yellow transition-colors"
            >
              {translateCommon('terms')}
            </a>
            <span className="text-brand-navy-light dark:text-gray-600">|</span>
            <Icon icon="lucide:facebook" className={footerClass.social_icons} width={24} />
            <Icon icon="lucide:instagram" className={footerClass.social_icons} width={24} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
