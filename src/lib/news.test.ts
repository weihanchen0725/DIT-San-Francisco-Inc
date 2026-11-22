import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { getBodyParagraphs, getNewsArticles, getNewsPost } from './news';

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

  it('uses the exact GET public posts request and preserves five-minute revalidation', async () => {
    fetchMock.mockResolvedValue(Response.json(posts));

    await getNewsArticles();

    expect(fetchMock).toHaveBeenCalledOnce();
    expect(fetchMock).toHaveBeenCalledWith(
      'https://dit-san-francisco-inc-backend.onrender.com/api/public/v1/posts?size=100',
      {
        method: 'GET',
        next: { revalidate: 300 },
        headers: { Accept: '*/*' },
      }
    );
  });

  it('sends the limit as the page size', async () => {
    fetchMock.mockResolvedValue(Response.json({ items: posts.slice(0, 4) }));

    await getNewsArticles(4);

    expect(fetchMock.mock.calls[0][0]).toBe(
      'https://dit-san-francisco-inc-backend.onrender.com/api/public/v1/posts?size=4'
    );
  });

  it('reads items from the PageResponse returned by the public posts API', async () => {
    fetchMock.mockResolvedValue(
      Response.json({ items: posts, page: 0, size: 100, totalItems: 5, totalPages: 1 })
    );

    const articles = await getNewsArticles();

    expect(articles.map((article) => article.id)).toEqual(posts.map((post) => post.id));
  });

  it('keeps the slug so cards can link to the detail page', async () => {
    fetchMock.mockResolvedValue(
      Response.json({ items: [{ id: 'a', slug: 'port-update', title: 'Port update' }] })
    );

    expect((await getNewsArticles())[0]).toMatchObject({ id: 'a', slug: 'port-update' });
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

describe('getNewsPost', () => {
  const fetchMock = vi.fn<typeof fetch>();

  beforeEach(() => {
    vi.stubGlobal('fetch', fetchMock);
    fetchMock.mockReset();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('fetches the live post by encoded slug with five-minute revalidation', async () => {
    const post = { slug: 'a b', title: 'Port update', body: 'Text' };
    fetchMock.mockResolvedValue(Response.json(post));

    expect(await getNewsPost('a b')).toEqual(post);
    expect(fetchMock).toHaveBeenCalledWith(
      'https://dit-san-francisco-inc-backend.onrender.com/api/public/v1/posts/a%20b',
      {
        method: 'GET',
        next: { revalidate: 300 },
        headers: { Accept: '*/*' },
      }
    );
  });

  it('returns undefined when no live post has the slug', async () => {
    fetchMock.mockResolvedValue(Response.json({ status: 404 }, { status: 404 }));

    expect(await getNewsPost('missing')).toBeUndefined();
  });

  it('throws on other failures so an outage is not cached as a 404', async () => {
    fetchMock.mockResolvedValue(new Response(null, { status: 503 }));

    await expect(getNewsPost('any')).rejects.toThrow('503');
  });
});

describe('getBodyParagraphs', () => {
  it('splits plain text on blank lines', () => {
    expect(getBodyParagraphs('First.\n\nSecond.\n  \nThird.')).toEqual([
      'First.',
      'Second.',
      'Third.',
    ]);
  });

  it('reads paragraph text from the seeded blocks format', () => {
    const body = JSON.stringify({
      blocks: [
        { type: 'paragraph', text: 'First.' },
        { type: 'paragraph', text: ' ' },
        { type: 'paragraph', text: 'Second.' },
      ],
    });

    expect(getBodyParagraphs(body)).toEqual(['First.', 'Second.']);
  });

  it('returns no paragraphs for an empty body', () => {
    expect(getBodyParagraphs(null)).toEqual([]);
    expect(getBodyParagraphs('')).toEqual([]);
  });
});
