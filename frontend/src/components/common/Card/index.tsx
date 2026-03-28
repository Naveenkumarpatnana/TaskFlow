'use client';

import React from 'react';
import { StyledCard } from './styled';
import { useThemeStore } from '@/stores/themeStore';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ children, className, onClick }) => {
  const { isDarkMode } = useThemeStore();

  return (
    <StyledCard $isDark={isDarkMode} className={className} onClick={onClick}>
      {children}
    </StyledCard>
  );
};

export default Card;
