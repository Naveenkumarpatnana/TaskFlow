'use client';

import React from 'react';
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  SummaryContainer, FilterBar, FilterButton,
  StatsRow, StatCard, StatIconCircle, StatInfo, StatValue, StatLabel, StatSubLabel,
  ChartsRow, ChartCard, ChartTitle, ChartSubtitle, LinkText,
  LegendRow, LegendItem, LegendDot,
  ActivityList, ActivityGroup, ActivityGroupTitle,
  ActivityItem, ActivityAvatar, ActivityContent, ActivityText, ActivityTime, StatusBadge,
  TeamWorkloadSection, TeamTable, TeamRow, TeamHeader,
  MemberInfo, MemberAvatar, MemberName,
  ProgressBarContainer, ProgressLabel, ProgressBar, ProgressFill,
  EpicCard, EpicPlaceholderBlocks, EpicBlock, EpicTitle, EpicDescription,
  BottomRow,
} from './styled';
import { SUMMARY_LABELS } from '@/labels/summaryLabels';
import { useThemeStore } from '@/stores/themeStore';
import { getLabel } from '@/i18n/translator';
import { getInitials, timeAgo } from '@/utils/helpers';

interface SummaryData {
  overview: {
    totalTasks: number;
    completedCount: number;
    completionRate: number;
    overdueTasks: number;
    completedThisWeek: number;
  };
  tasksByStatus: Array<{ _id: string; count: number }>;
  tasksByPriority: Array<{ _id: string; count: number }>;
  tasksByAssignee: Array<{
    _id: string;
    total: number;
    completed: number;
    inProgress: number;
    userName: string;
    userEmail: string;
  }>;
  recentTasks?: Array<any>;
}

interface SummaryViewProps {
  data: SummaryData | null;
  isLoading: boolean;
}

const STATUS_COLORS: Record<string, string> = {
  todo: '#9f8fef',
  inprogress: '#4bce97',
  inreview: '#579dff',
  completed: '#579dff',
};

