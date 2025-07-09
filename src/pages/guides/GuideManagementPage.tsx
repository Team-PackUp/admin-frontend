import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import GuideApplicationSearchForm from "./components/application/GuideApplicationSearchForm";
import { useState } from "react";
import type {
  GuideApplicationSearchType,
  GuideApplicationStatus,
} from "@/api/guideApplication";
import { useGuideApplications } from "@/hooks/useGuideApplications";
import GuideApplicationListTable from "./components/application/GuideApplicationListTable";

export default function GuideManagementPage() {
  const [page, setPage] = useState(1);
  const [searchType, setSearchType] = useState<
    GuideApplicationSearchType | undefined
  >();
  const [keyword, setKeyword] = useState<string | undefined>();
  const [statusList, setStatusList] = useState<GuideApplicationStatus[]>([
    "APPLIED",
  ]);

  const handleSearch = (
    type: GuideApplicationSearchType,
    keyword: string,
    statusList: GuideApplicationStatus[]
  ) => {
    setSearchType(type);
    setKeyword(keyword);
    setStatusList(statusList);
    setPage(1);
  };

  const { data, isLoading, isError } = useGuideApplications(
    page,
    10,
    searchType,
    keyword,
    statusList
  );

  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold">🧭 가이드 관리</h2>
          <p className="text-sm text-muted-foreground mt-2">
            PACKUP에 신청된 가이드를 승인하거나, 활동 중인 가이드를 관리할 수
            있습니다.
          </p>
        </div>

        <Tabs defaultValue="request" className="w-full">
          <TabsList>
            <TabsTrigger value="request">신청 관리</TabsTrigger>
            <TabsTrigger value="active">활동 가이드 관리</TabsTrigger>
          </TabsList>

          <TabsContent value="request">
            <GuideApplicationSearchForm onSearch={handleSearch} />
            <Card className="mt-4">
              <CardContent className="pt-4">
                {isLoading && <p>로딩 중...</p>}
                {isError && (
                  <p className="text-destructive">
                    데이터를 불러오는 데 실패했습니다.
                  </p>
                )}
                {data && (
                  <GuideApplicationListTable
                    guideApplications={data.content}
                    page={page}
                    totalPages={data.totalPages}
                    onPageChange={setPage}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="active">
            <Card className="mt-4"></Card>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}
