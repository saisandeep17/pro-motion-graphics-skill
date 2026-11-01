# HTML5 Canvas Starter Template (Pro Motion Graphics V2)

Procedural, mathematically driven motion graphics template using native HTML5 Canvas 2D. Perfect for particle systems, data graphs, and algorithmic visual effects.

## Quick Start

```bash
# Install dependencies
npm install

# Start Vite dev server for browser preview
npm run dev
```

## Deterministic Video Capture

The renderer exposes `window.renderFrame(frameNumber)` to allow automated headless capture tools (Puppeteer) to snapshot each frame deterministically without jitter.
