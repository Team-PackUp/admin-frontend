import { useMutation } from "@tanstack/react-query";
import { UserAPI, type UserStatusUpdateRequest } from "@/api/user";

export function useUpdateUserStatus(userId: number, onSuccess?: () => void) {
  return useMutation({
    mutationFn: (payload: UserStatusUpdateRequest) =>
      UserAPI.updateUserStatus(userId, payload),
    onSuccess,
  });
}
