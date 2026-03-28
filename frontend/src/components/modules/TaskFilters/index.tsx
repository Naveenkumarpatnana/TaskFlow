'use client';

import React, { useCallback } from 'react';
import { FiltersContainer, FilterSelect, SearchInput } from './styled';
import { useThemeStore } from '@/stores/themeStore';
import { useTaskStore } from '@/stores/taskStore';
import { getLabel } from '@/i18n/translator';
import { TASK_FILTERS_LABELS } from './labels';
import { debounce } from '@/utils/helpers';

const TaskFilters: React.FC = () => {
  const { isDarkMode, language } = useThemeStore();
  const { filters, setFilters, fetchTasks } = useTaskStore();

  const debouncedFetch = useCallback(
    debounce(() => {
      fetchTasks();
    }, 400),
    [fetchTasks]
  );

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ status: e.target.value as any });
    setTimeout(() => fetchTasks(), 0);
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ priority: e.target.value as any });
    setTimeout(() => fetchTasks(), 0);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ search: e.target.value });
    debouncedFetch();
  };

  return (
    <FiltersContainer $isDark={isDarkMode}>
      <SearchInput
        $isDark={isDarkMode}
        placeholder={getLabel(TASK_FILTERS_LABELS.search, language)}
        value={filters.search || ''}
        onChange={handleSearchChange}
      />

      <FilterSelect $isDark={isDarkMode} value={filters.status || ''} onChange={handleStatusChange}>
        <option value="">{getLabel(TASK_FILTERS_LABELS.all, language)} {getLabel(TASK_FILTERS_LABELS.status, language)}</option>
        <option value="todo">{getLabel('status.todo', language)}</option>
        <option value="inprogress">{getLabel('status.inprogress', language)}</option>
        <option value="completed">{getLabel('status.completed', language)}</option>
      </FilterSelect>

      <FilterSelect $isDark={isDarkMode} value={filters.priority || ''} onChange={handlePriorityChange}>
        <option value="">{getLabel(TASK_FILTERS_LABELS.all, language)} {getLabel(TASK_FILTERS_LABELS.priority, language)}</option>
        <option value="low">{getLabel('priority.low', language)}</option>
        <option value="medium">{getLabel('priority.medium', language)}</option>
        <option value="high">{getLabel('priority.high', language)}</option>
        <option value="critical">{getLabel('priority.critical', language)}</option>
      </FilterSelect>
    </FiltersContainer>
  );
};

export default TaskFilters;
