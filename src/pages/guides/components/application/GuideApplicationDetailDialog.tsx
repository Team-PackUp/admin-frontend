import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useGuideApplicationDetail } from "@/hooks/useGuideApplicationDetail";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GuideApplicationAPI } from "@/api/guideApplication";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  id: number | null;
};

export default function GuideApplicationDetailDialog({
  open,
  onClose,
  id,
}: Props) {
  const { data, isLoading, isError } = useGuideApplicationDetail(
    id ?? undefined
  );
  const isApplied = data?.status === "APPLIED";

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate: updateStatus, isPending } = useMutation({
    mutationFn: (status: "APPROVED" | "REJECTED") =>
      GuideApplicationAPI.updateStatus(id!, status),
    onSuccess: () => {
      toast({
        title: "처리 완료",
        description: "가이드 신청 상태가 변경되었습니다.",
      });
      queryClient.invalidateQueries({ queryKey: ["guideApplications"] });
      onClose();
    },
    onError: () => {
      toast({
        title: "처리 실패",
        description: "요청을 처리하는 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    },
  });

  const handleReject = () => updateStatus("REJECTED");
  const handleApprove = () => updateStatus("APPROVED");

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>가이드 신청 상세</DialogTitle>
          <DialogDescription>
            신청 내용을 확인하고 처리하세요.
          </DialogDescription>
        </DialogHeader>

        {isLoading && (
          <div className="space-y-4 mt-4">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-10 w-32" />
          </div>
        )}

        {isError && (
          <div className="text-red-500 flex items-center gap-2 mt-4">
            <AlertCircle className="w-5 h-5" />
            데이터를 불러오는 중 오류가 발생했습니다.
          </div>
        )}

        {data && (
          <div className="space-y-6 mt-4">
            {/* 신분증 이미지 */}
            <div>
              <Label className="text-muted-foreground mb-1 block">
                신분증 이미지
              </Label>
              <div className="w-full max-w-md aspect-video border rounded-md overflow-hidden bg-muted flex items-center justify-center">
                {data.idImageUrl ? (
                  <img
                    src={data.idImageUrl}
                    alt="신분증 이미지"
                    className="w-auto h-full object-contain"
                  />
                ) : (
                  <span className="text-sm text-muted-foreground">
                    이미지가 없습니다
                  </span>
                )}
              </div>
            </div>

            <div>
              <Label className="text-muted-foreground mb-1 block">
                자기소개
              </Label>
              <div className="border border-input bg-white rounded-md h-[300px] overflow-y-auto px-3 py-2">
                <ReactQuill
                  value={data.content}
                  readOnly
                  theme="snow"
                  className="h-full"
                />
              </div>
            </div>

            {isApplied && (
              <div className="flex justify-end gap-2">
                <Button
                  variant="destructive"
                  onClick={handleReject}
                  disabled={isPending}
                >
                  반려
                </Button>
                <Button onClick={handleApprove} disabled={isPending}>
                  승인
                </Button>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
