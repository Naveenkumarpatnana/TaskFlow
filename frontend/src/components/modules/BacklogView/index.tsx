'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd';
import {
  BacklogContainer, BacklogToolbar, SearchInput, SearchIconSmall,
  AvatarFilter, FilterBtn, ToolbarRight,
  SprintSection, SprintHeader, SprintChevron, SprintTitle, SprintDates,
  SprintItemCount, SprintActions, StatusDots, StatusDot,
  SprintButton, MoreButton, SprintBody, SprintFooter, ToolbarMenuWrap,
  TaskRow, TaskTypeIcon, TaskId, TaskTitle,
  TaskStatusBadge, TaskDueDate, TaskAssignee,
  CreateItemRow, CreateItemButton, EmptySprintMessage, BottomStats,
  SprintMemberAvatars, SprintMemberAvatar,
  TaskRowMenuWrap, TaskRowMoreBtn, TaskRowMenuDropdown, TaskRowMenuItem,
  TaskEstimate,
  DraggableTaskWrapper,
} from './styled';
import { useThemeStore } from '@/stores/themeStore';
import { useAuthStore } from '@/stores/authStore';
import { useSprintStore } from '@/stores/sprintStore';
import { getLabel } from '@/i18n/translator';
import { getInitials, formatDateShort, formatDateRange, getStatusBgColor, getTaskTypeIcon } from '@/utils/helpers';
import { ITask, ITaskUser } from '@/types/task.types';

const BACKLOG_DROPPABLE_ID = 'backlog';

const sprintDroppableId = (sprintId: string) => `sprint-${sprintId}`;

function uniqueAssigneesFromTasks(tasks: ITask[]): ITaskUser[] {
  const map = new Map<string, ITaskUser>();
  tasks.forEach((t) => {
    const a = t.assignee;
    if (a?._id) map.set(String(a._id), a);
  });
  return Array.from(map.values());
}

interface BacklogViewProps {
  onCreateTask?: () => void;
  onEditTask?: (task: ITask) => void;
  onDeleteTask?: (taskId: string) => void;
  /** Admin / manager: show sprint ••• menu with delete sprint */
  canDeleteSprint?: boolean;
}

