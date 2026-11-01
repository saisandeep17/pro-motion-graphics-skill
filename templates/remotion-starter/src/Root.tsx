import React from 'react';
import { Composition } from 'remotion';
import { BRAND_CONFIG, calculateTotalFrames } from './config';
import { MainComposition } from './compositions/MainComposition';

export const Root: React.FC = () => {
  const durationInFrames = calculateTotalFrames(
    BRAND_CONFIG.durationInSeconds,
    BRAND_CONFIG.fps
  );

  return (
    <>
      <Composition
        id="MainComposition"
        component={MainComposition}
        durationInFrames={durationInFrames}
        fps={BRAND_CONFIG.fps}
        width={BRAND_CONFIG.width}
        height={BRAND_CONFIG.height}
      />
    </>
  );
};
