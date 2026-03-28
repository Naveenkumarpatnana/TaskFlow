import styled, { keyframes } from 'styled-components';

const countUp = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`;

export const StatCard = styled.div<{ $isDark?: boolean; $accent?: string }>`
  background: ${({ $isDark }) =>
    $isDark
      ? 'linear-gradient(135deg, #1f2937 0%, #111827 100%)'
      : 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)'};
  border: 1px solid ${({ $isDark }) => ($isDark ? '#374151' : '#f0f0f0')};
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
  overflow: hidden;
  transition: all 0.2s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: ${({ $accent }) => $accent || '#6366f1'};
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  }
`;

export const StatIcon = styled.div<{ $accent?: string }>`
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: ${({ $accent }) => `${$accent || '#6366f1'}15`};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  margin-bottom: 4px;
`;

export const StatLabel = styled.span<{ $isDark?: boolean }>`
  font-size: 0.813rem;
  font-weight: 500;
  color: ${({ $isDark }) => ($isDark ? '#9ca3af' : '#6b7280')};
`;

export const StatValue = styled.span<{ $isDark?: boolean }>`
  font-size: 1.75rem;
  font-weight: 800;
  color: ${({ $isDark }) => ($isDark ? '#f3f4f6' : '#111827')};
  letter-spacing: -0.02em;
  animation: ${countUp} 0.4s ease;
`;

export const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const ChartCard = styled.div<{ $isDark?: boolean }>`
  background: ${({ $isDark }) => ($isDark ? '#1f2937' : '#ffffff')};
  border: 1px solid ${({ $isDark }) => ($isDark ? '#374151' : '#f0f0f0')};
  border-radius: 16px;
  padding: 24px;
`;

export const ChartTitle = styled.h3<{ $isDark?: boolean }>`
  margin: 0 0 20px;
  font-size: 1rem;
  font-weight: 700;
  color: ${({ $isDark }) => ($isDark ? '#f3f4f6' : '#111827')};
`;

export const TeamList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const TeamMember = styled.div<{ $isDark?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 10px;
  background: ${({ $isDark }) => ($isDark ? 'rgba(0,0,0,0.2)' : '#f9fafb')};
`;

export const MemberAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
  color: #ffffff;
`;

export const MemberInfo = styled.div`
  flex: 1;
`;

export const MemberName = styled.p<{ $isDark?: boolean }>`
  margin: 0;
  font-size: 0.85rem;
  font-weight: 600;
  color: ${({ $isDark }) => ($isDark ? '#f3f4f6' : '#111827')};
`;

export const MemberStats = styled.p<{ $isDark?: boolean }>`
  margin: 0;
  font-size: 0.75rem;
  color: ${({ $isDark }) => ($isDark ? '#9ca3af' : '#6b7280')};
`;

export const ProgressBar = styled.div<{ $isDark?: boolean }>`
  width: 80px;
  height: 6px;
  border-radius: 3px;
  background: ${({ $isDark }) => ($isDark ? '#374151' : '#e5e7eb')};
  overflow: hidden;
`;

export const ProgressFill = styled.div<{ $width: number }>`
  height: 100%;
  border-radius: 3px;
  background: linear-gradient(90deg, #6366f1, #22c55e);
  width: ${({ $width }) => $width}%;
  transition: width 0.5s ease;
`;
