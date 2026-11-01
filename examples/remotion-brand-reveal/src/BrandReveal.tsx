import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { BRAND_CONFIG } from './config';
import { getStaggerSpringProgress } from './motion';

export const BrandReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const words = ['DETERMINISTIC', 'STUDIO CRAFT', 'FOR AI AGENTS'];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRAND_CONFIG.colors.bgPrimary,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: '140px',
      }}
    >
      <div
        style={{
          fontFamily: BRAND_CONFIG.fonts.mono,
          fontSize: '14px',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: BRAND_CONFIG.colors.accent,
          marginBottom: '20px',
        }}
      >
        01 // MANIFESTO
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {words.map((word, i) => {
          const progress = getStaggerSpringProgress(frame, fps, 0, i, 4);
          const translateY = (1 - progress) * 115;

          return (
            <div key={i} style={{ overflow: 'hidden', paddingBottom: '0.08em' }}>
              <div
                style={{
                  fontFamily: BRAND_CONFIG.fonts.display,
                  fontSize: '88px',
                  fontWeight: 800,
                  letterSpacing: '-0.04em',
                  lineHeight: 0.94,
                  color: i === 2 ? BRAND_CONFIG.colors.accent : BRAND_CONFIG.colors.textPrimary,
                  transform: `translate3d(0, ${translateY.toFixed(2)}%, 0)`,
                }}
              >
                {word}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

