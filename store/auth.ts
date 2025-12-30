// store/auth.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

type AuthState = {
  accessToken: string | null;
  loading: boolean;
  setToken: (token: string | null) => void;
  logout: () => Promise<void>;
  checkStoredToken: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  loading: true,

  setToken: async (token) => {
    if (token) await AsyncStorage.setItem("accessToken", token);
    set({ accessToken: token });
  },

  logout: async () => {
    await AsyncStorage.removeItem("accessToken");
    set({ accessToken: null });
  },

  checkStoredToken: async () => {
    const token = await AsyncStorage.getItem("accessToken");
    set({ accessToken: token, loading: false });
  },
}));
