'use client';

import { useEffect, useRef, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { useTaskStore } from '@/stores/taskStore';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:5000';

export const useSocket = () => {
  const socketRef = useRef<Socket | null>(null);
  const { addTaskRealtime, updateTaskRealtime, removeTaskRealtime } = useTaskStore();

  const connect = useCallback(() => {
    if (socketRef.current?.connected) return;

    socketRef.current = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socketRef.current.on('connect', () => {
      console.log('🔌 Socket connected');
    });

    socketRef.current.on('taskCreated', (task) => {
      addTaskRealtime(task);
    });

    socketRef.current.on('taskUpdated', (task) => {
      updateTaskRealtime(task);
    });

    socketRef.current.on('taskDeleted', ({ id }) => {
      removeTaskRealtime(id);
    });

    socketRef.current.on('disconnect', () => {
      console.log('🔌 Socket disconnected');
    });
  }, [addTaskRealtime, updateTaskRealtime, removeTaskRealtime]);

  const disconnect = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return { connect, disconnect, socket: socketRef.current };
};
