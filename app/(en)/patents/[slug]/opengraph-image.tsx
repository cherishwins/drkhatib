import { ImageResponse } from 'next/og';
import { findPatent, patents } from '@/content/patents';

export const alt = 'Patent case study — Dr. Milad Khatib · Civil Engineering Consultancy';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return patents.map((p) => ({ slug: p.slug }));
}

export default async function PatentOgImage({ params }: { params: { slug: string } }) {
  const patent = findPatent(params.slug);
  const title = patent?.title_en ?? 'Patent case study';
  const year = patent ? String(patent.year) : '';
  const inventors = patent?.inventors ?? 'Dr. Milad Khatib';

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: '#0A0E17',
        color: '#F5F1E8',
        fontFamily: 'serif',
        padding: 80,
      }}
    >
      <div
        style={{
          display: 'flex',
          fontSize: 20,
          color: '#C8A44E',
          letterSpacing: 5,
          textTransform: 'uppercase',
          fontFamily: 'monospace',
        }}
      >
        Patent · Lebanon · {year}
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          borderLeft: '2px solid #C8A44E',
          paddingLeft: 40,
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 60,
            fontWeight: 700,
            lineHeight: 1.08,
            color: '#FFFFFF',
            fontFamily: 'serif',
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 24,
            color: '#9A9589',
            fontStyle: 'italic',
            fontFamily: 'serif',
            marginTop: 30,
          }}
        >
          {inventors}
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingTop: 24,
          borderTop: '1px solid #C8A44E',
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
