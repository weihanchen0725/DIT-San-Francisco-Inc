import MapWrapper from '../Map/MapWrapper';
import OpenIndicatorWrapper from '../OpenIndicator/OpenIndicatorWrapper';
import ContactForm from './ContactForm';
import ContactData from './ContactData.json';
import { getTranslations } from 'next-intl/server';
import SectionHeading from '@/components/ui/SectionHeading';
import contactClass from './Contact.module.scss';

const Contact = async ({ headingLevel = 2 }: { headingLevel?: 1 | 2 }) => {
  //
  const translateContact = await getTranslations('Contact');
  const itemHeadingLevel = headingLevel === 1 ? 2 : 3;

  return (
    <section id="contact" className={contactClass.contact}>
      {/* Header */}
      <div className={contactClass.contact_header}>
        <SectionHeading level={headingLevel} className={contactClass.contact_title}>
          {translateContact('title_1')}
          <span className={contactClass.contact_title_accent}>{translateContact('title_2')}</span>
        </SectionHeading>
        <p className={contactClass.contact_description}>{translateContact('description')}</p>
      </div>

      <div className={contactClass.contact_layout}>
        {/* Contact Info Cards */}
        <div className={contactClass.contact_infoColumn}>
          <div className={contactClass.contact_card}>
            <div className={contactClass.contact_cardHeader}>
              <div className={contactClass.contact_cardIcon}>
                <svg
                  className={contactClass.contact_cardIconSvg}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <SectionHeading level={itemHeadingLevel} className={contactClass.contact_cardTitle}>
                {translateContact('email_title')}
              </SectionHeading>
            </div>
            <p className={contactClass.contact_cardDetail}>contact@ditsanfrancisco.com</p>
            <p className={contactClass.contact_cardDetail}>support@ditsanfrancisco.com</p>
          </div>

          <div className={`${contactClass.contact_card} ${contactClass.contact_cardFlex}`}>
            <div className={contactClass.contact_cardHeader}>
              <div className={contactClass.contact_cardIcon}>
                <svg
                  className={contactClass.contact_cardIconSvg}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <SectionHeading level={itemHeadingLevel} className={contactClass.contact_cardTitle}>
                {translateContact('business_hours_title')}
              </SectionHeading>
            </div>
            <OpenIndicatorWrapper />
          </div>

          <div className={contactClass.contact_card}>
            <div className={contactClass.contact_cardHeader}>
              <div className={contactClass.contact_cardIcon}>
                <svg
                  className={contactClass.contact_cardIconSvg}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <SectionHeading level={itemHeadingLevel} className={contactClass.contact_cardTitle}>
                {translateContact('phone_title')}
              </SectionHeading>
            </div>
            <p className={contactClass.contact_cardDetail}>{ContactData.data.phone}</p>
            <p className={contactClass.contact_cardDetail}>{ContactData.data.business_hours}</p>
          </div>

          <div className={contactClass.contact_card}>
            <div className={contactClass.contact_cardHeaderMb}>
              <div className={contactClass.contact_cardIcon}>
                <svg
                  className={contactClass.contact_cardIconSvg}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div>
                <SectionHeading level={itemHeadingLevel} className={contactClass.contact_cardTitle}>
                  {translateContact('address_title')}
                </SectionHeading>
                <p className={contactClass.contact_cardAddressText}>{ContactData.data.address_1}</p>
                <p className={contactClass.contact_cardAddressText}>{ContactData.data.address_2}</p>
              </div>
            </div>
            <div className={contactClass.contact_cardMapWrap}>
              <MapWrapper />
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className={contactClass.contact_formColumn}>
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default Contact;
