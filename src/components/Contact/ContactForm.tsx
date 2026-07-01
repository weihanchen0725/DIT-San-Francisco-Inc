'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';

import ContactData from './ContactData.json';
import styles from './ContactForm.module.scss';

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
      className={styles.form}
      onSubmit={handleSubmit}
      noValidate
    >
      <div className={styles.grid}>
        <div>
          <label htmlFor="firstName" className={styles.label}>
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
            className={styles.input}
          />
          {fieldError('firstName') && (
            <p id="firstName-error" className={styles.fieldError}>
              {fieldError('firstName')}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="lastName" className={styles.label}>
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
            className={styles.input}
          />
          {fieldError('lastName') && (
            <p id="lastName-error" className={styles.fieldError}>
              {fieldError('lastName')}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className={styles.label}>
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
            className={styles.input}
          />
          {fieldError('email') && (
            <p id="email-error" className={styles.fieldError}>
              {fieldError('email')}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className={styles.label}>
            {translateContact('phone_label')}
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            autoComplete="tel"
            placeholder={translateContact('phone_placeholder')}
            className={styles.input}
          />
        </div>

        <div>
          <label htmlFor="company" className={styles.label}>
            {translateContact('company_label')}{' '}
            <span className={styles.labelOptional}>{translateContact('optional_tag')}</span>
          </label>
          <input
            type="text"
            name="company"
            id="company"
            autoComplete="organization"
            placeholder={translateContact('company_placeholder')}
            className={styles.input}
          />
        </div>

        <div>
          <label htmlFor="country" className={styles.label}>
            {translateContact('country_label')}{' '}
            <span className={styles.labelOptional}>{translateContact('optional_tag')}</span>
          </label>
          <input
            type="text"
            name="country"
            id="country"
            autoComplete="country-name"
            placeholder={translateContact('country_placeholder')}
            className={styles.input}
          />
        </div>

        <div>
          <label htmlFor="state" className={styles.label}>
            {translateContact('state_label')}{' '}
            <span className={styles.labelOptional}>{translateContact('optional_tag')}</span>
          </label>
          <input
            type="text"
            name="state"
            id="state"
            autoComplete="address-level1"
            placeholder={translateContact('state_placeholder')}
            className={styles.input}
          />
        </div>

        <div>
          <label htmlFor="city" className={styles.label}>
            {translateContact('city_label')}{' '}
            <span className={styles.labelOptional}>{translateContact('optional_tag')}</span>
          </label>
          <input
            type="text"
            name="city"
            id="city"
            autoComplete="address-level2"
            placeholder={translateContact('city_placeholder')}
            className={styles.input}
          />
        </div>

        <div className={styles.fieldGroupSpan}>
          <label htmlFor="subject" className={styles.label}>
            {translateContact('subject_label')}
          </label>
          <input
            type="text"
            name="subject"
            id="subject"
            placeholder={translateContact('subject_label')}
            className={styles.input}
          />
        </div>

        <div className={styles.fieldGroupSpan}>
          <label htmlFor="message" className={styles.label}>
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
            className={styles.textarea}
          />
          {fieldError('message') && (
            <p id="message-error" className={styles.fieldError}>
              {fieldError('message')}
            </p>
          )}
        </div>

        <div className={styles.statusGroup} aria-live="polite">
          {submitState === 'success' && (
            <p className={styles.successMessage}>
              {translateContact('success_message')}
            </p>
          )}
          {submitState === 'error' && Object.keys(errors).length > 0 && (
            <p className={styles.errorMessage}>
              {translateContact('error_message')}
            </p>
          )}
        </div>

        <div className={styles.submitGroup}>
          <button
            type="submit"
            className={styles.submitBtn}
          >
            {translateContact('send_button')}
            <svg
              className={styles.submitBtnIcon}
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
