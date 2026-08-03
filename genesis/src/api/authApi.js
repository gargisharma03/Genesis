import api from "./axios";

export const getCurrentUser = () => {
    return api.get("/auth/me");
};