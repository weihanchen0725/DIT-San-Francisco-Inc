import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { getNewsArticles } from './news';

const posts = [
  { id: 'newest', title: 'Newest post', coverCaption: 'Latest shipping update.' },
  { id: 'second', title: 'Second-newest post' },
  { id: 'third', title: 'Third-newest post' },
  { id: 'older', title: 'Older post' },
  { id: 'oldest', title: 'Oldest post' },
];

describe('getNewsArticles', () => {
  const fetchMock = vi.fn<typeof fetch>();

  beforeEach(() => {
    vi.stubGlobal('fetch', fetchMock);
    fetchMock.mockReset();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('uses the exact GET posts request and preserves five-minute revalidation', async () => {
    fetchMock.mockResolvedValue(Response.json(posts));

    await getNewsArticles();

    expect(fetchMock).toHaveBeenCalledOnce();
    expect(fetchMock).toHaveBeenCalledWith(
      'https://dit-san-francisco-inc-backend.onrender.com/api/v1/posts',
      {
        method: 'GET',
        next: { revalidate: 300 },
        headers: { Accept: '*/*' },
      }
    );
  });

  // The homepage shows four posts, so the cap cases below use a limit of 4.
  it('returns the four newest summaries in API order without requiring dates', async () => {
    fetchMock.mockResolvedValue(Response.json(posts));

    const articles = await getNewsArticles(4);

    expect(articles).toHaveLength(4);
    expect(articles.map((article) => article.id)).toEqual(['newest', 'second', 'third', 'older']);
    expect(articles[0]).toMatchObject({
      title: 'Newest post',
      excerpt: 'Latest shipping update.',
    });
  });

  it('keeps the full news listing uncapped when no limit is requested', async () => {
    fetchMock.mockResolvedValue(Response.json(posts));

    const articles = await getNewsArticles();

    expect(articles).toHaveLength(5);
    expect(articles.map((article) => article.id)).toEqual(posts.map((post) => post.id));
  });

  it.each([0, 1, 2, 3])(
    'returns only available posts when the API contains %i posts',
    async (count) => {
      fetchMock.mockResolvedValue(Response.json(posts.slice(0, count)));

      const articles = await getNewsArticles(4);

      expect(articles).toHaveLength(count);
      expect(articles.map((article) => article.id)).toEqual(
        posts.slice(0, count).map((post) => post.id)
      );
    }
  );

  it('filters invalid records before applying the four-post limit', async () => {
    fetchMock.mockResolvedValue(
      Response.json([null, { id: 'untitled' }, { title: ' ' }, ...posts])
    );

    const articles = await getNewsArticles(4);

    expect(articles.map((article) => article.id)).toEqual(['newest', 'second', 'third', 'older']);
  });

  it.each(['data', 'news', 'items', 'results'])(
    'preserves support for the %s envelope',
    async (key) => {
      fetchMock.mockResolvedValue(Response.json({ [key]: posts }));

      const articles = await getNewsArticles(4);

      expect(articles.map((article) => article.id)).toEqual(['newest', 'second', 'third', 'older']);
    }
  );

  it('preserves normalization of nested attributes and publication dates', async () => {
    fetchMock.mockResolvedValue(
      Response.json({
        data: [
          {
            id: 'nested',
            attributes: {
              headline: 'Shipping update',
              summary: 'A shipping summary.',
              published_at: '2026-11-08T12:00:00Z',
              url: 'https://example.com/shipping-update',
            },
          },
        ],
      })
    );

    expect(await getNewsArticles(4)).toEqual([
      {
        id: 'nested',
        title: 'Shipping update',
        excerpt: 'A shipping summary.',
        publishedAt: '2026-11-08T12:00:00Z',
        sourceUrl: 'https://example.com/shipping-update',
      },
    ]);
  });

  it('preserves the empty result for unsuccessful responses', async () => {
    fetchMock.mockResolvedValue(new Response(null, { status: 503 }));

    expect(await getNewsArticles(4)).toEqual([]);
  });

  it('preserves the empty result when the request fails', async () => {
    fetchMock.mockRejectedValue(new Error('Network unavailable'));

    expect(await getNewsArticles(4)).toEqual([]);
  });
});
