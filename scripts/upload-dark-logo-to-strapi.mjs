/**
 * Uploads dolphin-logistics-logo-dark.png to Strapi and attaches it to
 * Global.Header.Logo.imageDark.
 *
 * Prerequisites (Strapi side — do this once in the Strapi admin before running):
 *   1. Open Content-Type Builder → Components → shared.logo (or wherever Logo lives).
 *   2. Add a new field: name = "imageDark", type = Media (single image).
 *   3. Save and restart Strapi.
 *
 * Usage:
 *   STRAPI_URL=http://localhost:1337 STRAPI_TOKEN=<api-token> node scripts/upload-dark-logo-to-strapi.mjs
 *
 * The STRAPI_TOKEN must be a full-access API token created in:
 *   Strapi Admin → Settings → API Tokens → Create new token (type: Full access).
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

if (!STRAPI_TOKEN) {
  console.error('❌  Set STRAPI_TOKEN env var to a full-access Strapi API token.');
  process.exit(1);
}

const DARK_LOGO_PATH = path.resolve(__dirname, '../src/assets/images/dolphin-logistics-logo-dark.png');

if (!fs.existsSync(DARK_LOGO_PATH)) {
  console.error('❌  Dark logo not found. Run the Sharp generation step first.');
  process.exit(1);
}

const headers = { Authorization: `Bearer ${STRAPI_TOKEN}` };

// ── 1. Upload the file to Strapi media library ────────────────────────────────
console.log('Uploading dark logo to Strapi media library…');

const formData = new FormData();
const fileBuffer = fs.readFileSync(DARK_LOGO_PATH);
const blob = new Blob([fileBuffer], { type: 'image/png' });
formData.append('files', blob, 'dolphin-logistics-logo-dark.png');
formData.append('fileInfo', JSON.stringify({ alternativeText: 'Dolphin Logistics dark logo' }));

const uploadRes = await fetch(`${STRAPI_URL}/api/upload`, {
  method: 'POST',
  headers,
  body: formData,
});

if (!uploadRes.ok) {
  const text = await uploadRes.text();
  console.error('❌  Upload failed:', uploadRes.status, text);
  process.exit(1);
}

const [uploadedFile] = await uploadRes.json();
console.log(`✅  Uploaded file id=${uploadedFile.id}  url=${uploadedFile.url}`);

// ── 2. Find the Global single-type entry ─────────────────────────────────────
console.log('Fetching Global entry…');

const globalRes = await fetch(`${STRAPI_URL}/api/global?populate=Header.Logo`, {
  headers: { ...headers, 'Content-Type': 'application/json' },
});

if (!globalRes.ok) {
  console.error('❌  Could not fetch /api/global:', globalRes.status);
  process.exit(1);
}

const globalData = await globalRes.json();
const documentId = globalData?.data?.documentId;

if (!documentId) {
  console.error('❌  Could not find Global documentId in response:', JSON.stringify(globalData, null, 2));
  process.exit(1);
}

console.log(`   Global documentId = ${documentId}`);

// ── 3. Patch the Logo.imageDark field ────────────────────────────────────────
console.log('Attaching dark logo to Global.Header.Logo.imageDark…');

const patchRes = await fetch(`${STRAPI_URL}/api/global`, {
  method: 'PUT',
  headers: { ...headers, 'Content-Type': 'application/json' },
  body: JSON.stringify({
    data: {
      Header: {
        Logo: {
          imageDark: uploadedFile.id,
        },
      },
    },
  }),
});

if (!patchRes.ok) {
  const text = await patchRes.text();
  console.error('❌  Patch failed:', patchRes.status, text);
  process.exit(1);
}

const updated = await patchRes.json();
console.log('✅  Global.Header.Logo.imageDark set successfully.');
console.log('   Response:', JSON.stringify(updated?.data?.Header?.Logo?.imageDark ?? updated, null, 2));
