'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';

import ContactData from './ContactData.json';

type ContactErrors = Partial<Record<'firstName' | 'lastName' | 'email' | 'message', string>>;
type SubmitState = 'idle' | 'success' | 'error';

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const ContactForm = () => {
  const translateContact = useTranslations('Contact');
  const [errors, setErrors] = useState<ContactErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>('idle');

  const validate = (formData: FormData) => {
    const nextErrors: ContactErrors = {};
    const firstName = String(formData.get('firstName') ?? '').trim();
    const lastName = String(formData.get('lastName') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const message = String(formData.get('message') ?? '').trim();

    if (!firstName) nextErrors.firstName = translateContact('first_name_error');
    if (!lastName) nextErrors.lastName = translateContact('last_name_error');
    if (!isValidEmail(email)) nextErrors.email = translateContact('email_error');
    if (!message) nextErrors.message = translateContact('message_error');

    return nextErrors;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const nextErrors = validate(formData);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSubmitState('error');
      return;
    }

    const subject = String(formData.get('subject') || translateContact('subject_label')).trim();
    const body = [
      `${translateContact('first_name_label')}: ${String(formData.get('firstName') ?? '').trim()}`,
      `${translateContact('last_name_label')}: ${String(formData.get('lastName') ?? '').trim()}`,
      `${translateContact('email_label')}: ${String(formData.get('email') ?? '').trim()}`,
      `${translateContact('phone_label')}: ${String(formData.get('phone') ?? '').trim()}`,
      `${translateContact('company_label')}: ${String(formData.get('company') ?? '').trim()}`,
      `${translateContact('country_label')}: ${String(formData.get('country') ?? '').trim()}`,
      `${translateContact('state_label')}: ${String(formData.get('state') ?? '').trim()}`,
      `${translateContact('city_label')}: ${String(formData.get('city') ?? '').trim()}`,
      '',
      `${translateContact('message_label')}:`,
      String(formData.get('message') ?? '').trim(),
    ].join('\n');

    window.location.href = `mailto:${ContactData.data.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitState('success');
  };

  const fieldError = (field: keyof ContactErrors) => errors[field];

  return (
    <form
      className="bg-gray-50 dark:bg-[#111127] rounded-2xl p-8 sm:p-10 border border-gray-100 dark:border-brand-navy-light"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-semibold text-brand-navy dark:text-white mb-2"
          >
            {translateContact('first_name_label')}
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            autoComplete="given-name"
            placeholder={translateContact('first_name_placeholder')}
            required
            aria-required="true"
            aria-invalid={fieldError('firstName') ? 'true' : 'false'}
            aria-describedby={fieldError('firstName') ? 'firstName-error' : undefined}
            className="block w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-brand-navy-light bg-white dark:bg-[#0a0a1a] text-brand-navy dark:text-white placeholder-brand-gray focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all duration-200"
          />
          {fieldError('firstName') && (
            <p id="firstName-error" className="mt-2 text-sm text-red-600 dark:text-red-400">
              {fieldError('firstName')}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-semibold text-brand-navy dark:text-white mb-2"
          >
            {translateContact('last_name_label')}
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            autoComplete="family-name"
            placeholder={translateContact('last_name_placeholder')}
            required
            aria-required="true"
            aria-invalid={fieldError('lastName') ? 'true' : 'false'}
            aria-describedby={fieldError('lastName') ? 'lastName-error' : undefined}
            className="block w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-brand-navy-light bg-white dark:bg-[#0a0a1a] text-brand-navy dark:text-white placeholder-brand-gray focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all duration-200"
          />
          {fieldError('lastName') && (
            <p id="lastName-error" className="mt-2 text-sm text-red-600 dark:text-red-400">
              {fieldError('lastName')}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-brand-navy dark:text-white mb-2"
          >
            {translateContact('email_label')}
          </label>
          <input
            type="email"
            name="email"
            id="email"
            autoComplete="email"
            placeholder={translateContact('email_placeholder')}
            required
            aria-required="true"
            aria-invalid={fieldError('email') ? 'true' : 'false'}
            aria-describedby={fieldError('email') ? 'email-error' : undefined}
            className="block w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-brand-navy-light bg-white dark:bg-[#0a0a1a] text-brand-navy dark:text-white placeholder-brand-gray focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all duration-200"
          />
          {fieldError('email') && (
            <p id="email-error" className="mt-2 text-sm text-red-600 dark:text-red-400">
              {fieldError('email')}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-semibold text-brand-navy dark:text-white mb-2"
          >
            {translateContact('phone_label')}
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            autoComplete="tel"
            placeholder={translateContact('phone_placeholder')}
            className="block w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-brand-navy-light bg-white dark:bg-[#0a0a1a] text-brand-navy dark:text-white placeholder-brand-gray focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all duration-200"
          />
        </div>

        <div>
          <label
            htmlFor="company"
            className="block text-sm font-semibold text-brand-navy dark:text-white mb-2"
          >
            {translateContact('company_label')}{' '}
            <span className="text-brand-gray font-normal">{translateContact('optional_tag')}</span>
          </label>
          <input
            type="text"
            name="company"
            id="company"
            autoComplete="organization"
            placeholder={translateContact('company_placeholder')}
            className="block w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-brand-navy-light bg-white dark:bg-[#0a0a1a] text-brand-navy dark:text-white placeholder-brand-gray focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all duration-200"
          />
        </div>

        <div>
          <label
            htmlFor="country"
            className="block text-sm font-semibold text-brand-navy dark:text-white mb-2"
          >
            {translateContact('country_label')}{' '}
            <span className="text-brand-gray font-normal">{translateContact('optional_tag')}</span>
          </label>
          <input
            type="text"
            name="country"
            id="country"
            autoComplete="country-name"
            placeholder={translateContact('country_placeholder')}
            className="block w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-brand-navy-light bg-white dark:bg-[#0a0a1a] text-brand-navy dark:text-white placeholder-brand-gray focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all duration-200"
          />
        </div>

        <div>
          <label
            htmlFor="state"
            className="block text-sm font-semibold text-brand-navy dark:text-white mb-2"
          >
            {translateContact('state_label')}{' '}
            <span className="text-brand-gray font-normal">{translateContact('optional_tag')}</span>
          </label>
          <input
            type="text"
            name="state"
            id="state"
            autoComplete="address-level1"
            placeholder={translateContact('state_placeholder')}
            className="block w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-brand-navy-light bg-white dark:bg-[#0a0a1a] text-brand-navy dark:text-white placeholder-brand-gray focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all duration-200"
          />
        </div>

        <div>
          <label
            htmlFor="city"
            className="block text-sm font-semibold text-brand-navy dark:text-white mb-2"
          >
            {translateContact('city_label')}{' '}
            <span className="text-brand-gray font-normal">{translateContact('optional_tag')}</span>
          </label>
          <input
            type="text"
            name="city"
            id="city"
            autoComplete="address-level2"
            placeholder={translateContact('city_placeholder')}
            className="block w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-brand-navy-light bg-white dark:bg-[#0a0a1a] text-brand-navy dark:text-white placeholder-brand-gray focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all duration-200"
          />
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="subject"
            className="block text-sm font-semibold text-brand-navy dark:text-white mb-2"
          >
            {translateContact('subject_label')}
          </label>
          <input
            type="text"
            name="subject"
            id="subject"
            placeholder={translateContact('subject_label')}
            className="block w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-brand-navy-light bg-white dark:bg-[#0a0a1a] text-brand-navy dark:text-white placeholder-brand-gray focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all duration-200"
          />
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="message"
            className="block text-sm font-semibold text-brand-navy dark:text-white mb-2"
          >
            {translateContact('message_label')}
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder={translateContact('message_placeholder')}
            required
            aria-required="true"
            aria-invalid={fieldError('message') ? 'true' : 'false'}
            aria-describedby={fieldError('message') ? 'message-error' : undefined}
            className="block w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-brand-navy-light bg-white dark:bg-[#0a0a1a] text-brand-navy dark:text-white placeholder-brand-gray focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all duration-200 resize-none"
          />
          {fieldError('message') && (
            <p id="message-error" className="mt-2 text-sm text-red-600 dark:text-red-400">
              {fieldError('message')}
            </p>
          )}
        </div>

        <div className="sm:col-span-2" aria-live="polite">
          {submitState === 'success' && (
            <p className="text-sm font-medium text-green-700 dark:text-green-400">
              {translateContact('success_message')}
            </p>
          )}
          {submitState === 'error' && Object.keys(errors).length > 0 && (
            <p className="text-sm font-medium text-red-600 dark:text-red-400">
              {translateContact('error_message')}
            </p>
          )}
        </div>

        <div className="sm:col-span-2 flex justify-end">
          <button
            type="submit"
            className="w-full flex flex-row items-center gap-2 sm:w-auto px-8 py-4 rounded-lg bg-brand-yellow text-brand-navy font-semibold hover:bg-brand-yellow-hover focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {translateContact('send_button')}
            <svg
              className="inline-block w-5 h-5 ml-2 -mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
