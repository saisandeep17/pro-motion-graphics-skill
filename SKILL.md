---
name: pro-motion-graphics
description: Create studio-grade, deterministic motion graphics and programmatic videos in Remotion, HTML/CSS/GSAP, or HTML5 Canvas without AI slop. Features multi-engine routing, 10-stage production pipeline, anti-slop visual rules, and category playbooks for Reels, Launches, Brand Manifestos, Kinetic Typography, and Explainers.
---

# Pro Motion Graphics (V2 Architecture)

Build crisp, deterministic, studio-grade motion graphic videos that look crafted by a senior technical motion director. This skill enforces strict anti-slop visual standards, mathematical physics, multi-engine routing, and an end-to-end 10-stage production pipeline.

---

## When to Activate This Skill

- Generating programmatic video code (Remotion / React, HTML/CSS/SVG + GSAP, or HTML5 Canvas).
- Building video categories: Social Reels/Shorts (`9:16`), Brand Promos (`16:9` / `1:1`), SaaS Product Launches, UI Micro-Demos, Cinematic Kinetic Typography, or Technical Explainers.
- Refactoring animations that look like "AI slop" (muddy blur blobs, neon mesh glows, generic gradients, unanchored CSS fades, mechanical linear easing).
- Planning frame-accurate storyboards, mathematical timing, and sound design synchronization before writing code.

---

## Model Execution Rules (Sonnet & Haiku Optimized)

1. **Numbers Over Adjectives**: Translate all aesthetic intentions directly into exact numerical tokens (frame counts, spring `stiffness`/`damping`, cubic-bezier curves, 8px grid increments, and hex/OKLCH colors). Never describe visual polish with vague adjectives.
2. **Deterministic Frame Math**: Every animation must be driven strictly by a `frame` variable or explicit timeline `progress` ($0.0 \to 1.0$). Never use unseeded `Math.random()`, `setTimeout`, or unanchored CSS `infinite` keyframes that desynchronize during rendering.
3. **GPU-Safe Properties Only**: Animate `transform` (`translate3d`, `scale`, `rotate`), `opacity`, `clip-path`, or SVG `stroke-dashoffset`. Never animate `width`, `height`, `top`, `left`, or heavy `filter: blur()` per frame.
4. **React Rules of Hooks Hygiene**: In Remotion, `spring()` is a pure calculation function. Never prefix mathematical helpers with `use` (e.g. use `getStaggerSpringProgress()`, not `useStaggerSpring()`) to avoid React Rules of Hooks violations inside `.map()` loops.

---

## Multi-Engine Routing Matrix

Before generating project code, evaluate the brief against the **[Multi-Engine Selection Guide](references/engine-selection.md)**:

- **Engine A: Remotion (React)**: Best for complex UI mockups, SaaS launches, modular multi-scene videos, data-driven reels, and frame-accurate CLI rendering.
- **Engine B: HTML/CSS/SVG + GSAP**: Best for kinetic typography, editorial brand manifestos, SVG logo stroke animations, and lightweight browser playback. See **[GSAP Patterns](references/gsap-patterns.md)**.
- **Engine C: HTML5 Canvas**: Best for procedural graphics, particle networks, mathematical animations, and generative visual effects.

---

## The 10-Stage Video Production Pipeline

Follow these sequential stages for every project:

### Stage 1: Understand the Brief
Identify target platform, aspect ratio, duration ($t$), FPS, core message, visual tone, and available assets. Ask only essential missing questions (max 4 bullets). If details are unspecified, apply studio defaults:
- Aspect Ratio: `16:9` (`1920x1080`) for Desktop/Web; `9:16` (`1080x1920`) for Social.
- Framerate: `60fps` for UI & Social; `30fps` for Editorial & Explainers; `24fps` for Cinematic Type.

