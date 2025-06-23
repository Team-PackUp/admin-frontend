import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";

const NAV_ITEMS = [
  { name: "대시보드", path: "/dashboard" },
  { name: "사용자 관리", path: "/users" },
  { name: "가이드 관리", path: "/guides" },
  { name: "투어 콘텐츠", path: "/tours" },
  { name: "예약·결제", path: "/payments" },
  { name: "신고·리뷰", path: "/reports" },
  { name: "시스템 설정", path: "/settings" },
];

export default function Header() {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-white shadow px-6 py-4 sticky top-0 z-10">
      <div className="flex justify-between items-center max-w-screen-xl mx-auto">
        <div className="flex items-center gap-10">
          <h1
            className="text-2xl font-bold text-primary cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            PACKUP ADMIN
          </h1>
          <nav className="flex flex-wrap gap-3 text-sm md:text-base">
            {NAV_ITEMS.map(({ name, path }) => (
              <Button
                key={path}
                variant="ghost"
                className="hover:text-primary px-2"
                onClick={() => navigate(path)}
              >
                {name}
              </Button>
            ))}
          </nav>
        </div>

        <Button variant="outline" size="sm" onClick={handleLogout}>
          로그아웃
        </Button>
      </div>
    </header>
  );
}
