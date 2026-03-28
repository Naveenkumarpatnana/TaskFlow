import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor — attach JWT token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('taskflow_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — handle 401 globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('taskflow_token');
      localStorage.removeItem('taskflow_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ─── Auth API ───
export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),

  signup: (name: string, email: string, password: string, role: string) =>
    api.post('/auth/signup', { name, email, password, role }),

  getMe: () => api.get('/auth/me'),

  getAllUsers: () => api.get('/auth/users'),
};

// ─── Task API ───
export const taskAPI = {
  getAll: (params?: Record<string, string>) =>
    api.get('/tasks', { params }),

  getById: (id: string) => api.get(`/tasks/${id}`),

  create: (data: Record<string, any>) => api.post('/tasks', data),

  update: (id: string, data: Record<string, any>) =>
    api.put(`/tasks/${id}`, data),

  delete: (id: string) => api.delete(`/tasks/${id}`),
};

// ─── Dashboard API ───
export const dashboardAPI = {
  getAnalytics: () => api.get('/dashboard/analytics'),
};

// ─── Sprint API ───
export const sprintAPI = {
  getAll: () => api.get('/sprints'),

  create: (data?: Record<string, any>) => api.post('/sprints', data || {}),

  update: (id: string, data: Record<string, any>) =>
    api.put(`/sprints/${id}`, data),

  start: (id: string, data?: { startDate?: string; endDate?: string }) =>
    api.put(`/sprints/${id}/start`, data || {}),

  complete: (id: string) => api.put(`/sprints/${id}/complete`),

  moveTask: (taskId: string, sprintId: string | null) =>
    api.post('/sprints/move-task', { taskId, sprintId }),
};

// ─── Comment API ───
export const commentAPI = {
  getByTask: (taskId: string) => api.get(`/comments/${taskId}`),

  add: (taskId: string, text: string) =>
    api.post(`/comments/${taskId}`, { text }),

  delete: (commentId: string) => api.delete(`/comments/delete/${commentId}`),
};

export default api;
