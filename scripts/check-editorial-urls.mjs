// Read-only check: GET each editorial-board URL and report status.
// Run before launch (or before any major content drop) to catch link rot
// per the master inventory v1 §8 / §18.4 directive.

import { readFileSync } from 'node:fs';

const src = readFileSync('content/editorial-roles.ts', 'utf8');
const linkRe = /"link":\s*"([^"]+)"/g;
const urls = [...new Set([...src.matchAll(linkRe)].map((m) => m[1]))];

console.error(`Checking ${urls.length} editorial URLs…\n`);

const results = await Promise.all(
  urls.map(async (url) => {
    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), 12000);
    try {
      const res = await fetch(url, {
        method: 'GET',
        redirect: 'follow',
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; KhatibLinkAudit/1.0; +https://miladkhatib.com)',
          Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        },
      });
      clearTimeout(t);
      return { url, status: res.status, ok: res.ok };
    } catch (err) {
      clearTimeout(t);
      return { url, status: 'ERR', ok: false, error: String(err.message ?? err) };
    }
  }),
);

const ok = results.filter((r) => r.ok);
const bad = results.filter((r) => !r.ok);

console.log(`OK   ${ok.length}/${urls.length}`);
console.log(`BAD  ${bad.length}/${urls.length}\n`);

for (const r of bad) {
  console.log(`  ${r.status}  ${r.url}${r.error ? `  (${r.error})` : ''}`);
}

if (bad.length > 0) process.exitCode = 0; // report-only; don't fail builds
