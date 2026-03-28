'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PageWrapper, MainContent, ContentArea, FormGrid } from './styled';
import Sidebar from '@/components/modules/Sidebar';
import Header, { ViewTab } from '@/components/modules/Header';
import SummaryView from '@/components/modules/SummaryView';
import BacklogView from '@/components/modules/BacklogView';
import TaskBoard from '@/components/modules/TaskBoard';
import TaskDetailPanel from '@/components/modules/TaskDetailPanel';
import Modal from '@/components/common/Modal';
import Input from '@/components/common/Input';
import Select from '@/components/common/Select';
import Button from '@/components/common/Button';
import { useAuthStore } from '@/stores/authStore';
import { useThemeStore } from '@/stores/themeStore';
import { useTaskStore } from '@/stores/taskStore';
import { dashboardAPI, authAPI } from '@/services/api';
import { getLabel } from '@/i18n/translator';
import { TASK_LABELS } from '@/labels/taskLabels';
import { COMMON_LABELS } from '@/labels/commonLabels';
import { useSocket } from '@/hooks/useSocket';
import { ITask, TaskStatus, TaskPriority } from '@/types/task.types';
import { UserRole } from '@/types/user.types';

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, user, loadFromStorage } = useAuthStore();
  const { language, loadPreferences } = useThemeStore();
  const { fetchTasks, createTask, updateTask, deleteTask } = useTaskStore();
  const { connect } = useSocket();

  const [activeTab, setActiveTab] = useState<ViewTab>('summary');
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);

  // Detail panel state
  const [detailTask, setDetailTask] = useState<ITask | null>(null);
  const [detailTaskIndex, setDetailTaskIndex] = useState(0);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState<ITask | null>(null);
  const [users, setUsers] = useState<Array<{ _id: string; name: string; email: string }>>([]);

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<TaskStatus>(TaskStatus.TODO);
  const [priority, setPriority] = useState<TaskPriority>(TaskPriority.MEDIUM);
  const [assignee, setAssignee] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    loadFromStorage();
    loadPreferences();
    setIsReady(true);
  }, [loadFromStorage, loadPreferences]);

  useEffect(() => {
    if (!isReady) return;
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    connect();
    fetchTasks();
    loadUsers();
  }, [isReady, isAuthenticated, router, connect, fetchTasks]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await dashboardAPI.getAnalytics();
        setDashboardData(res.data.data);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    if (isAuthenticated) fetchData();
  }, [isAuthenticated]);

  const loadUsers = async () => {
    try {
      const res = await authAPI.getAllUsers();
      setUsers(res.data.data.users);
    } catch { console.error('Failed to load users'); }
  };

  const canCreateTask = user?.role === UserRole.ADMIN || user?.role === UserRole.MANAGER;
  const canDeleteTask = user?.role === UserRole.ADMIN;

  const resetForm = () => {
    setTitle(''); setDescription('');
    setStatus(TaskStatus.TODO); setPriority(TaskPriority.MEDIUM);
    setAssignee(''); setDueDate(''); setEditingTask(null);
  };

  const handleOpenCreate = () => { resetForm(); setShowModal(true); };

  const handleOpenDetail = (task: ITask) => {
    const tasks = useTaskStore.getState().tasks;
    const idx = tasks.findIndex((t) => t._id === task._id);
    setDetailTask(task);
    setDetailTaskIndex(idx >= 0 ? idx : 0);
  };

  const handleOpenEdit = (task: ITask) => {
    setEditingTask(task);
    setTitle(task.title);
    setDescription(task.description);
    setStatus(task.status);
    setPriority(task.priority);
    setAssignee(task.assignee?._id || '');
    setDueDate(task.dueDate ? task.dueDate.split('T')[0] : '');
    setShowModal(true);
  };

  const handleSubmit = async () => {
    try {
      if (editingTask) {
        await updateTask(editingTask._id, { title, description, status, priority, assignee, dueDate: dueDate || undefined });
      } else {
        await createTask({ title, description, status, priority, assignee, dueDate: dueDate || undefined });
      }
      setShowModal(false);
      resetForm();
    } catch {}
  };

  const handleDelete = async (taskId: string) => {
    if (window.confirm(getLabel('task.delete', language) + '?')) {
      await deleteTask(taskId);
    }
  };

  if (!isAuthenticated) return null;

  const statusOptions = [
    { value: TaskStatus.TODO, label: getLabel('status.todo', language) },
    { value: TaskStatus.IN_PROGRESS, label: getLabel('status.inprogress', language) },
    { value: TaskStatus.IN_REVIEW, label: getLabel('status.inreview', language) },
    { value: TaskStatus.COMPLETED, label: getLabel('status.completed', language) },
  ];

  const priorityOptions = [
    { value: TaskPriority.LOW, label: getLabel('priority.low', language) },
    { value: TaskPriority.MEDIUM, label: getLabel('priority.medium', language) },
    { value: TaskPriority.HIGH, label: getLabel('priority.high', language) },
    { value: TaskPriority.CRITICAL, label: getLabel('priority.critical', language) },
  ];

  const userOptions = users.map((u) => ({ value: u._id, label: u.name }));

  return (
    <PageWrapper>
      <Sidebar />
      <MainContent>
        <Header
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onCreateTask={canCreateTask ? handleOpenCreate : undefined}
        />
        <ContentArea>
          {activeTab === 'summary' && (
            <SummaryView data={dashboardData} isLoading={isLoading} />
          )}
          {activeTab === 'backlog' && (
            <BacklogView
              onCreateTask={canCreateTask ? handleOpenCreate : undefined}
              onEditTask={handleOpenDetail}
            />
          )}
          {activeTab === 'board' && (
            <TaskBoard
              onEditTask={handleOpenDetail}
              onDeleteTask={canDeleteTask ? handleDelete : undefined}
              onCreateTask={canCreateTask ? handleOpenCreate : undefined}
            />
          )}
        </ContentArea>

        {/* Create/Edit Task Modal */}
        <Modal
          isOpen={showModal}
          onClose={() => { setShowModal(false); resetForm(); }}
          title={getLabel(editingTask ? TASK_LABELS.edit : TASK_LABELS.create, language)}
          footer={
            <>
              <Button variant="secondary" onClick={() => { setShowModal(false); resetForm(); }}>
                {getLabel(COMMON_LABELS.cancel, language)}
              </Button>
              <Button onClick={handleSubmit}>
                {getLabel(COMMON_LABELS.save, language)}
              </Button>
            </>
          }
        >
          <Input
            label={getLabel(TASK_LABELS.title, language)}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={getLabel(TASK_LABELS.title, language)}
            required
          />
          <Input
            label={getLabel(TASK_LABELS.description, language)}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={getLabel(TASK_LABELS.description, language)}
            multiline
          />
          <FormGrid>
            <Select
              label={getLabel(TASK_LABELS.status, language)}
              options={statusOptions}
              value={status}
              onChange={(e) => setStatus(e.target.value as TaskStatus)}
            />
            <Select
              label={getLabel(TASK_LABELS.priority, language)}
              options={priorityOptions}
              value={priority}
              onChange={(e) => setPriority(e.target.value as TaskPriority)}
            />
          </FormGrid>
          <Select
            label={getLabel(TASK_LABELS.assignee, language)}
            options={userOptions}
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            placeholder={getLabel(TASK_LABELS.assignee, language)}
          />
          <Input
            label={getLabel(TASK_LABELS.dueDate, language)}
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </Modal>

        {/* Task Detail Panel with Comments */}
        {detailTask && (
          <TaskDetailPanel
            task={detailTask}
            index={detailTaskIndex}
            onClose={() => setDetailTask(null)}
          />
        )}
      </MainContent>
    </PageWrapper>
  );
}
