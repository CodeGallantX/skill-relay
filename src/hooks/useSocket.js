import { useEffect, useCallback } from 'react';
import { socketManager } from '../lib/socket';
import { useAuth } from './useAuth';

export const useSocket = () => {
  const { token, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated && token) {
      socketManager.connect(token);
    } else {
      socketManager.disconnect();
    }

    return () => {
      socketManager.disconnect();
    };
  }, [isAuthenticated, token]);

  const on = useCallback((event, callback) => {
    socketManager.on(event, callback);
    return () => socketManager.off(event, callback);
  }, []);

  const emit = useCallback((event, data) => {
    socketManager.emit(event, data);
  }, []);

  const joinRoom = useCallback((roomId) => {
    socketManager.joinRoom(roomId);
  }, []);

  const leaveRoom = useCallback((roomId) => {
    socketManager.leaveRoom(roomId);
  }, []);

  return {
    on,
    emit,
    joinRoom,
    leaveRoom,
    isConnected: socketManager.socket?.connected || false
  };
};