import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import UserListTable from "./components/UserListTable";

export default function UserManagementPage() {
  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold">👥 사용자 관리</h2>
          <p className="text-sm text-muted-foreground">
            PACKUP에 가입한 사용자의 정보를 조회하고 관리합니다.
          </p>
        </div>

        <Card>
          <CardContent className="pt-4">
            <UserListTable />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