### Stage 2: Category Routing
Map request to one of the 6 category blueprints in **[Category Playbooks](references/category-playbooks.md)**:
- **Category A**: Social Reels, TikToks & Shorts (`9:16`, 60fps, 12s–30s)
- **Category B**: Brand Promotion & Manifesto (`16:9` / `1:1`, 30fps, 20s–45s)
- **Category C**: SaaS Product Launch Video (`16:9`, 60fps, 45s–90s)
- **Category D**: Feature Highlight / UI Micro-Demo (`1:1` / `4:5`, 60fps, 10s–25s)
- **Category E**: Cinematic Kinetic Typography (`16:9` / `9:16`, 24/30fps, 15s–45s)
- **Category F**: Explainer & Educational Videos (`16:9`, 30/60fps, 45s–120s). Detailed in **[Explainer Playbook](references/explainer-playbook.md)**.

### Stage 3: Asset Discovery & Verification
Collect authentic brand assets (logos, UI screenshots, fonts, color palettes).
- Maintain genuine brand logos intact without distorting aspect ratio.
- Never replace real product screenshots with fabricated placeholder UI when authentic screenshots are supplied.
- Verify asset paths using `scripts/check-assets`.

### Stage 4: Storyboard Planning & Mathematical Timing
Build an explicit timeline table calculating frame numbers from seconds and FPS:
$$\text{frame} = \text{round}(t \times fps)$$
Define scene start/end times, visual descriptions, camera transitions, and audio cues. Ensure scene durations match the total target duration without accidental overlaps.

### Stage 5: Centralized Design System (`BRAND_CONFIG`)
Establish design tokens before writing scene JSX/HTML:
- Colors: Pick one curated system from **[Anti-Slop Rules](references/anti-slop-rules.md)** (Swiss Technical Dark, Editorial Warm Paper, or Kinetic Mono).
- Typography: Follow **[Typography Guide](references/typography-guide.md)** (Display with negative tracking `-0.04em` + Monospace metadata with positive tracking `+0.08em` + `tabular-nums`).
- Geometry: Enforce concentric corner radius math: $R_{inner} = \max(0, R_{outer} - Padding)$.

### Stage 6: Modular Production Code
Generate clean, modular code based on the chosen engine starter in `templates/`:
- `templates/remotion-starter/`: Modular Remotion composition with `config.ts`, `motion.ts`, and components.
- `templates/gsap-starter/`: Frame-deterministic GSAP timeline setup.
- `templates/canvas-starter/`: Procedural 2D canvas draw loop.
Verify structure with `scripts/validate-project`.

### Stage 7: Audio & Sound Design
Incorporate sound layers following **[Audio Design Guide](references/audio-design.md)**:
- Duck background music by 12–16dB during spoken voiceover segments.
- Align transition whooshes 2 frames before visual midpoint; align impact thuds to exact visual contact frame.
- Ensure all music is royalty-free / licensed for commercial use.

### Stage 8: Rendering & Encoding
Render using high-quality deterministic settings:
```bash
# Remotion High-Quality Web MP4 (H.264, CRF 18, YUV420P)
npx remotion render src/index.ts MainComposition out/video.mp4 --codec=h264 --crf=18
```

### Stage 9: Visual Quality Assurance
Execute **[Video Quality Checklist](references/video-quality-checklist.md)**:
- Render still preview frames at 25%, 50%, 75%, and 100% duration (`npx remotion still ... --frame=N`).
- Audit text clipping, 8px grid alignment, contrast ratios, and safe zones (`9:16` top 220px / bottom 340px).
- Verify final video output using `scripts/inspect-output out/video.mp4`.

### Stage 10: Delivery & Handoff
Provide:
1. Rendered video output file (or exact reproducible render command).
2. Clean source project matching template architecture.
3. Referenced assets organized in `public/`.
4. Run instructions and verification logs.

---

## Mandatory Quality Gates

Before concluding any motion graphics task, verify:
- [ ] No generic `filter: blur()` blobs or purple-to-blue AI gradients.
- [ ] No React Rules of Hooks violations (use pure helpers like `getStaggerSpringProgress`).
- [ ] All animations driven deterministically by `frame` or normalized `progress`.
- [ ] `node scripts/validate-project.js <project-dir>` exits with code 0.
- [ ] `node scripts/check-assets.js <project-dir>` exits with code 0.
- [ ] Render output verified via `node scripts/inspect-output.js <output-path>`.
