import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import UserDetailDialog from "./UserDetailDialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type User = {
  id: number;
  email: string;
  nickname: string;
  joinType: string;
  age: number;
  nation: string;
  banFlag: "Y" | "N";
  banReason?: string;
  banAdminName?: string;
  withdrawFlag: "Y" | "N";
  createdAt: string;
};

type Props = {
  users: User[];
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
};

export default function UserListTable({
  users,
  page,
  totalPages,
  onPageChange,
}: Props) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const hasUsers = users.length > 0;

  return (
    <div className="border rounded-md p-4">
      <Table>
        {hasUsers && (
          <TableHeader>
            <TableRow>
              <TableHead>이메일</TableHead>
              <TableHead>닉네임</TableHead>
              <TableHead>가입유형</TableHead>
              <TableHead>나이</TableHead>
              <TableHead>국가</TableHead>
              <TableHead>접근금지</TableHead>
              <TableHead>탈퇴여부</TableHead>
              <TableHead>가입일</TableHead>
              <TableHead>관리</TableHead>
            </TableRow>
          </TableHeader>
        )}

        <TableBody>
          {hasUsers ? (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.nickname}</TableCell>
                <TableCell>{user.joinType}</TableCell>
                <TableCell>{user.age}</TableCell>
                <TableCell>{user.nation}</TableCell>
                <TableCell>
                  {user.banFlag === "Y" ? (
                    <Badge variant="destructive">차단</Badge>
                  ) : (
                    <Badge variant="secondary">정상</Badge>
                  )}
                </TableCell>
                <TableCell>
                  {user.withdrawFlag === "Y" ? (
                    <Badge variant="outline">Y</Badge>
                  ) : (
                    <Badge variant="default">N</Badge>
                  )}
                </TableCell>
                <TableCell>
                  {format(new Date(user.createdAt), "yyyy-MM-dd")}
                </TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedUser(user)}
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

      {hasUsers && (
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

      {selectedUser && (
        <UserDetailDialog
          open={!!selectedUser}
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
}
