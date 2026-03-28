import { create } from 'zustand';
import { taskAPI } from '@/services/api';
import { ITask, ITaskFilters, ICreateTask, IUpdateTask, TaskStatus } from '@/types/task.types';

interface TaskState {
  tasks: ITask[];
  filters: ITaskFilters;
  isLoading: boolean;
  error: string | null;

  fetchTasks: () => Promise<void>;
  createTask: (data: ICreateTask) => Promise<void>;
  updateTask: (id: string, data: IUpdateTask) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  moveTask: (taskId: string, newStatus: TaskStatus) => Promise<void>;
  setFilters: (filters: Partial<ITaskFilters>) => void;
  clearFilters: () => void;
  addTaskRealtime: (task: ITask) => void;
  updateTaskRealtime: (task: ITask) => void;
  removeTaskRealtime: (taskId: string) => void;
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  filters: {},
  isLoading: false,
  error: null,

  fetchTasks: async () => {
    set({ isLoading: true, error: null });
    try {
      const { filters } = get();
      const params: Record<string, string> = {};
      if (filters.status) params.status = filters.status;
      if (filters.priority) params.priority = filters.priority;
      if (filters.assignee) params.assignee = filters.assignee;
      if (filters.search) params.search = filters.search;

      const res = await taskAPI.getAll(params);
      set({ tasks: res.data.data.tasks, isLoading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to fetch tasks.',
        isLoading: false,
      });
    }
  },

  createTask: async (data) => {
    set({ isLoading: true, error: null });
    try {
      await taskAPI.create(data);
      await get().fetchTasks();
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to create task.',
        isLoading: false,
      });
      throw error;
    }
  },

  updateTask: async (id, data) => {
    try {
      await taskAPI.update(id, data);
      await get().fetchTasks();
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to update task.',
      });
      throw error;
    }
  },

  deleteTask: async (id) => {
    try {
      await taskAPI.delete(id);
      set((state) => ({
        tasks: state.tasks.filter((t) => t._id !== id),
      }));
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to delete task.',
      });
      throw error;
    }
  },

  moveTask: async (taskId, newStatus) => {
    // Optimistic update
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t._id === taskId ? { ...t, status: newStatus } : t
      ),
    }));
    try {
      await taskAPI.update(taskId, { status: newStatus });
    } catch (error: any) {
      await get().fetchTasks(); // Revert on failure
      set({
        error: error.response?.data?.message || 'Failed to move task.',
      });
    }
  },

  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    }));
  },

  clearFilters: () => set({ filters: {} }),

  addTaskRealtime: (task) => {
    set((state) => ({
      tasks: [task, ...state.tasks],
    }));
  },

  updateTaskRealtime: (updatedTask) => {
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t._id === updatedTask._id ? updatedTask : t
      ),
    }));
  },

  removeTaskRealtime: (taskId) => {
    set((state) => ({
      tasks: state.tasks.filter((t) => t._id !== taskId),
    }));
  },
}));
