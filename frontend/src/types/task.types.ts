export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'inprogress',
  IN_REVIEW = 'inreview',
  COMPLETED = 'completed',
}

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

export interface ITask {
  _id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee: ITaskUser;
  reporter: ITaskUser;
  sprint?: string;
  dueDate?: string;
  tags: string[];
  estimatedHours?: number;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ITaskUser {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export interface ICreateTask {
  title: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  assignee: string;
  sprint?: string;
  dueDate?: string;
  tags?: string[];
  estimatedHours?: number;
}

export interface IUpdateTask {
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  assignee?: string;
  sprint?: string;
  dueDate?: string;
  tags?: string[];
  estimatedHours?: number;
}

export interface ITaskFilters {
  status?: TaskStatus | '';
  priority?: TaskPriority | '';
  assignee?: string;
  search?: string;
}

export interface IPagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface ISprint {
  _id: string;
  name: string;
  projectKey: string;
  sprintNumber: number;
  startDate?: string;
  endDate?: string;
  status: 'planning' | 'active' | 'completed';
  goal?: string;
  tasks: ITask[];
  statusCounts: {
    todo: number;
    inprogress: number;
    inreview: number;
    completed: number;
  };
  totalItems: number;
  createdAt: string;
  updatedAt: string;
}
