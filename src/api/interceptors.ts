import type { AxiosInstance } from "axios";
import { refreshAccessToken } from "@/api/auth";

export const attachAuthInterceptors = (client: AxiosInstance) => {
  client.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  client.interceptors.response.use(
    (res) => res,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        const newToken = await refreshAccessToken();

        if (newToken) {
          client.defaults.headers.Authorization = `Bearer ${newToken}`;
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return client(originalRequest);
        }

        localStorage.removeItem("accessToken");
        // 이부분 navigate 로 해야 하나..

        window.location.href = "/login";
      }

      return Promise.reject(error);
    }
  );
};
