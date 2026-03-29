import styled from 'styled-components';

export const BoardWrapper = styled.div`
  padding: 16px 24px;
`;

export const BoardToolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

export const BoardSearchInput = styled.div`
  position: relative;
  width: 180px;

  input {
    width: 100%;
    padding: 6px 12px 6px 30px;
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

export const BoardSearchIcon = styled.span`
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 13px;
  color: var(--jira-text-secondary);
`;

export const ToolbarSpacer = styled.div`
  flex: 1;
`;

export const CompleteSprintBtn = styled.button`
  padding: 6px 14px;
  background: var(--jira-accent-blue);
  color: #1d2125;
  border: none;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;

  &:hover:not(:disabled) { background: var(--jira-blue-button-hover); }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const BoardSprintSelect = styled.select`
  padding: 6px 10px;
  min-width: 200px;
  max-width: 280px;
  background: var(--jira-card);
  border: 1px solid var(--jira-border);
  border-radius: 4px;
  color: var(--jira-text-primary);
  font-size: 13px;
  cursor: pointer;
  outline: none;

  &:focus {
    border-color: var(--jira-accent-blue);
  }
`;

export const GroupButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  background: transparent;
  border: 1px solid var(--jira-border);
  border-radius: 4px;
  color: var(--jira-text-primary);
  font-size: 13px;
  cursor: pointer;

  &:hover { background: var(--jira-card-hover); }
`;

export const ToolbarIcon = styled.button`
  width: 32px;
  height: 32px;
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

export const BoardContainer = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  align-items: flex-start;
`;

export const Column = styled.div`
  min-width: 260px;
  flex: 1;
  background: var(--jira-surface);
  border-radius: 6px;
  min-height: 200px;
`;

export const ColumnHeader = styled.div`
  padding: 10px 12px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ColumnTitle = styled.span`
  font-size: 12px;
  font-weight: 700;
  color: var(--jira-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const ColumnCount = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: var(--jira-text-secondary);
`;

export const ColumnBody = styled.div`
  padding: 0 6px 6px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-height: 100px;
`;

export const EmptyColumn = styled.div`
  padding: 20px;
  text-align: center;
  color: var(--jira-text-secondary);
  font-size: 13px;
`;

export const AddColumnButton = styled.button`
  min-width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: 6px;
  color: var(--jira-text-secondary);
  cursor: pointer;
  font-size: 20px;

  &:hover { background: var(--jira-card-hover); }
`;

export const DoneIcon = styled.span`
  color: var(--jira-accent-green);
  font-size: 14px;
`;

export const CreateInlineBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  background: transparent;
  border: none;
  color: var(--jira-text-secondary);
  font-size: 13px;
  cursor: pointer;
  width: 100%;
  border-radius: 4px;

  &:hover {
    color: var(--jira-text-bright);
    background: var(--jira-card-hover);
  }
`;
