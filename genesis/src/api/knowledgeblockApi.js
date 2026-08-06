import axiosInstance from "./axiosInstance";

/* ===========================
   Get blocks
=========================== */

export const getBlocks = (
    workspaceId,
    noteId
) =>
    axiosInstance.get(
        `/workspaces/${workspaceId}/notes/${noteId}/blocks`
    );

/* ===========================
   Create block
=========================== */

export const createBlock = (
    workspaceId,
    noteId,
    data
) =>
    axiosInstance.post(
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
    axiosInstance.patch(
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
    axiosInstance.patch(
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
    axiosInstance.delete(
        `/workspaces/${workspaceId}/notes/${noteId}/blocks/${blockId}`
    );