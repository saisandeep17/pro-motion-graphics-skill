import React from 'react';
import { AbsoluteFill, Sequence, useVideoConfig } from 'remotion';
import { BRAND_CONFIG, calculateTotalFrames } from '../config';
import { ArchitecturalGrid } from '../components/ArchitecturalGrid';
import { KineticHeadline } from '../components/KineticHeadline';
import { TabularCounter } from '../components/TabularCounter';
import { Card } from '../components/Card';

export const MainComposition: React.FC = () => {
  const { fps } = useVideoConfig();

  // Scene durations in seconds calculated to exact frames
  const scene1Duration = calculateTotalFrames(5, fps); // 0-5s
  const scene2Duration = calculateTotalFrames(6, fps); // 5-11s
  const scene3Duration = calculateTotalFrames(4, fps); // 11-15s

  return (
    <AbsoluteFill style={{ backgroundColor: BRAND_CONFIG.colors.bgPrimary, overflow: 'hidden' }}>
      {/* Persistent Architectural Grid Backdrop */}
      <ArchitecturalGrid columns={8} rows={5} />

      {/* Scene 1: Kinetic Headline Reveal (0s - 5s) */}
      <Sequence from={0} durationInFrames={scene1Duration}>
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingLeft: '140px',
          }}
        >
          <div
            style={{
              fontFamily: BRAND_CONFIG.fonts.mono,
              fontSize: '14px',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: BRAND_CONFIG.colors.accent,
              marginBottom: '16px',
            }}
          >
            01 // ARCHITECTURAL REVEAL
          </div>
          <KineticHeadline
            lines={['STUDIO-GRADE', 'MOTION GRAPHICS', 'ZERO AI SLOP.']}
            fontSize={84}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 2: Concentric UI Card & Tabular Counter (5s - 11s) */}
      <Sequence from={scene1Duration} durationInFrames={scene2Duration}>
        <AbsoluteFill
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Card style={{ width: '640px' }}>
            <div
              style={{
                fontFamily: BRAND_CONFIG.fonts.mono,
                fontSize: '13px',
                color: BRAND_CONFIG.colors.textMuted,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginBottom: '8px',
              }}
            >
              System Performance
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <TabularCounter from={0} to={99.98} startFrame={0} durationFrames={50} decimals={2} suffix="%" />
            </div>
            <div
              style={{
                marginTop: '12px',
                fontFamily: BRAND_CONFIG.fonts.display,
                fontSize: '16px',
                color: BRAND_CONFIG.colors.textMuted,
              }}
            >
              Deterministic frame-accurate rendering engine
            </div>
          </Card>
        </AbsoluteFill>
      </Sequence>

      {/* Scene 3: Brand Resolution & Call to Action (11s - 15s) */}
      <Sequence from={scene1Duration + scene2Duration} durationInFrames={scene3Duration}>
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px',
          }}
        >
          <div
            style={{
              fontFamily: BRAND_CONFIG.fonts.display,
              fontSize: '64px',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              color: BRAND_CONFIG.colors.textPrimary,
            }}
          >
            PRO MOTION GRAPHICS V2
          </div>
          <div
            style={{
              fontFamily: BRAND_CONFIG.fonts.mono,
              fontSize: '16px',
              letterSpacing: '0.04em',
              padding: '10px 24px',
              backgroundColor: BRAND_CONFIG.colors.accent,
              color: '#FFFFFF',
              borderRadius: '6px',
              fontWeight: 600,
            }}
          >
            GET STARTED ➔
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};

