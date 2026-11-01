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
    accent: '#FF4F00',
  },
  fonts: {
    display: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
    mono: '"JetBrains Mono", "SF Mono", Menlo, monospace',
  },
  geometry: {
    outerRadius,
    cardPadding,
    innerRadius: Math.max(0, outerRadius - cardPadding),
  },
  assets: {
    logoSvg: staticFile('logo.svg'),
  },
};

export const calculateTotalFrames = (seconds: number, fps: number): number => {
  return Math.round(seconds * fps);
};

