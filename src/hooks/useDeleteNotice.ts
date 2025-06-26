import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NoticeAPI } from "@/api/notice";

export const useDeleteNotice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => NoticeAPI.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notices"] });
    },
  });
};
