import api from "./axios";

/* ===========================
   Get all notes
=========================== */

export const getWorkspaceNotes = (workspaceId) =>
    api.get(
        `/workspaces/${workspaceId}/notes`
    );

/* ===========================
   Create note
=========================== */

export const createNote = (workspaceId, data) =>
    api.post(
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
    api.patch(
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
    api.delete(
        `/workspaces/${workspaceId}/notes/${noteId}`
    );