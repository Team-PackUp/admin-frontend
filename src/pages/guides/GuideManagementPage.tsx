import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import GuideApplicationSearchForm from "./components/application/GuideApplicationSearchForm";
import { useState } from "react";
import type { GuideApplicationSearchType } from "@/api/guideApplication";
// import GuideRequestList from "./components/GuideRequestList";
// import ActiveGuideList from "./components/ActiveGuideList";

export default function GuideManagementPage() {
  const [page, setPage] = useState(1);
  const [searchType, setSearchType] = useState<
    GuideApplicationSearchType | undefined
  >();
  const [keyword, setKeyword] = useState<string | undefined>();

  const handleSearch = (type: GuideApplicationSearchType, keyword: string) => {
    setSearchType(type);
    setKeyword(keyword);
    setPage(1); // 검색하면 1페이지로 가야함
  };

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

        {/* 탭 영역 */}
        <Tabs defaultValue="request" className="w-full">
          <TabsList>
            <TabsTrigger value="request">신청 관리</TabsTrigger>
            <TabsTrigger value="active">활동 가이드 관리</TabsTrigger>
          </TabsList>

          <TabsContent value="request">
            <Card className="mt-4">
              {/* <CardContent className="pt-4"> */}
              <GuideApplicationSearchForm onSearch={handleSearch} />
              {/* <GuideRequestList /> */}
              {/* </CardContent> */}
            </Card>
          </TabsContent>

          <TabsContent value="active">
            <Card className="mt-4">
              {/* <CardContent className="pt-4"> */}
              {/* <ActiveGuideList /> */}
              {/* </CardContent> */}
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}
