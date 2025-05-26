import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="min-h-screen px-4 py-8 bg-muted">
      <h1 className="text-3xl font-bold mb-6">관리자 대시보드</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>총 사용자 수</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">1,024명</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>오늘 방문 수</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">142회</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>시스템 상태</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-green-600 font-medium">정상 운영 중</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
