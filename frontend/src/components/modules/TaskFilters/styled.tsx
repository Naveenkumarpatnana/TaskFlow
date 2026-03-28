import styled from 'styled-components';

export const FiltersContainer = styled.div<{ $isDark?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  padding: 16px 0;
`;

export const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const FilterSelect = styled.select<{ $isDark?: boolean }>`
  padding: 8px 32px 8px 12px;
  border-radius: 8px;
  font-size: 0.813rem;
  font-weight: 500;
  border: 1px solid ${({ $isDark }) => ($isDark ? '#374151' : '#e5e7eb')};
  background: ${({ $isDark }) => ($isDark ? '#1f2937' : '#ffffff')};
  color: ${({ $isDark }) => ($isDark ? '#d1d5db' : '#374151')};
  cursor: pointer;
  outline: none;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 14px;

  &:focus {
    border-color: #6366f1;
  }
`;

export const SearchInput = styled.input<{ $isDark?: boolean }>`
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 0.813rem;
  border: 1px solid ${({ $isDark }) => ($isDark ? '#374151' : '#e5e7eb')};
  background: ${({ $isDark }) => ($isDark ? '#1f2937' : '#ffffff')};
  color: ${({ $isDark }) => ($isDark ? '#d1d5db' : '#374151')};
  outline: none;
  min-width: 200px;

  &::placeholder {
    color: ${({ $isDark }) => ($isDark ? '#6b7280' : '#9ca3af')};
  }

  &:focus {
    border-color: #6366f1;
  }
`;
