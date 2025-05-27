import { apiClient } from "./apiClient";
import type { LoginRequest, LoginResponse } from "@/@types/auth.types";

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await apiClient.post("/auth/login", data);
  return response.data;
};
