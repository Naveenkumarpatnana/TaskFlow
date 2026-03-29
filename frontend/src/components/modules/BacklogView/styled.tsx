import styled from 'styled-components';

export const BacklogContainer = styled.div`
  padding: 16px 24px;
`;

export const BacklogToolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

export const SearchInput = styled.div`
  position: relative;
  width: 200px;

  input {
    width: 100%;
    padding: 6px 12px 6px 32px;
    background: var(--jira-card);
    border: 1px solid var(--jira-border);
    border-radius: 4px;
    color: var(--jira-text-primary);
    font-size: 13px;
    outline: none;

    &::placeholder { color: var(--jira-text-secondary); }
    &:focus { border-color: var(--jira-accent-blue); }
  }
`;

export const SearchIconSmall = styled.span`
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 13px;
  color: var(--jira-text-secondary);
`;

export const AvatarFilter = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #0052cc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  color: #fff;
  cursor: pointer;
`;

export const FilterBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: transparent;
  border: 1px solid var(--jira-border);
  border-radius: 4px;
  color: var(--jira-text-primary);
  font-size: 13px;
  cursor: pointer;

  &:hover { background: var(--jira-card-hover); }
`;

export const ToolbarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
`;

export const ToolbarMenuWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const SprintSection = styled.div`
  margin-bottom: 16px;
  border: 1px solid var(--jira-border);
  border-radius: 4px;
  background: var(--jira-surface);
`;

export const SprintHeader = styled.div<{ $expanded?: boolean }>`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  gap: 8px;
  cursor: pointer;
  user-select: none;

  &:hover { background: var(--jira-card-hover); }
`;

export const SprintChevron = styled.span<{ $expanded?: boolean }>`
  font-size: 12px;
  color: var(--jira-text-secondary);
  transform: ${({ $expanded }) => ($expanded ? 'rotate(90deg)' : 'rotate(0deg)')};
  transition: transform 0.15s;
`;

export const SprintCheckbox = styled.input`
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

export const SprintTitle = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: var(--jira-text-bright);
`;

export const SprintDates = styled.span`
  font-size: 13px;
  color: var(--jira-text-secondary);
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const SprintItemCount = styled.span`
  font-size: 13px;
  color: var(--jira-text-secondary);
`;

export const SprintActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
`;

export const SprintMemberAvatars = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
`;

export const SprintMemberAvatar = styled.button<{ $active?: boolean }>`
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
  border: 2px solid ${({ $active }) => ($active ? 'var(--jira-accent-blue, #2684ff)' : 'transparent')};
  padding: 0;
  cursor: pointer;
  flex-shrink: 0;

  &:hover {
    filter: brightness(1.08);
  }
`;

export const StatusDots = styled.div`
  display: flex;
  gap: 3px;
`;

export const StatusDot = styled.span<{ $color: string; $count: number }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  border-radius: 10px;
  background: ${({ $color }) => $color};
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  padding: 0 4px;
`;

export const SprintButton = styled.button<{ $primary?: boolean }>`
  padding: 4px 12px;
  background: ${({ $primary }) => ($primary ? 'var(--jira-blue-button)' : 'transparent')};
  color: ${({ $primary }) => ($primary ? '#1d2125' : 'var(--jira-text-primary)')};
  border: 1px solid ${({ $primary }) => ($primary ? 'transparent' : 'var(--jira-border)')};
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;

  &:hover:not(:disabled) {
    background: ${({ $primary }) => ($primary ? 'var(--jira-blue-button-hover)' : 'var(--jira-card-hover)')};
  }

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }
`;

export const MoreButton = styled.button`
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: 4px;
  color: var(--jira-text-secondary);
  cursor: pointer;
  font-size: 16px;

  &:hover { background: var(--jira-card-hover); }
`;

export const SprintBody = styled.div`
  border-top: 1px solid var(--jira-border);
`;

/** Same DOM node must receive innerRef + draggableProps + dragHandleProps (see @hello-pangea/dnd Draggable). */
export const DraggableTaskWrapper = styled.div`
  box-sizing: border-box;
`;

export const TaskRow = styled.div<{ $isDragging?: boolean }>`
  display: flex;
  align-items: center;
  padding: 6px 12px;
  gap: 10px;
  border-bottom: 1px solid var(--jira-border);
  cursor: pointer;
  transition: background 0.1s;
  background: ${({ $isDragging }) => ($isDragging ? 'var(--jira-card-hover)' : 'transparent')};
  box-shadow: ${({ $isDragging }) => ($isDragging ? '0 2px 8px rgba(0,0,0,0.25)' : 'none')};

  &:hover { background: var(--jira-card-hover); }
  &:last-child { border-bottom: none; }
`;

export const TaskRowMenuWrap = styled.div`
  position: relative;
  flex-shrink: 0;
`;

export const TaskRowMoreBtn = styled.button`
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: 4px;
  color: var(--jira-text-secondary);
  cursor: pointer;
  font-size: 16px;

  &:hover { background: var(--jira-card-hover); color: var(--jira-text-bright); }
`;

export const TaskRowMenuDropdown = styled.div`
  position: absolute;
  right: 0;
  top: 100%;
  margin-top: 2px;
  min-width: 120px;
  padding: 4px 0;
  background: var(--jira-card);
  border: 1px solid var(--jira-border);
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);
  z-index: 20;
`;

export const TaskRowMenuItem = styled.button`
  display: block;
  width: 100%;
  padding: 8px 12px;
  text-align: left;
  background: transparent;
  border: none;
  color: var(--jira-text-primary);
  font-size: 13px;
  cursor: pointer;

  &:hover:not(:disabled) {
    background: var(--jira-card-hover);
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;

export const TaskEstimate = styled.span`
  font-size: 12px;
  color: var(--jira-text-secondary);
  white-space: nowrap;
`;

export const TaskCheckbox = styled.input`
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

export const TaskTypeIcon = styled.span`
  font-size: 14px;
  width: 20px;
  text-align: center;
`;

export const TaskId = styled.span`
  font-size: 13px;
  color: var(--jira-text-secondary);
  min-width: 70px;
`;

export const TaskTitle = styled.span`
  font-size: 14px;
  color: var(--jira-text-bright);
  flex: 1;
`;

export const TaskStatusBadge = styled.span<{ $color: string }>`
  display: inline-block;
  padding: 2px 8px;
  background: ${({ $color }) => $color};
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  border-radius: 3px;
  text-transform: uppercase;
  white-space: nowrap;
`;

export const TaskDueDate = styled.span`
  font-size: 13px;
  color: var(--jira-text-secondary);
  display: flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;
`;

export const TaskAssignee = styled.div`
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

export const SubtaskIcon = styled.span`
  font-size: 14px;
  color: var(--jira-text-secondary);
`;

export const CreateItemRow = styled.div`
  padding: 8px 12px;
  border-top: 1px solid var(--jira-border);
`;

export const CreateItemButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  background: transparent;
  border: none;
  color: var(--jira-text-secondary);
  font-size: 13px;
  cursor: pointer;

  &:hover { color: var(--jira-text-bright); }
`;

export const EmptySprintMessage = styled.div`
  padding: 24px;
  text-align: center;
  color: var(--jira-text-secondary);
  font-size: 13px;
`;

export const SprintFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-top: 1px solid var(--jira-border);
  font-size: 12px;
  color: var(--jira-text-secondary);
  gap: 4px;
`;

export const BottomStats = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 8px 0;
  font-size: 12px;
  color: var(--jira-text-secondary);
  gap: 16px;
`;
