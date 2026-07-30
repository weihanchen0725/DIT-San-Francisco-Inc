import { useTranslations } from 'next-intl';
import { Icon } from '@iconify/react';
import footerClass from './Footer.module.scss';

const Footer = () => {
  const translateCommon = useTranslations('Common');

  return (
    <footer className={footerClass.footer}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-300 dark:text-brand-gray">
            &copy; {new Date().getFullYear()} DIT San Francisco Inc.{' '}
            {translateCommon('all_rights_reserved')}
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com/company/dit-sfo/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 dark:text-brand-gray hover:text-brand-yellow transition-colors"
              aria-label="LinkedIn"
            >
              <Icon icon="lucide:linkedin" className={footerClass.social_icons} width={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
