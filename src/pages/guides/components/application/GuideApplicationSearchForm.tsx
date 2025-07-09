import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import type {
  GuideApplicationSearchType,
  GuideApplicationStatus,
} from "@/api/guideApplication";

type Props = {
  onSearch: (
    type: GuideApplicationSearchType,
    keyword: string,
    status: GuideApplicationStatus[]
  ) => void;
};

const STATUS_OPTIONS: {
  label: string;
  value: GuideApplicationStatus;
}[] = [
  { label: "신청완료", value: "APPLIED" },
  { label: "신청취소", value: "CANCELED" },
  { label: "반려", value: "REJECTED" },
  { label: "승인", value: "APPROVED" },
];

export default function GuideApplicationSearchForm({ onSearch }: Props) {
  const [searchType, setSearchType] =
    useState<GuideApplicationSearchType>("email");
  const [keyword, setKeyword] = useState("");
  const [statusList, setStatusList] = useState<GuideApplicationStatus[]>([
    "APPLIED",
  ]);

  const toggleStatus = (value: GuideApplicationStatus) => {
    setStatusList((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleSearch = () => {
    onSearch(searchType, keyword.trim(), statusList);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white rounded-lg shadow-sm border border-border">
      <div className="flex flex-wrap items-center gap-4">
        <Select
          value={searchType}
          onValueChange={(val) =>
            setSearchType(val as GuideApplicationSearchType)
          }
        >
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="seq">사용자 번호</SelectItem>
            <SelectItem value="email">이메일</SelectItem>
            <SelectItem value="nickname">닉네임</SelectItem>
          </SelectContent>
        </Select>

        <Input
          placeholder="검색어 입력"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-64"
        />

        <div className="flex gap-4">
          {STATUS_OPTIONS.map(({ label, value }) => (
            <label key={value} className="flex items-center gap-2 text-sm">
              <Checkbox
                checked={statusList.includes(value)}
                onCheckedChange={() => toggleStatus(value)}
              />
              {label}
            </label>
          ))}
        </div>
      </div>

      <Button onClick={handleSearch} className="whitespace-nowrap">
        검색
      </Button>
    </div>
  );
}
