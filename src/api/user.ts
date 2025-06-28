import apiClient from "@/api/apiClient";

export interface User {
  id: number;
  email: string;
  nickname: string;
  joinType: string;
  age: number;
  nation: string;
  banFlag: "Y" | "N";
  banReason?: string;
  banAdminId?: string;
  withdrawFlag: "Y" | "N";
  createdAt: string;
}

export interface UserPageResponse {
  content: User[];
  totalPages: number;
}

export type UserSearchType = "seq" | "email" | "nickname";

export const UserAPI = {
  getList: async (
    page: number,
    size: number,
    type?: UserSearchType,
    keyword?: string
  ): Promise<UserPageResponse> => {
    const params: Record<string, any> = {
      page: page - 1,
      size,
    };

    if (type && keyword) {
      params[type] = keyword;
    }

    const response = await apiClient.get("/users", { params });
    return response.data;
  },

  getById: async (id: number): Promise<User> => {
    const { data } = await apiClient.get(`/users/${id}`);
    return data;
  },

  banUser: async (id: number, reason: string): Promise<void> => {
    await apiClient.post(`/users/${id}/ban`, { reason });
  },

  unbanUser: async (id: number): Promise<void> => {
    await apiClient.post(`/users/${id}/unban`);
  },

  withdrawUser: async (id: number): Promise<void> => {
    await apiClient.post(`/users/${id}/withdraw`);
  },
};
