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