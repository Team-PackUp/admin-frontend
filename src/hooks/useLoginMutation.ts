import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login } from "@/api/login";
import { useAuthStore } from "@/stores/authStore";
import type { LoginRequest, LoginResponse } from "@/@types/auth.types";

export const useLoginMutation = () => {
  const navigate = useNavigate();
  const setLogin = useAuthStore((state) => state.login);
  const setLogout = useAuthStore((state) => state.logout);

  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: login,
    onSuccess: ({ accessToken }) => {
      localStorage.setItem("accessToken", accessToken);
      setLogin(accessToken);
    },
    onError: () => {
      setLogout();
      // TODO: 토스트 띄우기 or 에러 상태 업데이트
    },
    onSettled: () => {
      navigate("/dashboard");
    },
  });
};
