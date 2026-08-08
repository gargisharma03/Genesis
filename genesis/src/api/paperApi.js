import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const getWorkspacePapers = (workspaceId) => {
  return API.get(`/workspaces/${workspaceId}/papers`);
};

export const uploadPaper = (workspaceId, file) => {
  const formData = new FormData();

  formData.append("pdf", file);

  formData.append(
    "title",
    file.name.replace(/\.pdf$/i, "")
  );

  return API.post(
    `/workspaces/${workspaceId}/papers`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

// Add paper via Link / URL / DOI
export const addPaperViaUrl = (workspaceId, { url, title, authors }) => {
  return API.post(`/workspaces/${workspaceId}/papers/link`, {
    url,
    title,
    authors,
  });
};

// Delete paper endpoint
export const deletePaper = (workspaceId, paperId) => {
  return API.delete(`/workspaces/${workspaceId}/papers/${paperId}`);
};