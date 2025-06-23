import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-muted">
      <main className="px-6 py-10 space-y-10">
        {/* 통계 개요 */}
        <section>
          <h2 className="text-xl font-semibold mb-4">통계 개요</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>총 가입자 수</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">1,024명</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>총 예약 수</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">308건</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>완료 / 진행 중 투어</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold text-green-600">
                  146건 완료 /{" "}
                  <span className="text-blue-600">12건 진행 중</span>
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 시스템 현황 */}
        <section>
          <h2 className="text-xl font-semibold mb-4">시스템 현황</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>오늘 방문 수</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">142회</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>시스템 상태</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl font-medium text-green-600">
                  정상 운영 중
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>신고 처리 대기</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-red-600">3건</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 주요 관리 바로가기 */}
        <section>
          <h2 className="text-xl font-semibold mb-4">빠른 이동</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "사용자 관리", desc: "회원 정보 및 활동 관리" },
              { title: "가이드 관리", desc: "가이드 승인 및 정보 수정" },
              { title: "투어 콘텐츠", desc: "투어 등록 및 콘텐츠 업데이트" },
              { title: "예약/결제", desc: "예약 내역 및 결제 현황 확인" },
              { title: "신고/리뷰", desc: "신고/리뷰 검토 및 처리" },
              { title: "시스템 설정", desc: "공통 코드, 환경 설정 등" },
            ].map((item, i) => (
              <Card
                key={i}
                className="hover:shadow-md transition cursor-pointer"
              >
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
