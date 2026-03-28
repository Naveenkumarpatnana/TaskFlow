'use client';

import React from 'react';
import { StyledButton, ButtonSpinner } from './styled';
import { useThemeStore } from '@/stores/themeStore';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  children,
  disabled,
  ...props
}) => {
  const { isDarkMode } = useThemeStore();

  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      $isDark={isDarkMode}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <ButtonSpinner />}
      {children}
    </StyledButton>
  );
};

export default Button;
