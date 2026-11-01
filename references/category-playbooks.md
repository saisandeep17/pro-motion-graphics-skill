# Category Playbooks & Storyboard Blueprints (V2 Configurable Timeline System)

Every video category serves distinct narrative purposes, retention requirements, and aspect ratios. Instead of static, hardcoded frame counts, V2 uses **mathematical duration formulas** derived from duration in seconds ($t$) and frame rate ($fps$):

$$\text{frame} = \text{round}(t \times fps)$$

$$\text{durationInFrames} = \sum_{i=1}^{n} \text{sceneFrames}_i - \sum_{j=1}^{n-1} \text{transitionOverlap}_j$$

---

## Timeline Math Reference

| Target FPS | 1 Frame | 15 Frames | 30 Frames | 60 Frames | 1 Second |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **24 fps** (Film / Cinematic) | 41.67 ms | 625 ms | 1250 ms | 2500 ms | 24 frames |
| **30 fps** (Editorial / Web) | 33.33 ms | 500 ms | 1000 ms | 2000 ms | 30 frames |
| **60 fps** (Smooth UI / Social) | 16.67 ms | 250 ms | 500 ms | 1000 ms | 60 frames |

---

## Category A: Social Reels, TikToks & Shorts (Vertical Kinetic)

- **Specs**: `1080x1920` (`9:16`), default `60fps` (or `30fps`), configurable $12\text{s} - 30\text{s}$ (default: $15\text{s}$).
- **Platform Safe Zones**:
  - Keep all focal typography and key UI inside the central rectangle: `top: 220px`, `bottom: 340px`, `left/right: 80px`.
  - Never place text where platform buttons (like, comment, share, audio disc) or profile handles render.
- **Essential Asset Check**:
  1. 3-second hook headline or controversial metric.
  2. 1 to 3 visual proof assets (screenshot crop, benchmark graph, or product UI).
  3. Action CTA ("Install CLI", "Get Early Access", etc.).

### Configurable Storyboard Timeline ($t_{total} = 15\text{s}$)

| Scene | Purpose | Time Range | Frame Formula (at 60fps) | Visual & Motion Mechanics |
| :--- | :--- | :--- | :--- | :--- |
| **01** | Pattern Interrupt Hook | $0.0\text{s} \to 2.0\text{s}$ | $0 \to \text{round}(2.0 \times fps)$ (Frames 0–120) | Start in motion on **Frame 0**. Slam bold display metric at $y=30\%$ via `SPRINGS.snappyUi`. Invert canvas color at $0.75\text{s}$. |
| **02** | The Contrast / Friction | $2.0\text{s} \to 6.0\text{s}$ | $\text{round}(2.0 \times fps) \to \text{round}(6.0 \times fps)$ (Frames 120–360) | Vertical whip-cut. Split card comparison (Old vs. New). Stagger 3 friction items with 1px border lines and hard 2px offset shadows. |
| **03** | Product Solution Payoff | $6.0\text{s} \to 12.0\text{s}$ | $\text{round}(6.0 \times fps) \to \text{round}(12.0 \times fps)$ (Frames 360–720) | Macro camera zoom (`scale: 1.0 -> 1.85`). Live tabular counter runs from 0 to final metric. Micro-interaction badge clicks. |
| **04** | Seamless Loop CTA | $12.0\text{s} \to 15.0\text{s}$ | $\text{round}(12.0 \times fps) \to \text{round}(15.0 \times fps)$ (Frames 720–900) | Settle on brand mark and monospace URL pill. Motion momentum directs down or right to visually connect to Frame 0 for seamless looping. |

---

## Category B: Brand Promotion & Manifesto Video

- **Specs**: `1920x1080` (`16:9`) or `1080x1080` (`1:1`), default `30fps`, configurable $20\text{s} - 45\text{s}$ (default: $24\text{s}$).
- **Visual Direction**: Swiss editorial typography, architectural hairline grid lines that expand across the canvas, tactile card flips, controlled color inversions.
- **Essential Asset Check**:
  1. Brand wordmark or SVG vector logo.
  2. 3 to 4 concise manifesto statements (max 5 words per line).
  3. Brand accent color (hex or OKLCH) and font choice.

### Configurable Storyboard Timeline ($t_{total} = 24\text{s}$)

