# Typography & Spatial Scale Guide for Motion Graphics

In high-end motion design, typography is not passive text—it is architectural form. This guide defines exact mathematical rules for type scaling, tracking, optical leading, and animation choreography.

---

## 1. The High-Contrast Type Pairing Matrix

Always pair an authoritative display typeface with a precision technical monospace font. Never use default body fonts for both headline and metadata.

| Role | Preferred Typefaces | Fallback Stack | CSS Rules |
| :--- | :--- | :--- | :--- |
| **Hero Display Headline** | Inter Display, SF Pro Display, Neue Haas Grotesk, PP Neue Montreal | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif` | `font-weight: 750-850`, `letter-spacing: -0.04em`, `line-height: 0.92-0.96`, `text-wrap: balance` |
| **Technical Eyebrow / Label** | JetBrains Mono, Geist Mono, SF Mono, Berkeley Mono | `ui-monospace, "SF Mono", Menlo, Monaco, Consolas, monospace` | `font-weight: 500-600`, `letter-spacing: +0.08em`, `text-transform: uppercase`, `font-variant-numeric: tabular-nums` |
| **Editorial Serif (Category B)** | Fraunces, Playfair Display, Instrument Serif | `"Times New Roman", Times, serif` | `font-style: italic`, `font-weight: 400`, `letter-spacing: -0.02em`, `line-height: 1.0` |
| **Metric / Number Display** | Roobert, Monument Extended, Geist Mono | `monospace` | `font-variant-numeric: tabular-nums slashed-zero`, `letter-spacing: -0.03em` |

---

## 2. Spatial Scale by Canvas Resolution

Typography must scale with viewport resolution to maintain optical weight across different formats:

### A. Landscape 1080p Canvas (`1920x1080`)
- **Display Giant (1-3 words)**: `96px - 128px`
- **Main Headline**: `64px - 84px`
- **Sub-headline / Section Title**: `28px - 36px`
- **Body Copy**: `18px - 22px` (`line-height: 1.45`)
- **Monospace Metadata / Eyebrow**: `13px - 16px`

### B. Vertical Social Canvas (`1080x1920`, `9:16`)
- **Display Hook (Top Third)**: `72px - 96px`
- **Sub-headline / Stat Title**: `36px - 48px`
- **Monospace Tag / Badge**: `14px - 18px`

---

## 3. Optical Rules & Slop Elimination

1. **Negative Tracking on Heavy Display Type**:
   As font size increases above `48px`, default tracking appears loose and amateur. Apply negative tracking:
   ```css
   /* Correct Display Headline */
   font-size: 72px;
   font-weight: 800;
   letter-spacing: -0.04em;
   line-height: 0.94;
   ```
2. **Positive Tracking on Monospace Metadata**:
   Small uppercase labels (`12px - 16px`) require breathing room:
   ```css
   /* Correct Monospace Label */
   font-family: 'JetBrains Mono', monospace;
   font-size: 14px;
   text-transform: uppercase;
   letter-spacing: 0.08em;
   ```
3. **Mandatory `tabular-nums` for Live Counters**:
   When numbers animate (e.g. counting from 0 to 1,000), proportional digits cause horizontal jumping. Always declare:
   ```css
   font-variant-numeric: tabular-nums;
   ```
4. **No Orphan Words (`text-wrap: balance`)**:
   Never let a single word drop to the next line alone:
   ```css
   text-wrap: balance;
   max-width: 24ch; /* Restrict line length */
   ```

---

## 4. Kinetic Typography Choreography

When animating text, never fade the whole block up with `opacity: 0 -> 1`. Use staggered baseline masks:

```tsx
// Stagger line reveal calculation
const STAGGER_FRAMES = 4; // 66ms at 60fps
lines.map((line, index) => {
  const lineStartFrame = startFrame + index * STAGGER_FRAMES;
  const progress = spring({
    frame: frame - lineStartFrame,
    fps,
    config: { stiffness: 180, damping: 22, mass: 1 },
  });
  const translateY = (1 - progress) * 110;

  return (
    <div key={index} style={{ overflow: 'hidden', paddingBottom: '0.06em' }}>
      <div style={{ transform: `translate3d(0, ${translateY}%, 0)` }}>
        {line}
      </div>
    </div>
  );
});
```

