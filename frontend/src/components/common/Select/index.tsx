'use client';

import React from 'react';
import { SelectWrapper, SelectLabel, StyledSelect } from './styled';
import { useThemeStore } from '@/stores/themeStore';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  placeholder?: string;
}

const Select: React.FC<SelectProps> = ({ label, options, placeholder, ...props }) => {
  const { isDarkMode } = useThemeStore();

  return (
    <SelectWrapper>
      {label && <SelectLabel $isDark={isDarkMode}>{label}</SelectLabel>}
      <StyledSelect $isDark={isDarkMode} {...props}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </StyledSelect>
    </SelectWrapper>
  );
};

export default Select;
