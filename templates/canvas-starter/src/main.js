import { CanvasRenderer } from './renderer.js';
import { createScene, renderFrameAt } from './animation.js';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('motion-canvas');
  const renderer = new CanvasRenderer(canvas);
  const scene = createScene(canvas.width, canvas.height);

  const fps = 60;
  const durationSeconds = 8;
  const totalFrames = fps * durationSeconds;

  let currentFrame = 0;
  let isPlaying = true;

  function loop() {
    if (isPlaying) {
      renderFrameAt(renderer, scene, currentFrame, totalFrames);
      currentFrame = (currentFrame + 1) % totalFrames;
    }
    requestAnimationFrame(loop);
  }

  loop();

  // Expose deterministic frame render function for headless capture
  window.renderFrame = function (frameNumber) {
    isPlaying = false;
    renderFrameAt(renderer, scene, frameNumber, totalFrames);
  };
  window.totalFrames = totalFrames;
  window.fps = fps;
});

