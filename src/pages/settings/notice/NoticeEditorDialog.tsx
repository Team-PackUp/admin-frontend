import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";

export default function NoticeEditorDialog() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [sendFcm, setSendFcm] = useState(false);
  const [isUrgent, setIsUrgent] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
  });

  const handleSubmit = () => {
    const contentDelta = editor?.getJSON();
    const noticeData = {
      title,
      content: contentDelta,
      sendFcm,
      isUrgent,
    };

    console.log("📢 저장할 공지사항 데이터:", noticeData);

    setOpen(false);
    setTitle("");
    setSendFcm(false);
    setIsUrgent(false);
    editor?.commands.clearContent();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">+ 공지 등록</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>공지사항 등록</DialogTitle>
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
              FCM 발송
            </label>
            <label className="flex items-center gap-2 text-sm">
              <Checkbox
                checked={isUrgent}
                onCheckedChange={(val) => setIsUrgent(Boolean(val))}
              />
              긴급 공지
            </label>
          </div>

          <div className="border border-input bg-white rounded-md h-[300px] overflow-y-auto px-3 py-2">
            <EditorContent
              editor={editor}
              className="prose max-w-none [&>*]:outline-none [&>*]:focus:outline-none"
            />
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSubmit}>저장</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
