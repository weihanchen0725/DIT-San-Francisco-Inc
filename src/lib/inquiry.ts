export type Inquiry = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  country: string;
  state: string;
  city: string;
  subject: string;
  message: string;
  consent: boolean;
  website: string;
  locale: string;
};

type InquiryField = keyof Inquiry;

type InquiryResult = { ok: true; inquiry: Inquiry } | { ok: false; fields: InquiryField[] };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LENGTHS = {
  firstName: 100,
  lastName: 100,
  email: 254,
  phone: 50,
  company: 200,
  country: 100,
  state: 100,
  city: 100,
  subject: 200,
  message: 5000,
} as const;

const readText = (value: unknown) => (typeof value === 'string' ? value.trim() : '');

export const parseInquiry = (input: unknown): InquiryResult => {
  if (!input || typeof input !== 'object') {
    return { ok: false, fields: ['firstName', 'lastName', 'email', 'message', 'consent'] };
  }

  const data = input as Record<string, unknown>;
  const inquiry: Inquiry = {
    firstName: readText(data.firstName),
    lastName: readText(data.lastName),
    email: readText(data.email),
    phone: readText(data.phone),
    company: readText(data.company),
    country: readText(data.country),
    state: readText(data.state),
    city: readText(data.city),
    subject: readText(data.subject),
    message: readText(data.message),
    consent: data.consent === true,
    website: readText(data.website),
    locale: readText(data.locale) || 'en',
  };

  const fields: InquiryField[] = [];

  if (!inquiry.firstName || inquiry.firstName.length > MAX_LENGTHS.firstName)
    fields.push('firstName');
  if (!inquiry.lastName || inquiry.lastName.length > MAX_LENGTHS.lastName) fields.push('lastName');
  if (!EMAIL_PATTERN.test(inquiry.email) || inquiry.email.length > MAX_LENGTHS.email)
    fields.push('email');
  if (inquiry.phone.length > MAX_LENGTHS.phone) fields.push('phone');
  if (inquiry.company.length > MAX_LENGTHS.company) fields.push('company');
  if (inquiry.country.length > MAX_LENGTHS.country) fields.push('country');
  if (inquiry.state.length > MAX_LENGTHS.state) fields.push('state');
  if (inquiry.city.length > MAX_LENGTHS.city) fields.push('city');
  if (inquiry.subject.length > MAX_LENGTHS.subject) fields.push('subject');
  if (!inquiry.message || inquiry.message.length > MAX_LENGTHS.message) fields.push('message');
  if (!inquiry.consent) fields.push('consent');
  if (inquiry.website) fields.push('website');

  return fields.length > 0 ? { ok: false, fields } : { ok: true, inquiry };
};
