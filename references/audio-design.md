# Audio & Sound Design Guide for Programmatic Motion Graphics

High-quality motion graphics are 50% visual and 50% auditory. A crisp physical animation feels weightless without synchronized Foley, impact transients, and balanced background atmosphere.

---

## 1. Sound Layering Architecture

Every professional motion piece features four distinct audio layers:

```text
Layer 4: Voiceover (VO)        ────── [Highest Priority / Master Volume]
Layer 3: UI Micro-Clicks & SFX ────── [High Frequency Transients: 2-8 kHz]
Layer 2: Impact & Transition Wipes ── [Low-End Punch: 80-250 Hz]
Layer 1: Background Music (BGM) ───── [Base Atmosphere / Ducked during VO]
```

---

## 2. Sound Effect (SFX) Taxonomy & Cues

Match each visual motion to its acoustic physical equivalent:

| Visual Action | Recommended SFX Sound | Acoustic Profile | Timing Offset |
| :--- | :--- | :--- | :--- |
| **Scene Whip Cut / Pan** | Fast Air Whoosh / Swoosh | Short rise & cut (150ms–250ms) | Trigger 2 frames *before* the visual midpoint |
| **Hero Headline Slam** | Heavy Low-End Thud / Sub Boom | Clean 60–90Hz sub-bass transient, no mud | Trigger on exact frame of visual contact |
| **Button Click / Toggle** | Tactile Mechanical Click | Sharp transient (20ms–40ms, Cherry MX or Leica shutter vibe) | Trigger on the `scale(0.96)` compression frame |
| **Tabular Counter Run** | Digital Data Tick / Relay Click | Rapid fluttering ticks (50ms intervals) | Play during counter interpolation |
| **Success / Metric Lock** | Crisp Chime / Harmonic Ping | High bell or muted synth chime | Trigger on counter arrival frame |

---

## 3. Dynamic Audio Ducking Formula

When a voiceover or key dialogue track is active, background music must be ducked (attenuated) smoothly so spoken words remain intelligible:

$$\text{volume}(t) = \begin{cases} 
V_{normal} & \text{when no VO} \\
V_{normal} \times 0.20 & \text{when VO is active (-14dB attenuation)}
\end{cases}$$

### Remotion Implementation Pattern

```tsx
import { Audio, interpolate, useCurrentFrame, staticFile } from 'remotion';

export const SoundDesignMixer: React.FC<{
  voStartFrame: number;
  voEndFrame: number;
}> = ({ voStartFrame, voEndFrame }) => {
  const frame = useCurrentFrame();

  // Duck music down 10 frames before speech, restore 12 frames after
  const musicVolume = interpolate(
    frame,
    [voStartFrame - 10, voStartFrame, voEndFrame, voEndFrame + 12],
    [0.7, 0.15, 0.15, 0.7],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <>
      {/* Background Track with Dynamic Ducking */}
      <Audio src={staticFile('audio/background-track.mp3')} volume={musicVolume} />

      {/* Voiceover Track */}
      <Audio
        src={staticFile('audio/voiceover.mp3')}
        startFrom={0}
        volume={1.0}
      />
    </>
  );
};
```

---

## 4. Volume Fades & Smooth Transitions

Never abruptly cut audio at scene boundaries. Always apply an exponential or cosine fade:

- **Intro Fade-In**: 15–30 frames (0.25s–0.5s) from `0.0` to target volume.
- **Outro Fade-Out**: 30–60 frames (0.5s–1.0s) down to `0.0` as the final logo resolves.

```tsx
export function getFadeOutVolume(frame: number, endFrame: number, fadeFrames = 45): number {
  return interpolate(frame, [endFrame - fadeFrames, endFrame], [1.0, 0.0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
}
```

---

## 5. Licensing & Copyright Compliance

1. **Royalty-Free & Commercial Use Only**:
   - Never incorporate commercial copyrighted songs (Spotify, pop tracks) into client or SaaS videos without explicit synchronization licensing.
   - Use authorized royalty-free repositories: Free Music Archive (CC0 / CC-BY), Pixabay Audio, Epidemic Sound, Artlist, or generated acoustic beds.
2. **Attribution Tracking**:
   - If using Creative Commons (CC-BY) assets, list the artist, track title, and license URL in the project handoff `README.md`.

