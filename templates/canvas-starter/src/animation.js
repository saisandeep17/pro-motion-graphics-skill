/**
 * Deterministic frame-based procedural animation controller.
 */
export function createScene(width, height) {
  // Deterministic nodes on 8px grid
  const nodes = [
    { x: width * 0.25, y: height * 0.4 },
    { x: width * 0.45, y: height * 0.35 },
    { x: width * 0.65, y: height * 0.5 },
    { x: width * 0.8, y: height * 0.38 },
  ];

  const connections = [
    [0, 1],
    [1, 2],
    [2, 3],
  ];

  return { nodes, connections };
}

export function renderFrameAt(renderer, scene, frame, totalFrames) {
  const progress = Math.min(1.0, Math.max(0.0, frame / totalFrames));

  renderer.clear();

  // 1. Grid expansion (0 to 25% progress)
  const gridProgress = Math.min(1.0, progress * 4.0);
  renderer.drawGrid(8, 5, gridProgress);

  // 2. Network connection (25% to 75% progress)
  if (progress > 0.25) {
    const netProgress = Math.min(1.0, (progress - 0.25) * 2.0);
    renderer.drawNetwork(scene.nodes, scene.connections, netProgress);
  }

  // 3. Technical Monospace Overlay
  renderer.drawText(
    '01 // PROCEDURAL GRAPH SYSTEM',
    120,
    140,
    '600 14px "JetBrains Mono", monospace',
    '#FF4F00'
  );

  const percent = Math.min(100, Math.round(progress * 100));
  renderer.drawText(
    `COMPLETION: ${percent}%`,
    120,
    heightMinus(renderer.height, 120),
    '600 16px "JetBrains Mono", monospace',
    '#8A8F9E'
  );
}

function heightMinus(h, diff) {
  return h - diff;
}

