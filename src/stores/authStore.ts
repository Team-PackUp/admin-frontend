import { create } from "zustand";

interface AuthState {
  isLoggedIn: boolean;
  accessToken: string | null;
  login: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  accessToken: null,
  login: (token) => set({ isLoggedIn: true, accessToken: token }),
  logout: () => set({ isLoggedIn: false, accessToken: null }),
}));
