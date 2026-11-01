# Multi-Engine Selection Guide & Architecture Matrix

In V2, Pro Motion Graphics supports three distinct rendering engines. The AI agent must select the most suitable engine based on project requirements, asset complexity, target runtime, and host environment.

---

## 1. Engine Comparison Matrix

| Evaluation Dimension | Engine A: Remotion (React) | Engine B: HTML/CSS/SVG + GSAP | Engine C: HTML5 Canvas (2D/WebGL) |
| :--- | :--- | :--- | :--- |
| **Primary Sweet Spot** | Complex UI mockups, SaaS launches, modular multi-scene videos, data-driven reels | Kinetic typography, editorial manifestos, interactive web landing animations, SVG paths | Particle networks, mathematical simulations, procedural generative effects, audio visualizers |
| **Core Abstraction** | React components, JSX, Remotion timeline hooks (`useCurrentFrame`, `interpolate`, `spring`) | DOM elements, SVG vectors, GSAP Timelines (`gsap.timeline()`), CSS custom properties | Immediate-mode rendering loop (`requestAnimationFrame` or deterministic `render(frame)` function) |
| **Text & Layout Precision** | Pixel-perfect flexbox/grid, full CSS layout engine, subpixel text rendering | Full browser DOM layout, native font rendering, advanced SVG text clipping | Manual text layout / metrics, bitmap font rendering, or overlay DOM pairing |
| **Deterministic Frame Rendering** | Native frame-by-frame rendering (`--frame=N`) via Chromium headless | Supported via timeline progress scrubbing (`timeline.seek(time)`) | Supported via manual deterministic frame stepping (`render(frame / fps)`) |
| **Export Formats** | MP4 (H.264), ProRes 4444 (MOV), WebM, transparent PNG sequences | Headless browser capture (Puppeteer/Playwright) to MP4/WebM, or embeddable Web code | Frame image sequence to FFmpeg, or WebM recorder stream |
| **Dependencies & Footprint** | Node.js, React, Remotion CLI, `@remotion/cli` | GSAP (or vanilla CSS/SVG), lightweight single HTML bundle | Zero dependencies (native Canvas API) or lightweight math utility |

---

## 2. Engine Decision Tree

Use this decision logic when reviewing the user's brief:

```text
Does the video require procedural math, 1,000+ particles, or physics simulation?
├── YES ──> Choose Engine C (HTML5 Canvas)
└── NO
    │
    Does the project require React ecosystem, complex reusable UI components,
    or multi-scene video timeline with audio tracks and frame-accurate CLI rendering?
    ├── YES ──> Choose Engine A (Remotion)
    └── NO
        │
        Is the project focused on kinetic typography, SVG logo draws,
        lightweight editorial web banners, or rapid browser playback?
        └── YES ──> Choose Engine B (HTML/CSS/SVG + GSAP)
```

---

## 3. Deep Dive: Engine Profiles

### Engine A: Remotion (React)
- **When to Choose**:
  - Full-length product launch videos (Category C).
  - Multi-scene social shorts with dynamic counters and component state changes (Category A).
  - Videos with layered sound effects and voiceovers requiring sub-frame audio synchronization.
  - Teams that maintain a design system in React/TypeScript.
- **Key Advantages**:
  - Strict determinism: guarantees zero frame drops during rendering.
  - Parameterized `BRAND_CONFIG` makes color, text, and asset swapping trivial.
  - Native support for concurrent frame rendering across multiple CPU cores.
- **Limitations**:
  - Requires Node.js and a build step (`npm run build` / `remotion render`).
  - Not designed for direct embedding into static non-React HTML pages.

### Engine B: HTML/CSS/SVG + GSAP
- **When to Choose**:
  - Kinetic typography manifestos (Category E).
  - Editorial brand presentations and Swiss grid animations (Category B).
  - SVG morphing, stroke dashoffset drawing, and logo lockup reveals.
  - Projects requiring a standalone `.html` file that opens immediately in any browser without installation.
- **Key Advantages**:
  - Near-instant development cycle (edit and refresh in any browser).
  - GSAP's timeline sequencing (`tl.to(...)`, `position` parameter) allows exact musical timing.
  - Incredible performance on vector and SVG layers.
- **Limitations**:
  - Video file generation requires an external capture tool (Puppeteer script + FFmpeg).
  - Multi-scene audio mixing requires manual web audio choreography.

### Engine C: HTML5 Canvas
- **When to Choose**:
  - Algorithmic generative art, flow fields, fractal trees, and data constellation graphs.
  - High-particle visualizers, wave functions, and physics simulations.
  - Background atmosphere elements (e.g., deterministic noise grids, fluid vectors).
- **Key Advantages**:
  - Handles tens of thousands of individual points/vectors without DOM overhead.
  - Direct pixel manipulation (`ctx.getImageData`, procedural noise).
  - Can be rendered deterministically by passing `frame` directly into the draw loop:
    ```javascript
    function drawFrame(ctx, frame, totalFrames) {
      const progress = frame / totalFrames;
      // Procedural drawing logic
    }
    ```
- **Limitations**:
  - Complex UI (buttons, cards, wrapped typography) is laborious to construct in Canvas 2D.
  - No native accessibility or DOM inspection.
  - Should rarely be used alone for UI-centric video categories (A, C, D).

---

## 4. Multi-Engine Hygiene Rules

1. **Never Force Remotion for a Simple Banner**: If a user asks for a 5-second animated typography banner to embed in a website, provide Engine B (HTML/CSS/GSAP), not a full 200MB Remotion repository.
2. **Never Mix Engines Unnecessarily**: Keep compositions clean. Do not embed heavy 3D canvas libraries into Remotion unless the specific scene requires procedural simulation.
3. **Always Parameterize Timeline Progress**: Regardless of engine, ensure all animations accept a normalized `progress` ($0.0 \to 1.0$) or an explicit integer `frame` count so the animation can be driven deterministically.

