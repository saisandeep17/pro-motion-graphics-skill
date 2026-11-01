import React from 'react';
import { BRAND_CONFIG } from '../config';

export const Card: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, style }) => {
  const { outerRadius, cardPadding, innerRadius } = BRAND_CONFIG.geometry;

  return (
    <div
      style={{
        backgroundColor: BRAND_CONFIG.colors.bgSurface,
        border: `1px solid ${BRAND_CONFIG.colors.borderHairline}`,
        borderRadius: `${outerRadius}px`,
        padding: `${cardPadding}px`,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        ...style,
      }}
    >
      <div
        style={{
          borderRadius: `${innerRadius}px`,
          backgroundColor: BRAND_CONFIG.colors.bgElevated,
          padding: '16px 20px',
        }}
      >
        {children}
      </div>
    </div>
  );
};
