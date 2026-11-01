import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { BRAND_CONFIG } from '../config';
import { EASINGS } from '../motion';

export const ArchitecturalGrid: React.FC<{
  columns?: number;
  rows?: number;
  revealDurationFrames?: number;
}> = ({ columns = 6, rows = 4, revealDurationFrames = 35 }) => {
  const frame = useCurrentFrame();
  const lineScale = interpolate(frame, [0, revealDurationFrames], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: EASINGS.expoOut,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: BRAND_CONFIG.colors.bgPrimary }}>
      {Array.from({ length: columns - 1 }).map((_, i) => (
        <div
          key={`v-${i}`}
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: `${((i + 1) / columns) * 100}%`,
            width: '1px',
            backgroundColor: BRAND_CONFIG.colors.borderHairline,
            transform: `scaleY(${lineScale})`,
            transformOrigin: 'top center',
          }}
        />
      ))}
      {Array.from({ length: rows - 1 }).map((_, i) => (
        <div
          key={`h-${i}`}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: `${((i + 1) / rows) * 100}%`,
            height: '1px',
            backgroundColor: BRAND_CONFIG.colors.borderHairline,
            transform: `scaleX(${lineScale})`,
            transformOrigin: 'left center',
          }}
        />
      ))}
    </AbsoluteFill>
  );
};
