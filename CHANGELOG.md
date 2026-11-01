# Changelog

All notable changes to the `pro-motion-graphics-skill` repository are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.0.0] - 2026-11-01

### Major Architecture Upgrade: V1 to V2

Pro Motion Graphics V2 transforms the repository from a collection of design guidelines into a production-oriented, testable AI video creation workflow supporting multi-engine rendering, automated quality gates, and modular starter templates.

### Fixed & Resolved Technical Issues
- **React Rules of Hooks Violation**: Fixed an issue in `references/remotion-patterns.md` where `useStaggerSpring()` was called inside array `.map()` iterations. Replaced with pure mathematical helper `getStaggerSpringProgress()`.
- **Missing Code Modules**: Resolved broken imports (`./config` and `./motion`) by implementing complete, production-grade `config.ts` and `motion.ts` modules across templates and examples.
- **Configurable Storyboard Durations**: Replaced static, hardcoded frame ranges in `references/category-playbooks.md` with dynamic frame calculation formulas ($\text{frame} = \text{round}(t \times fps)$) supporting 24fps, 30fps, and 60fps compositions with non-overlapping scene boundaries.
- **Asset Integrity & Validation**: Added strict asset existence verification, non-empty file checks, and supported media format rules. Preserves real user logos and authentic UI screenshots without fabricating placeholder UI.
- **Rendering Verification**: Created an automated post-render inspection workflow that verifies output existence, container signatures, file size, stream metadata (resolution, framerate, duration), and audio streams.

### Added
- **Multi-Engine Video Architecture**:
  - **Engine A (Remotion)**: React-based video composition for UI mockups, launch videos, and data-driven reels.
  - **Engine B (HTML/CSS/SVG + GSAP)**: Lightweight browser-based animation for kinetic typography and SVG logo reveals.
  - **Engine C (HTML5 Canvas)**: Immediate-mode 2D procedural graphics and particle networks.
  - Added `references/engine-selection.md` with selection criteria, advantages, and limitations.
- **New Reference Guides**:
  - `references/engine-selection.md`: Engine selection rubric and decision tree.
  - `references/gsap-patterns.md`: Frame-deterministic GSAP timeline control and Swiss grid animations.
  - `references/typography-guide.md`: Comprehensive optical type scale, tracking rules, and tabular numeral guidelines.
  - `references/audio-design.md`: Sound layering, acoustic Foley cues, dynamic voiceover ducking, and licensing compliance.
  - `references/video-quality-checklist.md`: Visual quality assurance inspection gates and safe zone parameters.
  - `references/explainer-playbook.md`: Category F pedagogical narrative blueprints and animated diagram patterns.
- **New Video Categories**:
  - **Category E**: Cinematic Kinetic Typography ($16:9$ / $9:16$, 24/30fps).
  - **Category F**: Explainer & Educational Videos ($16:9$, 30/60fps).
- **Production Starter Templates**:
  - `templates/remotion-starter/`: Complete Remotion 4.x project with config, motion physics, and reusable UI components.
  - `templates/gsap-starter/`: Standalone Vite + GSAP project with deterministic `window.seekFrame()` interface.
  - `templates/canvas-starter/`: Procedural HTML5 Canvas project with deterministic `window.renderFrame()` interface.
- **Automated Validation Scripts**:
  - `scripts/validate-project.js`: Validates project structure, dependencies, broken relative imports, and slop anti-patterns.
  - `scripts/check-assets.js`: Verifies asset existence, extensions, and non-empty status.
  - `scripts/inspect-output.js`: Verifies rendered video file container headers, size, resolution, framerate, and audio tracks via FFprobe.
  - Executable shell wrappers (`scripts/validate-project`, `scripts/check-assets`, `scripts/inspect-output`) and Windows `.cmd` helpers.
- **Concrete Examples**:
  - `examples/remotion-brand-reveal/`: Fully functional Remotion manifesto composition.
  - `examples/gsap-kinetic-typography/`: Standalone HTML/CSS/GSAP kinetic typography piece.
- **Automated Test Suite**:
  - `tests/scripts.test.js`: Comprehensive integration tests verifying validation scripts on valid and broken project structures.

### Changed
- **`SKILL.md`**: Completely rewritten to introduce the 10-Stage Video Production Pipeline, multi-engine routing, model execution rules for Sonnet and Haiku, and mandatory quality gates.
- **`README.md`**: Upgraded with full V2 architecture documentation, multi-engine comparisons, directory tree, usage instructions, and validation commands.

---

## [1.0.0] - 2026-11-01
- Initial release of Pro Motion Graphics skill with Anti-Slop visual philosophy, Swiss color systems, and Remotion patterns.

