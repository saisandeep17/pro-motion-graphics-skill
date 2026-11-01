---
name: pro-motion-graphics
description: Create studio-grade motion graphic videos in Remotion or HTML/CSS/SVG without AI slop. Includes asset discovery and playbooks for Reels, Brand Promos, Launch Videos, and UI Demos.
---

# Pro Motion Graphics

Build crisp, deterministic, studio-grade motion graphic videos that look crafted by a senior motion designer. This skill enforces strict anti-slop visual standards, exact numerical physics, and interactive asset collection across dedicated video categories.

## When to Use

- Generating programmatic motion graphic videos (Remotion, React, HTML/CSS/GSAP, or HTML5 Canvas/SVG).
- Designing vertical social videos (Reels, TikToks, Shorts), Brand Promos, SaaS Launch Videos, or Kinetic Typography.
- Refactoring existing animations that look like "AI slop" (excessive blur, neon glows, generic gradients, mechanical linear easing).
- Planning frame-accurate storyboards and motion choreography before writing code.

## Model Optimization Rules (Sonnet & Haiku)

Follow these execution constraints to maximize speed, accuracy, and visual quality on Sonnet and Haiku models:

1. **Numbers Over Adjectives**: Never make subjective styling decisions in prose. Translate every design choice directly into exact numerical tokens (frame counts, spring `stiffness`/`damping`, cubic-bezier arrays, pixel grids, and hex/OKLCH values).
2. **Two-Phase Execution**: Do not dump 500 lines of animation code on the first turn if assets or brand tokens are missing. Execute **Step 1 (Category & Asset Check)** first, confirm or define fallback tokens, then generate modular scene code.
3. **Deterministic Frame Math**: Every animation must be driven by a deterministic `frame` variable or explicit timeline progress (`0` to `1`). Never use unseeded `Math.random()`, `setTimeout`, or CSS `infinite` animations that desynchronize during video rendering.
4. **GPU-Safe Properties Only**: Animate `transform` (`translate3d`, `scale`, `rotate`) and `opacity` or SVG `stroke-dashoffset` / `clip-path`. Avoid animating `width`, `height`, `top`, `left`, or heavy `filter: blur()` per frame.

## Step 1: Category Routing & Interactive Asset Discovery

Before writing code, classify the user's request into one of the four categories in `references/category-playbooks.md` and check if critical user assets are missing.

### Asset Discovery Protocol

If the user has not provided brand details or required visual assets for their chosen category, pause and ask a concise, structured question (max 4 bullet points) before generating the final code:

- **Brand & Palette**: "Do you have a brand hex/OKLCH palette and font name, or should I apply a curated studio palette (e.g., Swiss Technical Dark, Editorial Warm Paper, or High-Contrast Kinetic Mono)?"
- **Visual Assets**:
  - For **Launch Videos / UI Demos**: "Please upload or describe your product UI screenshots, SVG logo, or key interface metrics so I can build authentic components instead of generic placeholder boxes."
  - For **Brand Promos**: "Do you have an SVG logo path or specific brand taglines to anchor the reveal?"
  - For **Reels / Shorts**: "What is the exact 3-second hook headline and target aspect ratio (`9:16` 1080x1920 at 60fps default)?"
- **Fast-Track Fallback**: Always let the user know: *"Reply with your assets, or say 'use studio defaults' and I will generate crisp vector/UI components immediately."*

## Step 2: Enforce Anti-Slop Aesthetic Guardrails

Consult `references/anti-slop-rules.md` for full token tables. Every scene must pass these mandatory quality gates:

1. **Ban Generic Glows & Blurs**:
   - Do not put `filter: blur()` blobs floating behind text.
   - Do not use heavy neon `box-shadow` or glassmorphism (`backdrop-filter: blur()`) on every card.
   - Build depth through **1px solid hairline borders** (`rgba(255,255,255,0.10)` on dark, `rgba(0,0,0,0.08)` on light), crisp **2px hard offset shadows** or subtle multi-layered contact shadows, and **solid surface layering** (3% to 5% lightness steps).
