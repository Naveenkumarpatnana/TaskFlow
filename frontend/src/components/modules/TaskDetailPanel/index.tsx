'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Overlay, Panel, PanelHeader, PanelTitle, TaskIdBadge, TaskTypeIconLarge,
  CloseButton, PanelBody, MainSection, SideSection,
  TaskTitleInput, DescriptionBlock, DescLabel, DescriptionText, NoDescription,
  ActivitySection, ActivityHeader, ActivityTab,
  CommentInputArea, CommentAvatar, CommentEditorWrapper,
  CommentTextarea, CommentActions, SaveCommentBtn, CancelCommentBtn,
  CommentList, CommentItem, CommentBody, CommentAuthor, CommentTime,
  CommentText, CommentDeleteBtn, NoComments,
  DetailGroup, DetailLabel, DetailValue,
  StatusBadgeLarge, PriorityBadge, AssigneeDetail, AssigneeAvatarLarge,
  Divider, DateDetail,
} from './styled';
import { COMMENT_LABELS } from '@/labels/commentLabels';
import { useThemeStore } from '@/stores/themeStore';
import { useAuthStore } from '@/stores/authStore';
import { getLabel } from '@/i18n/translator';
import { getInitials, getStatusBgColor, getPriorityColor, formatDate, timeAgo, getTaskTypeIcon } from '@/utils/helpers';
import { ITask } from '@/types/task.types';
import { commentAPI } from '@/services/api';

interface IComment {
  _id: string;
  text: string;
  author: { _id: string; name: string; email: string; role: string };
  task: string;
  createdAt: string;
  updatedAt: string;
}

interface TaskDetailPanelProps {
  task: ITask;
  index?: number;
  onClose: () => void;
}

