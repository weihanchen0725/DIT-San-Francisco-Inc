export const NEWS_API_BASE_URL = 'https://dit-san-francisco-inc-backend.onrender.com/api/public/v1';

export type NewsArticle = {
  id: string;
  slug?: string;
  title: string;
  excerpt?: string;
  publishedAt?: string;
  sourceUrl?: string;
};

type NewsRecord = Record<string, unknown>;

const getString = (value: unknown) =>
  typeof value === 'string' && value.trim() ? value : undefined;

const getNestedRecord = (value: unknown): NewsRecord | undefined => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return undefined;
  }

  return value as NewsRecord;
};

const normalizeNewsItem = (item: unknown, index: number): NewsArticle | undefined => {
  const record = getNestedRecord(item);

  if (!record) {
    return undefined;
  }

  const attributes = getNestedRecord(record.attributes);
  const source = attributes ? { ...record, ...attributes } : record;
  const title = getString(source.title) ?? getString(source.name) ?? getString(source.headline);

  if (!title) {
    return undefined;
  }

  const id =
    getString(source.id) ?? getString(source.documentId) ?? getString(source.slug) ?? `${index}`;

  return {
    id,
    slug: getString(source.slug),
    title,
    excerpt:
      getString(source.excerpt) ??
      getString(source.summary) ??
      getString(source.description) ??
      getString(source.coverCaption),
    publishedAt:
      getString(source.publishedAt) ??
      getString(source.published_at) ??
      getString(source.createdAt),
    sourceUrl: getString(source.url) ?? getString(source.link),
  };
};

const getNewsCollection = (payload: unknown): unknown[] => {
  if (Array.isArray(payload)) {
    return payload;
  }

  const record = getNestedRecord(payload);

  if (!record) {
    return [];
  }

  if (Array.isArray(record.data)) {
    return record.data;
  }

  if (Array.isArray(record.news)) {
    return record.news;
  }

  if (Array.isArray(record.items)) {
    return record.items;
  }

  if (Array.isArray(record.results)) {
    return record.results;
  }

  return [];
};

export const getNewsArticles = async (limit?: number): Promise<NewsArticle[]> => {
  try {
    // shortcut: without a limit, fetch the API maximum of 100 posts; add pagination past that.
    const response = await fetch(`${NEWS_API_BASE_URL}/posts?size=${limit ?? 100}`, {
      method: 'GET',
      next: { revalidate: 300 },
      headers: { Accept: '*/*' },
    });

    if (!response.ok) {
      return [];
    }

    const payload: unknown = await response.json();
    // The posts API returns a PageResponse whose items are ordered newest first.
    return getNewsCollection(payload)
      .map(normalizeNewsItem)
      .filter((article): article is NewsArticle => Boolean(article))
      .slice(0, limit);
  } catch {
    return [];
  }
};

// Fields of the PostResponse that the detail page renders. The API sends null for unset fields.
export type NewsPost = {
  slug: string;
  title: string;
  excerpt?: string | null;
  body?: string | null;
  seoTitle?: string | null;
  metaDescription?: string | null;
  ctaLabel?: string | null;
  ctaUrl?: string | null;
  publishedAt?: string | null;
};

// The contract says body is plain text with blank lines between paragraphs, but seeded posts
// store {"blocks":[{"type":"paragraph","text":"..."}]}. Accept both formats.
export const getBodyParagraphs = (body?: string | null): string[] => {
  if (!body) {
    return [];
  }

  try {
    const blocks: unknown = JSON.parse(body)?.blocks;

    if (Array.isArray(blocks)) {
      return blocks
        .map((block) => getString(getNestedRecord(block)?.text))
        .filter((text): text is string => Boolean(text));
    }
  } catch {
    // Not JSON, so treat it as plain text.
  }

  return body.split(/\n\s*\n/).filter((paragraph) => paragraph.trim());
};

// Returns undefined when no live post has this slug. Other failures throw, so an outage
// shows the error page instead of a cached 404.
export const getNewsPost = async (slug: string): Promise<NewsPost | undefined> => {
  const response = await fetch(`${NEWS_API_BASE_URL}/posts/${encodeURIComponent(slug)}`, {
    method: 'GET',
    next: { revalidate: 300 },
    headers: { Accept: '*/*' },
  });

  if (response.status === 404) {
    return undefined;
  }

  if (!response.ok) {
    throw new Error(`Posts API returned ${response.status} for slug "${slug}"`);
  }

  return (await response.json()) as NewsPost;
};
