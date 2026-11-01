import { renderGridLines } from './components/grid.js';
import { buildMasterTimeline } from './animations.js';

document.addEventListener('DOMContentLoaded', () => {
  const gridContainer = document.getElementById('grid-container');
  renderGridLines(gridContainer, 8, 5);

  const fps = 60;
  const duration = 8;
  const tl = buildMasterTimeline(fps, duration);

  // Play immediately for browser preview
  tl.play();

  // Expose deterministic frame scrubbing for headless video rendering
  window.seekFrame = function (frameNumber) {
    const timeInSec = frameNumber / fps;
    tl.seek(timeInSec, false);
  };
  window.totalFrames = duration * fps;
  window.fps = fps;
});
