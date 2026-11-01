import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { BRAND_CONFIG } from '../config';
import { EASINGS } from '../motion';

export const TabularCounter: React.FC<{
  from: number;
  to: number;
  startFrame: number;
  durationFrames?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  fontSize?: number;
}> = ({
  from,
  to,
  startFrame,
  durationFrames = 45,
  prefix = '',
  suffix = '',
  decimals = 0,
  fontSize = 64,
}) => {
  const frame = useCurrentFrame();
  const rawValue = interpolate(
    frame,
    [startFrame, startFrame + durationFrames],
    [from, to],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: EASINGS.expoOut,
    }
  );

  return (
    <span
      style={{
        fontFamily: BRAND_CONFIG.fonts.mono,
        fontSize: `${fontSize}px`,
        fontWeight: 700,
        fontVariantNumeric: 'tabular-nums',
        letterSpacing: '-0.03em',
        color: BRAND_CONFIG.colors.textPrimary,
        display: 'inline-flex',
        alignItems: 'baseline',
        gap: '4px',
      }}
    >
      {prefix && <span style={{ color: BRAND_CONFIG.colors.textMuted }}>{prefix}</span>}
      {rawValue.toFixed(decimals)}
      {suffix && <span style={{ color: BRAND_CONFIG.colors.accent }}>{suffix}</span>}
    </span>
  );
};
