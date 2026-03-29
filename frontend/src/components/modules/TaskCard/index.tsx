'use client';

import React from 'react';
import {
  CardContainer, CardTitle, CardFooter, CardMeta,
  CardDate, CardId, CardTypeIcon, CardActions,
  PriorityIcon, MoreBtn, AssigneeAvatar,
} from './styled';
import { ITask } from '@/types/task.types';
import { getInitials, formatDateShort, getTaskTypeIcon } from '@/utils/helpers';

interface TaskCardProps {
  task: ITask;
  index: number;
  onEdit?: (task: ITask) => void;
  onDelete?: (taskId: string) => void;
}

const getPrioritySymbol = (priority: string): string => {
  const symbols: Record<string, string> = {
    critical: '🔴',
    high: '🔺',
    medium: '🟡',
    low: '🔽',
  };
  return symbols[priority] || '';
};

const TaskCard: React.FC<TaskCardProps> = ({ task, index, onEdit, onDelete }) => {
  return (
    <CardContainer onClick={() => onEdit?.(task)}>
      <CardTitle>{task.title}</CardTitle>
      <CardFooter>
        <CardMeta>
          {task.estimatedHours != null && task.estimatedHours > 0 && (
            <CardDate>⏱ {task.estimatedHours}h</CardDate>
          )}
          {task.dueDate && (
            <CardDate>📅 {formatDateShort(task.dueDate)}</CardDate>
          )}
          <CardId>
            <CardTypeIcon>{getTaskTypeIcon(index)}</CardTypeIcon>
            SCRUM-{index + 1}
          </CardId>
        </CardMeta>
        <CardActions>
          <PriorityIcon>{getPrioritySymbol(task.priority)}</PriorityIcon>
          {onDelete && (
            <MoreBtn onClick={(e) => { e.stopPropagation(); onDelete(task._id); }}>
              •••
            </MoreBtn>
          )}
          <AssigneeAvatar title={task.assignee?.name || ''}>
            {getInitials(task.assignee?.name || '')}
          </AssigneeAvatar>
        </CardActions>
      </CardFooter>
    </CardContainer>
  );
};

export default TaskCard;
