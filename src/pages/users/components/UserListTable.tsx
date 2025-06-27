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
  banAdminId?: string;
  withdrawFlag: "Y" | "N";
  createdAt: string;
};

const mockUsers: User[] = Array.from({ length: 25 }).map((_, i) => ({
  id: i + 1,
  email: `user${i + 1}@example.com`,
  nickname: `유저${i + 1}`,
  joinType: i % 2 === 0 ? "GOOGLE" : "KAKAO",
  age: 20 + (i % 10),
  nation: i % 2 === 0 ? "KR" : "US",
  banFlag: i % 5 === 0 ? "Y" : "N",
  banReason: i % 5 === 0 ? "부적절한 행위로 인한 차단" : undefined,
  banAdminId: i % 5 === 0 ? `admin${(i % 3) + 1}` : undefined,
  withdrawFlag: i % 7 === 0 ? "Y" : "N",
  createdAt: `2024-12-${String((i % 28) + 1).padStart(2, "0")}T12:00:00Z`,
}));

const PAGE_SIZE = 10;

export default function UserListTable() {
  const [users] = useState<User[]>(mockUsers);
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const totalPages = Math.ceil(users.length / PAGE_SIZE);
  const paginatedUsers = users.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="border rounded-md p-4">
      <Table>
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
        <TableBody>
          {paginatedUsers.map((user) => (
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
          ))}
        </TableBody>
      </Table>

      <Pagination className="mt-4 flex justify-center">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              aria-disabled={page === 1}
            />
          </PaginationItem>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <PaginationItem key={p}>
              <button
                onClick={() => setPage(p)}
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
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              aria-disabled={page === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

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
