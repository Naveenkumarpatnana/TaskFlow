import styled from 'styled-components';

interface StyledBadgeProps {
  $color?: string;
  $bgColor?: string;
}

export const StyledBadge = styled.span<StyledBadgeProps>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  white-space: nowrap;
  color: ${({ $color }) => $color || '#6366f1'};
  background: ${({ $bgColor }) => $bgColor || 'rgba(99, 102, 241, 0.1)'};
`;
