// src/store/authStore.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  xp: number;
  college_id?: number | null;
}

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  loading: boolean;

  setAuth: (data: {
    accessToken: string;
    refreshToken: string;
    user: User;
  }) => Promise<void>;

  logout: () => Promise<void>;
  loadStoredAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  refreshToken: null,
  user: null,
  loading: true,

  // 🔐 Save tokens + user to storage
  setAuth: async ({ accessToken, refreshToken, user }) => {
    await AsyncStorage.setItem("accessToken", accessToken);
    await AsyncStorage.setItem("refreshToken", refreshToken);
    await AsyncStorage.setItem("user", JSON.stringify(user));

    set({ accessToken, refreshToken, user });
  },

  // 🚪 Logout + clear storage
  logout: async () => {
    await AsyncStorage.multiRemove(["accessToken", "refreshToken", "user"]);
    set({ accessToken: null, refreshToken: null, user: null });
  },

  // 🚀 Auto login if token exists
  loadStoredAuth: async () => {
    const accessToken = await AsyncStorage.getItem("accessToken");
    const refreshToken = await AsyncStorage.getItem("refreshToken");
    const userData = await AsyncStorage.getItem("user");

    set({
      accessToken,
      refreshToken,
      user: userData ? JSON.parse(userData) : null,
      loading: false,
    });
  },
}));
