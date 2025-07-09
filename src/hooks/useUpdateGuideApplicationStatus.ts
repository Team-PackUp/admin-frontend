import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  GuideApplicationAPI,
  type GuideApplicationStatus,
} from "@/api/guideApplication";

export function useUpdateGuideApplicationStatus(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: number;
      status: GuideApplicationStatus;
    }) => GuideApplicationAPI.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["guideApplications"] });
      onSuccess?.();
    },
  });
}
