import styled from 'styled-components';

export const CardContainer = styled.div`
  background: var(--jira-card);
  border-radius: 4px;
  padding: 10px 12px;
  cursor: pointer;
  transition: background 0.1s, box-shadow 0.1s;
  border: 1px solid transparent;

  &:hover {
    background: var(--jira-card-hover);
    border-color: var(--jira-border);
  }
`;

export const CardTitle = styled.div`
  font-size: 14px;
  color: var(--jira-text-bright);
  margin-bottom: 8px;
  line-height: 1.4;
`;

export const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CardMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const CardDate = styled.span`
  font-size: 12px;
  color: var(--jira-text-secondary);
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const CardId = styled.span`
  font-size: 12px;
  color: var(--jira-text-secondary);
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const CardTypeIcon = styled.span`
  font-size: 12px;
`;

export const CardActions = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const PriorityIcon = styled.span`
  font-size: 14px;
`;

export const MoreBtn = styled.button`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: 4px;
  color: var(--jira-text-secondary);
  cursor: pointer;
  font-size: 14px;
  opacity: 0;
  transition: opacity 0.15s;

  ${CardContainer}:hover & {
    opacity: 1;
  }

  &:hover { background: var(--jira-card-hover); }
`;

export const AssigneeAvatar = styled.div`
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
