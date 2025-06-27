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

type User = {
  id: number;
  email: string;
  nickname: string;
  joinType: string;
  age: number;
  nation: string;
  banFlag: "Y" | "N";
  withdrawFlag: "Y" | "N";
  createdAt: string;
};

const mockUsers: User[] = [
  {
    id: 1,
    email: "user1@example.com",
    nickname: "홍길동",
    joinType: "GOOGLE",
    age: 29,
    nation: "KR",
    banFlag: "N",
    withdrawFlag: "N",
    createdAt: "2024-12-01T12:00:00Z",
  },
  {
    id: 2,
    email: "user2@example.com",
    nickname: "JohnDoe",
    joinType: "KAKAO",
    age: 35,
    nation: "US",
    banFlag: "Y",
    withdrawFlag: "N",
    createdAt: "2025-01-15T09:30:00Z",
  },
];

export default function UserListTable() {
  const [users] = useState<User[]>(mockUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  return (
    <div className="border rounded-md">
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
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.nickname}</TableCell>
              <TableCell>{user.joinType}</TableCell>
              <TableCell>{user.age}</TableCell>
              <TableCell>{user.nation}</TableCell>
              <TableCell>
                {user.banFlag === "Y" ? (
                  <Badge variant="destructive">차단됨</Badge>
                ) : (
                  <Badge variant="secondary">정상</Badge>
                )}
              </TableCell>
              <TableCell>
                {user.withdrawFlag === "Y" ? (
                  <Badge variant="outline">탈퇴</Badge>
                ) : (
                  <Badge variant="default">활성</Badge>
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

      {/* 상세보기 다이얼로그 */}
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
