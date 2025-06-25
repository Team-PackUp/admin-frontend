import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSystemSettings } from "@/hooks/useSystemSettings";

export default function LanguageSettingCard() {
  const { currentLanguage, updateLanguage, isUpdating } = useSystemSettings();
  const [selectedLang, setSelectedLang] = useState("");

  const languageList = [
    { code: "한국어", name: "한국어" },
    { code: "영어", name: "영어" },
    { code: "중국어", name: "중국어" },
    { code: "일본어", name: "일본어" },
  ];

  useEffect(() => {
    if (currentLanguage) {
      setSelectedLang(currentLanguage);
    }
  }, [currentLanguage]);

  const handleSave = () => {
    if (selectedLang && selectedLang !== currentLanguage) {
      updateLanguage(selectedLang);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>언어 선택</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select value={selectedLang} onValueChange={setSelectedLang}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="언어 선택" />
          </SelectTrigger>
          <SelectContent>
            {languageList.map((lang) => (
              <SelectItem key={lang.code} value={lang.code}>
                {lang.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          size="sm"
          className="mt-2"
          onClick={handleSave}
          disabled={isUpdating || selectedLang === currentLanguage}
        >
          {isUpdating ? "저장 중..." : "저장"}
        </Button>
      </CardContent>
    </Card>
  );
}
