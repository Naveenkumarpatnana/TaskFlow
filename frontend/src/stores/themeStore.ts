import { create } from 'zustand';
import { SupportedLanguage, DEFAULT_LANGUAGE } from '@/i18n/languages';

interface ThemeState {
  isDarkMode: boolean;
  language: SupportedLanguage;
  toggleTheme: () => void;
  setLanguage: (lang: SupportedLanguage) => void;
  loadPreferences: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  isDarkMode: false,
  language: DEFAULT_LANGUAGE,

  toggleTheme: () => {
    set((state) => {
      const newMode = !state.isDarkMode;
      if (typeof window !== 'undefined') {
        localStorage.setItem('taskflow_darkmode', String(newMode));
      }
      return { isDarkMode: newMode };
    });
  },

  setLanguage: (lang) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('taskflow_language', lang);
    }
    set({ language: lang });
  },

  loadPreferences: () => {
    if (typeof window === 'undefined') return;
    const darkMode = localStorage.getItem('taskflow_darkmode') === 'true';
    const lang =
      (localStorage.getItem('taskflow_language') as SupportedLanguage) ||
      DEFAULT_LANGUAGE;
    set({ isDarkMode: darkMode, language: lang });
  },
}));