| Scene | Purpose | Time Range | Frame Formula (at 30fps) | Visual & Motion Mechanics |
| :--- | :--- | :--- | :--- | :--- |
| **01** | Architectural Grid Dawn | $0.0\text{s} \to 4.0\text{s}$ | $0 \to \text{round}(4.0 \times fps)$ (Frames 0–120) | Draw 1px structural grid lines (`scaleX(0->1)`, `scaleY(0->1)`). Reveal monospace label `01 // MANIFESTO`. Word 1 rises from baseline overflow mask. |
| **02** | Kinetic Statement Split | $4.0\text{s} \to 10.0\text{s}$ | $\text{round}(4.0 \times fps) \to \text{round}(10.0 \times fps)$ (Frames 120–300) | Asymmetric horizontal division. Left column holds display headline with negative tracking (`-0.04em`); right column rotates 3 geometric vector shapes. |
| **03** | Core Philosophy Flip | $10.0\text{s} \to 18.0\text{s}$ | $\text{round}(10.0 \times fps) \to \text{round}(18.0 \times fps)$ (Frames 300–540) | Full canvas contrast inversion via expanding circular geometric mask (`clip-path: circle()`). Surface steps transition from Carbon Dark to Warm Alabaster. |
| **04** | Precision Brand Lockup | $18.0\text{s} \to 24.0\text{s}$ | $\text{round}(18.0 \times fps) \to \text{round}(24.0 \times fps)$ (Frames 540–720) | Grid lines converge on center crosshair. SVG logo path draws with `stroke-dashoffset` (`0.8s`) and settles with subtle scale settle (`1.03 -> 1.0`). |

---

## Category C: SaaS & Product Launch Video (Apple / Linear Vibe)

- **Specs**: `1920x1080` (`16:9`), `60fps`, configurable $30\text{s} - 90\text{s}$ (default: $45\text{s}$).
- **Visual Direction**: Reconstructed vector UI components (infinitely sharp at 2.5x zoom), choreographed cursor paths, 2.5D layer perspective, camera push-ins.
- **Essential Asset Check**:
  1. Product name and 3 core features.
  2. Genuine product UI screenshots or SVG assets for accurate component reconstruction.
  3. Real benchmark figures or execution time numbers.

### Configurable Storyboard Timeline ($t_{total} = 45\text{s}$)

| Act | Purpose | Time Range | Frame Formula (at 60fps) | Visual & Motion Mechanics |
| :--- | :--- | :--- | :--- | :--- |
| **Act 1** | The Friction | $0.0\text{s} \to 6.0\text{s}$ | $0 \to \text{round}(6.0 \times fps)$ (Frames 0–360) | Status quo complexity: 3 cluttered legacy panels overlap with staggered entry. Sharp horizontal cut wipes them clean. |
| **Act 2** | The Hero Reveal | $6.0\text{s} \to 14.0\text{s}$ | $\text{round}(6.0 \times fps) \to \text{round}(14.0 \times fps)$ (Frames 360–840) | Product title in tight display type, morphing directly into the reconstructed master workspace window on an 8px grid. |
| **Act 3** | Macro Zoom & Cursor Flow | $14.0\text{s} \to 28.0\text{s}$ | $\text{round}(14.0 \times fps) \to \text{round}(28.0 \times fps)$ (Frames 840–1680) | Custom SVG cursor glides on cubic-bezier path. Camera punches into detail (`scale: 1.0 -> 2.2`, `translate(-200px, 100px)`). Button presses (`scale: 0.96`). |
| **Act 4** | Bento Performance Grid | $28.0\text{s} \to 38.0\text{s}$ | $\text{round}(28.0 \times fps) \to \text{round}(38.0 \times fps)$ (Frames 1680–2280) | Camera zooms out to 4-card Bento layout. Cell 1: live tabular latency counter; Cell 2: SVG sparkline; Cell 3: hotkey badge (`Cmd+K`). |
| **Act 5** | Resolution & CTA | $38.0\text{s} \to 45.0\text{s}$ | $\text{round}(38.0 \times fps) \to \text{round}(45.0 \times fps)$ (Frames 2280–2700) | Lockup of brand logo, domain URL, and concentric CTA button with solid accent fill. Settle hold for 60 frames. |

---

## Category D: Feature Highlight & UI Micro-Demo

