import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import NoticeEditorDialog from "./NoticeEditorDialog";

type NoticeItem = {
  id: string;
  title: string;
  sendFcm: boolean;
  createdAt: string;
  content: any;
  isUrgent: boolean;
};

interface Props {
  data: NoticeItem[];
  totalPages: number;
  page: number;
  onPageChange: (newPage: number) => void;
  onDelete: (id: string) => void;
  onUpdate: (notice: NoticeItem) => void;
}

export default function NoticeList({
  data,
  totalPages,
  page,
  onPageChange,
  onDelete,
  onUpdate,
}: Props) {
  const [editingNotice, setEditingNotice] = useState<NoticeItem | null>(null);

  return (
    <>
      {editingNotice && (
        <NoticeEditorDialog
          mode="edit"
          initialData={editingNotice}
          onClose={() => setEditingNotice(null)}
          onSubmit={(updated) => {
            onUpdate(updated as NoticeItem);
            setEditingNotice(null);
          }}
        />
      )}

      <div className="border rounded-md">
        <div className="grid grid-cols-4 gap-4 px-4 py-2 bg-muted text-sm font-semibold">
          <div>제목</div>
          <div>FCM 여부</div>
          <div>작성일</div>
          <div className="text-right">관리</div>
        </div>

        {data.map((notice) => (
          <div
            key={notice.id}
            onClick={() => setEditingNotice(notice)}
            className="grid grid-cols-4 gap-4 px-4 py-2 border-t text-sm hover:bg-accent cursor-pointer"
          >
            <div>{notice.title}</div>
            <div>
              {notice.sendFcm ? (
                <Badge variant="default">O</Badge>
              ) : (
                <Badge variant="secondary">X</Badge>
              )}
            </div>
            <div>{new Date(notice.createdAt).toLocaleDateString()}</div>
            <div className="text-right">
              <Button
                variant="destructive"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(notice.id);
                }}
              >
                삭제
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center gap-2 mt-4">
        <Button
          variant="outline"
          size="sm"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
        >
          이전
        </Button>
        <span className="text-sm pt-1">
          {page} / {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          다음
        </Button>
      </div>
    </>
  );
}
