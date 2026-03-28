import styled from 'styled-components';

export const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid var(--jira-border);
`;

export const TopBar = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 24px;
  gap: 12px;
  background: var(--jira-header-bg);
  border-bottom: 1px solid var(--jira-border);
`;

export const SearchBox = styled.div`
  flex: 1;
  max-width: 400px;
  position: relative;

  input {
    width: 100%;
    padding: 6px 12px 6px 32px;
    background: var(--jira-card);
    border: 1px solid var(--jira-border);
    border-radius: 5px;
    color: var(--jira-text-primary);
    font-size: 14px;
    outline: none;
    transition: border-color 0.15s;

    &::placeholder {
      color: var(--jira-text-secondary);
    }

    &:focus {
      border-color: var(--jira-accent-blue);
    }
  }
`;

export const SearchIcon = styled.span`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  color: var(--jira-text-secondary);
`;

export const CreateButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  background: var(--jira-blue-button);
  color: #1d2125;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
  white-space: nowrap;

  &:hover {
    background: var(--jira-blue-button-hover);
  }
`;

export const SeePlansButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  background: transparent;
  color: var(--jira-accent-green);
  border: 1px solid var(--jira-accent-green);
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background: rgba(75, 206, 151, 0.1);
  }
`;

export const HeaderIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: auto;
`;

export const IconButton = styled.button`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: 4px;
  color: var(--jira-text-primary);
  cursor: pointer;
  font-size: 16px;
  transition: background 0.1s;

  &:hover {
    background: var(--jira-sidebar-hover);
  }
`;

export const UserAvatarSmall = styled.div`
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
  cursor: pointer;
`;

export const SpaceHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 24px 0;
  gap: 8px;
`;

export const SpaceLabel = styled.span`
  font-size: 12px;
  color: var(--jira-text-secondary);
`;

export const SpaceName = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: var(--jira-text-bright);
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
`;

export const SpaceIconSmall = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 4px;
  background: #e2483d;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  color: #fff;
`;

export const TabsBar = styled.div`
  display: flex;
  align-items: center;
  padding: 0 24px;
  gap: 0;
  overflow-x: auto;
`;

export const Tab = styled.button<{ $active?: boolean }>`
  padding: 12px 16px;
  background: transparent;
  border: none;
  border-bottom: 2px solid ${({ $active }) => ($active ? 'var(--jira-accent-blue)' : 'transparent')};
  color: ${({ $active }) => ($active ? 'var(--jira-accent-blue)' : 'var(--jira-text-primary)')};
  font-size: 14px;
  font-weight: ${({ $active }) => ($active ? '600' : '400')};
  cursor: pointer;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: color 0.15s, border-color 0.15s;

  &:hover {
    color: var(--jira-text-bright);
  }
`;

export const TabIcon = styled.span`
  font-size: 14px;
`;

export const SpaceActions = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: auto;
`;

export const SpaceSubHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 0 24px;
  gap: 8px;
`;

/* ─── Dropdown Containers ─── */
export const DropdownWrapper = styled.div`
  position: relative;
`;

export const DropdownPanel = styled.div<{ $open: boolean }>`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 320px;
  background: var(--jira-surface);
  border: 1px solid var(--jira-border);
  border-radius: 8px;
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.45);
  z-index: 300;
  display: ${({ $open }) => ($open ? 'block' : 'none')};
  overflow: hidden;
`;

export const DropdownHeader = styled.div`
  padding: 16px;
  border-bottom: 1px solid var(--jira-border);
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ProfileAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #0052cc, #4c9aff);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 700;
  color: #fff;
  flex-shrink: 0;
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const ProfileName = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: var(--jira-text-bright);
`;

export const ProfileEmail = styled.span`
  font-size: 12px;
  color: var(--jira-text-secondary);
`;

export const RoleBadge = styled.span<{ $role: string }>`
  display: inline-block;
  padding: 2px 8px;
  border-radius: 3px;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  margin-top: 2px;
  width: fit-content;
  background: ${({ $role }) =>
    $role === 'admin' ? '#e2483d' : $role === 'manager' ? '#ff991f' : '#00875a'};
  color: #fff;
`;

export const DropdownDivider = styled.div`
  height: 1px;
  background: var(--jira-border);
`;

export const DropdownMenuItem = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px 16px;
  background: transparent;
  border: none;
  color: var(--jira-text-primary);
  font-size: 14px;
  cursor: pointer;
  text-align: left;

  &:hover { background: var(--jira-card-hover); }
`;

export const MenuItemIcon = styled.span`
  font-size: 16px;
  width: 20px;
  text-align: center;
`;

export const MenuItemDanger = styled(DropdownMenuItem)`
  color: var(--jira-accent-red);
  &:hover { background: rgba(226, 72, 61, 0.1); }
`;

/* ─── Settings Panel ─── */
export const SettingsSection = styled.div`
  padding: 12px 16px;
`;

export const SettingsLabel = styled.div`
  font-size: 11px;
  font-weight: 700;
  color: var(--jira-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
`;

export const SettingsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
`;

export const SettingsRowLabel = styled.span`
  font-size: 14px;
  color: var(--jira-text-primary);
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ToggleSwitch = styled.button<{ $on: boolean }>`
  width: 40px;
  height: 22px;
  border-radius: 11px;
  border: none;
  background: ${({ $on }) => ($on ? 'var(--jira-accent-blue)' : '#6b778c')};
  cursor: pointer;
  position: relative;
  transition: background 0.2s;

  &::after {
    content: '';
    position: absolute;
    top: 3px;
    left: ${({ $on }) => ($on ? '20px' : '3px')};
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #fff;
    transition: left 0.2s;
  }
`;

export const LangSelect = styled.select`
  padding: 6px 10px;
  background: var(--jira-card);
  border: 1px solid var(--jira-border);
  border-radius: 4px;
  color: var(--jira-text-primary);
  font-size: 13px;
  cursor: pointer;
  outline: none;

  &:focus { border-color: var(--jira-accent-blue); }

  option {
    background: var(--jira-surface);
    color: var(--jira-text-primary);
  }
`;

