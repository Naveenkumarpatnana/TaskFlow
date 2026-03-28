import styled from 'styled-components';

export const PageWrapper = styled.div<{ $isDark?: boolean }>`
  display: flex;
  min-height: 100vh;
  background: ${({ $isDark }) => ($isDark ? '#111827' : '#f9fafb')};
`;

export const MainContent = styled.main`
  flex: 1;
  margin-left: 260px;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

export const ContentArea = styled.div`
  padding: 32px;
  flex: 1;
`;

export const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;
