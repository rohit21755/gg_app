// src/api/axiosClient.ts
import axios from "axios";
import { useAuthStore } from "../../store/authStore";

export const api = axios.create({
  baseURL: "http://10.0.2.2:8080/api/v1/", // change this to your auth route
});

// Attach accessToken to requests
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auto Refresh Token
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;
    const { refreshToken, setAuth, logout } = useAuthStore.getState();

    // If unauthorized, try refreshing
    if (err.response?.status === 401 && refreshToken) {
      try {
        const resp = await axios.post("http://10.0.2.2:8080/api/v1/auth/refresh", {
          refresh_token: refreshToken,
        });

        const { access_token, refresh_token, user } = resp.data;
        setAuth({
          accessToken: access_token,
          refreshToken: refresh_token,
          user,
        });

        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return api(originalRequest);
      } catch (refreshErr) {
        logout();
      }
    }
    return Promise.reject(err);
  }
);
