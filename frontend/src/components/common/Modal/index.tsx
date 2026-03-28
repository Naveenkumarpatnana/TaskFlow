'use client';

import React, { useEffect } from 'react';
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter,
} from './styled';
import { useThemeStore } from '@/stores/themeStore';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  width?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  width,
}) => {
  const { isDarkMode } = useThemeStore();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent
        $isDark={isDarkMode}
        $width={width}
        onClick={(e) => e.stopPropagation()}
      >
        <ModalHeader $isDark={isDarkMode}>
          <ModalTitle $isDark={isDarkMode}>{title}</ModalTitle>
          <ModalClose $isDark={isDarkMode} onClick={onClose}>✕</ModalClose>
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
        {footer && <ModalFooter $isDark={isDarkMode}>{footer}</ModalFooter>}
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
