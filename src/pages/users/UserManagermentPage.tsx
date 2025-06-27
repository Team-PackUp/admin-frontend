import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import UserSearchForm from "./components/UserSearchForm";
import UserListTable from "./components/UserListTable";
// import { fetchUsers } from "@/api/user";

export default function UserManagementPage() {
  const [users, setUsers] = useState([]);

  const handleSearch = async (type: "email" | "nickname", keyword: string) => {
    // const response = await fetchUsers({ [type]: keyword });
    // setUsers(response.data);
  };

  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold">👥 사용자 관리</h2>
          <p className="text-sm text-muted-foreground">
            PACKUP에 가입한 사용자의 정보를 조회하고 관리합니다.
          </p>
        </div>

        <UserSearchForm onSearch={handleSearch} />

        <Card>
          <CardContent className="pt-4">
            {/* <UserListTable users={users} /> */}
            <UserListTable />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
