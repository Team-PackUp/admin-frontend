// src/pages/settings/SystemSettingsPage.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SystemSettingsPage() {
  return (
    <div className="space-y-12">
      {/* 공지사항 관리 */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">📢 공지사항 관리</h2>
            <p className="text-sm text-muted-foreground">
              사용자 앱/웹에 노출될 공지사항을 관리합니다.
            </p>
          </div>
          <Button size="sm">+ 공지 추가</Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>공지사항 목록</CardTitle>
          </CardHeader>
          <CardContent>
            {/* 공지사항 테이블 (더미 데이터로 구조만 표시) */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">제목</th>
                    <th className="text-left p-2">노출 여부</th>
                    <th className="text-left p-2">작성일</th>
                    <th className="text-left p-2">관리</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-2">여름철 운영시간 변경 안내</td>
                    <td className="p-2">노출</td>
                    <td className="p-2">2025-06-22</td>
                    <td className="p-2 space-x-2">
                      <Button size="sm" variant="outline">
                        수정
                      </Button>
                      <Button size="sm" variant="destructive">
                        삭제
                      </Button>
                    </td>
                  </tr>
                  {/* ... */}
                </tbody>
              </table>
            </div>

            {/* 페이징 버튼 (임시) */}
            <div className="flex justify-end mt-4 gap-2">
              <Button size="sm" variant="outline">
                이전
              </Button>
              <Button size="sm" variant="outline">
                다음
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 다국어 설정 */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold">🌐 다국어 지원 설정</h2>
          <p className="text-sm text-muted-foreground">
            앱 및 웹에서 노출되는 다국어 텍스트를 관리합니다.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>언어 선택</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select defaultValue="ko">
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="언어 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ko">한국어</SelectItem>
                <SelectItem value="en">영어</SelectItem>
                <SelectItem value="jp">일본어</SelectItem>
              </SelectContent>
            </Select>

            <Button size="sm" className="mt-2">
              저장
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
