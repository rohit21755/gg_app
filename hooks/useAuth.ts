// src/hooks/useAuth.ts
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { loginRequest, logoutRequest, registerRequest } from "../api/rest/auth";
import { useAuthStore } from "../store/authStore";
export function useAuth() {
  const setAuth = useAuthStore((state) => state.setAuth);
  const logoutStore = useAuthStore((state) => state.logout);

  const login = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginRequest(email, password),
    onSuccess: (data) => {
      setAuth({
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        user: data.user,
      });
    //   return true;
    console.log("Logged in successfully");
    console.log(data);
        router.push('/(tabs)' as any);
    },
    onError: (error) => {
      console.log(error);
    //   return false;
    },
  });

  const register = useMutation({
    mutationFn: registerRequest,
    onSuccess: (data) => {
      setAuth({
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        user: data.user,
      });
    },
  });

  const logout = useMutation({
    mutationFn: logoutRequest,
    onSuccess: () => logoutStore(),
  });

  return { login, register, logout };
}
