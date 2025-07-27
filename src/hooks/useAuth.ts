import { useAuthStore } from "@/stores/useAuthStore";

export const useAuth = () => {
  const { token, user, login, logout, isAuthenticated } = useAuthStore();

  return {
    token,
    user,
    login,
    logout,
    isAuthenticated,
  };
};
