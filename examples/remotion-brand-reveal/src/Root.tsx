import React from 'react';
import { Composition } from 'remotion';
import { BRAND_CONFIG } from './config';
import { BrandReveal } from './BrandReveal';

export const Root: React.FC = () => {
  return (
    <Composition
      id="BrandReveal"
      component={BrandReveal}
      durationInFrames={BRAND_CONFIG.durationInSeconds * BRAND_CONFIG.fps}
      fps={BRAND_CONFIG.fps}
      width={BRAND_CONFIG.width}
      height={BRAND_CONFIG.height}
    />
  );
};

