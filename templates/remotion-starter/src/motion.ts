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
 * Pure function: safe to call in loops and .map() without violating React Rules of Hooks.
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
 * Calculates smooth 2D camera transform string.
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
