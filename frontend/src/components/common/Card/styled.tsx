import styled from 'styled-components';

export const StyledCard = styled.div<{ $isDark?: boolean }>`
  background: ${({ $isDark }) => ($isDark ? '#1f2937' : '#ffffff')};
  border: 1px solid ${({ $isDark }) => ($isDark ? '#374151' : '#f3f4f6')};
  border-radius: 16px;
  padding: 24px;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const CardTitle = styled.h3<{ $isDark?: boolean }>`
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
  color: ${({ $isDark }) => ($isDark ? '#f3f4f6' : '#111827')};
`;
