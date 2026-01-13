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
    onSuccess: async (data) => {
      console.log("Login response data:", data);
      console.log("Access token:", data.access_token);
      console.log("Refresh token:", data.refresh_token);
      console.log("User data:", data.user);
      
      // Set auth state - the layout will automatically redirect
      await setAuth({
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        user: data.user,
      });
      
      // Verify data was stored
      const storedUser = useAuthStore.getState().user;
      console.log("Stored user after setAuth:", storedUser);
      
      // Navigation will be handled by _layout.tsx useEffect
    },
    onError: (error) => {
      console.log(error);
    //   return false;
    },
  });

  const register = useMutation({
    mutationFn: registerRequest,
    onSuccess: (data) => {
      console.log("Register response data:", data);
      setAuth({
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        user: data.user,
      });
      
      // Verify data was stored
      const storedUser = useAuthStore.getState().user;
      console.log("Stored user after register:", storedUser);
    },
  });

  const logout = useMutation({
    mutationFn: logoutRequest,
    onSuccess: () => logoutStore(),
  });

  return { login, register, logout };
}
