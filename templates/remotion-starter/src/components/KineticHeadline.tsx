import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { BRAND_CONFIG } from '../config';
import { getStaggerSpringProgress, SPRINGS } from '../motion';

export const KineticHeadline: React.FC<{
  lines: string[];
  startFrame?: number;
  fontSize?: number;
  color?: string;
}> = ({
  lines,
  startFrame = 0,
  fontSize = 76,
  color = BRAND_CONFIG.colors.textPrimary,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {lines.map((line, i) => {
        const progress = getStaggerSpringProgress(
          frame,
          fps,
          startFrame,
          i,
          5,
          SPRINGS.heroReveal
        );
        const translateY = (1 - progress) * 115;

        return (
          <div
            key={i}
            style={{
              overflow: 'hidden',
              paddingBottom: '0.08em',
            }}
          >
            <div
              style={{
                fontFamily: BRAND_CONFIG.fonts.display,
                fontSize: `${fontSize}px`,
                fontWeight: 750,
                letterSpacing: '-0.04em',
                lineHeight: 0.94,
                color,
                transform: `translate3d(0, ${translateY.toFixed(2)}%, 0)`,
                willChange: 'transform',
              }}
            >
              {line}
            </div>
          </div>
        );
      })}
    </div>
  );
};

