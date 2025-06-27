import apiClient from "@/api/apiClient";

export interface Notice {
  id: string;
  title: string;
  content: any;
  sendFcm: boolean;
  isUrgent: boolean;
  createdAt: string;
}

export interface CreateNoticeRequest {
  title: string;
  content: any;
  sendFcm: boolean;
  isUrgent: boolean;
}

export interface NoticePageResponse {
  items: Notice[];
  totalPages: number;
}

export const NoticeAPI = {
  create: async (payload: CreateNoticeRequest): Promise<void> => {
    await apiClient.post("/system/notice", payload);
  },

  getList: async (page: number, size: number): Promise<NoticePageResponse> => {
    const response = await apiClient.get("/system/notices", {
      params: { page: page - 1, size },
    });
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/system/notice/${id}`);
  },

  update: async (notice: Notice): Promise<void> => {
    await apiClient.put(`/system/notice/${notice.id}`, notice);
  },
};
