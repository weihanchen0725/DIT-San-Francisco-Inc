import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { GET } from './route';

const TEMPLATE = 'https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png';

const callTile = (z: string, x: string, y: string) =>
  GET(new Request('http://localhost/api/tiles'), { params: Promise.resolve({ z, x, y }) });

describe('GET /api/tiles/[z]/[x]/[y]', () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    vi.stubEnv('CARTO_BASEMAP', TEMPLATE);
    vi.stubEnv('CARTO_BASEMAP_API_KEY', 'secret-key');
    vi.stubGlobal('fetch', fetchMock);
    fetchMock.mockReset();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it('fetches the CARTO tile with the server-side key and caches it', async () => {
    fetchMock.mockResolvedValue(
      new Response('png', { headers: { 'content-type': 'image/png', etag: '"martin-1"' } })
    );

    const response = await callTile('15', '5284', '12699');

    expect(fetchMock.mock.calls[0][0].toString()).toBe(
      'https://basemaps.cartocdn.com/rastertiles/voyager/15/5284/12699.png?key=secret-key'
    );
    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toBe('image/png');
    expect(response.headers.get('cache-control')).toContain('s-maxage=');
  });

  it('replaces a key already embedded in the CARTO_BASEMAP URL', async () => {
    vi.stubEnv('CARTO_BASEMAP', `${TEMPLATE}?key=old-key`);
    fetchMock.mockResolvedValue(new Response('png'));

    await callTile('15', '5284', '12699');

    expect(fetchMock.mock.calls[0][0].toString()).toMatch(/\?key=secret-key$/);
  });

  it('does not cache the CARTO "API KEY REQUIRED" watermark', async () => {
    fetchMock.mockResolvedValue(new Response('png', { headers: { etag: '"wm-abc-light"' } }));

    const response = await callTile('15', '5284', '12699');

    expect(response.headers.get('cache-control')).toBe('no-store');
  });

  it.each([
    ['15', '5284', '../etc'],
    ['15', 'abc', '12699'],
    ['21', '0', '0'],
  ])('rejects invalid coordinates %s/%s/%s', async (z, x, y) => {
    const response = await callTile(z, x, y);

    expect(response.status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('returns 503 when the CARTO env vars are missing', async () => {
    vi.stubEnv('CARTO_BASEMAP_API_KEY', '');

    const response = await callTile('15', '5284', '12699');

    expect(response.status).toBe(503);
  });

  it('returns 502 when CARTO fails', async () => {
    fetchMock.mockResolvedValue(new Response(null, { status: 500 }));

    const response = await callTile('15', '5284', '12699');

    expect(response.status).toBe(502);
  });
});
