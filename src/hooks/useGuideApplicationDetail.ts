import { useQuery } from "@tanstack/react-query";
import { GuideApplicationAPI } from "@/api/guideApplication";

export const useGuideApplicationDetail = (id?: number) => {
  return useQuery({
    queryKey: ["guideApplicationDetail", id],
    queryFn: () => GuideApplicationAPI.getById(id!),
    enabled: typeof id === "number",
  });
};
