import { useState } from "react";
import { Button } from "@/components/ui/button";
import NoticeEditorDialog from "./NoticeEditorDialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
          open={Boolean(editingNotice)}
          initialData={editingNotice}
          onClose={() => setEditingNotice(null)}
          onSubmit={(updated) => {
            onUpdate(updated as NoticeItem);
            setEditingNotice(null);
          }}
        />
      )}

      <div className="space-y-2">
        {data.map((notice) => (
          <div
            key={notice.id}
            onClick={() => setEditingNotice(notice)}
            className="p-4 border rounded-md hover:bg-accent transition cursor-pointer"
          >
            <div className="text-base font-semibold mb-1">{notice.title}</div>

            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <div className="space-x-4">
                <span>
                  작성일: {new Date(notice.createdAt).toLocaleDateString()}
                </span>
                <span>FCM: {notice.sendFcm ? "O" : "X"}</span>
                <span>긴급: {notice.isUrgent ? "O" : "X"}</span>
              </div>
              <div onClick={(e) => e.stopPropagation()}>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      삭제
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        정말로 삭제하시겠습니까?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        삭제 후 복구할 수 없습니다.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>취소</AlertDialogCancel>
                      <AlertDialogAction onClick={() => onDelete(notice.id)}>
                        삭제
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        ))}
      </div>

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
