'use client';

import React, { useState, useEffect } from 'react';
import {
  BacklogContainer, BacklogToolbar, SearchInput, SearchIconSmall,
  AvatarFilter, FilterBtn, ToolbarRight,
  SprintSection, SprintHeader, SprintChevron, SprintTitle, SprintDates,
  SprintItemCount, SprintActions, StatusDots, StatusDot,
  SprintButton, MoreButton, SprintBody, SprintFooter,
  TaskRow, TaskTypeIcon, TaskId, TaskTitle,
  TaskStatusBadge, TaskDueDate, TaskAssignee,
  CreateItemRow, CreateItemButton, EmptySprintMessage, BottomStats,
} from './styled';
import { BACKLOG_LABELS } from '@/labels/backlogLabels';
import { useThemeStore } from '@/stores/themeStore';
import { useAuthStore } from '@/stores/authStore';
import { useSprintStore } from '@/stores/sprintStore';
import { getLabel } from '@/i18n/translator';
import { getInitials, formatDateShort, formatDateRange, getStatusBgColor, getTaskTypeIcon } from '@/utils/helpers';
import { ISprint, ITask } from '@/types/task.types';

interface BacklogViewProps {
  onCreateTask?: () => void;
  onEditTask?: (task: ITask) => void;
}

const BacklogView: React.FC<BacklogViewProps> = ({ onCreateTask, onEditTask }) => {
  const { language } = useThemeStore();
  const { user } = useAuthStore();
  const { sprints, backlog, isLoading, fetchSprints, createSprint, startSprint, completeSprint } = useSprintStore();
  const [expandedSprints, setExpandedSprints] = useState<Set<string>>(new Set());
  const [backlogExpanded, setBacklogExpanded] = useState(true);

  useEffect(() => {
    fetchSprints();
  }, [fetchSprints]);

  useEffect(() => {
    // Auto-expand all sprints
    const ids = new Set(sprints.map((s) => s._id));
    setExpandedSprints(ids);
  }, [sprints]);

  const toggleSprint = (id: string) => {
    setExpandedSprints((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleCreateSprint = () => {
    createSprint();
  };

  const renderTaskRow = (task: ITask, index: number, projectKey: string) => {
    const statusColor = getStatusBgColor(task.status);
    return (
      <TaskRow key={task._id} onClick={() => onEditTask?.(task)}>
        <TaskTypeIcon>{getTaskTypeIcon(index)}</TaskTypeIcon>
        <TaskId>{projectKey}-{index + 1}</TaskId>
        <TaskTitle>{task.title}</TaskTitle>
        {task.status !== 'todo' && (
          <TaskStatusBadge $color={statusColor}>
            {getLabel(`status.${task.status}`, language)} ▾
          </TaskStatusBadge>
        )}
        {task.dueDate && (
          <TaskDueDate>📅 {formatDateShort(task.dueDate)}</TaskDueDate>
        )}
        <TaskAssignee title={task.assignee?.name || ''}>
          {getInitials(task.assignee?.name || '')}
        </TaskAssignee>
      </TaskRow>
    );
  };

  const renderSprint = (sprint: ISprint) => {
    const isExpanded = expandedSprints.has(sprint._id);
    const dateRange = formatDateRange(sprint.startDate, sprint.endDate);
    const isActive = sprint.status === 'active';
    const isPlanning = sprint.status === 'planning';

    return (
      <SprintSection key={sprint._id}>
        <SprintHeader $expanded={isExpanded} onClick={() => toggleSprint(sprint._id)}>
          <SprintChevron $expanded={isExpanded}>▶</SprintChevron>
          <SprintTitle>{sprint.name}</SprintTitle>
          {dateRange && <SprintDates>✏️ {getLabel('backlog.addDates', language)}</SprintDates>}
          {dateRange && <SprintDates>{dateRange}</SprintDates>}
          <SprintItemCount>({sprint.totalItems} {getLabel('backlog.workItems', language)})</SprintItemCount>
          <SprintActions>
            <StatusDots>
              <StatusDot $color="var(--jira-status-todo)" $count={sprint.statusCounts?.todo || 0}>{sprint.statusCounts?.todo || 0}</StatusDot>
              <StatusDot $color="var(--jira-status-inprogress)" $count={sprint.statusCounts?.inprogress || 0}>{sprint.statusCounts?.inprogress || 0}</StatusDot>
              <StatusDot $color="var(--jira-status-done)" $count={sprint.statusCounts?.completed || 0}>{sprint.statusCounts?.completed || 0}</StatusDot>
            </StatusDots>
            {isActive && (
              <SprintButton onClick={(e) => { e.stopPropagation(); completeSprint(sprint._id); }}>
                {getLabel('backlog.completeSprint', language)}
              </SprintButton>
            )}
            {isPlanning && (
              <SprintButton onClick={(e) => { e.stopPropagation(); startSprint(sprint._id); }}>
                {getLabel('backlog.startSprint', language)}
              </SprintButton>
            )}
            <MoreButton onClick={(e) => e.stopPropagation()}>•••</MoreButton>
          </SprintActions>
        </SprintHeader>

        {isExpanded && (
          <SprintBody>
            {sprint.tasks.length === 0 ? (
              <EmptySprintMessage>
                {getLabel('backlog.planSprint', language)}
              </EmptySprintMessage>
            ) : (
              sprint.tasks.map((task, i) => renderTaskRow(task, i, sprint.projectKey || 'SCRUM'))
            )}
            <CreateItemRow>
              <CreateItemButton onClick={onCreateTask}>
                {getLabel('backlog.create', language)}
              </CreateItemButton>
            </CreateItemRow>
          </SprintBody>
        )}

        <SprintFooter>
          ⚙️
        </SprintFooter>
      </SprintSection>
    );
  };

  if (isLoading) {
    return <div style={{ padding: 40, textAlign: 'center', color: 'var(--jira-text-secondary)' }}>{getLabel('common.loading', language)}</div>;
  }

  const totalItems = sprints.reduce((sum, s) => sum + s.totalItems, 0) + backlog.totalItems;

  return (
    <BacklogContainer>
      <BacklogToolbar>
        <SearchInput>
          <SearchIconSmall>🔍</SearchIconSmall>
          <input placeholder={getLabel('backlog.searchBacklog', language)} />
        </SearchInput>
        <AvatarFilter>{user ? getInitials(user.name) : '?'}</AvatarFilter>
        <FilterBtn>☰ {getLabel('common.filter', language)}</FilterBtn>
        <ToolbarRight>
          <span style={{ fontSize: 12, color: 'var(--jira-text-secondary)' }}>⚙️</span>
          <span style={{ fontSize: 12, color: 'var(--jira-text-secondary)' }}>•••</span>
        </ToolbarRight>
      </BacklogToolbar>

      {/* Sprint Sections */}
      {sprints.map(renderSprint)}

      {/* Backlog Section */}
      <SprintSection>
        <SprintHeader $expanded={backlogExpanded} onClick={() => setBacklogExpanded(!backlogExpanded)}>
          <SprintChevron $expanded={backlogExpanded}>▶</SprintChevron>
          <SprintTitle>{getLabel('backlog.backlog', language)}</SprintTitle>
          <SprintItemCount>({backlog.totalItems} {getLabel('backlog.workItems', language)})</SprintItemCount>
          <SprintActions>
            <StatusDots>
              <StatusDot $color="var(--jira-status-todo)" $count={0}>0</StatusDot>
              <StatusDot $color="var(--jira-status-inprogress)" $count={0}>0</StatusDot>
              <StatusDot $color="var(--jira-status-done)" $count={0}>0</StatusDot>
            </StatusDots>
            <SprintButton onClick={(e) => { e.stopPropagation(); handleCreateSprint(); }}>
              {getLabel('backlog.createSprint', language)}
            </SprintButton>
          </SprintActions>
        </SprintHeader>

        {backlogExpanded && (
          <SprintBody>
            {backlog.tasks.length === 0 ? (
              <EmptySprintMessage>
                {getLabel('backlog.planSprint', language)}
              </EmptySprintMessage>
            ) : (
              backlog.tasks.map((task, i) => renderTaskRow(task, i, 'SCRUM'))
            )}
            <CreateItemRow>
              <CreateItemButton onClick={onCreateTask}>
                {getLabel('backlog.create', language)}
              </CreateItemButton>
            </CreateItemRow>
          </SprintBody>
        )}
      </SprintSection>

      <BottomStats>
        <span>{totalItems} of {totalItems} {getLabel('backlog.workItemsVisible', language)}</span>
        <span>{getLabel('backlog.estimate', language)}: 0 of 0</span>
      </BottomStats>
    </BacklogContainer>
  );
};

export default BacklogView;