2. **Ban the AI Purple-to-Blue Gradient**:
   - Never default to `#8B5CF6` -> `#3B82F6` or rainbow mesh backgrounds.
   - Use restrained, high-contrast palettes: 1 dominant background neutral (tinted with 0.01-0.02 chroma), 1 crisp foreground ink, and **1 intentional accent color** used on maximum 10% of the canvas.
3. **Concentric Geometry & Strict Grids**:
   - Whenever a card or container has padding, calculate nested corner radii mathematically: `R_inner = max(0, R_outer - Padding)`.
   - Align all typography and cards to an explicit 8px structural grid or visible 1px architectural grid lines.
4. **Typography That Commands Space**:
   - Pair a tight, heavy display font (`letter-spacing: -0.04em`, `line-height: 0.95`) with a technical monospace label font (`uppercase`, `letter-spacing: 0.08em`, `font-variant-numeric: tabular-nums`).
   - Never use default system copy ("Unlock Seamless Next-Gen AI", "Supercharge Your Workflow", or sparkle emojis). Write sharp, concrete product copy with real numbers and nouns.

## Step 3: Choreograph Physics & Pacing

Never use `linear` or default `ease` transitions. Every element must move with physical intent:

- **Spring Presets (Remotion / React Spring)**:
  - `SNAPPY_UI` (Cards, badges, switches): `{ stiffness: 220, damping: 24, mass: 1 }`
  - `HERO_REVEAL` (Main headlines, product frames): `{ stiffness: 140, damping: 20, mass: 1.1 }`
  - `WHIP_TRANSITION` (Scene wipes, camera pans): `{ stiffness: 300, damping: 30, mass: 0.8 }`
- **Bezier Presets (CSS / GSAP)**:
  - `EXPO_OUT` (Crisp entrances): `cubic-bezier(0.16, 1, 0.3, 1)`
  - `QUART_IN_OUT` (Camera zooms & match cuts): `cubic-bezier(0.76, 0, 0.24, 1)`
- **Three Laws of Studio Motion**:
  1. **Compound Entrances**: Combine at least two properties (e.g., `translateY(24px -> 0)` + `opacity(0 -> 1)` or `clip-path: inset(100% 0 0 0)` -> `inset(0% 0 0 0)`).
  2. **Staggered Hierarchy**: Never animate a group simultaneously. Offset children by `3` to `5` frames (`50ms` to `85ms`) in reading order.
  3. **Continuous Momentum & Varied Beats**: Never repeat the exact same entrance pattern in two consecutive scenes. If Scene 1 slides up, Scene 2 should whip-pan horizontally, scale from an anchor point, or reveal via a geometric mask.

## Step 4: Apply Category Playbook & Render Code

Load the specific category blueprint from `references/category-playbooks.md` and code templates from `references/remotion-patterns.md`:

- **Category A: Social Reels & Shorts (`9:16`, 1080x1920, 60fps, 15-30s)** -> Frame-0 visual hook, safe-zone margins, kinetic word locks, rapid 45-frame beat changes.
- **Category B: Brand Promotion & Manifesto (`16:9` or `1:1`, 30fps, 30-45s)** -> Editorial Swiss grid, masked typography reveals, tactile surface flips, vector SVG stroke-dashoffset logo lockup.
- **Category C: Product Launch Video (`16:9`, 1920x1080, 60fps, 45-90s)** -> Problem-to-Click arc, 2D/2.5D layered UI reconstruction, choreographed cursor path, camera zoom-to-detail (`scale(1 -> 2.2)`), tabular number counters.
- **Category D: Feature Highlight / UI Micro-Demo (`1:1` or `4:5`, 60fps, 15-30s)** -> Single-feature isolation, interactive state transitions, macro focus pull (dimming background opacity to `0.25` instead of heavy blur).

## Step 5: Self-Audit Checklist

Before outputting the final code, verify every item:

- [ ] Zero generic `filter: blur()` glow blobs or purple-to-blue gradients.
- [ ] All animations driven deterministically by `frame` or explicit timeline progress.
- [ ] Inner border radii follow `R_inner = R_outer - Padding`.
- [ ] Every scene transition changes spatial direction or scale rhythm.
- [ ] Missing user assets (logos, screenshots, brand colors) are either collected or cleanly parameterized at the top of the file as a `BRAND_CONFIG` object for easy swap-in.
