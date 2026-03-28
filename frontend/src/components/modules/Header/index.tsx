'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  HeaderWrapper, TopBar, SearchBox, SearchIcon,
  CreateButton, SeePlansButton, HeaderIcons, IconButton, UserAvatarSmall,
  SpaceHeader, SpaceLabel, SpaceName, SpaceIconSmall,
  TabsBar, Tab, TabIcon, SpaceActions, SpaceSubHeader,
  DropdownWrapper, DropdownPanel, DropdownHeader,
  ProfileAvatar, ProfileInfo, ProfileName, ProfileEmail, RoleBadge,
  DropdownDivider, DropdownMenuItem, MenuItemIcon, MenuItemDanger,
  SettingsSection, SettingsLabel, SettingsRow, SettingsRowLabel,
  ToggleSwitch, LangSelect,
} from './styled';
import { useThemeStore } from '@/stores/themeStore';
import { useAuthStore } from '@/stores/authStore';
import { getLabel } from '@/i18n/translator';
import { getInitials } from '@/utils/helpers';
import { HEADER_LABELS } from '@/labels/headerLabels';
import { SIDEBAR_LABELS } from '@/labels/sidebarLabels';
import { SUPPORTED_LANGUAGES, SupportedLanguage } from '@/i18n/languages';

export type ViewTab = 'summary' | 'backlog' | 'board';

