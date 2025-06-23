import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold">📊 통계 개요</h2>
          <p className="text-sm text-muted-foreground">
            현재 플랫폼에 대한 통계 정보입니다.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="가입자 수" value="1,245명" />
          <StatCard title="예약 수" value="340건" />
          <StatCard title="완료된 투어" value="122건" accent="green" />
          <StatCard title="진행 중인 투어" value="18건" accent="blue" />
        </div>
      </section>

      {/* 사용자 행동 로그 */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold">📈 사용자 행동 로그</h2>
          <p className="text-sm text-muted-foreground">
            Google Analytics 기반 사용자 활동 데이터입니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>유입 경로</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-1">
              <p>구글 검색: 54%</p>
              <p>페이스북 광고: 25%</p>
              <p>블로그 리뷰: 12%</p>
              <p>직접 방문: 9%</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>페이지 뷰</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">7,840</p>
              <p className="text-sm text-muted-foreground">이번 주 기준</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>투어 추천 클릭률</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold">36.4%</p>
              <p className="text-sm text-muted-foreground">
                지난주 대비 ▲ 4.8%
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

function StatCard({
  title,
  value,
  accent,
}: {
  title: string;
  value: string;
  accent?: "green" | "blue";
}) {
  const colorClass =
    accent === "green"
      ? "text-green-600"
      : accent === "blue"
      ? "text-blue-600"
      : "";

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className={`text-3xl font-bold ${colorClass}`}>{value}</p>
      </CardContent>
    </Card>
  );
}
