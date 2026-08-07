import api from "./axios";

/* ===========================
   Get or Create Paper Board
=========================== */

export const getOrCreatePaperBoard = (
    workspaceId,
    paperId
) =>
    api.get(
        `/workspaces/${workspaceId}/papers/${paperId}/notes/board`
    );

/* ===========================
   Get blocks
=========================== */

export const getKnowledgeBlocks = (
    workspaceId,
    noteId
) =>
    api.get(
        `/workspaces/${workspaceId}/notes/${noteId}/blocks`
    );

/* ===========================
   Create block
=========================== */

export const createKnowledgeBlock = (
    workspaceId,
    noteId,
    data
) =>
    api.post(
        `/workspaces/${workspaceId}/notes/${noteId}/blocks`,
        data
    );

/* ===========================
   Update block
=========================== */

export const updateBlock = (
    workspaceId,
    noteId,
    blockId,
    data
) =>
    api.patch(
        `/workspaces/${workspaceId}/notes/${noteId}/blocks/${blockId}`,
        data
    );

/* ===========================
   Move block
=========================== */

export const moveBlock = (
    workspaceId,
    noteId,
    blockId,
    data
) =>
    api.patch(
        `/workspaces/${workspaceId}/notes/${noteId}/blocks/${blockId}/position`,
        data
    );

/* ===========================
   Delete block
=========================== */

export const deleteBlock = (
    workspaceId,
    noteId,
    blockId
) =>
    api.delete(
        `/workspaces/${workspaceId}/notes/${noteId}/blocks/${blockId}`
    );