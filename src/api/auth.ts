import { apiClient } from "./apiClient";

export const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const response = await apiClient.post(
      "/api/auth/refresh",
      {},
      {
        withCredentials: true,
      }
    );

    const newToken = response.data.accessToken;

    localStorage.setItem("accessToken", newToken);

    return newToken;
  } catch (error) {
    console.error("리프레시 토큰 재발급 실패:", error);
    return null;
  }
};
