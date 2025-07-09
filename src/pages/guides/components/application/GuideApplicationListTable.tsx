import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import type { GuideApplication } from "@/api/guideApplication";

type Props = {
  guideApplications: GuideApplication[];
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
};

export default function GuideApplicationListTable({
  guideApplications,
  page,
  totalPages,
  onPageChange,
}: Props) {
  const [selectedGuideApplication, setSelectedGuideApplication] =
    useState<GuideApplication | null>(null);

  const hasGuideApplication = guideApplications.length > 0;

  return (
    <div className="border rounded-md p-4">
      <Table>
        {hasGuideApplication && (
          <TableHeader>
            <TableRow>
              <TableHead>이메일</TableHead>
              <TableHead>닉네임</TableHead>
              <TableHead>나이</TableHead>
              <TableHead>국가</TableHead>
              <TableHead>상태</TableHead>
              <TableHead>신청일</TableHead>
              <TableHead>관리</TableHead>
            </TableRow>
          </TableHeader>
        )}

        <TableBody>
          {hasGuideApplication ? (
            guideApplications.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.nickname}</TableCell>
                <TableCell>{user.age}</TableCell>
                <TableCell>{user.nation}</TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell>
                  {format(new Date(user.createdAt), "yyyy-MM-dd")}
                </TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedGuideApplication(user)}
                  >
                    상세보기
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={9}
                className="text-center text-muted-foreground"
              >
                검색 결과가 없습니다.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {hasGuideApplication && (
        <Pagination className="mt-4 flex justify-center">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => onPageChange(Math.max(page - 1, 1))}
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
                onClick={() => onPageChange(Math.min(page + 1, totalPages))}
                aria-disabled={page === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      {/* {selectedGuideApplication && (
        <UserDetailDialog
          open={!!selectedUser}
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )} */}
    </div>
  );
}
