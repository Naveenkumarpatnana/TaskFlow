export const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatDateShort = (dateString: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};

export const formatDateRange = (start?: string, end?: string): string => {
  if (!start || !end) return '';
  const s = new Date(start);
  const e = new Date(end);
  const sMonth = s.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
  const eMonth = e.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
  return `${sMonth} – ${eMonth}`;
};

export const getInitials = (name: string): string => {
  if (!name) return '?';
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const getPriorityColor = (priority: string): string => {
  const colors: Record<string, string> = {
    low: '#22c55e',
    medium: '#f59e0b',
    high: '#ef4444',
    critical: '#dc2626',
  };
  return colors[priority] || '#6b7280';
};

export const getStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    todo: '#6b778c',
    inprogress: '#0052cc',
    inreview: '#0052cc',
    completed: '#36b37e',
  };
  return colors[status] || '#6b7280';
};

export const getStatusBgColor = (status: string): string => {
  const colors: Record<string, string> = {
    todo: '#42526e',
    inprogress: '#0052cc',
    inreview: '#0052cc',
    completed: '#36b37e',
  };
  return colors[status] || '#42526e';
};

export const debounce = <T extends (...args: any[]) => void>(
  fn: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timer: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

export const isOverdue = (dueDate: string | undefined): boolean => {
  if (!dueDate) return false;
  return new Date(dueDate) < new Date();
};

export const timeAgo = (dateString: string): string => {
  const seconds = Math.floor(
    (new Date().getTime() - new Date(dateString).getTime()) / 1000
  );
  const intervals: [number, string][] = [
    [31536000, 'year'],
    [2592000, 'month'],
    [86400, 'day'],
    [3600, 'hour'],
    [60, 'minute'],
  ];
  for (const [secs, label] of intervals) {
    const count = Math.floor(seconds / secs);
    if (count >= 1) return `${count} ${label}${count > 1 ? 's' : ''} ago`;
  }
  return 'just now';
};

export const getTaskTypeIcon = (index: number): string => {
  const icons = ['📋', '📄', '🔧', '🐛', '✨'];
  return icons[index % icons.length];
};

export const generateScrumId = (projectKey: string, index: number): string => {
  return `${projectKey}-${index + 1}`;
};
