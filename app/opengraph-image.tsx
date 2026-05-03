import { ImageResponse } from 'next/og';

// Default OG image for the whole site. Lives at /opengraph-image and is
// auto-emitted into <meta property="og:image"> on every route.
//
// Implementation note: satori (next/og's renderer) does not support
// SVG <text> elements, so all type is rendered via plain HTML/CSS divs.
// The MK cube uses SVG <path> only, which IS supported.
//
// Runtime: default Node (Fluid Compute). Edge runtime is no longer
// recommended on Vercel as of 2026-02 — Fluid Compute runs in the same
// regions at the same price with full Node compatibility and lower
// cold-start cost via instance reuse.

export const alt = 'Dr. Milad Khatib — Civil Engineering Consultancy. Beirut, Lebanon.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
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
        position: 'relative',
        padding: '80px',
      }}
    >
      {/* Top gold rule */}
      <div style={{ height: 1, background: '#C8A44E', marginBottom: 60 }} />

      <div style={{ display: 'flex', flex: 1, alignItems: 'center', gap: 60 }}>
        {/* Left — MK monogram (cube via SVG paths + text via HTML) */}
        <div
          style={{
            width: 320,
            height: 320,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#0A0E17',
            border: '1px solid rgba(200,164,78,0.35)',
            position: 'relative',
          }}
        >
          {/* gold rule above MK */}
          <div style={{ width: 160, height: 2, background: '#C8A44E', marginBottom: 20 }} />
          {/* cube outline */}
          <svg
            width="220"
            height="220"
            viewBox="0 0 512 512"
            style={{ position: 'absolute', top: 30 }}
            aria-hidden="true"
          >
            <g
              stroke="#C8A44E"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.55"
            >
              <path d="M 256 168 L 369 233 L 256 298 L 143 233 Z" />
              <path d="M 143 233 L 256 298 L 256 428 L 143 363 Z" />
              <path d="M 369 233 L 256 298 L 256 428 L 369 363 Z" />
            </g>
          </svg>
          <div
            style={{
              fontSize: 130,
              fontWeight: 700,
              color: '#FFFFFF',
              letterSpacing: '-4px',
              lineHeight: 1,
              fontFamily: 'serif',
              zIndex: 1,
              marginTop: 8,
            }}
          >
            MK
          </div>
          <div
            style={{
              fontSize: 16,
              color: '#C8A44E',
              letterSpacing: 6,
              marginTop: 24,
              fontFamily: 'monospace',
            }}
          >
            ENG · LB
          </div>
        </div>

        {/* Right — type column */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              fontSize: 18,
              color: '#C8A44E',
              letterSpacing: 5,
              textTransform: 'uppercase',
              fontFamily: 'monospace',
              marginBottom: 30,
            }}
          >
            CIVIL ENGINEERING · BEIRUT · OEA SINCE 1999
          </div>
          <div
            style={{
              fontSize: 88,
              fontWeight: 700,
              lineHeight: 1.05,
              color: '#FFFFFF',
              marginBottom: 22,
              letterSpacing: -1,
              fontFamily: 'serif',
            }}
          >
            Dr. Milad Khatib
          </div>
          <div
            style={{
              fontSize: 28,
              color: '#C8A44E',
              letterSpacing: 4,
              textTransform: 'uppercase',
              fontFamily: 'monospace',
              marginBottom: 40,
            }}
          >
            Civil Engineering Consultancy
          </div>
          <div
            style={{
              fontSize: 36,
              fontStyle: 'italic',
              color: '#C8A44E',
              fontFamily: 'serif',
            }}
          >
            Engineering by proof.
          </div>
        </div>
      </div>

      {/* Bottom gold rule */}
      <div style={{ height: 1, background: '#C8A44E', marginTop: 60 }} />
    </div>,
    { ...size },
  );
}
