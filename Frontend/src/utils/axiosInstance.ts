import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const getAxiosInstance = () => {
    // const token = typeof window !== "undefined" ? sessionStorage.getItem("token") : null;
    const instance = axios.create({
        baseURL: `${baseURL}`,
        headers: {
            "Content-Type": "application/json",
            // ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });

    instance.interceptors.request.use((config) => {
        const token = sessionStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    return instance;
};
