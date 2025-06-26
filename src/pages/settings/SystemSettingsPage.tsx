import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import NoticeEditorDialog from "./component/NoticeEditorDialog";
import { NOTICE_PAGE_SIZE } from "@/constants/pagination";
import NoticeList from "./component/NoticeList";
import { useSystemSettings } from "@/hooks/useSystemSettings";
import { useNotices } from "@/hooks/useNotices";
import LanguageSettingCard from "./component/LanguageSettingCard";
import { useQueryClient } from "@tanstack/react-query";
import type { Notice } from "@/api/notice";

export default function SystemSettingsPage() {
  const [notices, setNotices] = useState<Notice[]>([]);

  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [createOpen, setCreateOpen] = useState(false);

  const { currentLanguage, isLoading, updateLanguage, isUpdating } =
    useSystemSettings();
  const { data, isLoading: isNoticeLoading } = useNotices(
    page,
    NOTICE_PAGE_SIZE
  );
  const totalPages = data?.totalPages || 1;

  const [selectedLang, setSelectedLang] = useState("");

  const handleDelete = (id: string) => {
    setNotices((prev) => prev.filter((n) => n.id !== id));
  };

  const handleUpdate = (updated: any) => {
    setNotices((prev) =>
      prev.map((n) => (n.id === updated.id ? { ...n, ...updated } : n))
    );
  };

  useEffect(() => {
    if (data?.content) {
      setNotices(data.content);
    }
  }, [data]);

  useEffect(() => {
    if (currentLanguage) {
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
          onSubmit={() => {
            queryClient.invalidateQueries({ queryKey: ["notices"] });
            setCreateOpen(false);
          }}
        />

        <Card>
          <CardContent className="pt-4">
            {isNoticeLoading ? (
              <p className="text-sm text-muted-foreground">
                공지사항을 불러오는 중...
              </p>
            ) : (
              <NoticeList
                data={notices}
                totalPages={totalPages}
                page={page}
                onPageChange={setPage}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
              />
            )}
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
        <LanguageSettingCard />
      </section>
    </div>
  );
}
