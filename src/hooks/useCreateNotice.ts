import { useMutation } from "@tanstack/react-query";
import { NoticeAPI, type CreateNoticeRequest } from "@/api/notice";

export const useCreateNotice = () => {
  return useMutation({
    mutationFn: (data: CreateNoticeRequest) => NoticeAPI.create(data),
  });
};
