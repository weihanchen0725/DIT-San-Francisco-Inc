import { useLocale, useTranslations } from 'next-intl';
import { Linkedin } from 'lucide-react';

import ContactData from '@/components/Contact/ContactData.json';
import footerClass from './Footer.module.scss';

const Footer = () => {
  const translateCommon = useTranslations('Common');
  const translateFooter = useTranslations('Footer');
  const locale = useLocale();

  const contact = ContactData.data;

  const serviceLinks = [
    { key: 'services_freight', href: `/${locale}/services` },
    { key: 'services_warehousing', href: `/${locale}/services` },
    { key: 'services_supply_chain', href: `/${locale}/services` },
    {
      key: 'services_tracking',
      href: 'https://ditus.gofreight.co/tracking/login',
      external: true,
    },
  ] as const;

  const toolLinks = [
    { key: 'tools_calculator', href: `/${locale}/tools/calculator` },
    { key: 'tools_incoterms', href: `/${locale}/tools/incoterms` },
    { key: 'tools_dictionary', href: `/${locale}/tools/dictionary` },
  ] as const;

  return (
    <footer className={footerClass.footer}>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className={footerClass.columns}>
          {/* Company identity */}
          <div className={footerClass.column}>
            <p className={footerClass.heading}>{translateFooter('company_heading')}</p>
            <p className={footerClass.line}>{translateFooter('company_line_1')}</p>
            <p className={footerClass.line}>{translateFooter('company_line_2')}</p>
            <a href={`/${locale}#contact`} className={footerClass.quoteCta}>
              {translateFooter('quote_cta')}
            </a>
          </div>

          {/* Contact */}
          <div className={footerClass.column}>
            <p className={footerClass.heading}>{translateFooter('contact_heading')}</p>
            <p className={footerClass.line}>
              {contact.address_1}
              <br />
              {contact.address_2}
            </p>
            <p className={footerClass.line}>
              <a href={`tel:${contact.phone.replace(/[^+\d]/g, '')}`} className={footerClass.link}>
                {contact.phone}
              </a>
            </p>
            <p className={footerClass.line}>
              <a href={`mailto:${contact.email}`} className={footerClass.link}>
                {contact.email}
              </a>
            </p>
            <p className={footerClass.line}>{contact.business_hours}</p>
          </div>

          {/* Services */}
          <div className={footerClass.column}>
            <p className={footerClass.heading}>{translateFooter('services_heading')}</p>
            <ul className={footerClass.linkList}>
              {serviceLinks.map((item) => (
                <li key={item.key}>
                  <a
                    href={item.href}
                    className={footerClass.link}
                    {...('external' in item && item.external
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                  >
                    {translateFooter(item.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div className={footerClass.column}>
            <p className={footerClass.heading}>{translateFooter('tools_heading')}</p>
            <ul className={footerClass.linkList}>
              {toolLinks.map((item) => (
                <li key={item.key}>
                  <a href={item.href} className={footerClass.link}>
                    {translateFooter(item.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={footerClass.bottomBar}>
          <p className={footerClass.copyright}>
            &copy; {new Date().getFullYear()} DIT San Francisco Inc.{' '}
            {translateCommon('all_rights_reserved')}
          </p>
          <div className="flex items-center gap-3">
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={footerClass.socialLink}
              aria-label="LinkedIn"
            >
              <Linkedin className={footerClass.social_icons} width={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
