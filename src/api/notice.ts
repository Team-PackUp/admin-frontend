import apiClient from "./apiClient";

export interface CreateNoticeRequest {
  title: string;
  content: any;
  sendFcm: boolean;
  isUrgent: boolean;
}

export const NoticeAPI = {
  create: async (payload: CreateNoticeRequest): Promise<void> => {
    console.log(payload, " ㅁㄴ1234");
    await apiClient.post("/system/notice", payload);
  },
};
