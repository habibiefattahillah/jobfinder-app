import { create } from "zustand";
import type { AuthResponse } from "@/types";

interface AuthState {
  token: string | null;
  user: AuthResponse["user"] | null;
  isAuthenticated: boolean;
  login: (data: AuthResponse) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
  const token = localStorage.getItem("auth_token");
  const user = localStorage.getItem("user");

  return {
    token: token || null,
    user: user ? JSON.parse(user) : null,
    isAuthenticated: !!token,
    login: ({ token, user }) => {
      localStorage.setItem("auth_token", token);
      localStorage.setItem("user", JSON.stringify(user));
      set({ token, user, isAuthenticated: true });
    },
    logout: () => {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user");
      set({ token: null, user: null, isAuthenticated: false });
    },
  };
});
