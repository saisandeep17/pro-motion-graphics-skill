# Remotion Starter Template (Pro Motion Graphics V2)

Production-ready, deterministic Remotion template featuring the Anti-Slop motion architecture.

## Quick Start

```bash
# Install dependencies
npm install

# Start local interactive preview player
npm start

# Render production MP4 (H.264, CRF 18)
npm run render

# Render preview still frame
npm run still
```

## Structure

- `src/config.ts`: Central brand configuration (colors, fonts, geometry, assets).
- `src/motion.ts`: Deterministic spring curves and physics helpers (Rules of Hooks compliant).
- `src/components/`: Reusable architectural components (Grid, KineticHeadline, TabularCounter, Card, Cursor).
- `src/compositions/`: Scene sequences and main video timeline.
- `public/`: Brand assets (logos, images, fonts).

