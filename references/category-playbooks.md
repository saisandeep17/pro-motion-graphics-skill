# Category Playbooks & Storyboard Blueprints

Every video category has distinct retention physics, aspect ratios, and required assets. Route the user's request to the matching playbook below.

---

## Category A: Social Reels, TikToks & Shorts (Vertical Kinetic)

- **Specs**: `1080x1920` (`9:16`), `60fps` (or `30fps`), `12s - 30s` (`720 - 1800` frames at 60fps).
- **Safe Zones**: Keep all text and key visuals inside the central safe box (`top: 180px`, `bottom: 320px`, `left/right: 80px`) so platform UI overlays (captions, like buttons, username) never block content.
- **Asset Check**: Ask the user for:
  1. The 3-second hook statement or controversial stat.
  2. Up to 3 proof visuals (screenshots, product crops, or charts).
  3. Call-to-action text.

### Frame-by-Frame Pacing Structure (15s / 900 Frames @ 60fps)
- **Frames 0-120 (0-2s) | Pattern-Interrupt Hook**:
  - Start in motion on **Frame 0** (never start on a blank fade-in).
  - Slam the core number or hook phrase onto the upper-third grid line using `SNAPPY_UI` spring (`stiffness: 260, damping: 22`) paired with an instant background color invert at frame 45.
- **Frames 120-360 (2-6s) | The Visual Proof / Problem Flip**:
  - Whip-pan vertically (`translateY`) into a crisp split-screen or stacked card comparison ("Old Way vs. New Way").
  - Stagger list items every 8 frames with hard `2px` borders and SVG check/cross stroke draws.
- **Frames 360-720 (6-12s) | Dynamic UI / Metric Payoff**:
  - Zoom into the hero UI component or live tabular counter (`0 -> 10,400+`) while secondary callout badges snap onto concentric corners.
- **Frames 720-900 (12-15s) | Loopable CTA Lockup**:
  - Snap back to the primary brand grid. Animate a clean directional arrow or command bar so the final frame visually flows back into Frame 0 for seamless looping.

---

## Category B: Brand Promotion & Manifesto Video

- **Specs**: `1920x1080` (`16:9`) or `1080x1080` (`1:1`), `30fps`, `20s - 45s`.
- **Visual Style**: Swiss editorial typography, architectural grid lines that draw across the canvas, high-contrast color flips, tactile card flips.
- **Asset Check**: Ask the user for:
  1. Brand name, SVG logo (or wordmark font), and primary hex color.
  2. 3-4 short manifesto phrases (max 5 words per screen).
  3. Brand domain or closing tagline.

### Frame-by-Frame Pacing Structure (20s / 600 Frames @ 30fps)
- **Frames 0-90 (0-3s) | Architectural Grid Awakening**:
  - Draw 1px structural grid lines across the canvas (`scaleX(0 -> 1)`, `scaleY(0 -> 1)`).
  - Reveal a monospace index number (`01 // MANIFESTO`) in the top-left cell and a massive oversized display word rising from an `overflow: hidden` baseline mask.
- **Frames 90-240 (3-8s) | Kinetic Contrast Split**:
  - Split the canvas horizontally or vertically using `clip-path`. Left side holds bold typography; right side cycles through 3 rapid geometric/product frames at 45-frame intervals.
- **Frames 240-450 (8-15s) | Signature Brand Mechanic**:
  - Perform a full-canvas color inversion (e.g., Carbon Ink `#090A0F` flips to Warm Paper `#F6F4EE` via an expanding circular or rectangular clip mask) to underscore the core value proposition.
- **Frames 450-600 (15-20s) | Precision Logo Lockup**:
  - Converge grid lines toward the center rule-of-thirds intersection. Reveal the brand mark via SVG path draw + subtle `scale(1.04 -> 1.0)` settle. Hold clean for 45 frames.

---

## Category C: SaaS & Product Launch Video (Apple / Linear Style)

- **Specs**: `1920x1080` (`16:9`), `60fps`, `45s - 90s`.
- **Visual Style**: Reconstructed vector UI components (never blurry full-screen raster screenshots), choreographed cursor clicks, 2.5D isometric parallax layers, camera push-ins.
- **Asset Check**: Ask the user for:
  1. Product name, core problem solved, and 3 hero features.
  2. High-res UI screenshots or component descriptions (so Claude can rebuild the key UI card in clean JSX/HTML for infinite sharpness at 2.5x zoom).
  3. Real metrics or benchmark numbers.

### 5-Act Launch Storyboard
1. **Act 1: The Friction (0-6s)**: Show the status quo breaking—cluttered legacy cards piling up with staggered offsets, then swept off-canvas by a sharp horizontal wipe.
2. **Act 2: The Click / Hero Reveal (6-14s)**: Introduce the product name in crisp display type, immediately morphing into the clean hero workspace frame anchored on an 8px grid.
3. **Act 3: Macro Camera Zoom & Cursor Choreography (14-30s)**:
   - Animate a custom SVG cursor along a smooth cubic-bezier curve toward a primary action button.
   - Compress the button on click (`scale(0.96)` for 6 frames, then spring back to `1.0`).
   - Simultaneously push the virtual camera in (`scale(1 -> 2.15)`, `translate(-240px, 120px)`) using `QUART_IN_OUT` so the viewer reads the micro-interaction clearly.
4. **Act 4: Bento Grid / Speed Montage (30-42s)**: Pull back to an asymmetric 4-card Bento grid where each cell demonstrates a live metric counter, an animated SVG sparkline chart, or a keyboard shortcut badge (`Cmd + K`).
5. **Act 5: Resolution & CTA (42-50s)**: Settle on the brand lockup, URL badge with concentric corners, and a clean solid-fill CTA button.

---

## Category D: Feature Highlight / UI Micro-Demo

- **Specs**: `1080x1080` (`1:1`) or `1080x1350` (`4:5`), `60fps`, `10s - 20s`.
- **Visual Style**: Isolated component floating on a structured studio backdrop. Zero fluff—focuses 100% on "How this one feature works in 3 steps."
- **Asset Check**: Ask the user for the exact input state, trigger action (e.g., slash command, toggle, drag-and-drop), and output state of the feature.
- **Execution Rules**:
  - Keep the camera locked on the component container.
  - Show all real UI states: `Idle` -> `Hover/Focus` -> `Active Press` -> `Skeleton/Progress` -> `Completed State`.
  - Use a floating monospace step indicator (`STEP 01 / INPUT`, `STEP 02 / EXECUTE`, `STEP 03 / DEPLOYED`) anchored to the top-left margin.
