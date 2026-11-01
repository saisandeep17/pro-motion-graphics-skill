# Explainer & Educational Video Playbook (Category F Architecture)

Explainer videos translate complex technical architectures, business models, or scientific concepts into clear, intuitive mental models. Unlike hype-driven marketing reels, explainer motion graphics prioritize **clarity, pedagogical pacing, and diagrammatic precision**.

---

## 1. Specifications & Visual Identity

- **Canvas**: `1920x1080` (`16:9`) at `30fps` or `60fps`.
- **Duration**: $45\text{s} - 120\text{s}$ (default: $60\text{s}$).
- **Palette**: Editorial Warm Paper (Anthropic/Monograph style) or Swiss Technical Dark with high-contrast accent lines.
- **Visual Vocabulary**:
  - Directed graphs with animated SVG connectors.
  - Layered architectural stacks with surface elevation steps.
  - Step-by-step token flows, pipeline executions, and modular node states.

---

## 2. The 6-Stage Pedagogical Structure

Every great technical explainer follows this narrative sequence:

```text
[01. Curiosity Hook] ──> [02. Problem Definition] ──> [03. First Principles]
        │
        └──> [04. Visual Mental Model] ──> [05. Concrete Proof] ──> [06. Synthesis]
```

### Timeline Allocation Matrix ($t_{total} = 60\text{s}$ at 30fps = 1800 frames)

| Phase | Duration | Frame Range | Core Objective | Visual Motion Technique |
| :--- | :--- | :--- | :--- | :--- |
| **01. The Hook** | $0\text{s} \to 6\text{s}$ | Frames 0–180 | Frame the core question or counterintuitive fact. | High-contrast headline rises from baseline mask. Minimalist icon pulse. |
| **02. The Friction** | $6\text{s} \to 15\text{s}$ | Frames 180–450 | Show why traditional methods fail or bottleneck. | Cluttered legacy pipeline with red latency badges and stalled node pulses. |
| **03. First Principles** | $15\text{s} \to 28\text{s}$ | Frames 450–840 | Strip away noise; isolate the fundamental mechanism. | Canvas wipes clean via mechanical shutter. Single foundational node appears. |
| **04. Mental Model** | $28\text{s} \to 45\text{s}$ | Frames 840–1350 | Build the complete solution architecture step by step. | Directed graph nodes reveal with staggered springs. SVG paths draw between nodes. Data packets traverse lines. |
| **05. Live Proof** | $45\text{s} \to 54\text{s}$ | Frames 1350–1620 | Show the quantitative payoff (speed, cost, scale). | Tabular counter animates `10x faster` or `99.9% uptime`. Comparison cards lock. |
| **06. Synthesis** | $54\text{s} \to 60\text{s}$ | Frames 1620–1800 | Cement the takeaway and provide a clear next step. | Camera settles on three summary bullet points + resource URL. |

---

## 3. Explainer Diagram Patterns

### A. Animated Node Connector (Data Pipeline Flow)

Animate SVG connections between nodes with deterministic stroke drawing:

```tsx
import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { BRAND_CONFIG } from './config';
import { EASINGS } from './motion';

export const NodeConnector: React.FC<{
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  startFrame: number;
  durationFrames?: number;
}> = ({ x1, y1, x2, y2, startFrame, durationFrames = 25 }) => {
  const frame = useCurrentFrame();

  const progress = interpolate(
    frame,
    [startFrame, startFrame + durationFrames],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: EASINGS.expoOut }
  );

  // Path coordinates
  const midX = (x1 + x2) / 2;
  const d = `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`;

  return (
    <svg style={{ position: 'absolute', inset: 0, overflow: 'visible', pointerEvents: 'none' }}>
      {/* Background track line */}
      <path d={d} fill="none" stroke={BRAND_CONFIG.colors.borderHairline} strokeWidth={1.5} />
      {/* Animated active path */}
      <path
        d={d}
        fill="none"
        stroke={BRAND_CONFIG.colors.accent}
        strokeWidth={2}
        strokeDasharray={400}
        strokeDashoffset={(1 - progress) * 400}
      />
    </svg>
  );
};
```

### B. Layered Architectural Stack (Step Elevation)

Stack cards with exact 1px hairline borders and surface lightness steps:

```tsx
export const ArchitecturalLayer: React.FC<{
  title: string;
  subtitle: string;
  index: number;
  startFrame: number;
}> = ({ title, subtitle, index, startFrame }) => {
  const frame = useCurrentFrame();
  const progress = interpolate(
    frame,
    [startFrame + index * 6, startFrame + index * 6 + 20],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 24px',
        backgroundColor: BRAND_CONFIG.colors.bgSurface,
        border: `1px solid ${BRAND_CONFIG.colors.borderHairline}`,
        borderRadius: '8px',
        transform: `translate3d(0, ${(1 - progress) * 20}px, 0)`,
        opacity: progress,
      }}
    >
      <span style={{ fontFamily: BRAND_CONFIG.fonts.display, fontWeight: 600 }}>{title}</span>
      <span style={{ fontFamily: BRAND_CONFIG.fonts.mono, fontSize: '13px', color: BRAND_CONFIG.colors.textMuted }}>
        {subtitle}
      </span>
    </div>
  );
};
```

---

## 4. Explainer Production Checklist

- [ ] Every technical term introduced has a visible visual anchor (card, node, or diagram label).
- [ ] Diagram complexity builds progressively (never show a 20-node graph all at once).
- [ ] Connectors draw in direction of data flow (left to right or top to bottom).
- [ ] Spoken narration matches screen animations with $\pm 5$ frame accuracy.
