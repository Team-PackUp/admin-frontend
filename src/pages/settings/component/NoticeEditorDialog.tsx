import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";
import { useCreateNotice } from "@/hooks/useCreateNotice";

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

  const { mutate: createNotice, isPending } = useCreateNotice();

  const editor = useEditor({
    extensions: [StarterKit],
    content: initialData?.content ?? "",
  });

  useEffect(() => {
    setTitle(initialData?.title ?? "");
    setSendFcm(initialData?.sendFcm ?? false);
    setIsUrgent(initialData?.isUrgent ?? false);
    if (editor && initialData?.content) {
      editor.commands.setContent(initialData.content);
    }
  }, [initialData, editor]);

  const handleSubmit = () => {
    const content = editor?.getJSON();

    const payload = {
      id: initialData?.id,
      title,
      content,
      sendFcm,
      isUrgent,
    };

    if (mode === "create") {
      createNotice(
        {
          title,
          content,
          sendFcm,
          isUrgent,
        },
        {
          onSuccess: () => {
            onSubmit?.(payload);
            onClose();
          },
          onError: (err) => {
            console.error("공지사항 등록 실패", err);
            alert("공지사항 등록에 실패했습니다.");
          },
        }
      );
    }

    if (mode === "edit") {
      onSubmit?.(payload); // 수정은 나중에 실제 API로 연결
      onClose();
    }
  };

  return (
    <Dialog open={controlled ? open : undefined} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {mode === "edit" ? "공지사항 수정" : "공지사항 등록"}
          </DialogTitle>
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
            <EditorContent
              editor={editor}
              className="prose max-w-none [&>*]:outline-none [&>*]:focus:outline-none"
            />
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSubmit} disabled={isPending}>
              {isPending ? "저장 중..." : mode === "edit" ? "수정" : "저장"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
