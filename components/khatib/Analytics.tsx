import Script from 'next/script';

const WEBSITE_ID =
  process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID ?? 'd620efb1-b66d-40e2-a412-dbad60862b72';

export function Analytics() {
  return (
    <Script
      src="https://cloud.umami.is/script.js"
      data-website-id={WEBSITE_ID}
      strategy="afterInteractive"
    />
  );
}
