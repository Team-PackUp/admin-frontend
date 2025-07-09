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

export type GuideApplicationDetail = {
  seq: number;
  status: string;
  idImageUrl: string;
  content: any;
};

export interface GuideApplicationPageResponse {
  content: GuideApplication[];
  totalPages: number;
}

export interface GuideApplicationUpdateRequest {
  status: string;
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

  getById: async (id: number): Promise<GuideApplicationDetail> => {
    const { data } = await apiClient.get(`/guides/applications/${id}`);
    return data;
  },

  updateStatus: async (id: number, payload: string): Promise<void> => {
    await apiClient.patch(`/guides/applications/${id}/status`, payload);
  },
};
