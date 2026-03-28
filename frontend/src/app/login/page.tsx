'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  LoginPage, LoginLeft, BrandLogo, BrandIcon, BrandName, BrandTagline,
  FeatureList, FeatureItem, FeatureIcon,
  LoginRight, LoginCard, LoginTitle, LoginSubtitle, LoginForm,
  SwitchText, SwitchLink, ErrorMessage, LanguageBar,
} from './styled';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import Select from '@/components/common/Select';
import LanguageSwitcher from '@/components/modules/LanguageSwitcher';
import { useAuthStore } from '@/stores/authStore';
import { useThemeStore } from '@/stores/themeStore';
import { getLabel } from '@/i18n/translator';
import { LOGIN_LABELS } from './labels';
import { UserRole } from '@/types/user.types';

export default function LoginPageComponent() {
  const router = useRouter();
  const { login, signup, isLoading, error, clearError, isAuthenticated, loadFromStorage } = useAuthStore();
  const { isDarkMode, language, loadPreferences } = useThemeStore();

  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>(UserRole.EMPLOYEE);

  useEffect(() => {
    loadFromStorage();
    loadPreferences();
  }, [loadFromStorage, loadPreferences]);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    try {
      if (isSignup) {
        await signup(name, email, password, role);
      } else {
        await login(email, password);
      }
      router.push('/dashboard');
    } catch {
      // Error is handled in store
    }
  };

  const toggleMode = () => {
    setIsSignup(!isSignup);
    clearError();
  };

  const roleOptions = [
    { value: UserRole.EMPLOYEE, label: getLabel('role.employee', language) },
    { value: UserRole.MANAGER, label: getLabel('role.manager', language) },
    { value: UserRole.ADMIN, label: getLabel('role.admin', language) },
  ];

  return (
    <LoginPage $isDark={isDarkMode}>
      <LanguageBar>
        <LanguageSwitcher />
      </LanguageBar>

      <LoginLeft>
        <BrandLogo>
          <BrandIcon>⚡</BrandIcon>
          <BrandName>{getLabel('app.title', language)}</BrandName>
        </BrandLogo>
        <BrandTagline>{getLabel('app.subtitle', language)}</BrandTagline>
        <FeatureList>
          <FeatureItem>
            <FeatureIcon>📋</FeatureIcon>
            {getLabel('nav.tasks', language)} — {getLabel('status.todo', language)}, {getLabel('status.inprogress', language)}, {getLabel('status.completed', language)}
          </FeatureItem>
          <FeatureItem>
            <FeatureIcon>📊</FeatureIcon>
            {getLabel('nav.dashboard', language)} — {getLabel('dashboard.completionRate', language)}
          </FeatureItem>
          <FeatureItem>
            <FeatureIcon>🌐</FeatureIcon>
            {getLabel('common.language', language)} — 5 {getLabel('common.language', language).toLowerCase()}s
          </FeatureItem>
        </FeatureList>
      </LoginLeft>

      <LoginRight>
        <LoginCard $isDark={isDarkMode}>
          <LoginTitle $isDark={isDarkMode}>
            {getLabel(isSignup ? LOGIN_LABELS.createAccount : LOGIN_LABELS.welcome, language)}
          </LoginTitle>
          <LoginSubtitle $isDark={isDarkMode}>
            {getLabel(LOGIN_LABELS.loginSubtitle, language)}
          </LoginSubtitle>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <LoginForm onSubmit={handleSubmit}>
            {isSignup && (
              <Input
                label={getLabel(LOGIN_LABELS.name, language)}
                placeholder={getLabel(LOGIN_LABELS.name, language)}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            )}

            <Input
              label={getLabel(LOGIN_LABELS.email, language)}
              type="email"
              placeholder={getLabel(LOGIN_LABELS.email, language)}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label={getLabel(LOGIN_LABELS.password, language)}
              type="password"
              placeholder={getLabel(LOGIN_LABELS.password, language)}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {isSignup && (
              <Select
                label={getLabel(LOGIN_LABELS.role, language)}
                options={roleOptions}
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
              />
            )}

            <Button type="submit" fullWidth isLoading={isLoading}>
              {getLabel(isSignup ? LOGIN_LABELS.signup : LOGIN_LABELS.login, language)}
            </Button>
          </LoginForm>

          <SwitchText $isDark={isDarkMode}>
            {getLabel(isSignup ? LOGIN_LABELS.hasAccount : LOGIN_LABELS.noAccount, language)}
            <SwitchLink onClick={toggleMode}>
              {getLabel(isSignup ? LOGIN_LABELS.login : LOGIN_LABELS.signup, language)}
            </SwitchLink>
          </SwitchText>
        </LoginCard>
      </LoginRight>
    </LoginPage>
  );
}
