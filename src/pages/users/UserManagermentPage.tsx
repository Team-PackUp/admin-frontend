import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import UserSearchForm from "./components/UserSearchForm";
import UserListTable from "./components/UserListTable";
import { useUsers } from "@/hooks/useUsers";
import type { UserSearchType } from "@/api/user";

const PAGE_SIZE = 10;

export default function UserManagementPage() {
  const [page, setPage] = useState(1);
  const [searchType, setSearchType] = useState<UserSearchType | undefined>();
  const [keyword, setKeyword] = useState<string | undefined>();

  const { data, isLoading, isError } = useUsers(
    page,
    PAGE_SIZE,
    searchType,
    keyword
  );

  const handleSearch = (type: UserSearchType, keyword: string) => {
    setSearchType(type);
    setKeyword(keyword);
    setPage(1); // 검색하면 1페이지로 가야함
  };

  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold">👥 사용자 관리</h2>
          <p className="text-sm text-muted-foreground">
            PACKUP에 가입한 사용자의 정보를 조회하고 관리합니다.
          </p>
        </div>

        <UserSearchForm onSearch={handleSearch} />

        <Card>
          <CardContent className="pt-4">
            {isLoading && <p>로딩 중...</p>}
            {isError && (
              <p className="text-destructive">
                데이터를 불러오는 데 실패했습니다.
              </p>
            )}
            {data && (
              <UserListTable
                users={data.content}
                page={page}
                totalPages={data.totalPages}
                onPageChange={setPage}
              />
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
