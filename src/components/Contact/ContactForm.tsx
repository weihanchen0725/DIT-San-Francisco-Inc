'use client';

import { useState, type FormEvent } from 'react';
import { useLocale, useTranslations } from 'next-intl';

import styles from './ContactForm.module.scss';
import { getInquiryOutcome, type InquiryOutcome } from '@/lib/inquiry-outcome';

type ContactErrors = Partial<
  Record<'firstName' | 'lastName' | 'email' | 'message' | 'consent', string>
>;
type SubmitState = 'idle' | 'submitting' | InquiryOutcome;

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const ContactForm = () => {
  const translateContact = useTranslations('Contact');
  const locale = useLocale();
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
    if (formData.get('consent') !== 'on') {
      nextErrors.consent = translateContact('consent_error');
    }

    return nextErrors;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const nextErrors = validate(formData);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSubmitState('invalid_request');
      const firstInvalidField = Object.keys(nextErrors)[0];
      requestAnimationFrame(() => {
        const control = form.elements.namedItem(firstInvalidField);
        if (control instanceof HTMLElement) control.focus();
      });
      return;
    }

    setSubmitState('submitting');

    const payload = Object.fromEntries(formData.entries());
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...payload,
        consent: formData.get('consent') === 'on',
        locale,
      }),
    }).catch(() => null);

    if (!response) {
      setSubmitState('network_error');
      return;
    }

    const responseBody = await response.json().catch(() => null);
    const outcome = getInquiryOutcome(response.ok, responseBody);

    if (outcome === 'accepted_for_delivery') {
      form.reset();
      setErrors({});
    }
    setSubmitState(outcome);
  };

  const fieldError = (field: keyof ContactErrors) => errors[field];

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.grid}>
        <div>
          <label htmlFor="firstName" className={styles.label}>
            {translateContact('first_name_label')}
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            autoComplete="given-name"
            maxLength={100}
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
            id="lastName"
            name="lastName"
            autoComplete="family-name"
            maxLength={100}
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
            id="email"
            name="email"
            autoComplete="email"
            maxLength={254}
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
            {translateContact('phone_label')}{' '}
            <span className={styles.labelOptional}>{translateContact('optional_tag')}</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            autoComplete="tel"
            maxLength={50}
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
            id="company"
            name="company"
            autoComplete="organization"
            maxLength={200}
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
            id="country"
            name="country"
            autoComplete="country-name"
            maxLength={100}
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
            id="state"
            name="state"
            autoComplete="address-level1"
            maxLength={100}
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
            id="city"
            name="city"
            autoComplete="address-level2"
            maxLength={100}
            placeholder={translateContact('city_placeholder')}
            className={styles.input}
          />
        </div>

        <details className={styles.shipmentFields}>
          <summary className={styles.shipmentSummary}>
            <span>
              {translateContact('shipment_details_title')}{' '}
              <span className={styles.labelOptional}>{translateContact('optional_tag')}</span>
            </span>
            <small>{translateContact('shipment_details_description')}</small>
          </summary>
          <div className={styles.shipmentGrid}>
            <div>
              <label htmlFor="transportMode" className={styles.label}>
                {translateContact('transport_mode_label')}
              </label>
              <select id="transportMode" name="transportMode" className={styles.input}>
                <option value="">{translateContact('transport_mode_placeholder')}</option>
                <option value="not_sure">{translateContact('transport_mode_not_sure')}</option>
                <option value="ocean">{translateContact('transport_mode_ocean')}</option>
                <option value="air">{translateContact('transport_mode_air')}</option>
                <option value="trucking">{translateContact('transport_mode_trucking')}</option>
                <option value="warehousing">
                  {translateContact('transport_mode_warehousing')}
                </option>
              </select>
            </div>

            <div>
              <label htmlFor="cargoReadyDate" className={styles.label}>
                {translateContact('cargo_ready_date_label')}
              </label>
              <input
                type="date"
                id="cargoReadyDate"
                name="cargoReadyDate"
                className={styles.input}
              />
            </div>

            <div>
              <label htmlFor="origin" className={styles.label}>
                {translateContact('origin_label')}
              </label>
              <input
                type="text"
                id="origin"
                name="origin"
                maxLength={200}
                placeholder={translateContact('origin_placeholder')}
                className={styles.input}
              />
            </div>

            <div>
              <label htmlFor="destination" className={styles.label}>
                {translateContact('destination_label')}
              </label>
              <input
                type="text"
                id="destination"
                name="destination"
                maxLength={200}
                placeholder={translateContact('destination_placeholder')}
                className={styles.input}
              />
            </div>

            <div className={styles.fieldGroupSpan}>
              <label htmlFor="commodity" className={styles.label}>
                {translateContact('commodity_label')}
              </label>
              <input
                type="text"
                id="commodity"
                name="commodity"
                maxLength={300}
                placeholder={translateContact('commodity_placeholder')}
                className={styles.input}
              />
            </div>
          </div>
        </details>

        <div className={styles.fieldGroupSpan}>
          <label htmlFor="subject" className={styles.label}>
            {translateContact('subject_label')}{' '}
            <span className={styles.labelOptional}>{translateContact('optional_tag')}</span>
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            maxLength={200}
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

        <div className={styles.honeypot} aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div className={styles.fieldGroupSpan}>
          <label className={styles.consentLabel}>
            <input
              type="checkbox"
              name="consent"
              aria-invalid={fieldError('consent') ? 'true' : 'false'}
              aria-describedby={fieldError('consent') ? 'consent-error' : undefined}
            />
            <span>{translateContact('consent_label')}</span>
          </label>
          {fieldError('consent') && (
            <p id="consent-error" className={styles.fieldError}>
              {fieldError('consent')}
            </p>
          )}
        </div>

        <div className={styles.statusGroup} aria-live="polite">
          {submitState === 'accepted_for_delivery' && (
            <p className={styles.successMessage}>{translateContact('success_message')}</p>
          )}
          {submitState === 'invalid_request' && (
            <p className={styles.errorMessage}>{translateContact('invalid_request_message')}</p>
          )}
          {submitState === 'rate_limited' && (
            <p className={styles.errorMessage}>{translateContact('rate_limited_message')}</p>
          )}
          {submitState === 'payload_too_large' && (
            <p className={styles.errorMessage}>{translateContact('payload_too_large_message')}</p>
          )}
          {submitState === 'delivery_failed' && (
            <p className={styles.errorMessage}>{translateContact('delivery_failed_message')}</p>
          )}
          {submitState === 'service_unavailable' && (
            <p className={styles.errorMessage}>
              {translateContact('service_unavailable_message')}
            </p>
          )}
          {submitState === 'network_error' && (
            <p className={styles.errorMessage}>{translateContact('error_message')}</p>
          )}
        </div>

        <div className={styles.submitGroup}>
          <button
            type="submit"
            className={styles.submitBtn}
            disabled={submitState === 'submitting'}
          >
            {submitState === 'submitting'
              ? translateContact('sending_button')
              : translateContact('send_button')}
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
