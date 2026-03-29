'use client';

import React, { useEffect, useMemo, useState, useCallback } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd';
import {
  BoardWrapper, BoardToolbar, BoardSearchInput, BoardSearchIcon,
  ToolbarSpacer, CompleteSprintBtn, GroupButton, ToolbarIcon,
  BoardContainer, Column, ColumnHeader, ColumnTitle,
  ColumnCount, ColumnBody, EmptyColumn, AddColumnButton,
  DoneIcon, CreateInlineBtn, BoardSprintSelect,
} from './styled';
import TaskCard from '../TaskCard';
import { useThemeStore } from '@/stores/themeStore';
import { useTaskStore } from '@/stores/taskStore';
import { useSprintStore } from '@/stores/sprintStore';
import { useAuthStore } from '@/stores/authStore';
import { getLabel } from '@/i18n/translator';
import { ITask, TaskStatus } from '@/types/task.types';
import { UserRole } from '@/types/user.types';
import { BOARD_LABELS } from '@/labels/boardLabels';

interface TaskBoardProps {
  onEditTask?: (task: ITask) => void;
  onDeleteTask?: (taskId: string) => void;
  onCreateTask?: () => void;
}

const COLUMNS: { status: TaskStatus; labelKey: string; icon?: string }[] = [
  { status: TaskStatus.TODO, labelKey: BOARD_LABELS.todo },
  { status: TaskStatus.IN_PROGRESS, labelKey: BOARD_LABELS.inprogress },
  { status: TaskStatus.IN_REVIEW, labelKey: BOARD_LABELS.inreview },
  { status: TaskStatus.COMPLETED, labelKey: BOARD_LABELS.done, icon: '✓' },
];

const sprintStatusLabelKey = (status: string): string => {
  if (status === 'planning') return 'sprint.statusPlanning';
  if (status === 'active') return 'sprint.statusActive';
  if (status === 'completed') return 'sprint.statusCompleted';
  return 'sprint.statusPlanning';
};

const TaskBoard: React.FC<TaskBoardProps> = ({ onEditTask, onDeleteTask, onCreateTask }) => {
  const { language } = useThemeStore();
  const { user } = useAuthStore();
  const { tasks, moveTask, fetchTasks } = useTaskStore();
  const { sprints, fetchSprints, completeSprint } = useSprintStore();
  const [boardSprintFilter, setBoardSprintFilter] = useState<string>('all');
  const [completingSprint, setCompletingSprint] = useState(false);

  useEffect(() => {
    fetchSprints();
  }, [fetchSprints]);

  const sortedSprints = useMemo(
    () => [...sprints].sort((a, b) => a.sprintNumber - b.sprintNumber),
    [sprints]
  );

  const activeSprint = useMemo(
    () => sprints.find((s) => s.status === 'active'),
    [sprints]
  );

  const tasksForRole = useMemo(() => {
    if (!user || user.role !== UserRole.EMPLOYEE) return tasks;
    const uid = String(user.id);
    return tasks.filter((t) => String(t.assignee?._id || '') === uid);
  }, [tasks, user]);

  const filteredTasks = useMemo(() => {
    if (boardSprintFilter === 'all') return tasksForRole;
    if (boardSprintFilter === 'backlog') {
      return tasksForRole.filter((t) => !t.sprint);
    }
    return tasksForRole.filter((t) => String(t.sprint || '') === String(boardSprintFilter));
  }, [tasksForRole, boardSprintFilter]);

  const canCompleteSprint = user?.role !== UserRole.EMPLOYEE;

  const getColumnTasks = (status: TaskStatus): ITask[] =>
    filteredTasks.filter((t) => t.status === status);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const newStatus = result.destination.droppableId as TaskStatus;
    if (result.source.droppableId !== newStatus) {
      moveTask(result.draggableId, newStatus);
    }
  };

  const handleCompleteSprint = useCallback(async () => {
    if (!activeSprint || completingSprint) return;
    if (!window.confirm(getLabel('board.confirmCompleteSprint', language))) return;
    setCompletingSprint(true);
    try {
      await completeSprint(activeSprint._id);
      await fetchTasks();
    } finally {
      setCompletingSprint(false);
    }
  }, [activeSprint, completingSprint, completeSprint, fetchTasks, language]);

  return (
    <BoardWrapper>
      <BoardToolbar>
        <BoardSearchInput>
          <BoardSearchIcon>🔍</BoardSearchIcon>
          <input placeholder={getLabel('board.searchBoard', language)} />
        </BoardSearchInput>
        <BoardSprintSelect
          value={boardSprintFilter}
          onChange={(e) => setBoardSprintFilter(e.target.value)}
          aria-label={getLabel('board.sprintFilter', language)}
        >
          <option value="all">{getLabel('board.allTasks', language)}</option>
          <option value="backlog">{getLabel('board.backlogOnly', language)}</option>
          {sortedSprints.map((s) => (
            <option key={s._id} value={s._id}>
              {s.name} ({getLabel(sprintStatusLabelKey(s.status), language)})
            </option>
          ))}
        </BoardSprintSelect>
        <ToolbarSpacer />
        {canCompleteSprint && (
          <CompleteSprintBtn
            type="button"
            disabled={!activeSprint || completingSprint}
            onClick={handleCompleteSprint}
            title={!activeSprint ? getLabel('board.noActiveSprint', language) : undefined}
          >
            {completingSprint ? getLabel('common.loading', language) : getLabel('board.completeSprint', language)}
          </CompleteSprintBtn>
        )}
        <GroupButton type="button">
          {getLabel('board.group', language)} ▾
        </GroupButton>
        <ToolbarIcon type="button">📊</ToolbarIcon>
        <ToolbarIcon type="button">⚙️</ToolbarIcon>
        <ToolbarIcon type="button">•••</ToolbarIcon>
      </BoardToolbar>

      <DragDropContext onDragEnd={handleDragEnd}>
        <BoardContainer>
          {COLUMNS.map(({ status, labelKey, icon }) => {
            const columnTasks = getColumnTasks(status);

            return (
              <Droppable key={status} droppableId={status}>
                {(provided) => (
                  <Column
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <ColumnHeader>
                      <ColumnTitle>
                        {getLabel(labelKey, language)}
                        {icon && <DoneIcon> {icon}</DoneIcon>}
                      </ColumnTitle>
                      <ColumnCount>{columnTasks.length}</ColumnCount>
                    </ColumnHeader>

                    <ColumnBody>
                      {status === TaskStatus.TODO && (
                        <CreateInlineBtn type="button" onClick={onCreateTask}>
                          {getLabel('board.create', language)}
                        </CreateInlineBtn>
                      )}
                      {columnTasks.length === 0 && status !== TaskStatus.TODO ? (
                        <EmptyColumn />
                      ) : (
                        columnTasks.map((task, index) => (
                          <Draggable key={task._id} draggableId={task._id} index={index}>
                            {(dragProvided) => (
                              <div
                                ref={dragProvided.innerRef}
                                {...dragProvided.draggableProps}
                                {...dragProvided.dragHandleProps}
                              >
                                <TaskCard
                                  task={task}
                                  index={index}
                                  onEdit={onEditTask}
                                  onDelete={onDeleteTask}
                                />
                              </div>
                            )}
                          </Draggable>
                        ))
                      )}
                      {provided.placeholder}
                    </ColumnBody>
                  </Column>
                )}
              </Droppable>
            );
          })}
          <AddColumnButton type="button">+</AddColumnButton>
        </BoardContainer>
      </DragDropContext>
    </BoardWrapper>
  );
};

export default TaskBoard;
