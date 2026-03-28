'use client';

import React from 'react';
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
  DoneIcon, CreateInlineBtn,
} from './styled';
import TaskCard from '../TaskCard';
import { useThemeStore } from '@/stores/themeStore';
import { useTaskStore } from '@/stores/taskStore';
import { getLabel } from '@/i18n/translator';
import { ITask, TaskStatus } from '@/types/task.types';
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

const TaskBoard: React.FC<TaskBoardProps> = ({ onEditTask, onDeleteTask, onCreateTask }) => {
  const { language } = useThemeStore();
  const { tasks, moveTask } = useTaskStore();

  const getColumnTasks = (status: TaskStatus): ITask[] =>
    tasks.filter((t) => t.status === status);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const newStatus = result.destination.droppableId as TaskStatus;
    if (result.source.droppableId !== newStatus) {
      moveTask(result.draggableId, newStatus);
    }
  };

  return (
    <BoardWrapper>
      <BoardToolbar>
        <BoardSearchInput>
          <BoardSearchIcon>🔍</BoardSearchIcon>
          <input placeholder={getLabel('board.searchBoard', language)} />
        </BoardSearchInput>
        <ToolbarSpacer />
        <CompleteSprintBtn>
          {getLabel('board.completeSprint', language)}
        </CompleteSprintBtn>
        <GroupButton>
          {getLabel('board.group', language)} ▾
        </GroupButton>
        <ToolbarIcon>📊</ToolbarIcon>
        <ToolbarIcon>⚙️</ToolbarIcon>
        <ToolbarIcon>•••</ToolbarIcon>
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
                        <CreateInlineBtn onClick={onCreateTask}>
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
          <AddColumnButton>+</AddColumnButton>
        </BoardContainer>
      </DragDropContext>
    </BoardWrapper>
  );
};

export default TaskBoard;
