import { useQuery, useMutation } from "@tanstack/react-query";
import { SystemSettingAPI } from "@/api/systemSetting";

export const useSystemSettings = () => {
  const query = useQuery({
    queryKey: ["systemSettings"],
    queryFn: SystemSettingAPI.fetchSettings,
  });

  const mutation = useMutation({
    mutationFn: (code: string) => SystemSettingAPI.updateLanguage(code),
    onSuccess: () => {
      query.refetch();
    },
  });

  return {
    ...query,
    updateLanguage: mutation.mutate,
    isUpdating: mutation.isPending,
  };
};
