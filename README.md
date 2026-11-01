# 🎬 Pro Motion Graphics Skill

[![Skill Status](https://img.shields.io/badge/status-production--ready-00FF66?style=flat-square)](#)
[![Agent Skill](https://img.shields.io/badge/agent-skill-FF4F00?style=flat-square)](#)
[![Target Runtimes](https://img.shields.io/badge/runtimes-Remotion%20%7C%20React%20%7C%20GSAP%20%7C%20HTML%2FCSS-0055FF?style=flat-square)](#)
[![License: MIT](https://img.shields.io/badge/license-MIT-white?style=flat-square)](LICENSE)

> **Build deterministic, studio-grade motion graphics in Remotion, React, and Web technologies without AI slop.**  
> Designed for AI coding assistants (Claude Code, Cursor, Windsurf, Antigravity) to enforce senior motion design standards, strict mathematical physics, and production-ready code generation.

---

## ⚡ Overview

Large language models routinely default to **"AI Slop"**: muddy purple-to-blue gradients, floating Gaussian blur blobs, unconstrained glassmorphism, generic copy ("Unlock Seamless Next-Gen AI"), and sluggish linear fades.

**`pro-motion-graphics`** is a battle-tested agent skill and architectural framework that eliminates AI slop. It equips autonomous agents and developers with:

- **Mathematical Motion Physics**: Exact spring curves (`stiffness`, `damping`, `mass`) and cubic-bezier timings replacing arbitrary easing.
- **Strict Anti-Slop Visual Rules**: Ban generic glows, forced concentric border-radius calculations (`R_inner = max(0, R_outer - Padding)`), and solid architectural surface layering.
- **4 Dedicated Category Playbooks**: Frame-by-frame pacing blueprints for Social Reels/Shorts, Brand Manifestos, SaaS Product Launches, and UI Micro-Demos.
- **Copy-Ready Remotion Patterns**: Zero-dependency modular primitives including camera zooms, counter math, clip-path reveals, and unified `BRAND_CONFIG` objects.

---

## 📐 The Anti-Slop Visual Craft Matrix

| Design Element | ❌ Banned AI Slop Default | ✅ Mandatory Studio Craft Standard |
| :--- | :--- | :--- |
| **Backgrounds** | Purple-to-cyan mesh gradients (`#8b5cf6` to `#3b82f6`), floating blurred orbs | Solid architectural surfaces in OKLCH/Hex with 1px structural grid lines or subtle SVG noise grain (`opacity: 0.03`) |
| **Depth & Lighting** | `backdrop-filter: blur(16px)`, heavy neon `box-shadow: 0 0 40px` | Crisp `1px solid` borders, layered surface lightness steps (+3% to 5%), or hard neo-brutalist offset shadows (`4px 4px 0px`) |
| **Corner Radii** | Uniform `border-radius: 16px` on nested containers | Concentric geometry: `R_inner = max(0, R_outer - Padding)` or sharp `0px-4px` technical corners |
| **Typography** | Default `Inter`, loose tracking, centered text blocks, orphaned words | High-contrast scale: Display at `-0.04em` tracking / `0.94` line-height paired with technical Mono metadata at `+0.08em` tracking |
| **Motion Physics** | `linear`, `ease-in-out`, or floaty 1.5s opacity fades | High-damping springs (`stiffness: 220, damping: 24`) or sharp exponential out (`cubic-bezier(0.16, 1, 0.3, 1)`) |
| **Copy & Accents** | Sparkle emojis ✨, "Unlock Seamless AI Workflow" | Custom 1.5px stroke SVG icons, concrete product metrics (`14.2ms latency`, `99.98% uptime`), tabular numbers |

---

## 🗂️ Repository Architecture

```text
pro-motion-graphics-skill/
├── SKILL.md                          # Primary agent skill definition, execution rules, and asset discovery
├── references/
│   ├── anti-slop-rules.md            # Visual tokens, curated palettes, typography scale & optical guidelines
│   ├── category-playbooks.md         # Frame-by-frame pacing blueprints for Reels, Promos, Launches & Demos
│   └── remotion-patterns.md          # Production Remotion/React code snippets, spring helpers & components
├── .gitignore                        # Git exclusion rules
├── LICENSE                           # MIT License
└── README.md                         # Documentation & integration guide
```

### Component Breakdown

1. **[`SKILL.md`](SKILL.md)**: Main entry point for AI agents. Enforces two-phase asset discovery, GPU-safe animation properties (`transform`, `opacity`, `stroke-dashoffset`), and self-audit checklists before code output.
2. **[`references/anti-slop-rules.md`](references/anti-slop-rules.md)**: Token tables, three curated color systems (Swiss Technical Dark, Editorial Warm Paper, High-Contrast Kinetic Mono), and architectural masking alternatives to opacity fades.
3. **[`references/category-playbooks.md`](references/category-playbooks.md)**: Storyboard blueprints with exact frame allocations, safe zones, and camera transitions across:
   - **Category A**: Social Reels, TikToks & Shorts (`9:16`, 60fps, 12s-30s)
   - **Category B**: Brand Promotion & Manifesto (`16:9` / `1:1`, 30fps, 20s-45s)
   - **Category C**: SaaS Product Launch Video (`16:9`, 60fps, 45s-90s)
   - **Category D**: UI Feature Micro-Demo (`1:1` / `4:5`, 60fps, 15s-30s)
4. **[`references/remotion-patterns.md`](references/remotion-patterns.md)**: Tested, copy-ready code blocks for Remotion projects, including `BRAND_CONFIG`, spring curves, kinetic word reveals, tabular counters, and custom cursors.

---

## 🎨 Curated Studio Color Systems

When no brand palette is provided, the skill automatically defaults to one of three deterministic studio systems:

### 1. Swiss Technical Dark (Linear / Vercel Vibe)
```typescript
const SwissTechnicalDark = {
  bgPrimary: '#090A0F',          // Carbon Ink
  bgElevated: '#12141C',         // Layer 1 Surface
  bgCard: '#1A1D28',             // Solid Elevated Card
  borderHairline: 'rgba(255, 255, 255, 0.10)',
  textPrimary: '#F4F5F8',        // Crisp Chalk
  textMuted: '#8A8F9E',          // Technical Slate
  accentPrimary: '#FF4F00',      // International Orange (or Acid Volt #E2FF32)
};
```

### 2. Editorial Warm Paper (Stripe Press / Anthropic Vibe)
```typescript
const EditorialWarmPaper = {
  bgPrimary: '#F6F4EE',          // Warm Alabaster Paper
  bgElevated: '#EDEAE0',         // Stone Card
  borderHairline: 'rgba(20, 20, 19, 0.12)',
  textPrimary: '#141413',        // Deep Charcoal Ink
  textMuted: '#66645E',          // Warm Graphite
  accentPrimary: '#D9381E',      // Vermilion Ink (or British Racing Green #1B4332)
};
```

### 3. High-Contrast Kinetic Mono (Nike / Apple Pro Vibe)
```typescript
const KineticMono = {
  bgPrimary: '#000000',          // True Black
  bgElevated: '#111111',         // Matte Graphite
  borderHairline: '#262626',     // Crisp Structural Line
  textPrimary: '#FFFFFF',        // Pure White
  textMuted: '#737373',          // Neutral Mid
  accentPrimary: '#0055FF',      // Cobalt Electric
};
```

---

## ⚙️ Motion Physics & Easing Presets

Never use `linear` or standard `ease-in-out` transitions. Use tuned physical springs or high-order beziers:

```typescript
// Remotion Spring Presets
export const SPRINGS = {
  SNAPPY_UI: { stiffness: 220, damping: 24, mass: 1 },       // Cards, toggles, badges
  HERO_REVEAL: { stiffness: 140, damping: 20, mass: 1.1 },   // Headlines, product frames
  WHIP_PAN: { stiffness: 300, damping: 30, mass: 0.8 },      // Rapid scene transitions
  SUBTLE_FLOAT: { stiffness: 40, damping: 12, mass: 2 },     // Ambient breathing motion
};

// CSS / GSAP Bezier Presets
export const BEZIERS = {
  EXPO_OUT: 'cubic-bezier(0.16, 1, 0.3, 1)',                // Crisp, decisive entrances
  QUART_IN_OUT: 'cubic-bezier(0.76, 0, 0.24, 1)',           // Camera zooms and match cuts
};
```

---

## 🚀 How to Use

### 1. In AI Coding Assistants (Antigravity, Cursor, Claude Code, Windsurf)

Clone or copy this skill into your project or agent configuration directory:

```bash
# Clone the repository
git clone https://github.com/saisandeep17/pro-motion-graphics-skill.git
```

- **For Google Antigravity / Agent Skills**: Place this folder in your `.gemini/antigravity/skills/` or `.agents/skills/` directory.
- **For Cursor / Windsurf / Claude Code**: Reference `SKILL.md` in your `.cursorrules`, `CLAUDE.md`, or system prompts:
  > *"When creating motion graphics, animations, or Remotion code, strictly adhere to the guidelines in `pro-motion-graphics-skill/SKILL.md`."*

### 2. Prompting the Skill

When requesting an animation, you can reference the categories directly:

```text
"Create a 15-second product launch reel (Category A) in Remotion for a developer CLI tool.
Use the Swiss Technical Dark palette with International Orange accent, and animate a terminal window
with tabular counter metrics showing '0.04ms build time'."
```

The agent will:
1. Verify brand assets or apply studio fallbacks (`BRAND_CONFIG`).
2. Follow the frame-accurate Category A storyboard.
3. Output deterministic, zero-slop Remotion / React code.

---

## 🛠️ Quick Remotion Setup

If you are rendering videos with [Remotion](https://www.remotion.dev/):

```bash
# Initialize a new Remotion project (if you don't have one)
npx create-video@latest my-motion-video

# Navigate to project
cd my-motion-video

# Start interactive preview player
npm start

# Render out MP4 video
npx remotion render src/index.ts MainComposition out/video.mp4
```

---

## ✅ Quality Gate & Audit Checklist

Before releasing or accepting any generated motion code, verify against these criteria:

- [ ] **No Generic Glows/Blurs**: Zero unconstrained Gaussian blur blobs floating behind elements.
- [ ] **Deterministic Math**: Every animation is tied to a frame counter (`useCurrentFrame()`) or explicit timeline progress (`0` to `1`).
- [ ] **Concentric Radii**: All nested containers satisfy $R_{inner} = \max(0, R_{outer} - Padding)$.
- [ ] **Tabular Numerics**: Any animated number counters use `font-variant-numeric: tabular-nums`.
- [ ] **Non-Repetitive Transitions**: Consecutive scenes vary spatial direction or scale rhythm (e.g., slide up $\rightarrow$ horizontal whip-cut).
- [ ] **Clean Asset Decoupling**: All logos, colors, and typography are parameterized at the top in a `BRAND_CONFIG` object.

---

## 📄 License

Distributed under the [MIT License](LICENSE). Free for personal and commercial use.
