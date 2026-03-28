import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 200;
`;

export const Panel = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  width: 720px;
  max-width: 90vw;
  background: var(--jira-surface);
  z-index: 201;
  display: flex;
  flex-direction: column;
  animation: ${slideIn} 0.2s ease-out;
  border-left: 1px solid var(--jira-border);
  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.3);
`;

export const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  border-bottom: 1px solid var(--jira-border);
`;

export const PanelTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const TaskIdBadge = styled.span`
  font-size: 13px;
  color: var(--jira-accent-blue);
  cursor: pointer;
  &:hover { text-decoration: underline; }
`;

export const TaskTypeIconLarge = styled.span`
  font-size: 18px;
`;

export const CloseButton = styled.button`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: 4px;
  color: var(--jira-text-primary);
  cursor: pointer;
  font-size: 18px;
  &:hover { background: var(--jira-card-hover); }
`;

export const PanelBody = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
`;

export const MainSection = styled.div`
  flex: 1;
  padding: 24px;
  border-right: 1px solid var(--jira-border);
  overflow-y: auto;
`;

export const SideSection = styled.div`
  width: 260px;
  padding: 20px;
  overflow-y: auto;
  flex-shrink: 0;
`;

export const TaskTitleInput = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: var(--jira-text-bright);
  margin: 0 0 16px;
  line-height: 1.4;
`;

export const DescriptionBlock = styled.div`
  margin-bottom: 24px;
`;

export const DescLabel = styled.h4`
  font-size: 14px;
  font-weight: 600;
  color: var(--jira-text-bright);
  margin: 0 0 8px;
`;

export const DescriptionText = styled.p`
  font-size: 14px;
  color: var(--jira-text-primary);
  line-height: 1.6;
  margin: 0;
  background: var(--jira-card);
  padding: 12px;
  border-radius: 4px;
  border: 1px solid var(--jira-border);
  min-height: 60px;
`;

export const NoDescription = styled.span`
  color: var(--jira-text-secondary);
  font-style: italic;
`;

export const ActivitySection = styled.div`
  margin-top: 8px;
`;

export const ActivityHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

export const ActivityTab = styled.button<{ $active?: boolean }>`
  padding: 6px 12px;
  background: ${({ $active }) => ($active ? 'var(--jira-card)' : 'transparent')};
  border: 1px solid ${({ $active }) => ($active ? 'var(--jira-border)' : 'transparent')};
  border-radius: 16px;
  color: ${({ $active }) => ($active ? 'var(--jira-text-bright)' : 'var(--jira-text-secondary)')};
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  &:hover { background: var(--jira-card-hover); }
`;

export const CommentInputArea = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 20px;
`;

export const CommentAvatar = styled.div<{ $color?: string }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${({ $color }) => $color || '#0052cc'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  color: #fff;
  flex-shrink: 0;
`;

export const CommentEditorWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const CommentTextarea = styled.textarea`
  width: 100%;
  min-height: 80px;
  padding: 10px 12px;
  background: var(--jira-card);
  border: 1px solid var(--jira-border);
  border-radius: 4px;
  color: var(--jira-text-primary);
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
  outline: none;

  &::placeholder { color: var(--jira-text-secondary); }
  &:focus { border-color: var(--jira-accent-blue); }
`;

export const CommentActions = styled.div`
  display: flex;
  gap: 8px;
`;

export const SaveCommentBtn = styled.button`
  padding: 6px 16px;
  background: var(--jira-blue-button);
  color: #1d2125;
  border: none;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  &:hover { background: var(--jira-blue-button-hover); }
  &:disabled { opacity: 0.5; cursor: default; }
`;

export const CancelCommentBtn = styled.button`
  padding: 6px 16px;
  background: transparent;
  color: var(--jira-text-primary);
  border: 1px solid var(--jira-border);
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
  &:hover { background: var(--jira-card-hover); }
`;

export const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const CommentItem = styled.div`
  display: flex;
  gap: 10px;
`;

export const CommentBody = styled.div`
  flex: 1;
`;

export const CommentAuthor = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: var(--jira-text-bright);
`;

export const CommentTime = styled.span`
  font-size: 12px;
  color: var(--jira-text-secondary);
  margin-left: 8px;
`;

export const CommentText = styled.p`
  font-size: 14px;
  color: var(--jira-text-primary);
  margin: 4px 0 0;
  line-height: 1.5;
`;

export const CommentDeleteBtn = styled.button`
  background: transparent;
  border: none;
  color: var(--jira-text-secondary);
  font-size: 11px;
  cursor: pointer;
  padding: 2px 0;
  margin-top: 4px;
  &:hover { color: var(--jira-accent-red); text-decoration: underline; }
`;

export const NoComments = styled.div`
  padding: 20px 0;
  text-align: center;
  color: var(--jira-text-secondary);
  font-size: 13px;
`;

// ─── Side Panel (Details) ───
export const DetailGroup = styled.div`
  margin-bottom: 16px;
`;

export const DetailLabel = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: var(--jira-text-secondary);
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`;

export const DetailValue = styled.div`
  font-size: 14px;
  color: var(--jira-text-primary);
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const StatusBadgeLarge = styled.span<{ $color: string }>`
  display: inline-block;
  padding: 4px 10px;
  background: ${({ $color }) => $color};
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  border-radius: 3px;
  text-transform: uppercase;
`;

export const PriorityBadge = styled.span<{ $color: string }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--jira-text-primary);

  &::before {
    content: '';
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${({ $color }) => $color};
  }
`;

export const AssigneeDetail = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const AssigneeAvatarLarge = styled.div`
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
`;

export const Divider = styled.div`
  height: 1px;
  background: var(--jira-border);
  margin: 16px 0;
`;

export const DateDetail = styled.span`
  font-size: 13px;
  color: var(--jira-text-primary);
`;
