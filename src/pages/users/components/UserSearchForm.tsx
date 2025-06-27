import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

type Props = {
  onSearch: (type: "email" | "nickname", keyword: string) => void;
};

export default function UserSearchForm({ onSearch }: Props) {
  const [searchType, setSearchType] = useState<"email" | "nickname">("email");
  const [keyword, setKeyword] = useState("");

  return (
    <div className="flex gap-4 items-center p-4 bg-white rounded-lg shadow-sm border border-border">
      <Select
        value={searchType}
        onValueChange={(val) => setSearchType(val as "email" | "nickname")}
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="검색 기준" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="seq">사용자 번호로 검색</SelectItem>
          <SelectItem value="email">이메일로 검색</SelectItem>
          <SelectItem value="nickname">닉네임으로 검색</SelectItem>
        </SelectContent>
      </Select>

      <Input
        placeholder="검색어 입력"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="w-64"
      />

      <Button onClick={() => onSearch(searchType, keyword)}>검색</Button>
    </div>
  );
}
