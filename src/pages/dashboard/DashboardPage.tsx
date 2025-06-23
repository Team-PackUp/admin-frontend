// src/pages/dashboard/DashboardPage.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-xl font-semibold mb-4">통계 개요</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>가입자 수</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">1,245명</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>예약 수</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">340건</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>완료된 투어</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-600">122건</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>진행 중인 투어</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-600">18건</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">사용자 행동 로그</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>유입 경로</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-1">
                <li>구글 검색: 54%</li>
                <li>페이스북 광고: 25%</li>
                <li>블로그 리뷰: 12%</li>
                <li>직접 방문: 9%</li>
              </ul>
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