const SummaryView: React.FC<SummaryViewProps> = ({ data, isLoading }) => {
  const { language } = useThemeStore();

  if (isLoading || !data) {
    return <div style={{ padding: 40, textAlign: 'center', color: 'var(--jira-text-secondary)' }}>{getLabel('common.loading', language)}</div>;
  }

  const { overview, tasksByStatus, tasksByPriority, tasksByAssignee, recentTasks } = data;

  const totalItems = overview.totalTasks;
  const statusData = tasksByStatus.map((s) => ({
    name: getLabel(`status.${s._id}`, language),
    value: s.count,
    fill: STATUS_COLORS[s._id] || '#6b7280',
    id: s._id,
  }));

  const priorityData = tasksByPriority.map((p) => ({
    name: getLabel(`priority.${p._id}`, language),
    value: p.count,
  }));

  const stats = [
    { icon: '✅', color: '#4bce97', value: overview.completedThisWeek, label: getLabel('summary.completed', language), sub: getLabel('summary.inLast7Days', language) },
    { icon: '🔄', color: '#9f8fef', value: overview.totalTasks, label: getLabel('summary.updated', language), sub: getLabel('summary.inLast7Days', language) },
    { icon: '🆕', color: '#579dff', value: overview.totalTasks, label: getLabel('summary.created', language), sub: getLabel('summary.inLast7Days', language) },
    { icon: '📅', color: '#f5cd47', value: overview.overdueTasks, label: getLabel('summary.dueSoon', language), sub: getLabel('summary.inNext7Days', language) },
  ];

  return (
    <SummaryContainer>
      <FilterBar>
        <FilterButton>☰ {getLabel('common.filter', language)}</FilterButton>
      </FilterBar>

      {/* Stats Cards */}
      <StatsRow>
        {stats.map((stat, i) => (
          <StatCard key={i}>
            <StatIconCircle $color={stat.color}>{stat.icon}</StatIconCircle>
            <StatInfo>
              <StatValue>{stat.value}</StatValue>
              <StatLabel>{stat.label}</StatLabel>
              <StatSubLabel>{stat.sub}</StatSubLabel>
            </StatInfo>
          </StatCard>
        ))}
      </StatsRow>

      {/* Charts Row */}
      <ChartsRow>
        {/* Status Overview Donut */}
        <ChartCard>
          <ChartTitle>{getLabel('summary.statusOverview', language)}</ChartTitle>
          <ChartSubtitle>
            Get a snapshot of the status of your work items.{' '}
            <LinkText>{getLabel('summary.viewAllWorkItems', language)}</LinkText>
          </ChartSubtitle>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <div style={{ position: 'relative', width: 200, height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={statusData} cx="50%" cy="50%" innerRadius={65} outerRadius={90} paddingAngle={3} dataKey="value">
                    {statusData.map((entry, i) => (
                      <Cell key={i} fill={entry.fill} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--jira-text-bright)' }}>{totalItems}</div>
                <div style={{ fontSize: 11, color: 'var(--jira-text-secondary)' }}>Total work item...</div>
              </div>
            </div>
            <LegendRow>
              {statusData.map((entry, i) => (
                <LegendItem key={i}>
                  <LegendDot $color={entry.fill} />
                  {entry.name}: {entry.value}
                </LegendItem>
              ))}
            </LegendRow>
          </div>
        </ChartCard>

        {/* Recent Activity */}
        <ChartCard>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <ChartTitle>{getLabel('summary.recentActivity', language)}</ChartTitle>
              <ChartSubtitle>{getLabel('summary.stayUpToDate', language)}</ChartSubtitle>
            </div>
            <span style={{ cursor: 'pointer', color: 'var(--jira-text-secondary)' }}>↗️</span>
          </div>
          <ActivityList>
            <ActivityGroup>
              <ActivityGroupTitle>{getLabel('summary.today', language)}</ActivityGroupTitle>
              {(recentTasks || []).slice(0, 3).map((task: any, i: number) => (
                <ActivityItem key={i}>
                  <ActivityAvatar $color="#0052cc">
                    {getInitials(task.reporter?.name || task.assignee?.name || 'U')}
                  </ActivityAvatar>
                  <ActivityContent>
                    <ActivityText>
                      <a>{task.reporter?.name || task.assignee?.name}</a> {getLabel('summary.updatedField', language)} &quot;Sprint&quot; on{' '}
                      <a>SCRUM-{i + 1}: {task.title}</a>
                      {task.status && (
                        <>
                          {' '}
                          <StatusBadge $color={STATUS_COLORS[task.status] || '#42526e'}>
                            {getLabel(`status.${task.status}`, language)}
                          </StatusBadge>
                        </>
                      )}
                    </ActivityText>
                    <ActivityTime>{timeAgo(task.updatedAt || task.createdAt)}</ActivityTime>
                  </ActivityContent>
                </ActivityItem>
              ))}
            </ActivityGroup>
          </ActivityList>
        </ChartCard>
      </ChartsRow>

      {/* Bottom Row: Team Workload + Epic Progress */}
      <BottomRow>
        <TeamWorkloadSection>
          <ChartTitle>{getLabel('summary.teamWorkload', language)}</ChartTitle>
          <ChartSubtitle>
            {getLabel('summary.monitorCapacity', language)}{' '}
            <LinkText>{getLabel('summary.reassignWork', language)}</LinkText>
          </ChartSubtitle>
          <TeamHeader>
            <span>{getLabel('task.assignee', language)}</span>
            <span>{getLabel('summary.workDistribution', language)}</span>
          </TeamHeader>
          <TeamTable>
            {tasksByAssignee.map((member) => {
              const pct = totalItems > 0 ? Math.round((member.total / totalItems) * 100) : 0;
              return (
                <TeamRow key={member._id}>
                  <MemberInfo>
                    <MemberAvatar>{getInitials(member.userName)}</MemberAvatar>
                    <MemberName>{member.userName}</MemberName>
                  </MemberInfo>
                  <ProgressBarContainer>
                    <ProgressLabel>{pct}%</ProgressLabel>
                    <ProgressBar>
                      <ProgressFill $width={pct} />
                    </ProgressBar>
                  </ProgressBarContainer>
                </TeamRow>
              );
            })}
            {/* Unassigned row */}
            <TeamRow>
              <MemberInfo>
                <MemberAvatar>👤</MemberAvatar>
                <MemberName>Unassigned</MemberName>
              </MemberInfo>
              <ProgressBarContainer>
                <ProgressLabel>{tasksByAssignee.length > 0 ? Math.max(0, 100 - tasksByAssignee.reduce((sum, m) => sum + Math.round((m.total / Math.max(totalItems, 1)) * 100), 0)) : 100}%</ProgressLabel>
                <ProgressBar>
                  <ProgressFill $width={tasksByAssignee.length > 0 ? Math.max(0, 100 - tasksByAssignee.reduce((sum, m) => sum + Math.round((m.total / Math.max(totalItems, 1)) * 100), 0)) : 100} $color="#6b778c" />
                </ProgressBar>
              </ProgressBarContainer>
            </TeamRow>
          </TeamTable>
        </TeamWorkloadSection>

        <EpicCard>
          <EpicPlaceholderBlocks>
            <EpicBlock $color="#42526e" />
            <EpicBlock $color="#394049" />
            <EpicBlock $color="#579dff" />
          </EpicPlaceholderBlocks>
          <EpicTitle>{getLabel('summary.epicProgress', language)}</EpicTitle>
          <EpicDescription>
            {getLabel('summary.useEpics', language)}{' '}
            <LinkText>What is an epic?</LinkText>
          </EpicDescription>
        </EpicCard>
      </BottomRow>
    </SummaryContainer>
  );
};

export default SummaryView;
