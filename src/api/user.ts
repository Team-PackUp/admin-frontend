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
  banAdminName?: string;
  withdrawFlag: "Y" | "N";
  createdAt: string;
}

export interface UserPageResponse {
  content: User[];
  totalPages: number;
}

export interface UserStatusUpdateRequest {
  ban?: boolean;
  banReason?: string;
  withdraw?: boolean;
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
    console.log(response.data);
    return response.data;
  },

  getById: async (id: number): Promise<User> => {
    const { data } = await apiClient.get(`/users/${id}`);
    return data;
  },

  updateUserStatus: async (
    id: number,
    payload: UserStatusUpdateRequest
  ): Promise<void> => {
    await apiClient.patch(`/users/${id}/status`, payload);
  },
};
