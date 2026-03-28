'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  SwitcherWrapper, SwitcherButton, DropdownMenu, DropdownItem, LangNative,
} from './styled';
import { useThemeStore } from '@/stores/themeStore';
import { SUPPORTED_LANGUAGES, SupportedLanguage } from '@/i18n/languages';

const LanguageSwitcher: React.FC = () => {
  const { isDarkMode, language, setLanguage } = useThemeStore();
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const currentLang = SUPPORTED_LANGUAGES.find((l) => l.code === language);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code: SupportedLanguage) => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <SwitcherWrapper ref={wrapperRef}>
      <SwitcherButton $isDark={isDarkMode} onClick={() => setIsOpen(!isOpen)}>
        🌐 {currentLang?.nativeName || 'English'}
      </SwitcherButton>
      <DropdownMenu $isDark={isDarkMode} $isOpen={isOpen}>
        {SUPPORTED_LANGUAGES.map((lang) => (
          <DropdownItem
            key={lang.code}
            $isDark={isDarkMode}
            $active={language === lang.code}
            onClick={() => handleSelect(lang.code)}
          >
            {lang.name}
            <LangNative>{lang.nativeName}</LangNative>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </SwitcherWrapper>
  );
};

export default LanguageSwitcher;
