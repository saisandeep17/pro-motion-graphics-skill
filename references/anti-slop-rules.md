# Anti-Slop Motion & Visual Rules

"AI slop" happens when an LLM falls back on statistical averages: purple-to-cyan gradients, floating Gaussian blur blobs, glassmorphic cards with 16px border radius everywhere, Inter at default tracking, and slow linear fades. Use these exact numerical rules to replace generic defaults with studio-grade design.

## 1. Visual Slop vs. Studio Craft Matrix

| Element | Banned AI Slop Default | Mandatory Studio Replacement |
| :--- | :--- | :--- |
| **Backgrounds** | Purple/blue radial gradients (`#8b5cf6` to `#3b82f6`), floating blurred orbs | Solid architectural surfaces in OKLCH/Hex with 1px structural grid lines or subtle SVG noise grain (`opacity: 0.03`) |
| **Depth & Lighting** | `backdrop-filter: blur(16px)`, heavy neon `box-shadow: 0 0 40px` | Crisp `1px solid` borders, layered surface lightness steps (+4%), or hard neo-brutalist offset shadows (`4px 4px 0px`) |
| **Corners** | Uniform `border-radius: 16px` on both outer and inner elements | Concentric math: `R_inner = max(0, R_outer - Padding)` or sharp `0px-4px` technical corners |
| **Typography** | Centered `Inter` everywhere, `line-height: 1.5` on headings, orphaned last words | High-contrast scale: Display at `-0.04em` tracking / `0.95` line-height + Mono metadata at `+0.08em` tracking |
| **Motion Easing** | `linear`, `ease-in-out`, or sluggish 1.5s opacity fades | High-damping springs (`stiffness: 200, damping: 24`) or sharp exponential out (`cubic-bezier(0.16, 1, 0.3, 1)`) |
| **Copy & Icons** | Emoji icons, "Unlock Seamless AI Power" | Custom 1.5px stroke SVG icons, concrete metrics (`14.2ms latency`, `99.98% uptime`), tabular numbers |

## 2. Curated Studio Color Systems

When the user does not provide a brand palette, select **one** of these three deterministic palettes. Never mix them.

### System 1: Swiss Technical Dark (Linear / Vercel / Teenage Engineering Vibe)
- `bgPrimary`: `#090A0F` (Carbon Ink)
- `bgElevated`: `#12141C` (Surface Step 1)
- `bgGlassReplacement`: `#1A1D28` (Solid Elevated Card)
- `borderHairline`: `rgba(255, 255, 255, 0.10)`
- `textPrimary`: `#F4F5F8` (Crisp Chalk)
- `textMuted`: `#8A8F9E` (Technical Slate)
- `accentPrimary`: `#FF4F00` (International Orange) or `#E2FF32` (Acid Volt) - *Pick ONE*

### System 2: Editorial Warm Paper (Stripe Press / Anthropic / Monograph Vibe)
- `bgPrimary`: `#F6F4EE` (Warm Alabaster Paper)
- `bgElevated`: `#EDEAE0` (Stone Card)
- `borderHairline`: `rgba(20, 20, 19, 0.12)`
- `textPrimary`: `#141413` (Deep Charcoal Ink)
- `textMuted`: `#66645E` (Warm Graphite)
- `accentPrimary`: `#D9381E` (Vermilion Ink) or `#1B4332` (British Racing Green)

### System 3: High-Contrast Kinetic Mono (Nike / Apple Pro Vibe)
- `bgPrimary`: `#000000` (True Black)
- `bgElevated`: `#111111` (Matte Graphite)
- `borderHairline`: `#262626` (Crisp Structural Line)
- `textPrimary`: `#FFFFFF` (Pure White)
- `textMuted`: `#737373` (Neutral Mid)
- `accentPrimary`: `#0055FF` (Cobalt Electric)

## 3. Typography Scale & Optical Rules

Apply these exact CSS properties to all motion text layers:

- **Hero Display Headline**:
  - Size: `clamp(3.5rem, 6vw, 6.5rem)` (or `72px - 110px` on 1080p canvas)
  - Weight: `700` to `800`
  - Tracking: `letter-spacing: -0.04em`
  - Leading: `line-height: 0.94`
  - Wrapping: `text-wrap: balance`
- **Section / Card Title**:
  - Size: `32px - 44px` on 1080p canvas
  - Weight: `600`
  - Tracking: `letter-spacing: -0.025em`
  - Leading: `line-height: 1.1`
- **Technical Eyebrow / Metadata Label**:
  - Font: Monospace (`JetBrains Mono`, `Geist Mono`, `SF Mono`, or `monospace`)
  - Size: `14px - 18px`
  - Transform: `text-transform: uppercase`
  - Tracking: `letter-spacing: 0.08em`
  - Numbers: `font-variant-numeric: tabular-nums` (Mandatory for animated counters so digits never jitter horizontally)

## 4. Masking & Reveal Mechanics (Replacing Opacity Fades)

Instead of fading elements in with `opacity: 0 -> 1`, use architectural reveals:

1. **Clip-Path Wipe**: Animate `clipPath: inset(0 100% 0 0)` to `inset(0 0% 0 0)` using `EXPO_OUT` easing to reveal cards or badges like a physical shutter.
2. **Overflow Baseline Rise**: Wrap each text line in an `overflow: hidden` container with `padding-bottom: 0.1em`. Animate the inner text from `translateY(110%)` to `translateY(0%)` with a `4-frame` stagger per word or line.
3. **SVG Stroke Draw**: For icons, connectors, and borders, set `strokeDasharray={pathLength}` and animate `strokeDashoffset` from `pathLength` to `0`.
4. **Focus Dimming (Zero-Blur Isolation)**: When highlighting a foreground modal or metric card, dim the background layer using a solid dark overlay (`rgba(9, 10, 15, 0.72)`) and scale the background to `0.97` instead of applying an expensive, muddy Gaussian blur.
