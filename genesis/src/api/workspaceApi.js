import API from "./axios";

export const createWorkspace = (data) =>
  API.post("/workspaces", data);

export const getUserWorkspaces = () =>
  API.get("/workspaces");

export const getRecentWorkspace = () =>
  API.get("/workspaces/recent");

export const getWorkspace = (id) =>
  API.get(`/workspaces/${id}`);

export const updateWorkspace = (id, data) =>
  API.patch(`/workspaces/${id}`, data);

export const deleteWorkspace = (id) =>
  API.delete(`/workspaces/${id}`);