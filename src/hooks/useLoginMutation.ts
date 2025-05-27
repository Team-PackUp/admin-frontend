import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login } from "@/api/login";
import { useAuthStore } from "@/stores/authStore";
import type { LoginRequest, LoginResponse } from "@/@types/auth.types";
import { useToast } from "./use-toast";
import type { AxiosError } from "axios";

export const useLoginMutation = () => {
  const navigate = useNavigate();
  const setLogin = useAuthStore((state) => state.login);
  const setLogout = useAuthStore((state) => state.logout);
  const { toast } = useToast();

  return useMutation<
    LoginResponse,
    AxiosError<{ message: string }>,
    LoginRequest
  >({
    mutationFn: login,
    onSuccess: ({ accessToken }) => {
      localStorage.setItem("accessToken", accessToken);
      setLogin(accessToken);
      navigate("/dashboard");
    },
    onError: (error) => {
      setLogout();
      const msg =
        error.response?.data?.message ??
        "아이디 또는 비밀번호가 올바르지 않습니다.";

      toast({
        title: "로그인 실패",
        description: msg,
        variant: "destructive",
      });
    },
  });
};
