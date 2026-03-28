import styled from 'styled-components';

export const SummaryContainer = styled.div`
  padding: 24px;
`;

export const FilterBar = styled.div`
  margin-bottom: 20px;
`;

export const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: var(--jira-card);
  border: 1px solid var(--jira-border);
  border-radius: 4px;
  color: var(--jira-text-primary);
  font-size: 13px;
  cursor: pointer;

  &:hover {
    background: var(--jira-card-hover);
  }
`;

export const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;
`;

export const StatCard = styled.div`
  background: var(--jira-card);
  border: 1px solid var(--jira-border);
  border-radius: 8px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const StatIconCircle = styled.div<{ $color: string }>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${({ $color }) => `${$color}20`};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
`;

export const StatInfo = styled.div``;

export const StatValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: var(--jira-text-bright);
  line-height: 1;
`;

export const StatLabel = styled.div`
  font-size: 13px;
  color: var(--jira-text-secondary);
  margin-top: 2px;
`;

export const StatSubLabel = styled.div`
  font-size: 11px;
  color: var(--jira-text-secondary);
`;

export const ChartsRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 24px;
`;

export const ChartCard = styled.div`
  background: var(--jira-card);
  border: 1px solid var(--jira-border);
  border-radius: 8px;
  padding: 20px;
`;

export const ChartTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: var(--jira-text-bright);
  margin: 0 0 4px;
`;

export const ChartSubtitle = styled.p`
  font-size: 13px;
  color: var(--jira-text-secondary);
  margin: 0 0 16px;
`;

export const LinkText = styled.a`
  color: var(--jira-accent-blue);
  font-size: 13px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

export const DonutCenter = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

export const DonutValue = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: var(--jira-text-bright);
`;

export const DonutLabel = styled.div`
  font-size: 11px;
  color: var(--jira-text-secondary);
`;

export const LegendRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 12px;
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--jira-text-primary);
`;

export const LegendDot = styled.span<{ $color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 2px;
  background: ${({ $color }) => $color};
`;

export const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-height: 300px;
  overflow-y: auto;
`;

export const ActivityGroup = styled.div``;

export const ActivityGroupTitle = styled.h4`
  font-size: 12px;
  font-weight: 700;
  color: var(--jira-text-bright);
  margin: 0 0 12px;
`;

export const ActivityItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 12px;
`;

export const ActivityAvatar = styled.div<{ $color?: string }>`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: ${({ $color }) => $color || '#0052cc'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 700;
  color: #fff;
  flex-shrink: 0;
`;

export const ActivityContent = styled.div`
  flex: 1;
`;

export const ActivityText = styled.p`
  font-size: 13px;
  color: var(--jira-text-primary);
  margin: 0;
  line-height: 1.4;

  a {
    color: var(--jira-accent-blue);
    &:hover { text-decoration: underline; }
  }
`;

export const ActivityTime = styled.span`
  font-size: 12px;
  color: var(--jira-text-secondary);
  display: block;
  margin-top: 2px;
`;

export const StatusBadge = styled.span<{ $color: string }>`
  display: inline-block;
  padding: 2px 6px;
  background: ${({ $color }) => $color};
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  border-radius: 3px;
  text-transform: uppercase;
`;

export const TeamWorkloadSection = styled.div`
  background: var(--jira-card);
  border: 1px solid var(--jira-border);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 24px;
`;

export const TeamTable = styled.div`
  margin-top: 12px;
`;

export const TeamRow = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  align-items: center;
  gap: 16px;
  padding: 8px 0;
  border-bottom: 1px solid var(--jira-border);
`;

export const TeamHeader = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 16px;
  padding: 8px 0;
  font-size: 12px;
  font-weight: 600;
  color: var(--jira-text-secondary);
  border-bottom: 1px solid var(--jira-border);
`;

export const MemberInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const MemberAvatar = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #6b778c;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 600;
  color: #fff;
`;

export const MemberName = styled.span`
  font-size: 13px;
  color: var(--jira-text-primary);
`;

export const ProgressBarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ProgressLabel = styled.span`
  font-size: 13px;
  color: var(--jira-text-secondary);
  min-width: 40px;
`;

export const ProgressBar = styled.div`
  flex: 1;
  height: 8px;
  background: var(--jira-border);
  border-radius: 4px;
  overflow: hidden;
`;

export const ProgressFill = styled.div<{ $width: number; $color?: string }>`
  width: ${({ $width }) => $width}%;
  height: 100%;
  background: ${({ $color }) => $color || 'var(--jira-accent-blue)'};
  border-radius: 4px;
  transition: width 0.3s ease;
`;

export const EpicCard = styled.div`
  background: var(--jira-card);
  border: 1px solid var(--jira-border);
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

export const EpicPlaceholderBlocks = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: 4px;
`;

export const EpicBlock = styled.div<{ $color?: string }>`
  width: 40px;
  height: 48px;
  background: ${({ $color }) => $color || 'var(--jira-border)'};
  border-radius: 4px;
`;

export const EpicTitle = styled.h4`
  font-size: 14px;
  font-weight: 600;
  color: var(--jira-text-bright);
  margin: 0;
`;

export const EpicDescription = styled.p`
  font-size: 13px;
  color: var(--jira-text-secondary);
  margin: 0;
`;

export const BottomRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;
