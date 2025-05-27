import { useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";

export default function AuthInitializer() {
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) login(token);
  }, []);

  return null;
}
