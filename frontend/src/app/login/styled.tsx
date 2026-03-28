import styled, { keyframes } from 'styled-components';

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const slideIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const LoginPage = styled.div<{ $isDark?: boolean }>`
  display: flex;
  min-height: 100vh;
  background: ${({ $isDark }) =>
    $isDark
      ? 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)'
      : 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 50%, #c7d2fe 100%)'};
  background-size: 200% 200%;
  animation: ${gradientShift} 8s ease infinite;
`;

export const LoginLeft = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const BrandLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 32px;
`;

export const BrandIcon = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  box-shadow: 0 8px 24px rgba(99, 102, 241, 0.4);
`;

export const BrandName = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  color: #6366f1;
  letter-spacing: -0.03em;
`;

export const BrandTagline = styled.p`
  font-size: 1.125rem;
  color: #6b7280;
  text-align: center;
  max-width: 360px;
  line-height: 1.6;
`;

export const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 40px;
`;

export const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.9rem;
  color: #6b7280;
`;

export const FeatureIcon = styled.span`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: rgba(99, 102, 241, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
`;

export const LoginRight = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
`;

export const LoginCard = styled.div<{ $isDark?: boolean }>`
  width: 100%;
  max-width: 420px;
  background: ${({ $isDark }) =>
    $isDark ? 'rgba(31, 41, 55, 0.8)' : 'rgba(255, 255, 255, 0.9)'};
  backdrop-filter: blur(20px);
  border: 1px solid ${({ $isDark }) =>
    $isDark ? 'rgba(75, 85, 99, 0.5)' : 'rgba(255, 255, 255, 0.8)'};
  border-radius: 24px;
  padding: 40px;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.12);
  animation: ${slideIn} 0.4s ease;
`;

export const LoginTitle = styled.h2<{ $isDark?: boolean }>`
  margin: 0 0 8px;
  font-size: 1.5rem;
  font-weight: 800;
  color: ${({ $isDark }) => ($isDark ? '#f3f4f6' : '#111827')};
`;

export const LoginSubtitle = styled.p<{ $isDark?: boolean }>`
  margin: 0 0 28px;
  font-size: 0.875rem;
  color: ${({ $isDark }) => ($isDark ? '#9ca3af' : '#6b7280')};
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const SwitchText = styled.p<{ $isDark?: boolean }>`
  text-align: center;
  margin-top: 20px;
  font-size: 0.85rem;
  color: ${({ $isDark }) => ($isDark ? '#9ca3af' : '#6b7280')};
`;

export const SwitchLink = styled.button<{ $isDark?: boolean }>`
  background: none;
  border: none;
  color: #6366f1;
  font-weight: 700;
  cursor: pointer;
  font-size: 0.85rem;
  margin-left: 4px;

  &:hover {
    text-decoration: underline;
  }
`;

export const ErrorMessage = styled.div`
  padding: 12px 16px;
  border-radius: 10px;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  color: #ef4444;
  font-size: 0.813rem;
  font-weight: 500;
`;

export const LanguageBar = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
`;
