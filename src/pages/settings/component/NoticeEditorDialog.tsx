import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useCreateNotice } from "@/hooks/useCreateNotice";
import { useEffect, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useToast } from "@/hooks/use-toast";
import { useUpdateNotice } from "@/hooks/useUpdateNotice";
import type { CreateNoticeRequest, Notice } from "@/api/notice";

type Mode = "create" | "edit";

type Props = {
  mode: Mode;
  open?: boolean;
  initialData?: {
    id?: string;
    title: string;
    content: any;
    sendFcm: boolean;
    isUrgent: boolean;
  };
  onClose: () => void;
  onSubmit?: (data: {
    id?: string;
    title: string;
    content: any;
    sendFcm: boolean;
    isUrgent: boolean;
  }) => void;
};

export default function NoticeEditorDialog({
  mode,
  open,
  initialData,
  onClose,
  onSubmit,
}: Props) {
  const controlled = open !== undefined;
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [sendFcm, setSendFcm] = useState(initialData?.sendFcm ?? false);
  const [isUrgent, setIsUrgent] = useState(initialData?.isUrgent ?? false);
  const [editorValue, setEditorValue] = useState<any>(
    initialData?.content ?? ""
  );

  const { mutate: createNotice, isPending } = useCreateNotice();
  const { mutate: updateNotice, isPending: isUpdating } = useUpdateNotice();

  const editorRef = useRef<ReactQuill | null>(null);

  useEffect(() => {
    setTitle(initialData?.title ?? "");
    setSendFcm(initialData?.sendFcm ?? false);
    setIsUrgent(initialData?.isUrgent ?? false);
    setEditorValue(initialData?.content ?? "");
  }, [initialData]);

  const { toast } = useToast();

  const handleSubmit = () => {
    const delta = editorRef.current?.getEditor().getContents();

    const payload = {
      id: initialData?.id,
      title,
      content: delta,
      sendFcm,
      isUrgent,
    };

    if (mode === "create") {
      createNotice(payload as CreateNoticeRequest, {
        onSuccess: () => {
          toast({
            title: "공지사항 등록 완료",
            description: "공지사항이 등록되었습니다.",
          });

          setTitle("");
          setEditorValue("");
          setSendFcm(false);
          setIsUrgent(false);

          onSubmit?.(payload);
          onClose();
        },
        onError: (err) => {
          console.error("공지사항 등록 실패", err);
          alert("공지사항 등록에 실패했습니다.");
        },
      });
    }

    if (mode === "edit" && initialData?.id) {
      updateNotice(payload as Notice, {
        onSuccess: () => {
          toast({
            title: "공지사항 수정 완료",
            description: "공지사항이 수정되었습니다.",
          });

          setTitle("");
          setEditorValue("");
          setSendFcm(false);
          setIsUrgent(false);

          onSubmit?.(payload);
          onClose();
        },
        onError: (err) => {
          console.error("공지사항 수정 실패", err);
          alert("공지사항 수정에 실패했습니다.");
        },
      });
    }
  };

  return (
    <Dialog open={controlled ? open : undefined} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {mode === "edit" ? "공지사항 수정" : "공지사항 등록"}
          </DialogTitle>
          <DialogDescription>
            {mode === "edit"
              ? "공지 내용을 수정할 수 있습니다."
              : "새로운 공지를 등록합니다."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="공지 제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-sm">
              <Checkbox
                checked={sendFcm}
                onCheckedChange={(val) => setSendFcm(Boolean(val))}
              />
              FCM 발송 여부
            </label>
            <label className="flex items-center gap-2 text-sm">
              <Checkbox
                checked={isUrgent}
                onCheckedChange={(val) => setIsUrgent(Boolean(val))}
              />
              긴급 공지 여부
            </label>
          </div>

          <div className="border border-input bg-white rounded-md h-[300px] overflow-y-auto px-3 py-2">
            <ReactQuill
              ref={editorRef}
              value={editorValue}
              onChange={(_, __, ___, editor) => {
                setEditorValue(editor.getContents());
              }}
              theme="snow"
              className="h-full"
            />
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSubmit} disabled={isPending || isUpdating}>
              {isPending || isUpdating
                ? "저장 중..."
                : mode === "edit"
                ? "수정"
                : "저장"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
