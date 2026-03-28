import styled, { css } from 'styled-components';

interface StyledButtonProps {
  $variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  $size?: 'sm' | 'md' | 'lg';
  $fullWidth?: boolean;
  $isDark?: boolean;
}

const variants = {
  primary: css`
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    color: #ffffff;
    border: none;
    &:hover:not(:disabled) {
      background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
      transform: translateY(-1px);
      box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
    }
  `,
  secondary: css<{ $isDark?: boolean }>`
    background: ${({ $isDark }) => ($isDark ? '#374151' : '#f3f4f6')};
    color: ${({ $isDark }) => ($isDark ? '#e5e7eb' : '#374151')};
    border: 1px solid ${({ $isDark }) => ($isDark ? '#4b5563' : '#d1d5db')};
    &:hover:not(:disabled) {
      background: ${({ $isDark }) => ($isDark ? '#4b5563' : '#e5e7eb')};
    }
  `,
  danger: css`
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
    color: #ffffff;
    border: none;
    &:hover:not(:disabled) {
      background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
      transform: translateY(-1px);
      box-shadow: 0 4px 15px rgba(239, 68, 68, 0.4);
    }
  `,
  ghost: css<{ $isDark?: boolean }>`
    background: transparent;
    color: ${({ $isDark }) => ($isDark ? '#d1d5db' : '#6b7280')};
    border: none;
    &:hover:not(:disabled) {
      background: ${({ $isDark }) => ($isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)')};
    }
  `,
};

const sizes = {
  sm: css`
    padding: 6px 14px;
    font-size: 0.813rem;
  `,
  md: css`
    padding: 10px 20px;
    font-size: 0.875rem;
  `,
  lg: css`
    padding: 14px 28px;
    font-size: 1rem;
  `,
};

export const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  letter-spacing: 0.01em;
  white-space: nowrap;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};

  ${({ $size = 'md' }) => sizes[$size]}
  ${({ $variant = 'primary' }) => variants[$variant]}

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

export const ButtonSpinner = styled.span`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;
