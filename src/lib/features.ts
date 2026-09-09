export const featureFlags = {
  news: process.env.NEXT_PUBLIC_ENABLE_NEWS === 'true',
  contactEmail: process.env.NEXT_PUBLIC_ENABLE_CONTACT_EMAIL === 'true',
} as const;
