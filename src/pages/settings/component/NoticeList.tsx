import { useState } from "react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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
                  작성일: {format(new Date(notice.createdAt), "yyyy-MM-dd")}
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

      <Pagination className="mt-4 flex justify-center">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => onPageChange(Math.max(1, page - 1))}
              aria-disabled={page === 1}
            />
          </PaginationItem>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <PaginationItem key={p}>
              <button
                onClick={() => onPageChange(p)}
                className={`
            h-8 w-8 rounded-md text-sm font-medium
            ${p === page ? "bg-primary text-white" : "hover:bg-muted"}
          `}
                aria-current={p === page ? "page" : undefined}
              >
                {p}
              </button>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={() => onPageChange(Math.min(totalPages, page + 1))}
              aria-disabled={page === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}
