import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import NoticeEditorDialog from "./notice/NoticeEditorDialog";
import NoticeList from "./notice/NoticeList";
import { useSystemSettings } from "@/hooks/useSystemSettings";

export default function SystemSettingsPage() {
  const [notices, setNotices] = useState([
    {
      id: "1",
      title: "여름철 운영시간 변경 안내",
      sendFcm: true,
      createdAt: "2025-06-22T10:00:00",
      content: { ops: [{ insert: "본문 예시입니다.\n" }] },
      isUrgent: false,
    },
    {
      id: "2",
      title: "여름철 운영시간 변경 안내",
      sendFcm: true,
      createdAt: "2025-06-22T10:00:00",
      content: { ops: [{ insert: "본문 예시입니다.\n" }] },
      isUrgent: false,
    },
    {
      id: "3",
      title: "여름철 운영시간 변경 안내",
      sendFcm: true,
      createdAt: "2025-06-22T10:00:00",
      content: { ops: [{ insert: "본문 예시입니다.\n" }] },
      isUrgent: false,
    },
    // ...더미 데이터
  ]);

  const languageList = [
    { code: "한국어", name: "한국어" },
    { code: "영어", name: "영어" },
    { code: "중국어", name: "중국어" },
    { code: "일본어", name: "일본어" },
  ];

  const [page, setPage] = useState(1);
  const [createOpen, setCreateOpen] = useState(false);

  const pageSize = 10;
  const totalPages = 3;

  const { currentLanguage, isLoading, updateLanguage, isUpdating } =
    useSystemSettings();

  const [selectedLang, setSelectedLang] = useState("");

  const handleDelete = (id: string) => {
    setNotices((prev) => prev.filter((n) => n.id !== id));
  };

  const handleUpdate = (updated: any) => {
    setNotices((prev) =>
      prev.map((n) => (n.id === updated.id ? { ...n, ...updated } : n))
    );
  };

  const handleSave = () => {
    if (selectedLang && selectedLang !== currentLanguage) {
      updateLanguage(selectedLang);
    }
  };

  useEffect(() => {
    console.log(currentLanguage, "ㅁㄴㅇ");
    if (currentLanguage) {
      console.log(currentLanguage, "ㅁㄴㅇ");
      setSelectedLang(currentLanguage);
    }
  }, [currentLanguage]);

  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold">📢 공지사항 관리</h2>
          <p className="text-sm text-muted-foreground">
            사용자 앱/웹에 노출될 공지사항을 관리합니다.
          </p>
        </div>

        <div className="flex justify-end mb-2">
          <Button size="sm" onClick={() => setCreateOpen(true)}>
            + 공지 등록
          </Button>
        </div>

        <NoticeEditorDialog
          mode="create"
          open={createOpen}
          onClose={() => setCreateOpen(false)}
          onSubmit={(newNotice) => {
            setNotices((prev) => [
              {
                ...newNotice,
                id: Date.now().toString(),
                createdAt: new Date().toISOString(),
              },
              ...prev,
            ]);
            setCreateOpen(false);
          }}
        />

        <Card>
          <CardContent className="pt-4">
            <NoticeList
              data={notices}
              totalPages={totalPages}
              page={page}
              onPageChange={setPage}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          </CardContent>
        </Card>
      </section>

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
            <Select value={selectedLang} onValueChange={setSelectedLang}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="언어 선택" />
              </SelectTrigger>
              <SelectContent>
                {languageList.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              size="sm"
              className="mt-2"
              onClick={handleSave}
              disabled={isUpdating || selectedLang === currentLanguage}
            >
              {isUpdating ? "저장 중..." : "저장"}
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
