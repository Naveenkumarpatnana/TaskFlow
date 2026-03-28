import styled from 'styled-components';

export const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
`;

export const SelectLabel = styled.label<{ $isDark?: boolean }>`
  font-size: 0.813rem;
  font-weight: 600;
  color: ${({ $isDark }) => ($isDark ? '#d1d5db' : '#374151')};
`;

export const StyledSelect = styled.select<{ $isDark?: boolean }>`
  width: 100%;
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 0.875rem;
  outline: none;
  transition: all 0.2s ease;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;
  background-color: ${({ $isDark }) => ($isDark ? '#1f2937' : '#ffffff')};
  color: ${({ $isDark }) => ($isDark ? '#f3f4f6' : '#111827')};
  border: 1.5px solid ${({ $isDark }) => ($isDark ? '#374151' : '#e5e7eb')};

  &:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
`;
