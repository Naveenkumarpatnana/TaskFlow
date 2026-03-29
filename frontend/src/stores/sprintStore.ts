import { create } from 'zustand';
import { sprintAPI } from '@/services/api';
import { useTaskStore } from '@/stores/taskStore';
import { ISprint, ITask } from '@/types/task.types';

interface BacklogData {
  tasks: ITask[];
  totalItems: number;
}

interface SprintState {
  sprints: ISprint[];
  backlog: BacklogData;
  isLoading: boolean;
  error: string | null;

  fetchSprints: () => Promise<void>;
  createSprint: (data?: Record<string, any>) => Promise<void>;
  startSprint: (id: string, data?: { startDate?: string; endDate?: string }) => Promise<void>;
  completeSprint: (id: string) => Promise<void>;
  deleteSprint: (id: string) => Promise<void>;
  moveTaskToSprint: (taskId: string, sprintId: string | null) => Promise<void>;
}

export const useSprintStore = create<SprintState>((set, get) => ({
  sprints: [],
  backlog: { tasks: [], totalItems: 0 },
  isLoading: false,
  error: null,

  fetchSprints: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await sprintAPI.getAll();
      set({
        sprints: res.data.data.sprints,
        backlog: res.data.data.backlog,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to fetch sprints.',
        isLoading: false,
      });
    }
  },

  createSprint: async (data) => {
    try {
      await sprintAPI.create(data);
      await get().fetchSprints();
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to create sprint.' });
    }
  },

  startSprint: async (id, data) => {
    try {
      await sprintAPI.start(id, data);
      await get().fetchSprints();
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to start sprint.' });
    }
  },

  completeSprint: async (id) => {
    try {
      await sprintAPI.complete(id);
      await get().fetchSprints();
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to complete sprint.' });
    }
  },

  deleteSprint: async (id) => {
    try {
      await sprintAPI.delete(id);
      await get().fetchSprints();
      await useTaskStore.getState().fetchTasks();
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to delete sprint.' });
    }
  },

  moveTaskToSprint: async (taskId, sprintId) => {
    try {
      await sprintAPI.moveTask(taskId, sprintId);
      await get().fetchSprints();
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to move task.' });
    }
  },
}));
