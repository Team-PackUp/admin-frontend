import { useQuery } from "@tanstack/react-query";
import apiClient from "@/api/apiClient";

export interface Notice {
  id: string;
  title: string;
  sendFcm: boolean;
  createdAt: string;
  content: any;
  isUrgent: boolean;
}

export interface NoticeListResponse {
  content: Notice[];
  totalPages: number;
  page: number;
}

export const fetchNotices = async (
  page: number,
  size: number
): Promise<NoticeListResponse> => {
  const res = await apiClient.get(`/system/notices`, {
    params: { page: page - 1, size },
  });
  console.log(res.data);
  return res.data;
};

export const useNotices = (page: number, size: number) => {
  return useQuery({
    queryKey: ["notices", page, size],
    queryFn: () => fetchNotices(page, size),
  });
};
