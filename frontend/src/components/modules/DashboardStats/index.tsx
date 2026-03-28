'use client';

import React from 'react';
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, Legend,
} from 'recharts';
import {
  StatsGrid, StatCard, StatIcon, StatLabel, StatValue,
  ChartsGrid, ChartCard, ChartTitle,
  TeamList, TeamMember, MemberAvatar, MemberInfo, MemberName,
  MemberStats, ProgressBar, ProgressFill,
} from './styled';
import { DASHBOARD_STATS_LABELS } from './labels';
import { useThemeStore } from '@/stores/themeStore';
import { getLabel } from '@/i18n/translator';
import { getInitials } from '@/utils/helpers';

interface DashboardData {
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
}

interface DashboardStatsProps {
  data: DashboardData | null;
  isLoading: boolean;
}

const STATUS_COLORS: Record<string, string> = {
  todo: '#6366f1',
  inprogress: '#f59e0b',
  completed: '#22c55e',
};

const PRIORITY_COLORS: Record<string, string> = {
  low: '#22c55e',
  medium: '#f59e0b',
  high: '#ef4444',
  critical: '#dc2626',
};

const DashboardStats: React.FC<DashboardStatsProps> = ({ data, isLoading }) => {
  const { isDarkMode, language } = useThemeStore();

  if (isLoading || !data) {
    return <div style={{ padding: 40, textAlign: 'center', color: '#9ca3af' }}>{getLabel('common.loading', language)}</div>;
  }

  const { overview, tasksByStatus, tasksByPriority, tasksByAssignee } = data;

  const statusData = tasksByStatus.map((s) => ({
    name: getLabel(`status.${s._id}`, language),
    value: s.count,
    fill: STATUS_COLORS[s._id] || '#6b7280',
  }));

  const priorityData = tasksByPriority.map((p) => ({
    name: getLabel(`priority.${p._id}`, language),
    value: p.count,
    fill: PRIORITY_COLORS[p._id] || '#6b7280',
  }));

  const stats = [
    { icon: '📋', label: DASHBOARD_STATS_LABELS.totalTasks, value: overview.totalTasks, accent: '#6366f1' },
    { icon: '✅', label: DASHBOARD_STATS_LABELS.completed, value: overview.completedCount, accent: '#22c55e' },
    { icon: '⚠️', label: DASHBOARD_STATS_LABELS.overdue, value: overview.overdueTasks, accent: '#ef4444' },
    { icon: '📈', label: DASHBOARD_STATS_LABELS.completionRate, value: `${overview.completionRate}%`, accent: '#8b5cf6' },
  ];

  return (
    <>
      <StatsGrid>
        {stats.map((stat, i) => (
          <StatCard key={i} $isDark={isDarkMode} $accent={stat.accent}>
            <StatIcon $accent={stat.accent}>{stat.icon}</StatIcon>
            <StatLabel $isDark={isDarkMode}>{getLabel(stat.label, language)}</StatLabel>
            <StatValue $isDark={isDarkMode}>{stat.value}</StatValue>
          </StatCard>
        ))}
      </StatsGrid>

      <ChartsGrid>
        <ChartCard $isDark={isDarkMode}>
          <ChartTitle $isDark={isDarkMode}>{getLabel(DASHBOARD_STATS_LABELS.tasksByStatus, language)}</ChartTitle>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={statusData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={5} dataKey="value">
                {statusData.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard $isDark={isDarkMode}>
          <ChartTitle $isDark={isDarkMode}>{getLabel(DASHBOARD_STATS_LABELS.tasksByPriority, language)}</ChartTitle>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={priorityData}>
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: isDarkMode ? '#9ca3af' : '#6b7280' }} />
              <YAxis tick={{ fontSize: 12, fill: isDarkMode ? '#9ca3af' : '#6b7280' }} />
              <Tooltip />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {priorityData.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </ChartsGrid>

      <ChartCard $isDark={isDarkMode}>
        <ChartTitle $isDark={isDarkMode}>{getLabel(DASHBOARD_STATS_LABELS.teamPerformance, language)}</ChartTitle>
        <TeamList>
          {tasksByAssignee.map((member) => {
            const completionPct = member.total > 0 ? Math.round((member.completed / member.total) * 100) : 0;
            return (
              <TeamMember key={member._id} $isDark={isDarkMode}>
                <MemberAvatar>{getInitials(member.userName)}</MemberAvatar>
                <MemberInfo>
                  <MemberName $isDark={isDarkMode}>{member.userName}</MemberName>
                  <MemberStats $isDark={isDarkMode}>
                    {member.completed}/{member.total} {getLabel(DASHBOARD_STATS_LABELS.completed, language).toLowerCase()}
                  </MemberStats>
                </MemberInfo>
                <ProgressBar $isDark={isDarkMode}>
                  <ProgressFill $width={completionPct} />
                </ProgressBar>
              </TeamMember>
            );
          })}
        </TeamList>
      </ChartCard>
    </>
  );
};

export default DashboardStats;