interface HeaderProps {
  activeTab: ViewTab;
  onTabChange: (tab: ViewTab) => void;
  onCreateTask?: () => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange, onCreateTask }) => {
  const router = useRouter();
  const { isDarkMode, language, setLanguage, toggleDarkMode } = useThemeStore();
  const { user, logout } = useAuthStore();

  const [profileOpen, setProfileOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
      if (settingsRef.current && !settingsRef.current.contains(e.target as Node)) {
        setSettingsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const handleToggleProfile = () => {
    setProfileOpen(!profileOpen);
    setSettingsOpen(false);
  };

  const handleToggleSettings = () => {
    setSettingsOpen(!settingsOpen);
    setProfileOpen(false);
  };

  const tabs: { key: ViewTab | string; icon: string; labelKey: string; enabled: boolean }[] = [
    { key: 'summary', icon: '📊', labelKey: 'header.summary', enabled: true },
    { key: 'backlog', icon: '📋', labelKey: 'header.backlog', enabled: true },
    { key: 'board', icon: '📌', labelKey: 'header.board', enabled: true },
    { key: 'code', icon: '⟨/⟩', labelKey: 'header.code', enabled: false },
    { key: 'timeline', icon: '📈', labelKey: 'header.timeline', enabled: false },
    { key: 'pages', icon: '📄', labelKey: 'header.pages', enabled: false },
    { key: 'forms', icon: '📝', labelKey: 'header.forms', enabled: false },
  ];

  return (
    <HeaderWrapper>
      {/* Top Bar */}
      <TopBar>
        <SearchBox>
          <SearchIcon>🔍</SearchIcon>
          <input placeholder={getLabel(HEADER_LABELS.search, language)} />
        </SearchBox>
        {onCreateTask && (
          <CreateButton onClick={onCreateTask}>
            + {getLabel(HEADER_LABELS.create, language)}
          </CreateButton>
        )}
        <SeePlansButton>
          ✦ {getLabel('header.seePlans', language)}
        </SeePlansButton>
        <HeaderIcons>
          <IconButton title={getLabel('header.notifications', language)}>🔔</IconButton>

          {/* Settings Dropdown */}
          <DropdownWrapper ref={settingsRef}>
            <IconButton onClick={handleToggleSettings}>⚙️</IconButton>
            <DropdownPanel $open={settingsOpen}>
              <SettingsSection>
                <SettingsLabel>{getLabel('common.language', language)}</SettingsLabel>
                <SettingsRow>
                  <SettingsRowLabel>🌐 {getLabel('common.language', language)}</SettingsRowLabel>
                  <LangSelect
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
                  >
                    {SUPPORTED_LANGUAGES.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.nativeName}
                      </option>
                    ))}
                  </LangSelect>
                </SettingsRow>
              </SettingsSection>
              <DropdownDivider />
              <SettingsSection>
                <SettingsLabel>Appearance</SettingsLabel>
                <SettingsRow>
                  <SettingsRowLabel>🌙 Dark Mode</SettingsRowLabel>
                  <ToggleSwitch $on={isDarkMode} onClick={toggleDarkMode} />
                </SettingsRow>
              </SettingsSection>
              <DropdownDivider />
              <SettingsSection>
                <SettingsLabel>Notifications</SettingsLabel>
                <SettingsRow>
                  <SettingsRowLabel>🔔 Email Notifications</SettingsRowLabel>
                  <ToggleSwitch $on={true} onClick={() => {}} />
                </SettingsRow>
                <SettingsRow>
                  <SettingsRowLabel>💬 In-App Alerts</SettingsRowLabel>
                  <ToggleSwitch $on={true} onClick={() => {}} />
                </SettingsRow>
              </SettingsSection>
            </DropdownPanel>
          </DropdownWrapper>

          {/* Profile Dropdown */}
          <DropdownWrapper ref={profileRef}>
            <UserAvatarSmall onClick={handleToggleProfile}>
              {user ? getInitials(user.name) : '?'}
            </UserAvatarSmall>
            <DropdownPanel $open={profileOpen}>
              <DropdownHeader>
                <ProfileAvatar>{user ? getInitials(user.name) : '?'}</ProfileAvatar>
                <ProfileInfo>
                  <ProfileName>{user?.name || 'User'}</ProfileName>
                  <ProfileEmail>{user?.email || ''}</ProfileEmail>
                  <RoleBadge $role={user?.role || 'employee'}>{user?.role || 'employee'}</RoleBadge>
                </ProfileInfo>
              </DropdownHeader>
              <DropdownMenuItem>
                <MenuItemIcon>👤</MenuItemIcon>
                {getLabel('header.profile', language)}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <MenuItemIcon>🔑</MenuItemIcon>
                Change Password
              </DropdownMenuItem>
              <DropdownMenuItem>
                <MenuItemIcon>📊</MenuItemIcon>
                My Activity
              </DropdownMenuItem>
              <DropdownDivider />
              <MenuItemDanger onClick={handleLogout}>
                <MenuItemIcon>🚪</MenuItemIcon>
                {getLabel('sidebar.logout', language)}
              </MenuItemDanger>
            </DropdownPanel>
          </DropdownWrapper>
        </HeaderIcons>
      </TopBar>

      {/* Space Header */}
      <SpaceHeader>
        <SpaceLabel>Spaces</SpaceLabel>
      </SpaceHeader>
      <SpaceSubHeader>
        <SpaceIconSmall>N</SpaceIconSmall>
        <SpaceName>
          {getLabel(SIDEBAR_LABELS.spaceName, language)}
          <span style={{ fontSize: '16px', cursor: 'pointer' }}>👥</span>
          <span style={{ fontSize: '14px', color: 'var(--jira-text-secondary)', cursor: 'pointer' }}>•••</span>
        </SpaceName>
        <SpaceActions>
          <IconButton>📤</IconButton>
          <IconButton>⚡</IconButton>
          <IconButton>💬</IconButton>
          <IconButton>↗️</IconButton>
        </SpaceActions>
      </SpaceSubHeader>

      {/* Tab Navigation */}
      <TabsBar>
        {tabs.map((tab) => (
          <Tab
            key={tab.key}
            $active={activeTab === tab.key}
            onClick={() => tab.enabled && onTabChange(tab.key as ViewTab)}
            style={{ opacity: tab.enabled ? 1 : 0.5, cursor: tab.enabled ? 'pointer' : 'default' }}
          >
            <TabIcon>{tab.icon}</TabIcon>
            {getLabel(tab.labelKey, language)}
          </Tab>
        ))}
        <Tab onClick={() => {}}>+</Tab>
      </TabsBar>
    </HeaderWrapper>
  );
};

export default Header;
