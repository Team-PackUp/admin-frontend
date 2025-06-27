import { useQuery } from "@tanstack/react-query";
import { NoticeAPI } from "@/api/notice";

export const useNotices = (page: number, size: number) => {
  return useQuery({
    queryKey: ["notices", page, size],
    queryFn: () => NoticeAPI.getList(page, size),
    placeholderData: (prev) => prev,
  });
};
