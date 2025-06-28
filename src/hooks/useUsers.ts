import { useQuery } from "@tanstack/react-query";
import { UserAPI } from "@/api/user";
import type { UserSearchType } from "@/api/user";

export const useUsers = (
  page: number,
  size: number,
  type?: UserSearchType,
  keyword?: string
) => {
  const query = useQuery({
    queryKey: ["users", page, size, type, keyword],
    queryFn: () => UserAPI.getList(page, size, type, keyword),
    placeholderData: (prev) => prev,
  });

  return query;
};
