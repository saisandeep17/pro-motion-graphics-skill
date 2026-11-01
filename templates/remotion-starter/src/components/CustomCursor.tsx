import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { BRAND_CONFIG } from '../config';
import { EASINGS } from '../motion';

export const CustomCursor: React.FC<{
  points: { frame: number; x: number; y: number; click?: boolean }[];
}> = ({ points }) => {
  const frame = useCurrentFrame();

  if (points.length === 0) return null;
  if (frame < points[0].frame) return null;

  // Find surrounding points
  let currentX = points[0].x;
  let currentY = points[0].y;
  let isClick = false;

  for (let i = 0; i < points.length - 1; i++) {
    const p1 = points[i];
    const p2 = points[i + 1];

    if (frame >= p1.frame && frame <= p2.frame) {
      currentX = interpolate(frame, [p1.frame, p2.frame], [p1.x, p2.x], {
        easing: EASINGS.quartInOut,
      });
      currentY = interpolate(frame, [p1.frame, p2.frame], [p1.y, p2.y], {
        easing: EASINGS.quartInOut,
      });
      if (p2.click && Math.abs(frame - p2.frame) < 4) {
        isClick = true;
      }
      break;
    } else if (frame > p2.frame) {
      currentX = p2.x;
      currentY = p2.y;
    }
  }

  const scale = isClick ? 0.88 : 1.0;

  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        transform: `translate3d(${currentX}px, ${currentY}px, 0) scale(${scale})`,
        pointerEvents: 'none',
        zIndex: 9999,
        transition: 'transform 0.05s ease-out',
      }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 3L10.07 20.97L12.58 13.58L19.97 11.07L3 3Z"
          fill="#FFFFFF"
          stroke={BRAND_CONFIG.colors.bgPrimary}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

