import apiClient from "@/api/apiClient";

export type GuideApplicationSearchType = "seq" | "email" | "nickname";
export type GuideApplicationStatus =
  | "APPLIED"
  | "APPROVED"
  | "REJECTED"
  | "CANCELED";

export interface GuideApplication {
  id: number;
  email: string;
  nickname: string;
  age: number;
  nation: string;
  createdAt: string;
  status: string;
}

export interface GuideApplicationPageResponse {
  content: GuideApplication[];
  totalPages: number;
}

export interface GuideApplicationUpdateRequest {
  status: GuideApplicationStatus;
}

export const GuideApplicationAPI = {
  getList: async (
    page: number,
    size: number,
    type?: GuideApplicationSearchType,
    keyword?: string,
    statusList?: GuideApplicationStatus[]
  ): Promise<GuideApplicationPageResponse> => {
    const params: Record<string, any> = {
      page: page - 1,
      size,
    };

    if (type && keyword) {
      params[type] = keyword;
    }

    if (statusList && statusList.length > 0) {
      params["statuses"] = statusList; // ?statuses=APPLIED&statuses=REJECTED 형태로 서버로 감
    }

    const response = await apiClient.get("/guides/applications", { params });
    return response.data;
  },

  updateStatus: async (
    id: number,
    payload: GuideApplicationUpdateRequest
  ): Promise<void> => {
    await apiClient.patch(`/guide-applications/${id}/status`, payload);
  },
};
