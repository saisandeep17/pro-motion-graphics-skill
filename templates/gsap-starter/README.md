# GSAP Starter Template (Pro Motion Graphics V2)

Production-ready HTML/CSS/SVG + GSAP animation starter. Implements deterministic timeline control, Swiss grid architecture, and kinetic typography.

## Quick Start

```bash
# Install dependencies
npm install

# Start Vite dev server for browser preview
npm run dev

# Build production bundle
npm run build
```

## Deterministic Video Capture

The master timeline exposes `window.seekFrame(frameNumber)` for frame-by-frame rendering with headless Puppeteer / Playwright.

