import { ImageResponse } from 'next/og';
import { findPatent, patents } from '@/content/patents';

// Per-patent OG image. Each patent gets its own 1200x630 PNG with the patent
// title, year, and "Lebanese-registered patent" framing — so when Dr. Khatib
// shares a patent URL on LinkedIn or in an email, the unfurl shows the
// specific patent rather than the site's generic OG.
//
// Runtime: default Node (Fluid Compute) per Vercel knowledge update 2026-02.

export const alt = 'Patent case study — Dr. Milad Khatib · Civil Engineering Consultancy';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateImageMetadata() {
  return patents.map((p) => ({ id: p.slug, alt: `${p.title_en} — Lebanese patent` }));
}

export default async function PatentOgImage({ params }: { params: { slug: string } }) {
  const patent = findPatent(params.slug);
  const title = patent?.title_en ?? 'Patent case study';
  const year = patent?.year ?? '';
  const inventors = patent?.inventors ?? '';

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: '#0A0E17',
        color: '#F5F1E8',
        fontFamily: 'serif',
        padding: 80,
      }}
    >
      <div style={{ height: 1, background: '#C8A44E', marginBottom: 50 }} />

      <div style={{ display: 'flex', flex: 1, gap: 50 }}>
        {/* Left badge column */}
        <div
          style={{
            width: 220,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div
              style={{
                fontSize: 16,
                color: '#C8A44E',
                letterSpacing: 5,
                textTransform: 'uppercase',
                fontFamily: 'monospace',
                marginBottom: 14,
              }}
            >
              Patent · LB · {year}
            </div>
            <div
              style={{
                fontSize: 70,
                fontWeight: 700,
                color: '#FFFFFF',
                letterSpacing: '-2px',
                lineHeight: 1,
                fontFamily: 'serif',
              }}
            >
              MK
            </div>
          </div>
          <div
            style={{
              fontSize: 14,
              color: '#9A9589',
              letterSpacing: 4,
              textTransform: 'uppercase',
              fontFamily: 'monospace',
            }}
          >
            ENG · LB
          </div>
        </div>

        {/* Right type column */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingLeft: 40,
            borderLeft: '1px solid rgba(200,164,78,0.4)',
          }}
        >
          <div
            style={{
              fontSize: 20,
              color: '#C8A44E',
              letterSpacing: 5,
              textTransform: 'uppercase',
              fontFamily: 'monospace',
              marginBottom: 22,
            }}
          >
            Patent case study
          </div>
          <div
            style={{
              fontSize: 56,
              fontWeight: 700,
              lineHeight: 1.1,
              color: '#FFFFFF',
              fontFamily: 'serif',
              marginBottom: 30,
              letterSpacing: '-0.01em',
            }}
          >
            {title}
          </div>
          {inventors && (
            <div
              style={{
                fontSize: 22,
                color: '#9A9589',
                fontFamily: 'serif',
                fontStyle: 'italic',
              }}
            >
              {inventors}
            </div>
          )}
        </div>
      </div>

      {/* Bottom strip — practice signature */}
      <div style={{ height: 1, background: '#C8A44E', marginTop: 50, marginBottom: 24 }} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 18,
          color: '#9A9589',
          fontFamily: 'monospace',
          letterSpacing: 3,
          textTransform: 'uppercase',
        }}
      >
        <span style={{ color: '#FFFFFF' }}>Dr. Milad Khatib</span>
        <span>miladkhatib.com</span>
      </div>
    </div>,
    { ...size },
  );
}
