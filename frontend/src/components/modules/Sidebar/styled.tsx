import styled from 'styled-components';

export const SidebarContainer = styled.aside`
  width: 240px;
  min-height: 100vh;
  background: var(--jira-sidebar-bg);
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  border-right: 1px solid var(--jira-border);
  overflow-y: auto;
`;

export const LogoSection = styled.div`
  padding: 12px 12px 8px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const LogoIcon = styled.div`
  width: 28px;
  height: 28px;
  background: linear-gradient(135deg, #2684ff, #0052cc);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 800;
  color: #fff;
`;

export const LogoText = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: var(--jira-text-bright);
`;

export const NavSection = styled.nav`
  padding: 4px 8px;
  display: flex;
  flex-direction: column;
  gap: 1px;
`;

export const NavItem = styled.a<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 400;
  color: ${({ $active }) => ($active ? 'var(--jira-text-bright)' : 'var(--jira-text-primary)')};
  background: ${({ $active }) => ($active ? 'var(--jira-sidebar-active)' : 'transparent')};
  text-decoration: none;
  cursor: pointer;
  transition: background 0.1s ease;
  border: none;
  width: 100%;
  text-align: left;

  &:hover {
    background: var(--jira-sidebar-hover);
  }
`;

export const NavIcon = styled.span`
  font-size: 16px;
  display: inline-flex;
  align-items: center;
  width: 20px;
  justify-content: center;
`;

export const SectionLabel = styled.div`
  padding: 16px 12px 4px;
  font-size: 11px;
  font-weight: 700;
  color: var(--jira-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const SpaceItem = styled.a<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 14px;
  color: var(--jira-text-primary);
  background: ${({ $active }) => ($active ? '#0052cc22' : 'transparent')};
  cursor: pointer;
  transition: background 0.1s ease;
  text-decoration: none;

  &:hover {
    background: var(--jira-sidebar-hover);
  }
`;

export const SpaceIcon = styled.div<{ $color?: string }>`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  background: ${({ $color }) => $color || '#0052cc'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 700;
  color: #fff;
`;

export const Divider = styled.div`
  height: 1px;
  background: var(--jira-border);
  margin: 4px 12px;
`;

export const UserSection = styled.div`
  padding: 12px;
  border-top: 1px solid var(--jira-border);
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: auto;
`;

export const UserAvatar = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #0052cc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  color: #fff;
`;

export const UserInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const UserName = styled.p`
  margin: 0;
  font-size: 13px;
  font-weight: 500;
  color: var(--jira-text-bright);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const UserRole = styled.p`
  margin: 0;
  font-size: 11px;
  color: var(--jira-text-secondary);
  text-transform: capitalize;
`;

export const TryBadge = styled.span`
  background: #0747a6;
  color: #b3d4ff;
  font-size: 10px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 3px;
  margin-left: 4px;
`;

export const ChevronIcon = styled.span`
  font-size: 12px;
  color: var(--jira-text-secondary);
  margin-left: auto;
`;
