const workspaceRooms = new Map();

export function setupSocketHandlers(io) {
    io.on('connection', (socket) => {
        console.log(`client connected: ${socket.id}`);

        socket.on('join_workspace', ({ workspaceId, user }) => {
            socket.join(workspaceId);
            socket.data.workspaceId = workspaceId;
            socket.data.user = user;

            if (!workspaceRooms.has(workspaceId)) {
                workspaceRooms.set(workspaceId, new Map());
            }
            const activeUsers = workspaceRooms.get(workspaceId);
            activeUsers.set(socket.id, {
                socketId: socket.id,
                _id: user._id,
                name: user.name,
                activeBlockId: null,
            });

            io.to(workspaceId).emit('presence:update', Array.from(activeUsers.values()));
            console.log(` User ${user.name} joined workspace ${workspaceId}`);
        });

        socket.on('presence:active_block', (blockId) => {
            const { workspaceId } = socket.data;
            if (!workspaceId) return;

            const activeUsers = workspaceRooms.get(workspaceId);
            if (activeUsers && activeUsers.has(socket.id)) {
                const user = activeUsers.get(socket.id);
                user.activeBlockId = blockId;
                activeUsers.set(socket.id, user);

                socket.to(workspaceId).emit('presence:block_focused', {
                    userId: user._id,
                    userName: user.name,
                    blockId,
                });
            }
        });

        socket.on('block:created', ({ block }) => {
            const { workspaceId } = socket.data;
            if (workspaceId) socket.to(workspaceId).emit('block:created', block);
        });

        socket.on('block:updated', ({ block }) => {
            const { workspaceId } = socket.data;
            if (workspaceId) socket.to(workspaceId).emit('block:updated', block);
        });

        socket.on('block:deleted', ({ blockId }) => {
            const { workspaceId } = socket.data;
            if (workspaceId) socket.to(workspaceId).emit('block:deleted', { blockId });
        });

        socket.on('disconnect', () => {
            console.log(` Client disconnected: ${socket.id}`);
            const { workspaceId } = socket.data;

            if (workspaceId && workspaceRooms.has(workspaceId)) {
                const activeUsers = workspaceRooms.get(workspaceId);
                activeUsers.delete(socket.id);

                if (activeUsers.size === 0) {
                    workspaceRooms.delete(workspaceId);
                } else {
                    io.to(workspaceId).emit('presence:update', Array.from(activeUsers.values()));
                }
            }
        });
    });
}