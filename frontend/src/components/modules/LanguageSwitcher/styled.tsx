import styled from 'styled-components';

export const SwitcherWrapper = styled.div`
  position: relative;
`;

export const SwitcherButton = styled.button<{ $isDark?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 10px;
  border: 1px solid ${({ $isDark }) => ($isDark ? '#374151' : '#e5e7eb')};
  background: ${({ $isDark }) => ($isDark ? '#1f2937' : '#ffffff')};
  color: ${({ $isDark }) => ($isDark ? '#d1d5db' : '#374151')};
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 600;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ $isDark }) => ($isDark ? '#374151' : '#f3f4f6')};
  }
`;

export const DropdownMenu = styled.div<{ $isDark?: boolean; $isOpen?: boolean }>`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 180px;
  background: ${({ $isDark }) => ($isDark ? '#1f2937' : '#ffffff')};
  border: 1px solid ${({ $isDark }) => ($isDark ? '#374151' : '#e5e7eb')};
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  z-index: 200;
`;

export const DropdownItem = styled.button<{ $isDark?: boolean; $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px 16px;
  border: none;
  background: ${({ $active, $isDark }) =>
    $active
      ? $isDark ? 'rgba(99, 102, 241, 0.15)' : 'rgba(99, 102, 241, 0.08)'
      : 'transparent'};
  color: ${({ $isDark }) => ($isDark ? '#d1d5db' : '#374151')};
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: ${({ $active }) => ($active ? '600' : '400')};
  transition: background 0.15s ease;
  text-align: left;

  &:hover {
    background: ${({ $isDark }) => ($isDark ? '#374151' : '#f3f4f6')};
  }
`;

export const LangNative = styled.span`
  opacity: 0.6;
  font-size: 0.8rem;
`;
