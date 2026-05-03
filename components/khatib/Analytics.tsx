import Script from 'next/script';

export function Analytics() {
  return (
    <Script
      src="https://cloud.umami.is/script.js"
      data-website-id="d620efb1-b66d-40e2-a412-dbad60862b72"
      strategy="afterInteractive"
    />
  );
}
