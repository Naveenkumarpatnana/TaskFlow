import styled from 'styled-components';

interface StyledInputWrapperProps {
  $isDark?: boolean;
  $hasError?: boolean;
}

export const InputWrapper = styled.div<StyledInputWrapperProps>`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
`;

export const InputLabel = styled.label<{ $isDark?: boolean }>`
  font-size: 0.813rem;
  font-weight: 600;
  color: ${({ $isDark }) => ($isDark ? '#d1d5db' : '#374151')};
  letter-spacing: 0.02em;
`;

export const StyledInput = styled.input<StyledInputWrapperProps>`
  width: 100%;
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 0.875rem;
  outline: none;
  transition: all 0.2s ease;
  background: ${({ $isDark }) => ($isDark ? '#1f2937' : '#ffffff')};
  color: ${({ $isDark }) => ($isDark ? '#f3f4f6' : '#111827')};
  border: 1.5px solid ${({ $isDark, $hasError }) =>
    $hasError ? '#ef4444' : $isDark ? '#374151' : '#e5e7eb'};

  &::placeholder {
    color: ${({ $isDark }) => ($isDark ? '#6b7280' : '#9ca3af')};
  }

  &:focus {
    border-color: ${({ $hasError }) => ($hasError ? '#ef4444' : '#6366f1')};
    box-shadow: 0 0 0 3px ${({ $hasError }) =>
      $hasError ? 'rgba(239, 68, 68, 0.1)' : 'rgba(99, 102, 241, 0.1)'};
  }
`;

export const StyledTextarea = styled.textarea<StyledInputWrapperProps>`
  width: 100%;
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 0.875rem;
  outline: none;
  transition: all 0.2s ease;
  resize: vertical;
  min-height: 80px;
  font-family: inherit;
  background: ${({ $isDark }) => ($isDark ? '#1f2937' : '#ffffff')};
  color: ${({ $isDark }) => ($isDark ? '#f3f4f6' : '#111827')};
  border: 1.5px solid ${({ $isDark, $hasError }) =>
    $hasError ? '#ef4444' : $isDark ? '#374151' : '#e5e7eb'};

  &::placeholder {
    color: ${({ $isDark }) => ($isDark ? '#6b7280' : '#9ca3af')};
  }

  &:focus {
    border-color: ${({ $hasError }) => ($hasError ? '#ef4444' : '#6366f1')};
    box-shadow: 0 0 0 3px ${({ $hasError }) =>
      $hasError ? 'rgba(239, 68, 68, 0.1)' : 'rgba(99, 102, 241, 0.1)'};
  }
`;

export const ErrorText = styled.span`
  font-size: 0.75rem;
  color: #ef4444;
  font-weight: 500;
`;
