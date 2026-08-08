// src/hooks/useBoardSocket.js
import { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

export function useBoardSocket(workspaceId, currentUser, setBlocks) {
  const [onlineMembers, setOnlineMembers] = useState([]);
  const [focusedBlocks, setFocusedBlocks] = useState({}); // { blockId: userName }
  const socketRef = useRef(null);

  useEffect(() => {
    if (!workspaceId || !currentUser) return;

    // Connect to backend socket server
    const socket = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
      withCredentials: true,
    });
    socketRef.current = socket;

    // Join room when connected
    socket.emit('join_workspace', { workspaceId, user: currentUser });

    // Listen for room presence
    socket.on('presence:update', (users) => {
      setOnlineMembers(users);
    });

    socket.on('presence:block_focused', ({ userId, userName, blockId }) => {
      setFocusedBlocks((prev) => ({
        ...prev,
        [blockId]: userId !== currentUser._id ? userName : null,
      }));
    });

    // Sync incoming block updates from teammates
    socket.on('block:created', (newBlock) => {
      setBlocks((prev) => [...prev, newBlock]);
    });

    socket.on('block:updated', (updatedBlock) => {
      setBlocks((prev) =>
        prev.map((b) => (b._id === updatedBlock._id ? updatedBlock : b))
      );
    });

    socket.on('block:deleted', ({ blockId }) => {
      setBlocks((prev) => prev.filter((b) => b._id !== blockId));
    });

    // Cleanup on unmount or workspace switch
    return () => {
      socket.disconnect();
    };
  }, [workspaceId, currentUser]);

  // Emitters to trigger real-time actions
  const emitBlockFocus = (blockId) => {
    socketRef.current?.emit('presence:active_block', { blockId });
  };

  const emitCreateBlock = (block) => {
    socketRef.current?.emit('block:created', { workspaceId, block });
  };

  const emitUpdateBlock = (block) => {
    socketRef.current?.emit('block:updated', { workspaceId, block });
  };

  const emitDeleteBlock = (blockId) => {
    socketRef.current?.emit('block:deleted', { workspaceId, blockId });
  };

  return {
    onlineMembers,
    focusedBlocks,
    emitBlockFocus,
    emitCreateBlock,
    emitUpdateBlock,
    emitDeleteBlock,
  };
}