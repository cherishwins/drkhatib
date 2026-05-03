import { ImageResponse } from 'next/og';

// Runtime: default Node (Fluid Compute). See opengraph-image.tsx for the why.
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#0A0E17',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        fontFamily: 'serif',
      }}
    >
      <div
        style={{
          width: 100,
          height: 2,
          background: '#C8A44E',
          marginBottom: 18,
        }}
      />
      {/* MK letters */}
      <div
        style={{
          fontSize: 78,
          fontWeight: 700,
          letterSpacing: '-2px',
          color: '#FFFFFF',
          lineHeight: 1,
        }}
      >
        MK
      </div>
      <div
        style={{
          width: 100,
          height: 2,
          background: '#C8A44E',
          marginTop: 18,
        }}
      />
    </div>,
    { ...size },
  );
}
