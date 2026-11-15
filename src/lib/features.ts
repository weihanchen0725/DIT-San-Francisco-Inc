// News is no longer flagged: pages always call getNewsArticles (src/lib/news.ts).
export const featureFlags = {
  contactEmail: process.env.NEXT_PUBLIC_ENABLE_CONTACT_EMAIL === 'true',
} as const;
