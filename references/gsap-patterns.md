# GSAP & Web Motion Patterns (Engine B Architecture)

Use these production-tested patterns when implementing **Engine B (HTML/CSS/SVG + GSAP)** animations. These patterns are designed to be frame-deterministic, GPU-accelerated, and strictly aligned with the Anti-Slop visual system.

---

## 1. Frame-Deterministic GSAP Timeline Setup

For video rendering or frame-by-frame export, never let GSAP run uncontrolled in real time. Initialize the master timeline in a paused state and control it with an explicit progress or seek function:

```javascript
import gsap from 'gsap';

export function createMasterTimeline(fps = 60, durationInSeconds = 15) {
  const totalFrames = Math.round(durationInSeconds * fps);

  const masterTl = gsap.timeline({
    paused: true,
    defaults: {
      ease: 'power3.out', // Equivalent to cubic-bezier(0.16, 1, 0.3, 1)
      duration: 0.8,
    },
  });

  // Function for headless frame capture
  function seekFrame(frameNumber) {
    const timeInSeconds = Math.max(0, Math.min(frameNumber / fps, durationInSeconds));
    masterTl.seek(timeInSeconds, false);
  }

  return { masterTl, totalFrames, fps, seekFrame };
}
```

---

## 2. Kinetic Typography: Overflow Baseline Rise

Replaces generic opacity fades. Words or lines are wrapped in an `overflow: hidden` container and translated up from their baseline:

```html
<div class="headline-container">
  <div class="line-mask"><span class="line">BUILD DETERMINISTIC</span></div>
  <div class="line-mask"><span class="line">MOTION GRAPHICS</span></div>
  <div class="line-mask"><span class="line accent">WITHOUT AI SLOP.</span></div>
</div>

<style>
.line-mask {
  overflow: hidden;
  padding-bottom: 0.08em;
  display: block;
}

.line {
  display: inline-block;
  font-family: 'Inter', -apple-system, sans-serif;
  font-size: clamp(3rem, 6vw, 5.5rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 0.94;
  color: #F4F5F8;
  transform: translateY(115%);
  will-change: transform;
}

.line.accent {
  color: #FF4F00;
}
</style>
```

```javascript
// GSAP Choreography
export function animateKineticHeadline(tl, selector = '.line', startTime = 0) {
  tl.to(
    selector,
    {
      y: '0%',
      duration: 0.9,
      ease: 'power4.out',
      stagger: 0.08, // Stagger reading order
    },
    startTime
  );
}
```

---

## 3. Architectural Hairline Grid Awakening

Animates 1px structural grid lines across the screen with staggered axis reveals:

```html
<div class="grid-backdrop">
  <div class="grid-line vertical" style="left: 25%"></div>
  <div class="grid-line vertical" style="left: 50%"></div>
  <div class="grid-line vertical" style="left: 75%"></div>
  <div class="grid-line horizontal" style="top: 33.3%"></div>
  <div class="grid-line horizontal" style="top: 66.6%"></div>
</div>

<style>
.grid-backdrop {
  position: absolute;
  inset: 0;
  background-color: #090A0F;
  pointer-events: none;
}

.grid-line {
  position: absolute;
  background-color: rgba(255, 255, 255, 0.08);
}

.grid-line.vertical {
  top: 0;
  bottom: 0;
  width: 1px;
  transform: scaleY(0);
  transform-origin: top center;
}

.grid-line.horizontal {
  left: 0;
  right: 0;
  height: 1px;
  transform: scaleX(0);
  transform-origin: left center;
}
</style>
```

```javascript
export function animateGrid(tl, startTime = 0) {
  tl.to('.grid-line.vertical', {
    scaleY: 1,
    duration: 0.7,
    ease: 'power3.out',
    stagger: 0.05,
  }, startTime)
  .to('.grid-line.horizontal', {
    scaleX: 1,
    duration: 0.7,
    ease: 'power3.out',
    stagger: 0.05,
  }, startTime + 0.15);
}
```

---

## 4. SVG Stroke Drawing & Path Morphing

Draws vector icons and logos with clean stroke physics:

```javascript
export function animateSvgStroke(tl, pathSelector, startTime = 0) {
  const path = document.querySelector(pathSelector);
  if (!path) return;

  const length = path.getTotalLength();
  gsap.set(path, {
    strokeDasharray: length,
    strokeDashoffset: length,
  });

  tl.to(path, {
    strokeDashoffset: 0,
    duration: 1.2,
    ease: 'power2.inOut',
  }, startTime);
}
```

---

## 5. Shutter Clip-Path Wipe (Replacing Opacity Fades)

Wipes a product card or UI frame into view like a mechanical camera shutter:

```javascript
export function animateShutterReveal(tl, cardSelector, startTime = 0) {
  gsap.set(cardSelector, {
    clipPath: 'inset(0% 100% 0% 0%)',
    scale: 0.98,
  });

  tl.to(cardSelector, {
    clipPath: 'inset(0% 0% 0% 0%)',
    scale: 1.0,
    duration: 0.85,
    ease: 'expo.out',
  }, startTime);
}
```

---

## 6. Headless Frame Capture Script (Node.js + Puppeteer)

To render GSAP HTML compositions directly to MP4:

```javascript
// scripts/render-gsap-video.js
const puppeteer = require('puppeteer');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

async function renderGsapVideo(htmlPath, outPath = 'out/video.mp4', fps = 60, totalFrames = 900) {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto(`file://${path.resolve(htmlPath)}`, { waitUntil: 'networkidle0' });

  const tempDir = path.resolve('.temp-frames');
  if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

  for (let frame = 0; frame < totalFrames; frame++) {
    await page.evaluate((f) => window.seekFrame(f), frame);
    const framePath = path.join(tempDir, `frame_${String(frame).padStart(5, '0')}.png`);
    await page.screenshot({ path: framePath });
  }

  await browser.close();

  // Stitch frames with FFmpeg
  execSync(`ffmpeg -y -framerate ${fps} -i "${tempDir}/frame_%05d.png" -c:v libx264 -pix_fmt yuv420p "${outPath}"`);
  console.log(`Rendered: ${outPath}`);
}
```

