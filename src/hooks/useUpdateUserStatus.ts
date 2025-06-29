import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserAPI, type UserStatusUpdateRequest } from "@/api/user";

export function useUpdateUserStatus(userId: number, onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UserStatusUpdateRequest) =>
      UserAPI.updateUserStatus(userId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });

      onSuccess?.();
    },
  });
}
