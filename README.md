# 🎬 Pro Motion Graphics Skill (V2)

[![Version](https://img.shields.io/badge/version-2.0.0--production-00FF66?style=flat-square)](#)
[![Engines](https://img.shields.io/badge/engines-Remotion%20%7C%20GSAP%20%7C%20Canvas-0055FF?style=flat-square)](#)
[![Agent Skill](https://img.shields.io/badge/agent-skill-FF4F00?style=flat-square)](#)
[![Test Suite](https://img.shields.io/badge/tests-passing-brightgreen?style=flat-square)](#)
[![License: MIT](https://img.shields.io/badge/license-MIT-white?style=flat-square)](LICENSE)

> **Production-grade AI skill for programmatic video creation in Remotion, HTML/CSS/SVG + GSAP, and HTML5 Canvas without AI slop.**  
> Designed for AI coding agents (Claude Code, Cursor, Windsurf, Antigravity) and technical motion designers to enforce senior motion design standards, strict mathematical physics, multi-engine routing, and automated quality gates.

---

> [!NOTE]
> **What This Is:** A structured agent skill, design system, and code architecture that instructs AI coding assistants how to construct and render deterministic, studio-grade programmatic motion graphics.  
> **What This Is Not:** This is not a standalone GUI video editor or drag-and-drop desktop software.

---

## ⚡ Why Pro Motion Graphics V2?

Large language models routinely default to **"AI Slop"**: muddy Gaussian blur blobs, unconstrained glassmorphism, purple-to-cyan mesh gradients, generic copy (*"Unlock Seamless Next-Gen AI"*), and floaty linear opacity fades.

**Pro Motion Graphics V2** transforms this paradigm by treating motion design as an engineering discipline with:

- **Mathematical Motion Physics**: Explicit spring curves (`stiffness`, `damping`, `mass`) and cubic-beziers replacing arbitrary easing.
- **Multi-Engine Rendering**: Intelligent routing across **Remotion (React)**, **HTML/CSS/SVG + GSAP**, and **HTML5 Canvas**.
- **10-Stage Video Production Pipeline**: End-to-end workflow from creative brief to frame-audited video deliverables.
- **Automated Validation Scripts**: Built-in CLI tools (`validate-project`, `check-assets`, `inspect-output`) to verify code integrity and media outputs.
- **6 Category Blueprints**: Storyboard pacing for Social Reels, Brand Promos, SaaS Launches, UI Demos, Kinetic Typography, and Technical Explainers.

---

## 📐 The Anti-Slop Visual Craft Matrix

| Visual Dimension | ❌ Banned AI Slop Default | ✅ Mandatory Studio Craft Standard |
| :--- | :--- | :--- |
| **Backgrounds** | Purple/cyan mesh gradients (`#8b5cf6` to `#3b82f6`), blurred floating orbs | Solid architectural surfaces in OKLCH/Hex with 1px structural grid lines or subtle SVG noise grain |
| **Depth & Surface** | `backdrop-filter: blur(16px)`, heavy neon `box-shadow: 0 0 40px` | Crisp `1px solid` borders, layered surface lightness steps (+3% to 5%), or hard 2px/4px offset shadows |
| **Corner Geometry** | Uniform `border-radius: 16px` on nested cards and inner elements | Concentric radii: $R_{inner} = \max(0, R_{outer} - Padding)$ or sharp $0\text{px}-4\text{px}$ technical corners |
| **Typography Scale** | Default `Inter`, loose tracking, centered text blocks, orphaned single words | High-contrast scale: Display at `-0.04em` tracking / `0.94` line-height paired with technical Mono metadata at `+0.08em` tracking |
| **Motion Physics** | `linear`, `ease-in-out`, or sluggish 1.5s opacity fades | High-damping springs (`stiffness: 220, damping: 24`) or sharp exponential out (`cubic-bezier(0.16, 1, 0.3, 1)`) |
| **Copy & Accents** | Sparkle emojis ✨, "Unlock Seamless AI Workflow" | Custom 1.5px stroke SVG icons, concrete product metrics (`14.2ms latency`, `99.98% uptime`), tabular numbers |

---

## 🚀 Supported Rendering Engines

| Engine | Best For | Architecture | Starter Template |
| :--- | :--- | :--- | :--- |
| **Engine A: Remotion** | SaaS launches, complex UI mockups, modular multi-scene videos, frame-accurate CLI renders | React 18/19, TypeScript, Remotion CLI, deterministic frame hooks | [`templates/remotion-starter/`](templates/remotion-starter/) |
| **Engine B: HTML/CSS + GSAP** | Kinetic typography, editorial manifestos, SVG logo stroke draws, lightweight browser playback | DOM, SVG, GSAP Timelines, deterministic `seekFrame()` | [`templates/gsap-starter/`](templates/gsap-starter/) |
| **Engine C: HTML5 Canvas** | Procedural graphics, particle networks, mathematical simulations, generative visual effects | Immediate-mode Canvas 2D, deterministic `renderFrame()` loop | [`templates/canvas-starter/`](templates/canvas-starter/) |

*See [`references/engine-selection.md`](references/engine-selection.md) for full decision logic.*

---

## 🎬 Supported Video Categories

1. **Category A: Social Reels, TikToks & Shorts** (`9:16`, 60fps, 12s–30s): Pattern-interrupt Frame-0 hook, vertical safe zones, kinetic text locks.
2. **Category B: Brand Promotion & Manifesto** (`16:9` / `1:1`, 30fps, 20s–45s): Swiss editorial typography, architectural grid awakening, vector logo lockups.
3. **Category C: SaaS & Product Launch Video** (`16:9`, 60fps, 45s–90s): Reconstructed 2.5D vector UI, smooth cursor choreography, macro zoom-to-detail, Bento grids.
4. **Category D: Feature Highlight / UI Micro-Demo** (`1:1` / `4:5`, 60fps, 10s–25s): Single component isolation, 3-step state progression (`Input` $\to$ `Execute` $\to$ `Success`).
5. **Category E: Cinematic Kinetic Typography** (`16:9` / `9:16`, 24/30fps, 15s–45s): Staggered word-by-word baseline reveals, variable weight shifts, rhythmic cuts.
6. **Category F: Explainer & Educational Videos** (`16:9`, 30/60fps, 45s–120s): 6-stage pedagogical structure, DAG node-graph flows, animated architectural layers.

*See [`references/category-playbooks.md`](references/category-playbooks.md) and [`references/explainer-playbook.md`](references/explainer-playbook.md).*

---

## 🗂️ Repository Structure

```text
pro-motion-graphics-skill/
├── SKILL.md                          # Primary agent skill instructions & 10-stage pipeline
├── README.md                         # Comprehensive documentation
├── CHANGELOG.md                      # V2 upgrade history & release notes
├── LICENSE                           # MIT License
│
├── references/                       # Technical design & implementation guides
│   ├── anti-slop-rules.md            # Visual craft standards & curated studio palettes
│   ├── category-playbooks.md         # Storyboard blueprints for Categories A through E
│   ├── remotion-patterns.md          # Remotion code patterns (Hooks-compliant)
│   ├── engine-selection.md           # Multi-engine decision rubric & technical tradeoffs
│   ├── gsap-patterns.md              # GSAP timeline sequencing & SVG morphing
│   ├── typography-guide.md           # Font pairing, optical leading & tabular numerics
│   ├── audio-design.md               # Sound design, Foley taxonomy & voiceover ducking
│   ├── video-quality-checklist.md    # Pre-flight visual quality assurance matrix
│   └── explainer-playbook.md         # Category F pedagogical narrative blueprints
│
├── templates/                        # Working, testable project starters
│   ├── remotion-starter/             # Production Remotion 4.x project
│   ├── gsap-starter/                 # Standalone Vite + GSAP project
│   └── canvas-starter/               # Procedural HTML5 Canvas project
│
├── scripts/                          # Automated CLI validation utilities
│   ├── validate-project[.js]         # Verifies project structure, dependencies & imports
│   ├── check-assets[.js]             # Verifies asset existence & media formats
│   ├── inspect-output[.js]           # Inspects rendered video container & stream metadata
│   └── lib/utils.js                  # Shared CLI logger and file utilities
│
├── examples/                         # Reference implementations
│   ├── remotion-brand-reveal/        # Category B Remotion manifesto composition
│   └── gsap-kinetic-typography/      # Category E Standalone GSAP typography demo
│
└── tests/
    └── scripts.test.js               # Integration test suite for validation utilities
```

---

## 🛠️ Automated Validation Utilities

V2 ships with automated validation scripts in `scripts/`:

### 1. Validate Project Structure & Imports
```bash
# Verify project dependencies, file layout, and broken relative imports
node scripts/validate-project.js templates/remotion-starter
# Or use the wrapper directly:
./scripts/validate-project templates/remotion-starter
```

### 2. Check Asset References
```bash
# Verify all referenced logos, images, and audio files exist and are non-empty
node scripts/check-assets.js templates/remotion-starter
```

### 3. Inspect Rendered Video Output
```bash
# Inspect container headers, file size, resolution, framerate, and audio tracks
node scripts/inspect-output.js out/video.mp4 --width 1920 --height 1080 --fps 60
```

---

## 💻 Installation & Usage

### 1. Integrating with AI Coding Agents

#### **For Google Antigravity / Claude Agent Skills**
Clone or copy this repository into your skills directory:
```bash
git clone https://github.com/saisandeep17/pro-motion-graphics-skill.git
```
Place in your agent's skill search root (e.g., `.gemini/antigravity/skills/pro-motion-graphics-skill` or `.agents/skills/`).

#### **For Cursor, Windsurf, or Claude Code**
Reference `SKILL.md` in your project instructions (`.cursorrules`, `CLAUDE.md`, or system prompt):
> *"When creating motion graphics, animations, or programmatic video compositions, strictly adhere to the guidelines and templates in `pro-motion-graphics-skill/SKILL.md`."*

### 2. Example User Prompts

```text
"Create a 15-second product launch video (Category A) in Remotion for a developer CLI tool.
Use the Swiss Technical Dark palette with International Orange accents. Include a reconstructed
terminal window, live tabular counters showing '0.04ms build time', and rhythmic camera push-ins."
```

```text
"Build a 20-second kinetic typography manifesto (Category E) using HTML/CSS/GSAP.
Apply the High-Contrast Kinetic Mono palette, overflow baseline rise masks for text lines,
and architectural hairline grid lines."
```

---

## 🧪 Testing the Repository

Run the automated test suite to verify all validation utilities against valid and invalid project configurations:

```bash
node tests/scripts.test.js
```

---

## 📦 Requirements & Dependencies

- **Node.js**: v18.0.0 or higher (v20+ recommended).
- **npm** or **pnpm** / **yarn**.
- **Optional**: [FFmpeg / FFprobe](https://ffmpeg.org/) (recommended for deep stream inspection of rendered video containers).

---

## 📄 License

Distributed under the [MIT License](LICENSE). Free for personal, commercial, and enterprise production use.
