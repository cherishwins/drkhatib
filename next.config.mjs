/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    // Cache optimized image variants for one year (Vercel default is 60s).
    minimumCacheTTL: 31536000,
  },
  async headers() {
    return [
      // Static assets: immutable, cache forever (file extension is the version).
      // Cache-Tag enables Cloudflare Pro tier purge-by-tag later.
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|avif|woff2|ico)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
          { key: 'Cache-Tag', value: 'static-asset' },
        ],
      },
      // Generated OG images & app-icon — stable per build, safe to cache long.
      // s-maxage tells the CDN (Vercel + Cloudflare) it's good for a week,
      // stale-while-revalidate keeps the social platforms happy mid-deploy.
      {
        source: '/opengraph-image',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=2592000',
          },
          { key: 'Cache-Tag', value: 'og-image,site-default' },
        ],
      },
      {
        source: '/apple-icon',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=2592000',
          },
          { key: 'Cache-Tag', value: 'app-icon' },
        ],
      },
      {
        source: '/patents/:slug/opengraph-image:hash*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=2592000',
          },
          { key: 'Cache-Tag', value: 'og-image,patent-og' },
        ],
      },
      {
        source: '/ar/patents/:slug/opengraph-image:hash*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=2592000',
          },
          { key: 'Cache-Tag', value: 'og-image,patent-og' },
        ],
      },
      // Sitemap and robots — small, dynamic-ish, cache for an hour at the edge.
      {
        source: '/(sitemap.xml|robots.txt)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
          },
          { key: 'Cache-Tag', value: 'sitemap' },
        ],
      },
      // Contact API: never cache.
      {
        source: '/api/contact',
        headers: [{ key: 'Cache-Control', value: 'no-store, max-age=0' }],
      },
      // Default HTML pages: short edge-cache window with long stale revalidate.
      // Per brand-kit prompt: HTML s-maxage=60, SWR=86400.
      // Source-of-truth ordering puts this LAST so the more specific rules above win.
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
