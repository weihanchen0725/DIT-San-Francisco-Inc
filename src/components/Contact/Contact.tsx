import MapWrapper from '../Map/MapWrapper';
import OpenIndicator from '../OpenIndicator/OpenIndicator';
import ContactForm from './ContactForm';
import ContactData from './ContactData.json';
import { getTranslations } from 'next-intl/server';
import contactClass from './Contact.module.scss';

const Contact = async () => {
  //
  const translateContact = await getTranslations('Contact');

  return (
    <section id="contact" className={contactClass.contact}>
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-bold text-brand-navy dark:text-white tracking-tight">
          {translateContact('title_1')}
          <span className="text-brand-yellow">{translateContact('title_2')}</span>
        </h2>
        <p className="mt-6 text-lg text-brand-gray dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
          {translateContact('description')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Contact Info Cards */}
        <div className="lg:col-span-1 space-y-6 flex flex-col gap-6">
          <div className="p-8 rounded-2xl bg-white dark:bg-[#111127] border border-gray-100 dark:border-brand-navy-light hover:shadow-xl hover:border-brand-yellow dark:hover:border-brand-yellow transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-brand-yellow/15 dark:bg-brand-yellow/20 text-brand-yellow">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-brand-navy dark:text-white">
                {translateContact('email_title')}
              </h3>
            </div>
            <p className="mt-3 text-brand-gray dark:text-gray-400">contact@ditsanfrancisco.com</p>
            <p className="text-brand-gray dark:text-gray-400">support@ditsanfrancisco.com</p>
          </div>

          <div className="flex flex-col gap-4 p-8 rounded-2xl bg-white dark:bg-[#111127] border border-gray-100 dark:border-brand-navy-light hover:shadow-xl hover:border-brand-yellow dark:hover:border-brand-yellow transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-brand-yellow/15 dark:bg-brand-yellow/20 text-brand-yellow">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-brand-navy dark:text-white">
                {translateContact('business_hours_title')}
              </h3>
            </div>
            <OpenIndicator />
          </div>

          <div className="p-8 rounded-2xl bg-white dark:bg-[#111127] border border-gray-100 dark:border-brand-navy-light hover:shadow-xl hover:border-brand-yellow dark:hover:border-brand-yellow transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-brand-yellow/15 dark:bg-brand-yellow/20 text-brand-yellow">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-brand-navy dark:text-white">
                {translateContact('phone_title')}
              </h3>
            </div>
            <p className="mt-3 text-brand-gray dark:text-gray-400">{ContactData.data.phone}</p>
            <p className="text-brand-gray dark:text-gray-400">{ContactData.data.business_hours}</p>
          </div>

          <div className="p-8 rounded-2xl bg-white dark:bg-[#111127] border border-gray-100 dark:border-brand-navy-light hover:shadow-xl hover:border-brand-yellow dark:hover:border-brand-yellow transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-brand-yellow/15 dark:bg-brand-yellow/20 text-brand-yellow">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                <h3 className="text-xl font-semibold text-brand-navy dark:text-white">
                  {translateContact('address_title')}
                </h3>
                <p className="text-sm text-brand-gray dark:text-gray-400">
                  {ContactData.data.address_1}
                </p>
                <p className="text-sm text-brand-gray dark:text-gray-400">
                  {ContactData.data.address_2}
                </p>
              </div>
            </div>
            <div className="mt-4 -mx-8 -mb-8">
              <MapWrapper />
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default Contact;
