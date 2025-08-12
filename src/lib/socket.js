import { io } from 'socket.io-client';

class SocketManager {
  constructor() {
    this.socket = null;
    this.listeners = new Map();
  }

  connect(token) {
    if (this.socket?.connected) return;

    this.socket = io('wss://api.skillrelay.com', {
      auth: { token },
      transports: ['websocket']
    });

    this.socket.on('connect', () => {
      console.log('Socket connected');
    });

    this.socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    // Handle real-time notifications
    this.socket.on('notification', (data) => {
      this.emit('notification', data);
    });

    // Handle real-time likes/comments
    this.socket.on('content_update', (data) => {
      this.emit('content_update', data);
    });

    // Handle live viewer count
    this.socket.on('viewer_count', (data) => {
      this.emit('viewer_count', data);
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event).add(callback);
  }

  off(event, callback) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).delete(callback);
    }
  }

  emit(event, data) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach(callback => callback(data));
    }
  }

  // Join a room (for live lessons, etc.)
  joinRoom(roomId) {
    if (this.socket) {
      this.socket.emit('join_room', roomId);
    }
  }

  // Leave a room
  leaveRoom(roomId) {
    if (this.socket) {
      this.socket.emit('leave_room', roomId);
    }
  }

  // Send a message to a room
  sendMessage(roomId, message) {
    if (this.socket) {
      this.socket.emit('room_message', { roomId, message });
    }
  }
}

export const socketManager = new SocketManager();