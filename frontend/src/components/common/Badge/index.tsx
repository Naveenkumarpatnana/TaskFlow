'use client';

import React from 'react';
import { StyledBadge } from './styled';

interface BadgeProps {
  children: React.ReactNode;
  color?: string;
  bgColor?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, color, bgColor }) => {
  return (
    <StyledBadge $color={color} $bgColor={bgColor}>
      {children}
    </StyledBadge>
  );
};

export default Badge;
