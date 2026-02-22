import MapWrapper from "../Map/MapWrapper";
import OpenIndicator from "../OpenIndicator/OpenIndicator";
import ContactData from "./ContactData.json";
import { getTranslations } from "next-intl/server";

const Contact = async () => {
  // 
  const translateContact = await getTranslations('Contact');
  
  

  return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-brand-navy dark:text-white tracking-tight">
            {translateContact("title_1")}<span className="text-brand-yellow">{translateContact("title_2")}</span>
          </h2>
          <p className="mt-6 text-lg text-brand-gray dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {translateContact("description")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            <div className="p-8 rounded-2xl bg-white dark:bg-[#111127] border border-gray-100 dark:border-brand-navy-light hover:shadow-xl hover:border-brand-yellow dark:hover:border-brand-yellow transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-brand-yellow/15 dark:bg-brand-yellow/20 text-brand-yellow">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-brand-navy dark:text-white">{translateContact("email_title")}</h3>
              </div>
              <p className="mt-3 text-brand-gray dark:text-gray-400">contact@ditsanfrancisco.com</p>
              <p className="text-brand-gray dark:text-gray-400">support@ditsanfrancisco.com</p>
            </div>

            <div className="flex flex-col gap-4 p-8 rounded-2xl bg-white dark:bg-[#111127] border border-gray-100 dark:border-brand-navy-light hover:shadow-xl hover:border-brand-yellow dark:hover:border-brand-yellow transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-brand-yellow/15 dark:bg-brand-yellow/20 text-brand-yellow">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
               <h3 className="text-xl font-semibold text-brand-navy dark:text-white">{translateContact("business_hours_title")}</h3>
              </div>
              <OpenIndicator />
            </div>


            <div className="p-8 rounded-2xl bg-white dark:bg-[#111127] border border-gray-100 dark:border-brand-navy-light hover:shadow-xl hover:border-brand-yellow dark:hover:border-brand-yellow transition-all duration-300">
              <div className="flex items-center gap-4">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-brand-yellow/15 dark:bg-brand-yellow/20 text-brand-yellow">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-brand-navy dark:text-white">{translateContact("phone_title")}</h3>

</div>              
              <p className="mt-3 text-brand-gray dark:text-gray-400">{ContactData.data.phone}</p>
              <p className="text-brand-gray dark:text-gray-400">{ContactData.data.business_hours}</p>
            </div>

            <div className="p-8 rounded-2xl bg-white dark:bg-[#111127] border border-gray-100 dark:border-brand-navy-light hover:shadow-xl hover:border-brand-yellow dark:hover:border-brand-yellow transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-brand-yellow/15 dark:bg-brand-yellow/20 text-brand-yellow">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-brand-navy dark:text-white">{translateContact("address_title")}</h3>
                  <p className="text-sm text-brand-gray dark:text-gray-400">{ContactData.data.address_1}</p>
                  <p className="text-sm text-brand-gray dark:text-gray-400">{ContactData.data.address_2}</p>
                </div>
              </div>
              <div className="mt-4 -mx-8 -mb-8">
                <MapWrapper />
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <form className="bg-gray-50 dark:bg-[#111127] rounded-2xl p-8 sm:p-10 border border-gray-100 dark:border-brand-navy-light">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-semibold text-brand-navy dark:text-white mb-2">
                    {translateContact("first_name_label")}
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    autoComplete="given-name"
                    placeholder="John"
                    className="block w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-brand-navy-light bg-white dark:bg-[#0a0a1a] text-brand-navy dark:text-white placeholder-brand-gray focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-semibold text-brand-navy dark:text-white mb-2">
                    {translateContact("last_name_label")}
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    autoComplete="family-name"
                    placeholder="Doe"
                    className="block w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-brand-navy-light bg-white dark:bg-[#0a0a1a] text-brand-navy dark:text-white placeholder-brand-gray focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-brand-navy dark:text-white mb-2">
                    {translateContact("email_label")}
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    placeholder="john@example.com"
                    className="block w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-brand-navy-light bg-white dark:bg-[#0a0a1a] text-brand-navy dark:text-white placeholder-brand-gray focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-brand-navy dark:text-white mb-2">
                    {translateContact("phone_label")}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    autoComplete="tel"
                    placeholder="+1 (123) 456-7890"
                    className="block w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-brand-navy-light bg-white dark:bg-[#0a0a1a] text-brand-navy dark:text-white placeholder-brand-gray focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-semibold text-brand-navy dark:text-white mb-2">
                    {translateContact("company_label")} <span className="text-brand-gray font-normal">{translateContact("optional_tag")}</span>
                  </label>
                  <input
                    type="text"
                    name="company"
                    id="company"
                    autoComplete="organization"
                    placeholder="Your Company"
                    className="block w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-brand-navy-light bg-white dark:bg-[#0a0a1a] text-brand-navy dark:text-white placeholder-brand-gray focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="country" className="block text-sm font-semibold text-brand-navy dark:text-white mb-2">
                    {translateContact("country_label")} <span className="text-brand-gray font-normal">{translateContact("optional_tag")}</span>
                  </label>
                  <input
                    type="text"
                    name="country"
                    id="country"
                    autoComplete="country-name"
                    placeholder="United States"
                    className="block w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-brand-navy-light bg-white dark:bg-[#0a0a1a] text-brand-navy dark:text-white placeholder-brand-gray focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="state" className="block text-sm font-semibold text-brand-navy dark:text-white mb-2">
                    {translateContact("state_label")} <span className="text-brand-gray font-normal">{translateContact("optional_tag")}</span>
                  </label>
                  <input
                    type="text"
                    name="state"
                    id="state"
                    autoComplete="address-level1"
                    placeholder="California"
                    className="block w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-brand-navy-light bg-white dark:bg-[#0a0a1a] text-brand-navy dark:text-white placeholder-brand-gray focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="city" className="block text-sm font-semibold text-brand-navy dark:text-white mb-2">
                    {translateContact("city_label")} <span className="text-brand-gray font-normal">{translateContact("optional_tag")}</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    autoComplete="address-level2"
                    placeholder="Fremont"
                    className="block w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-brand-navy-light bg-white dark:bg-[#0a0a1a] text-brand-navy dark:text-white placeholder-brand-gray focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all duration-200"
                  />
                </div>
                
                <div className="sm:col-span-2">
                  <label htmlFor="subject" className="block text-sm font-semibold text-brand-navy dark:text-white mb-2">
                    {translateContact("subject_label")}
                  </label>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    placeholder={translateContact("subject_label")}
                    className="block w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-brand-navy-light bg-white dark:bg-[#0a0a1a] text-brand-navy dark:text-white placeholder-brand-gray focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="message" className="block text-sm font-semibold text-brand-navy dark:text-white mb-2">
                    {translateContact("message_label")}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder={translateContact("message_label")}
                    className="block w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-brand-navy-light bg-white dark:bg-[#0a0a1a] text-brand-navy dark:text-white placeholder-brand-gray focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all duration-200 resize-none"
                  />
                </div>

                <div className="sm:col-span-2 flex justify-end">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-4 rounded-lg bg-brand-yellow text-brand-navy font-semibold hover:bg-brand-yellow-hover focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    {translateContact("send_button")}
                    <svg className="inline-block w-5 h-5 ml-2 -mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
  );
};

export default Contact;
