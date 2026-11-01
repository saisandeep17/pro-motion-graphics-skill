import { spring, SpringConfig } from 'remotion';

export const SPRINGS = {
  hero: { stiffness: 140, damping: 20, mass: 1.1 },
  whip: { stiffness: 300, damping: 30, mass: 0.8 },
};

export function getStaggerSpringProgress(
  frame: number,
  fps: number,
  startFrame: number,
  index: number,
  staggerFrames: number = 4,
  config: SpringConfig = SPRINGS.hero
): number {
  return spring({
    frame: frame - (startFrame + index * staggerFrames),
    fps,
    config,
  });
}
