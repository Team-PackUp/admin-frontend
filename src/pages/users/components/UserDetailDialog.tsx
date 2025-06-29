import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useUpdateUserStatus } from "@/hooks/useUpdateUserStatus";
import { useToast } from "@/hooks/use-toast";

export type UserDetail = {
  id: number;
  email: string;
  nickname: string;
  joinType: string;
  age: number;
  nation: string;
  banFlag: "Y" | "N";
  banReason?: string;
  banAdminId?: string;
  withdrawFlag: "Y" | "N";
  createdAt: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  user: UserDetail;
};

export default function UserDetailDialog({ open, onClose, user }: Props) {
  const [ban, setBan] = useState(user.banFlag === "Y");
  const [banReason, setBanReason] = useState(
    user.banFlag === "Y" ? user.banReason ?? "" : ""
  );
  const [withdraw, setWithdraw] = useState(user.withdrawFlag === "Y");
  const { toast } = useToast();

  const { mutate: updateUserStatus, isPending } = useUpdateUserStatus(
    user.id,
    () => {
      toast({
        title: "회원 정보 수정 완료",
        description: "회원 정보가 수정되었습니다.",
      });
      onClose();
    }
  );

  const handleBanChange = (checked: boolean) => {
    setBan(checked);
    if (!checked) setBanReason("");
  };

  const handleSave = () => {
    const payload: any = {};

    const prevBan = user.banFlag === "Y";
    const prevWithdraw = user.withdrawFlag === "Y";

    if (ban !== prevBan) {
      payload.ban = ban;
      if (ban) payload.banReason = banReason;
    }

    if (withdraw !== prevWithdraw) {
      payload.withdraw = withdraw;
    }

    if (Object.keys(payload).length === 0) {
      toast({
        title: "회원 정보 수정 실패",
        description: "변경된 내용이 없습니다.",
      });
      onClose();
      return;
    }

    if (ban && banReason.trim() === "") {
      toast({
        title: "회원 정보 수정 실패",
        description: "밴 사유를 입력해주세요.",
      });
      return;
    }

    updateUserStatus(payload);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>사용자 상세</DialogTitle>
          <DialogDescription>
            회원 상태를 수정하거나 예약 및 신고 이력을 확인할 수 있습니다.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="info" className="w-full mt-2">
          <TabsList>
            <TabsTrigger value="info">세부정보</TabsTrigger>
            <TabsTrigger value="reservations">예약 이력</TabsTrigger>
            <TabsTrigger value="reviews">리뷰 내역</TabsTrigger>
            <TabsTrigger value="reports">신고 이력</TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="pt-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <Label className="text-muted-foreground mb-1 block">
                  이메일
                </Label>
                <Input value={user.email} readOnly className="h-8 px-2" />
              </div>
              <div>
                <Label className="text-muted-foreground mb-1 block">
                  닉네임
                </Label>
                <Input value={user.nickname} readOnly className="h-8 px-2" />
              </div>
              <div>
                <Label className="text-muted-foreground mb-1 block">
                  가입유형
                </Label>
                <Input value={user.joinType} readOnly className="h-8 px-2" />
              </div>
              <div>
                <Label className="text-muted-foreground mb-1 block">나이</Label>
                <Input
                  value={user.age.toString()}
                  readOnly
                  className="h-8 px-2"
                />
              </div>
              <div>
                <Label className="text-muted-foreground mb-1 block">국가</Label>
                <Input value={user.nation} readOnly className="h-8 px-2" />
              </div>
              <div>
                <Label className="text-muted-foreground mb-1 block">
                  가입일
                </Label>
                <Input
                  value={user.createdAt.split("T")[0]}
                  readOnly
                  className="h-8 px-2"
                />
              </div>

              <div className="col-span-2 pt-2">
                <div className="flex items-center justify-between mb-1">
                  <Label className="text-muted-foreground">접근 제한</Label>
                  <Switch
                    checked={ban}
                    onCheckedChange={handleBanChange}
                    className="scale-90"
                  />
                </div>

                {ban && (
                  <div className="mt-2">
                    <Label className="text-muted-foreground mb-1 block">
                      제한 사유
                    </Label>
                    <Textarea
                      value={banReason}
                      onChange={(e) => setBanReason(e.target.value)}
                      placeholder="접근 제한 사유를 입력하세요."
                      className="min-h-[80px]"
                    />
                    {user.banFlag === "Y" && user.banAdminId && (
                      <p className="text-xs text-muted-foreground mt-1">
                        제한 조치 관리자:{" "}
                        <span className="font-medium">{user.banAdminId}</span>
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between col-span-2 pt-2">
                <Label className="text-muted-foreground">탈퇴 처리</Label>
                <Switch
                  checked={withdraw}
                  onCheckedChange={setWithdraw}
                  className="scale-90"
                />
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <Button
                size="sm"
                className="px-6"
                onClick={handleSave}
                disabled={isPending}
              >
                저장
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="reservations" className="pt-4">
            <p>예약 이력 mock 데이터 표시 예정</p>
          </TabsContent>

          <TabsContent value="reviews" className="pt-4">
            <p>리뷰 이력 mock 데이터 표시 예정</p>
          </TabsContent>

          <TabsContent value="reports" className="pt-4">
            <p>신고 이력 mock 데이터 표시 예정</p>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
