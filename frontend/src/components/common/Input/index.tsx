'use client';

import React from 'react';
import { InputWrapper, InputLabel, StyledInput, StyledTextarea, ErrorText } from './styled';
import { useThemeStore } from '@/stores/themeStore';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  multiline?: boolean;
  rows?: number;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  multiline = false,
  rows = 3,
  ...props
}) => {
  const { isDarkMode } = useThemeStore();

  return (
    <InputWrapper $isDark={isDarkMode}>
      {label && <InputLabel $isDark={isDarkMode}>{label}</InputLabel>}
      {multiline ? (
        <StyledTextarea
          $isDark={isDarkMode}
          $hasError={!!error}
          rows={rows}
          {...(props as any)}
        />
      ) : (
        <StyledInput
          $isDark={isDarkMode}
          $hasError={!!error}
          {...props}
        />
      )}
      {error && <ErrorText>{error}</ErrorText>}
    </InputWrapper>
  );
};

export default Input;
