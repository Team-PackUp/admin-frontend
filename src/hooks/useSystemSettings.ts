import { useQuery, useMutation } from "@tanstack/react-query";
import { SystemSettingAPI } from "@/api/systemSetting";

export const useSystemSettings = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["systemSettings"],
    queryFn: SystemSettingAPI.fetchSettings,
  });

  const mutation = useMutation({
    mutationFn: (language: string) => SystemSettingAPI.updateLanguage(language),
    onSuccess: () => {
      refetch();
    },
  });

  return {
    currentLanguage: data?.language ?? "",
    isLoading,
    updateLanguage: mutation.mutate,
    isUpdating: mutation.isPending,
  };
};