- **Specs**: `1080x1080` (`1:1`) or `1080x1350` (`4:5`), `60fps`, configurable $10\text{s} - 25\text{s}$ (default: $15\text{s}$).
- **Visual Direction**: Single isolated UI component floating on architectural dark or paper backdrop. High-fidelity focus pull (dimming background to `0.25` opacity, zero blurry haze).
- **Essential Asset Check**:
  - Exact input state, trigger action (click, keyboard shortcut, drag), and resulting output state.

### Configurable Storyboard Timeline ($t_{total} = 15\text{s}$)

| Step | State | Time Range | Frame Formula (at 60fps) | Visual & Motion Mechanics |
| :--- | :--- | :--- | :--- | :--- |
| **01** | Initial State / Hook | $0.0\text{s} \to 4.0\text{s}$ | $0 \to \text{round}(4.0 \times fps)$ (Frames 0–240) | Component enters via `clip-path` shutter reveal. Monospace badge reads `STEP 01 // INPUT`. Clean idle component state. |
| **02** | Trigger & Processing | $4.0\text{s} \to 9.0\text{s}$ | $\text{round}(4.0 \times fps) \to \text{round}(9.0 \times fps)$ (Frames 240–540) | Monospace badge updates to `STEP 02 // EXECUTE`. Keyboard shortcut press or cursor trigger. Progress bar fills deterministically. |
| **03** | Instant Resolution | $9.0\text{s} \to 15.0\text{s}$ | $\text{round}(9.0 \times fps) \to \text{round}(15.0 \times fps)$ (Frames 540–900) | Badge updates to `STEP 03 // SUCCESS`. Component expands or reveals success checkmark with concentric inner radius padding. |

---

## Category E: Cinematic Kinetic Typography (Studio Expressive)

- **Specs**: `1920x1080` (`16:9`) or `1080x1920` (`9:16`), `24fps` or `30fps`, configurable $15\text{s} - 45\text{s}$.
- **Visual Direction**: Swiss international typography meets rhythmic speed ramps. Bold variable font shifts, word-by-word staggered entrance, geometric mask wipes, high-contrast monochrome with single acid accent.
- **Essential Asset Check**:
  1. Script / spoken text split into rhythmic phrase beats.
  2. Voiceover audio file (if voice-synced).
  3. Font pairings (Heavy Display Sans + Monospace).

### Configurable Storyboard Timeline ($t_{total} = 20\text{s}$)

| Phase | Rhythm | Time Range | Frame Formula (at 30fps) | Visual & Motion Mechanics |
| :--- | :--- | :--- | :--- | :--- |
| **01** | The Opening Statement | $0.0\text{s} \to 5.0\text{s}$ | $0 \to \text{round}(5.0 \times fps)$ (Frames 0–150) | Huge display type fills 80% of width. Staggered baseline reveal per word (4 frames apart). Negative tracking `-0.05em`. |
| **02** | Rhythmic Acceleration | $5.0\text{s} \to 12.0\text{s}$ | $\text{round}(5.0 \times fps) \to \text{round}(12.0 \times fps)$ (Frames 150–360) | Rapid-fire word swap (1 word every 8–12 frames). Background color flashes between Black `#000000` and Carbon `#111111` on key downbeats. |
| **03** | Scale Compression & Climax | $12.0\text{s} \to 17.0\text{s}$ | $\text{round}(12.0 \times fps) \to \text{round}(17.0 \times fps)$ (Frames 360–510) | Typography compresses into a dense 4-line editorial block. Monospace metadata annotations frame the perimeter. |
| **04** | Final Echo & Lockup | $17.0\text{s} \to 20.0\text{s}$ | $\text{round}(17.0 \times fps) \to \text{round}(20.0 \times fps)$ (Frames 510–600) | Settle on final punchline word + brand mark. Clean 30-frame still hold. |

---

## Category F: Explainer & Educational Videos

- **Specs**: `1920x1080` (`16:9`), `30fps` or `60fps`, configurable $45\text{s} - 120\text{s}$.
- **Visual Direction**: Clear mental models, animated architectural pipelines, data-flow diagrams, directed graphs (DAGs), clear concept decomposition.
- **Reference**: See dedicated guide **[`references/explainer-playbook.md`](explainer-playbook.md)** for full pedagogical scripting, visual analogies, and node-graph animation patterns.
