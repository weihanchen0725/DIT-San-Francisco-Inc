export const NEWS_API_BASE_URL = 'https://dit-san-francisco-inc-backend.onrender.com/api/v1';

export type NewsArticle = {
  id: string;
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
    const response = await fetch(`${NEWS_API_BASE_URL}/posts`, {
      method: 'GET',
      next: { revalidate: 300 },
      headers: { Accept: '*/*' },
    });

    if (!response.ok) {
      return [];
    }

    const payload: unknown = await response.json();
    // The posts API already orders summaries by publication time, newest first.
    return getNewsCollection(payload)
      .map(normalizeNewsItem)
      .filter((article): article is NewsArticle => Boolean(article))
      .slice(0, limit);
  } catch {
    return [];
  }
};
