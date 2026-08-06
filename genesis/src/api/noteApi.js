import axiosInstance from "./axiosInstance";

/* ===========================
   Get all notes
=========================== */

export const getWorkspaceNotes = (workspaceId) =>
    axiosInstance.get(
        `/workspaces/${workspaceId}/notes`
    );

/* ===========================
   Create note
=========================== */

export const createNote = (workspaceId, data) =>
    axiosInstance.post(
        `/workspaces/${workspaceId}/notes`,
        data
    );

/* ===========================
   Update note
=========================== */

export const updateNote = (
    workspaceId,
    noteId,
    data
) =>
    axiosInstance.patch(
        `/workspaces/${workspaceId}/notes/${noteId}`,
        data
    );

/* ===========================
   Delete note
=========================== */

export const deleteNote = (
    workspaceId,
    noteId
) =>
    axiosInstance.delete(
        `/workspaces/${workspaceId}/notes/${noteId}`
    );