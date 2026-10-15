// Proxies CARTO basemap tiles so the API key stays on the server.
const TILE_COORDINATE = /^\d{1,7}$/;
const MAX_ZOOM = 20;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ z: string; x: string; y: string }> }
) {
  const { z, x, y } = await params;
  const template = process.env.CARTO_BASEMAP;
  const apiKey = process.env.CARTO_BASEMAP_API_KEY;

  if (!template || !apiKey) {
    return new Response(null, { status: 503 });
  }

  if (![z, x, y].every((value) => TILE_COORDINATE.test(value)) || Number(z) > MAX_ZOOM) {
    return new Response(null, { status: 400 });
  }

  const tileURL = new URL(template.replace('{z}', z).replace('{x}', x).replace('{y}', y));
  tileURL.searchParams.set('key', apiKey);

  const upstream = await fetch(tileURL);
  if (!upstream.ok) {
    return new Response(null, { status: 502 });
  }

  // CARTO answers a rejected key with a 200 "API KEY REQUIRED" watermark (etag "wm-…"); don't let the CDN keep it.
  const isWatermark = upstream.headers.get('etag')?.startsWith('"wm-') ?? false;

  return new Response(upstream.body, {
    headers: {
      'Content-Type': upstream.headers.get('content-type') ?? 'image/png',
      'Cache-Control': isWatermark ? 'no-store' : 'public, max-age=86400, s-maxage=2592000',
    },
  });
}
