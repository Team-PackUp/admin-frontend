import apiClient from "./apiClient";

export interface CreateNoticeRequest {
  title: string;
  content: any;
  sendFcm: boolean;
  isUrgent: boolean;
}

export interface Notice {
  id: string;
  title: string;
  content: any;
  sendFcm: boolean;
  isUrgent: boolean;
  createdAt: string;
}

export interface NoticePageResponse {
  items: Notice[];
  totalPages: number;
}

export const NoticeAPI = {
  create: async (payload: CreateNoticeRequest): Promise<void> => {
    await apiClient.post("/system/notice", payload);
  },
  getList: async (page: number): Promise<NoticePageResponse> => {
    const response = await apiClient.get("/system/notice", {
      params: { page },
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