const BacklogView: React.FC<BacklogViewProps> = ({
  onCreateTask,
  onEditTask,
  onDeleteTask,
  canDeleteSprint = false,
}) => {
  const { language } = useThemeStore();
  const { user } = useAuthStore();
  const {
    sprints,
    backlog,
    isLoading,
    fetchSprints,
    createSprint,
    startSprint,
    completeSprint,
    deleteSprint,
    moveTaskToSprint,
  } = useSprintStore();
  const [expandedSprints, setExpandedSprints] = useState<Set<string>>(new Set());
  const [backlogExpanded, setBacklogExpanded] = useState(true);
  const [sprintAssigneeFilter, setSprintAssigneeFilter] = useState<Record<string, string | null>>({});
  const [creatingSprint, setCreatingSprint] = useState(false);
  const [rowMenuTaskId, setRowMenuTaskId] = useState<string | null>(null);
  const [toolbarMenuOpen, setToolbarMenuOpen] = useState(false);
  const [contextTaskId, setContextTaskId] = useState<string | null>(null);
  const [openSprintMenuId, setOpenSprintMenuId] = useState<string | null>(null);

  useEffect(() => {
    fetchSprints();
  }, [fetchSprints]);

  useEffect(() => {
    const ids = new Set(sprints.map((s) => s._id));
    setExpandedSprints(ids);
  }, [sprints]);

  useEffect(() => {
    if (!rowMenuTaskId) return;
    const close = (e: MouseEvent) => {
      const el = document.getElementById(`task-row-menu-${rowMenuTaskId}`);
      if (el && !el.contains(e.target as Node)) setRowMenuTaskId(null);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [rowMenuTaskId]);

  useEffect(() => {
    if (!toolbarMenuOpen) return;
    const close = (e: MouseEvent) => {
      const el = document.getElementById('backlog-toolbar-menu');
      if (el && !el.contains(e.target as Node)) setToolbarMenuOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [toolbarMenuOpen]);

  useEffect(() => {
    if (!openSprintMenuId) return;
    const close = (e: MouseEvent) => {
      const el = document.getElementById(`sprint-header-menu-${openSprintMenuId}`);
      if (el && !el.contains(e.target as Node)) setOpenSprintMenuId(null);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [openSprintMenuId]);

  const handleDeleteSprint = async (sprintId: string) => {
    if (!window.confirm(getLabel('backlog.confirmDeleteSprint', language))) return;
    await deleteSprint(sprintId);
    setOpenSprintMenuId(null);
  };

  const toggleSprint = (id: string) => {
    setExpandedSprints((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleCreateSprint = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (creatingSprint) return;
    setCreatingSprint(true);
    try {
      await createSprint();
    } finally {
      setCreatingSprint(false);
    }
  };

  const parseSprintIdFromDroppable = (droppableId: string): string | null => {
    if (droppableId === BACKLOG_DROPPABLE_ID) return null;
    if (droppableId.startsWith('sprint-')) return droppableId.slice('sprint-'.length);
    return null;
  };

  const handleDragEnd = useCallback(
    (result: DropResult) => {
      const { destination, source, draggableId } = result;
      if (!destination) return;
      if (destination.droppableId === source.droppableId && destination.index === source.index) {
        return;
      }

      const destSprintId = parseSprintIdFromDroppable(destination.droppableId);
      const sourceSprintId = parseSprintIdFromDroppable(source.droppableId);

      if (sourceSprintId === destSprintId) return;

      moveTaskToSprint(draggableId, destSprintId);
    },
    [moveTaskToSprint]
  );

  const toggleSprintAssigneeFilter = (sprintId: string, assigneeId: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    const sid = String(assigneeId);
    setSprintAssigneeFilter((prev) => {
      const current = prev[sprintId];
      const nextVal = current != null && String(current) === sid ? null : sid;
      return { ...prev, [sprintId]: nextVal };
    });
  };

  const renderTaskRow = (
    task: ITask,
    index: number,
    projectKey: string,
    snapshot: { isDragging: boolean }
  ) => {
    const statusColor = getStatusBgColor(task.status);
    return (
      <TaskRow
        $isDragging={snapshot.isDragging}
        onClick={(e) => {
          if (snapshot.isDragging) return;
          const t = e.target as HTMLElement;
          if (t.closest('[data-task-row-menu]')) return;
          setContextTaskId(task._id);
          onEditTask?.(task);
        }}
      >
        <TaskTypeIcon>{getTaskTypeIcon(index)}</TaskTypeIcon>
        <TaskId>{projectKey}-{index + 1}</TaskId>
        <TaskTitle>{task.title}</TaskTitle>
        {task.status !== 'todo' && (
          <TaskStatusBadge $color={statusColor}>
            {getLabel(`status.${task.status}`, language)} ▾
          </TaskStatusBadge>
        )}
        {task.estimatedHours != null && task.estimatedHours > 0 && (
          <TaskEstimate title={getLabel('task.estimatedHours', language)}>
            ⏱ {task.estimatedHours}h
          </TaskEstimate>
        )}
        {task.dueDate && (
          <TaskDueDate>📅 {formatDateShort(task.dueDate)}</TaskDueDate>
        )}
        {onDeleteTask && (
          <TaskRowMenuWrap
            data-task-row-menu
            id={`task-row-menu-${task._id}`}
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <TaskRowMoreBtn
              type="button"
              aria-expanded={rowMenuTaskId === task._id}
              aria-haspopup="menu"
              onClick={(e) => {
                e.stopPropagation();
                setRowMenuTaskId((id) => (id === task._id ? null : task._id));
              }}
            >
              •••
            </TaskRowMoreBtn>
            {rowMenuTaskId === task._id && (
              <TaskRowMenuDropdown role="menu">
                <TaskRowMenuItem
                  type="button"
                  role="menuitem"
                  onClick={(e) => {
                    e.stopPropagation();
                    setRowMenuTaskId(null);
                    onDeleteTask(task._id);
                  }}
                >
                  {getLabel('task.delete', language)}
                </TaskRowMenuItem>
              </TaskRowMenuDropdown>
            )}
          </TaskRowMenuWrap>
        )}
        <TaskAssignee title={task.assignee?.name || ''}>
          {getInitials(task.assignee?.name || '')}
        </TaskAssignee>
      </TaskRow>
    );
  };

  const renderDraggableTaskRow = (
    task: ITask,
    index: number,
    projectKey: string
  ) => (
    <Draggable key={task._id} draggableId={task._id} index={index}>
      {(provided, snapshot) => (
        <DraggableTaskWrapper
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...(provided.dragHandleProps ?? {})}
        >
          {renderTaskRow(task, index, projectKey, snapshot)}
        </DraggableTaskWrapper>
      )}
    </Draggable>
  );

  if (isLoading) {
    return <div style={{ padding: 40, textAlign: 'center', color: 'var(--jira-text-secondary)' }}>{getLabel('common.loading', language)}</div>;
  }

  const totalItems = sprints.reduce((sum, s) => sum + s.totalItems, 0) + backlog.totalItems;

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <BacklogContainer>
        <BacklogToolbar>
          <SearchInput>
            <SearchIconSmall>🔍</SearchIconSmall>
            <input placeholder={getLabel('backlog.searchBacklog', language)} />
          </SearchInput>
          <AvatarFilter>{user ? getInitials(user.name) : '?'}</AvatarFilter>
          <FilterBtn type="button">☰ {getLabel('common.filter', language)}</FilterBtn>
          <ToolbarRight>
            <span style={{ fontSize: 12, color: 'var(--jira-text-secondary)' }}>⚙️</span>
            {onDeleteTask ? (
              <ToolbarMenuWrap id="backlog-toolbar-menu">
                <MoreButton
                  type="button"
                  aria-expanded={toolbarMenuOpen}
                  aria-haspopup="menu"
                  onClick={(e) => {
                    e.stopPropagation();
                    setToolbarMenuOpen((v) => !v);
                  }}
                >
                  •••
                </MoreButton>
                {toolbarMenuOpen && (
                  <TaskRowMenuDropdown role="menu">
                    <TaskRowMenuItem
                      type="button"
                      role="menuitem"
                      disabled={!contextTaskId}
                      title={!contextTaskId ? getLabel('backlog.selectTaskToDelete', language) : undefined}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!contextTaskId) return;
                        setToolbarMenuOpen(false);
                        onDeleteTask(contextTaskId);
                        setContextTaskId(null);
                      }}
                    >
                      {getLabel('task.delete', language)}
                    </TaskRowMenuItem>
                  </TaskRowMenuDropdown>
                )}
              </ToolbarMenuWrap>
            ) : (
              <span style={{ fontSize: 12, color: 'var(--jira-text-secondary)' }}>•••</span>
            )}
          </ToolbarRight>
        </BacklogToolbar>

        {sprints.map((sprint) => {
          const isExpanded = expandedSprints.has(sprint._id);
          const dateRange = formatDateRange(sprint.startDate, sprint.endDate);
          const isActive = sprint.status === 'active';
          const isPlanning = sprint.status === 'planning';
          const filterId = sprintAssigneeFilter[sprint._id] ?? null;
          const assignees = uniqueAssigneesFromTasks(sprint.tasks);
          const visibleTasks = !filterId
            ? sprint.tasks
            : sprint.tasks.filter((t) => String(t.assignee?._id || '') === String(filterId));

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
                  {assignees.length > 0 && (
                    <SprintMemberAvatars onClick={(e) => e.stopPropagation()}>
                      {assignees.map((a) => (
                        <SprintMemberAvatar
                          key={a._id}
                          type="button"
                          title={
                            filterId != null && String(filterId) === String(a._id)
                              ? `${a.name} — ${getLabel('backlog.showAllTasks', language)}`
                              : `${getLabel('backlog.filterTasksBy', language)} ${a.name}`
                          }
                          $active={filterId != null && String(filterId) === String(a._id)}
                          onClick={toggleSprintAssigneeFilter(sprint._id, a._id)}
                        >
                          {getInitials(a.name)}
                        </SprintMemberAvatar>
                      ))}
                    </SprintMemberAvatars>
                  )}
                  {isActive && (
                    <SprintButton type="button" onClick={(e) => { e.stopPropagation(); completeSprint(sprint._id); }}>
                      {getLabel('backlog.completeSprint', language)}
                    </SprintButton>
                  )}
                  {isPlanning && (
                    <SprintButton type="button" onClick={(e) => { e.stopPropagation(); startSprint(sprint._id); }}>
                      {getLabel('backlog.startSprint', language)}
                    </SprintButton>
                  )}
                  {canDeleteSprint && (
                    <TaskRowMenuWrap
                      id={`sprint-header-menu-${sprint._id}`}
                      onMouseDown={(e) => e.stopPropagation()}
                    >
                      <MoreButton
                        type="button"
                        aria-expanded={openSprintMenuId === sprint._id}
                        aria-haspopup="menu"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenSprintMenuId((id) => (id === sprint._id ? null : sprint._id));
                        }}
                      >
                        •••
                      </MoreButton>
                      {openSprintMenuId === sprint._id && (
                        <TaskRowMenuDropdown role="menu">
                          <TaskRowMenuItem
                            type="button"
                            role="menuitem"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteSprint(sprint._id);
                            }}
                          >
                            {getLabel('backlog.deleteSprint', language)}
                          </TaskRowMenuItem>
                        </TaskRowMenuDropdown>
                      )}
                    </TaskRowMenuWrap>
                  )}
                </SprintActions>
              </SprintHeader>

              {isExpanded && (
                <SprintBody>
                  <Droppable droppableId={sprintDroppableId(sprint._id)}>
                    {(dropProvided) => (
                      <div ref={dropProvided.innerRef} {...dropProvided.droppableProps}>
                        {visibleTasks.length === 0 ? (
                          <EmptySprintMessage>
                            {filterId
                              ? getLabel('backlog.noTasksForMember', language)
                              : getLabel('backlog.planSprint', language)}
                          </EmptySprintMessage>
                        ) : (
                          visibleTasks.map((task, i) =>
                            renderDraggableTaskRow(task, i, sprint.projectKey || 'SCRUM')
                          )
                        )}
                        {dropProvided.placeholder}
                      </div>
                    )}
                  </Droppable>
                  <CreateItemRow>
                    <CreateItemButton type="button" onClick={onCreateTask}>
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
        })}

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
              <SprintButton
                type="button"
                disabled={creatingSprint}
                onClick={handleCreateSprint}
              >
                {creatingSprint ? getLabel('common.loading', language) : getLabel('backlog.createSprint', language)}
              </SprintButton>
            </SprintActions>
          </SprintHeader>

          {backlogExpanded && (
            <SprintBody>
              <Droppable droppableId={BACKLOG_DROPPABLE_ID}>
                {(dropProvided) => (
                  <div ref={dropProvided.innerRef} {...dropProvided.droppableProps}>
                    {backlog.tasks.length === 0 ? (
                      <EmptySprintMessage>
                        {getLabel('backlog.planSprint', language)}
                      </EmptySprintMessage>
                    ) : (
                      backlog.tasks.map((task, i) =>
                        renderDraggableTaskRow(task, i, 'SCRUM')
                      )
                    )}
                    {dropProvided.placeholder}
                  </div>
                )}
              </Droppable>
              <CreateItemRow>
                <CreateItemButton type="button" onClick={onCreateTask}>
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
    </DragDropContext>
  );
};

export default BacklogView;
