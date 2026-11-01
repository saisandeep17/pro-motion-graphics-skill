# Remotion & Programmatic Motion Patterns (V2 Production Architecture)

Use these copy-ready, deterministic building blocks when generating Remotion (`remotion`) or React motion code. Keep files modular and parameterize user assets at the top via `BRAND_CONFIG`.

> **V2 Compliance Rule**: Never use the `use` prefix for pure mathematical animation helper functions (e.g., `getStaggerSpringProgress` instead of `useStaggerSpring`). In Remotion, `spring()` is a deterministic calculation function, not a React hook; naming it with `use` triggers React Rules of Hooks violations when called inside `.map()` loops.

---

## 1. Centralized Brand & Asset Configuration Block (`src/config.ts`)

Always place this configuration object in `src/config.ts` so the user can swap colors, copy, and uploaded `public/` assets without hunting through JSX:

```tsx
import { staticFile } from 'remotion';

export interface BrandConfig {
  fps: number;
  width: number;
  height: number;
  durationInSeconds: number;
  colors: {
    bgPrimary: string;
    bgSurface: string;
    bgElevated: string;
    borderHairline: string;
    textPrimary: string;
    textMuted: string;
    accent: string;
  };
  fonts: {
    display: string;
    mono: string;
  };
  geometry: {
    outerRadius: number;
    cardPadding: number;
    innerRadius: number;
  };
  assets: {
    logoSvg: string;
    productScreen?: string;
  };
}

const outerRadius = 16;
const cardPadding = 20;

export const BRAND_CONFIG: BrandConfig = {
  fps: 60,
  width: 1920,
  height: 1080,
  durationInSeconds: 15,
  colors: {
    bgPrimary: '#090A0F',
    bgSurface: '#12141C',
    bgElevated: '#1A1D28',
    borderHairline: 'rgba(255, 255, 255, 0.10)',
    textPrimary: '#F4F5F8',
    textMuted: '#8A8F9E',
    accent: '#FF4F00', // Single high-intent accent
  },
  fonts: {
    display: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
    mono: '"JetBrains Mono", "SF Mono", Menlo, monospace',
  },
  geometry: {
    outerRadius,
    cardPadding,
    // Concentric corner formula: R_inner = max(0, R_outer - Padding)
    innerRadius: Math.max(0, outerRadius - cardPadding),
  },
  assets: {
    // Place user-uploaded files in public/ and reference via staticFile()
    logoSvg: staticFile('logo.svg'),
    productScreen: staticFile('dashboard-ui.png'),
  },
};

// Dynamic helper to compute total composition frames across any frame rate
export const getTotalFrames = (seconds: number, fps: number): number => {
  return Math.round(seconds * fps);
};
```

---

## 2. Physics & Motion Primitives (`src/motion.ts`)

Never use raw linear interpolation without clamping or easing. Drop these deterministic helpers into `src/motion.ts`:

```tsx
import { interpolate, spring, Easing, SpringConfig } from 'remotion';

export const SPRINGS = {
  snappyUi: { stiffness: 220, damping: 24, mass: 1 },
  heroReveal: { stiffness: 140, damping: 20, mass: 1.1 },
  whipPan: { stiffness: 300, damping: 30, mass: 0.8 },
  subtleFloat: { stiffness: 40, damping: 12, mass: 2 },
} as const;

export const EASINGS = {
  expoOut: Easing.bezier(0.16, 1, 0.3, 1),
  quartInOut: Easing.bezier(0.76, 0, 0.24, 1),
  cubicOut: Easing.bezier(0.33, 1, 0.68, 1),
};

/**
 * Deterministic staggered spring progress calculator.
 * Pure math helper — safe to call inside .map() loops without violating React Rules of Hooks.
 */
export function getStaggerSpringProgress(
  frame: number,
  fps: number,
  startFrame: number,
  index: number,
  staggerFrames: number = 4,
  config: SpringConfig = SPRINGS.snappyUi
): number {
  return spring({
    frame: frame - (startFrame + index * staggerFrames),
    fps,
    config,
  });
}

/**
 * Calculates smooth 2D/2.5D camera pan and zoom transform string.
 */
export function getCameraTransform(
  frame: number,
  inStart: number,
  inEnd: number,
  targetScale: number,
  targetX: number,
  targetY: number,
  easing = EASINGS.quartInOut
): string {
  const progress = interpolate(frame, [inStart, inEnd], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing,
  });

  const scale = interpolate(progress, [0, 1], [1, targetScale]);
  const x = interpolate(progress, [0, 1], [0, targetX]);
  const y = interpolate(progress, [0, 1], [0, targetY]);

  return `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`;
}
```

---

## 3. Anti-Slop Architectural Components

### A. Masked Baseline Headline (Zero-Fade Kinetic Type)

```tsx
import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { BRAND_CONFIG } from './config';
import { getStaggerSpringProgress, SPRINGS } from './motion';

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
        // Pure calculation helper — valid inside array mappings
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
                color: BRAND_CONFIG.colors.textPrimary,
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

### D. Concentric UI Container (Anti-Slop Geometry)

```tsx
import React from 'react';
import { BRAND_CONFIG } from './config';

export const ConcentricCard: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, style }) => {
  const { outerRadius, cardPadding, innerRadius } = BRAND_CONFIG.geometry;

  return (
    <div
      style={{
        backgroundColor: BRAND_CONFIG.colors.bgSurface,
        border: `1px solid ${BRAND_CONFIG.colors.borderHairline}`,
        borderRadius: `${outerRadius}px`,
        padding: `${cardPadding}px`,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        ...style,
      }}
    >
      <div
        style={{
          borderRadius: `${innerRadius}px`,
          backgroundColor: BRAND_CONFIG.colors.bgElevated,
          padding: '12px 16px',
        }}
      >
        {children}
      </div>
    </div>
  );
};
```

---

## 4. Production Rendering CLI Reference

Include these render commands when handing off the finished Remotion project:

- **Standard 1080p Web/Social MP4 (High Quality CRF 18)**:
  ```bash
  npx remotion render src/index.ts MainVideo out/video.mp4 --codec=h264 --crf=18
  ```
- **4K Master Output (2x Scale from 1080p Vector Composition)**:
  ```bash
  npx remotion render src/index.ts MainVideo out/video-4k.mp4 --codec=h264 --crf=16 --scale=2
  ```
- **Transparent Overlay / Lower Thirds (Apple ProRes 4444)**:
  ```bash
  npx remotion render src/index.ts OverlayComp out/overlay.mov --codec=prores --prores-profile=4444 --image-format=png
  ```
- **Fast Preview Still Frame Inspection**:
  ```bash
  npx remotion still src/index.ts MainVideo out/frame-120.png --frame=120
  ```
