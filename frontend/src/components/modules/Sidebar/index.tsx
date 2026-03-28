'use client';

import React from 'react';
import {
  SidebarContainer, LogoSection, LogoIcon, LogoText,
  NavSection, NavItem, NavIcon, SectionLabel,
  SpaceItem, SpaceIcon, Divider, TryBadge, ChevronIcon,
  UserSection, UserAvatar, UserInfo, UserName, UserRole,
} from './styled';
import { useThemeStore } from '@/stores/themeStore';
import { useAuthStore } from '@/stores/authStore';
import { getLabel } from '@/i18n/translator';
import { getInitials } from '@/utils/helpers';
import { SIDEBAR_LABELS } from '@/labels/sidebarLabels';

const Sidebar: React.FC = () => {
  const { language } = useThemeStore();
  const { user, logout } = useAuthStore();

  return (
    <SidebarContainer>
      <LogoSection>
        <LogoIcon>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
            <path d="M11.53 2.77a1.08 1.08 0 011.07 0 1 1 0 01.4.4l8.63 14.93a1.08 1.08 0 01-.93 1.62H3.3a1.08 1.08 0 01-.93-1.62L11.13 3.2a1 1 0 01.4-.43z"/>
          </svg>
        </LogoIcon>
        <LogoText>Jira</LogoText>
      </LogoSection>

      <NavSection>
        <NavItem href="/dashboard">
          <NavIcon>🏠</NavIcon>
          {getLabel(SIDEBAR_LABELS.forYou, language)}
        </NavItem>
        <NavItem href="/dashboard">
          <NavIcon>📐</NavIcon>
          {getLabel(SIDEBAR_LABELS.spaces, language)}
        </NavItem>
      </NavSection>

      <SectionLabel>Recent</SectionLabel>
      <NavSection>
        <SpaceItem href="/dashboard" $active={true}>
          <SpaceIcon $color="#e2483d">N</SpaceIcon>
          {getLabel(SIDEBAR_LABELS.spaceName, language)}
        </SpaceItem>
        <NavItem href="#">
          <NavIcon>▸</NavIcon>
          {getLabel(SIDEBAR_LABELS.moreSpaces, language)}
          <ChevronIcon>›</ChevronIcon>
        </NavItem>
      </NavSection>

      <SectionLabel>{getLabel(SIDEBAR_LABELS.recommended, language)}</SectionLabel>
      <NavSection>
        <NavItem href="#">
          <NavIcon>📥</NavIcon>
          {getLabel(SIDEBAR_LABELS.collectRequests, language)}
          <TryBadge>TRY</TryBadge>
        </NavItem>
        <NavItem href="#">
          <NavIcon>📤</NavIcon>
          {getLabel(SIDEBAR_LABELS.importWork, language)}
        </NavItem>
      </NavSection>

      <Divider />
      <NavSection>
        <NavItem href="#">
          <NavIcon>•••</NavIcon>
          {getLabel(SIDEBAR_LABELS.more, language)}
        </NavItem>
      </NavSection>

      <UserSection>
        <UserAvatar>{user ? getInitials(user.name) : '?'}</UserAvatar>
        <UserInfo>
          <UserName>{user?.name || ''}</UserName>
          <UserRole>{user?.role || ''}</UserRole>
        </UserInfo>
        <NavItem
          as="button"
          onClick={logout}
          style={{ padding: '4px 8px', width: 'auto', background: 'transparent', border: 'none', cursor: 'pointer' }}
        >
          <NavIcon>🚪</NavIcon>
        </NavItem>
      </UserSection>
    </SidebarContainer>
  );
};

export default Sidebar;
