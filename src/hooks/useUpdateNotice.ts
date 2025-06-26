import { useMutation } from "@tanstack/react-query";
import { type Notice, NoticeAPI } from "@/api/notice";
import { useQueryClient } from "@tanstack/react-query";

export function useUpdateNotice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notice: Notice) => NoticeAPI.update(notice),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notices"] });
    },
  });
}
