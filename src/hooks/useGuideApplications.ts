import { useQuery } from "@tanstack/react-query";
import { GuideApplicationAPI } from "@/api/guideApplication";
import type {
  GuideApplicationSearchType,
  GuideApplicationStatus,
} from "@/api/guideApplication";

export const useGuideApplications = (
  page: number,
  size: number,
  type?: GuideApplicationSearchType,
  keyword?: string,
  statusList?: GuideApplicationStatus[]
) => {
  const query = useQuery({
    queryKey: ["guideApplications", page, size, type, keyword, statusList],
    queryFn: () =>
      GuideApplicationAPI.getList(page, size, type, keyword, statusList),
    placeholderData: (prev) => prev,
  });

  return query;
};
