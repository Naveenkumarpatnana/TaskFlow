import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { transform: translateY(20px) scale(0.97); opacity: 0; }
  to { transform: translateY(0) scale(1); opacity: 1; }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${fadeIn} 0.2s ease;
  padding: 20px;
`;

export const ModalContent = styled.div<{ $isDark?: boolean; $width?: string }>`
  background: ${({ $isDark }) => ($isDark ? '#1f2937' : '#ffffff')};
  border-radius: 16px;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.3);
  width: ${({ $width }) => $width || '480px'};
  max-width: 95vw;
  max-height: 85vh;
  overflow-y: auto;
  animation: ${slideUp} 0.25s ease;
  border: 1px solid ${({ $isDark }) => ($isDark ? '#374151' : '#e5e7eb')};
`;

export const ModalHeader = styled.div<{ $isDark?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid ${({ $isDark }) => ($isDark ? '#374151' : '#f3f4f6')};
`;

export const ModalTitle = styled.h3<{ $isDark?: boolean }>`
  margin: 0;
  font-size: 1.125rem;
  font-weight: 700;
  color: ${({ $isDark }) => ($isDark ? '#f3f4f6' : '#111827')};
`;

export const ModalClose = styled.button<{ $isDark?: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
  color: ${({ $isDark }) => ($isDark ? '#9ca3af' : '#6b7280')};
  padding: 4px 8px;
  border-radius: 8px;
  transition: all 0.15s ease;

  &:hover {
    background: ${({ $isDark }) => ($isDark ? '#374151' : '#f3f4f6')};
    color: ${({ $isDark }) => ($isDark ? '#f3f4f6' : '#111827')};
  }
`;

export const ModalBody = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ModalFooter = styled.div<{ $isDark?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 24px;
  border-top: 1px solid ${({ $isDark }) => ($isDark ? '#374151' : '#f3f4f6')};
`;
