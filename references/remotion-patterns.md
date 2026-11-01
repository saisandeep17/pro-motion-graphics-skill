# Remotion & Programmatic Motion Patterns (Sonnet & Haiku Optimized)

Use these copy-ready, deterministic building blocks when generating Remotion (`remotion`) or React motion code. Keep files modular and parameterize user assets at the top via `BRAND_CONFIG`.

## 1. Centralized Brand & Asset Configuration Block

Always place this configuration object at the top of the main composition file so the user can swap colors, copy, and uploaded `public/` assets without hunting through JSX:

```tsx
import { staticFile } from 'remotion';

export const BRAND_CONFIG = {
  fps: 60,
  width: 1920,
  height: 1080,
  colors: {
    bgPrimary: '#090A0F',
    bgSurface: '#12141C',
    borderHairline: 'rgba(255, 255, 255, 0.10)',
    textPrimary: '#F4F5F8',
    textMuted: '#8A8F9E',
    accent: '#FF4F00', // Single high-intent accent
  },
  fonts: {
    display: '"Inter", "SF Pro Display", -apple-system, sans-serif',
    mono: '"JetBrains Mono", "SF Mono", monospace',
  },
  geometry: {
    outerRadius: 16,
    cardPadding: 20,
    get innerRadius() {
      return Math.max(0, this.outerRadius - this.cardPadding);
    },
  },
  assets: {
    // Place user-uploaded files in public/ and reference via staticFile()
    logoSvg: staticFile('logo.svg'),
    productScreen: staticFile('dashboard-ui.png'),
  },
};
```

## 2. Physics & Easing Helper Primitives

Never use raw linear interpolation without clamping or easing. Drop these deterministic helpers into your project:

```tsx
import { interpolate, spring, Easing } from 'remotion';

export const SPRINGS = {
  snappyUi: { stiffness: 220, damping: 24, mass: 1 },
  heroReveal: { stiffness: 140, damping: 20, mass: 1.1 },
  whipPan: { stiffness: 300, damping: 30, mass: 0.8 },
} as const;

export const EASINGS = {
  expoOut: Easing.bezier(0.16, 1, 0.3, 1),
  quartInOut: Easing.bezier(0.76, 0, 0.24, 1),
};

export function useStaggerSpring(
  frame: number,
  fps: number,
  startFrame: number,
  index: number,
  staggerFrames = 4,
  config = SPRINGS.snappyUi
) {
  return spring({
    frame: frame - (startFrame + index * staggerFrames),
    fps,
    config,
  });
}

export function getCameraTransform(
  frame: number,
  inStart: number,
  inEnd: number,
  targetScale: number,
  targetX: number,
  targetY: number
) {
  const progress = interpolate(frame, [inStart, inEnd], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: EASINGS.quartInOut,
  });

  const scale = interpolate(progress, [0, 1], [1, targetScale]);
  const x = interpolate(progress, [0, 1], [0, targetX]);
  const y = interpolate(progress, [0, 1], [0, targetY]);

  return `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
}
```

## 3. Anti-Slop Architectural Components

### A. Masked Baseline Headline (Zero-Fade Kinetic Type)

```tsx
import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { BRAND_CONFIG } from './config';
import { useStaggerSpring, SPRINGS } from './motion';

export const KineticHeadline: React.FC<{
  lines: string[];
  startFrame?: number;
  fontSize?: number;
}> = ({ lines, startFrame = 0, fontSize = 84 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {lines.map((line, i) => {
        const progress = useStaggerSpring(
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
                color: BRAND_CONFIG.colors.textPrimary,
                transform: `translate3d(0, ${translateY}%, 0)`,
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
```

### B. Structural Grid Backdrop (Replaces AI Blur Blobs)

```tsx
import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { BRAND_CONFIG } from './config';
import { EASINGS } from './motion';

export const ArchitecturalGrid: React.FC<{ columns?: number; rows?: number }> = ({
  columns = 6,
  rows = 4,
}) => {
  const frame = useCurrentFrame();
  const lineScale = interpolate(frame, [0, 35], [0, 1], {
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
```

### C. Tabular Metric Counter (No Horizontal Jitter)

```tsx
import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { BRAND_CONFIG } from './config';
import { EASINGS } from './motion';

export const TabularCounter: React.FC<{
  from: number;
  to: number;
  startFrame: number;
  durationFrames?: number;
  suffix?: string;
  decimals?: number;
}> = ({ from, to, startFrame, durationFrames = 45, suffix = '', decimals = 0 }) => {
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
        fontVariantNumeric: 'tabular-nums',
        letterSpacing: '-0.03em',
        color: BRAND_CONFIG.colors.textPrimary,
      }}
    >
      {rawValue.toFixed(decimals)}
      <span style={{ color: BRAND_CONFIG.colors.accent }}>{suffix}</span>
    </span>
  );
};
```

## 4. Production Rendering CLI Reference

Include these render commands when handing off the finished Remotion project to the user:

- **Standard 1080p Web/Social MP4 (High Quality CRF 18)**:
  `npx remotion render src/index.ts MainVideo out/video.mp4 --codec=h264 --crf=18`
- **4K Master Output (2x Scale from 1080p Vector Composition)**:
  `npx remotion render src/index.ts MainVideo out/video-4k.mp4 --codec=h264 --crf=16 --scale=2`
- **Transparent Overlay / Lower Thirds (Apple ProRes 4444)**:
  `npx remotion render src/index.ts OverlayComp out/overlay.mov --codec=prores --prores-profile=4444 --image-format=png`