const TaskDetailPanel: React.FC<TaskDetailPanelProps> = ({ task, index = 0, onClose }) => {
  const { language } = useThemeStore();
  const { user } = useAuthStore();
  const [comments, setComments] = useState<IComment[]>([]);
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCommentEditor, setShowCommentEditor] = useState(false);

  const fetchComments = useCallback(async () => {
    try {
      const res = await commentAPI.getByTask(task._id);
      setComments(res.data.data.comments);
    } catch (err) {
      console.error('Failed to fetch comments:', err);
    }
  }, [task._id]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleAddComment = async () => {
    if (!commentText.trim() || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await commentAPI.add(task._id, commentText.trim());
      setCommentText('');
      setShowCommentEditor(false);
      await fetchComments();
    } catch (err) {
      console.error('Failed to add comment:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await commentAPI.delete(commentId);
      await fetchComments();
    } catch (err) {
      console.error('Failed to delete comment:', err);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const scrumId = `SCRUM-${index + 1}`;
  const canDeleteComment = (comment: IComment) =>
    (user as any)?.id === comment.author._id || (user as any)?._id === comment.author._id || user?.role === 'admin';

  return (
    <>
      <Overlay onClick={handleOverlayClick} />
      <Panel>
        {/* Header */}
        <PanelHeader>
          <PanelTitle>
            <TaskTypeIconLarge>{getTaskTypeIcon(index)}</TaskTypeIconLarge>
            <TaskIdBadge>{scrumId}</TaskIdBadge>
          </PanelTitle>
          <CloseButton onClick={onClose}>✕</CloseButton>
        </PanelHeader>

        {/* Body: Main + Side */}
        <PanelBody>
          <MainSection>
            {/* Task Title */}
            <TaskTitleInput>{task.title}</TaskTitleInput>

            {/* Description */}
            <DescriptionBlock>
              <DescLabel>{getLabel(COMMENT_LABELS.description, language)}</DescLabel>
              <DescriptionText>
                {task.description || <NoDescription>Add a description...</NoDescription>}
              </DescriptionText>
            </DescriptionBlock>

            {/* Activity / Comments Section */}
            <ActivitySection>
              <ActivityHeader>
                <DescLabel>{getLabel(COMMENT_LABELS.activity, language)}</DescLabel>
                <ActivityTab $active>
                  {getLabel(COMMENT_LABELS.comments, language)}
                </ActivityTab>
              </ActivityHeader>

              {/* Comment Input */}
              <CommentInputArea>
                <CommentAvatar>{user ? getInitials(user.name) : '?'}</CommentAvatar>
                <CommentEditorWrapper>
                  {!showCommentEditor ? (
                    <CommentTextarea
                      placeholder={getLabel(COMMENT_LABELS.addComment, language)}
                      onFocus={() => setShowCommentEditor(true)}
                      rows={1}
                      style={{ minHeight: 40, cursor: 'text' }}
                      readOnly
                    />
                  ) : (
                    <>
                      <CommentTextarea
                        placeholder={getLabel(COMMENT_LABELS.placeholder, language)}
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        autoFocus
                        rows={3}
                      />
                      <CommentActions>
                        <SaveCommentBtn
                          onClick={handleAddComment}
                          disabled={!commentText.trim() || isSubmitting}
                        >
                          {getLabel(COMMENT_LABELS.send, language)}
                        </SaveCommentBtn>
                        <CancelCommentBtn
                          onClick={() => { setShowCommentEditor(false); setCommentText(''); }}
                        >
                          {getLabel('common.cancel', language)}
                        </CancelCommentBtn>
                      </CommentActions>
                    </>
                  )}
                </CommentEditorWrapper>
              </CommentInputArea>

              {/* Comments List */}
              <CommentList>
                {comments.length === 0 ? (
                  <NoComments>{getLabel(COMMENT_LABELS.noComments, language)}</NoComments>
                ) : (
                  comments.map((comment) => (
                    <CommentItem key={comment._id}>
                      <CommentAvatar $color="#6b778c">
                        {getInitials(comment.author.name)}
                      </CommentAvatar>
                      <CommentBody>
                        <div>
                          <CommentAuthor>{comment.author.name}</CommentAuthor>
                          <CommentTime>{timeAgo(comment.createdAt)}</CommentTime>
                        </div>
                        <CommentText>{comment.text}</CommentText>
                        {canDeleteComment(comment) && (
                          <CommentDeleteBtn onClick={() => handleDeleteComment(comment._id)}>
                            {getLabel(COMMENT_LABELS.delete, language)}
                          </CommentDeleteBtn>
                        )}
                      </CommentBody>
                    </CommentItem>
                  ))
                )}
              </CommentList>
            </ActivitySection>
          </MainSection>

          {/* Side Panel — Details */}
          <SideSection>
            <DetailGroup>
              <DetailLabel>{getLabel(COMMENT_LABELS.status, language)}</DetailLabel>
              <DetailValue>
                <StatusBadgeLarge $color={getStatusBgColor(task.status)}>
                  {getLabel(`status.${task.status}`, language)}
                </StatusBadgeLarge>
              </DetailValue>
            </DetailGroup>

            <DetailGroup>
              <DetailLabel>{getLabel(COMMENT_LABELS.priority, language)}</DetailLabel>
              <DetailValue>
                <PriorityBadge $color={getPriorityColor(task.priority)}>
                  {getLabel(`priority.${task.priority}`, language)}
                </PriorityBadge>
              </DetailValue>
            </DetailGroup>

            <DetailGroup>
              <DetailLabel>{getLabel(COMMENT_LABELS.assignee, language)}</DetailLabel>
              <DetailValue>
                <AssigneeDetail>
                  <AssigneeAvatarLarge>
                    {getInitials(task.assignee?.name || '')}
                  </AssigneeAvatarLarge>
                  <span>{task.assignee?.name || 'Unassigned'}</span>
                </AssigneeDetail>
              </DetailValue>
            </DetailGroup>

            {task.dueDate && (
              <DetailGroup>
                <DetailLabel>{getLabel(COMMENT_LABELS.dueDate, language)}</DetailLabel>
                <DetailValue>
                  <DateDetail>📅 {formatDate(task.dueDate)}</DateDetail>
                </DetailValue>
              </DetailGroup>
            )}

            <Divider />

            <DetailGroup>
              <DetailLabel>{getLabel(COMMENT_LABELS.created, language)}</DetailLabel>
              <DetailValue>
                <DateDetail>{formatDate(task.createdAt)}</DateDetail>
              </DetailValue>
            </DetailGroup>

            <DetailGroup>
              <DetailLabel>{getLabel(COMMENT_LABELS.updated, language)}</DetailLabel>
              <DetailValue>
                <DateDetail>{timeAgo(task.updatedAt)}</DateDetail>
              </DetailValue>
            </DetailGroup>
          </SideSection>
        </PanelBody>
      </Panel>
    </>
  );
};

export default TaskDetailPanel;
