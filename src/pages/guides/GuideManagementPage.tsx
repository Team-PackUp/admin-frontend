import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
// import GuideRequestList from "./components/GuideRequestList";
// import ActiveGuideList from "./components/ActiveGuideList";

export default function GuideManagementPage() {
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
              <CardContent className="pt-4">
                {/* <GuideRequestList /> */}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="active">
            <Card className="mt-4">
              <CardContent className="pt-4">
                {/* <ActiveGuideList /> */}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}
