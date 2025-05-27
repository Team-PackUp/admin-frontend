import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";

export default function RequireAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoggedIn, accessToken } = useAuthStore();
  if (!isLoggedIn || !accessToken) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}
