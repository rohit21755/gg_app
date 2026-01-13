// src/api/axiosClient.ts
import axios from "axios";
import { useAuthStore } from "../../store/authStore";

export const api = axios.create({
  baseURL: "http://ec2-54-205-140-13.compute-1.amazonaws.com:8080/api/v1/", // change this to your auth route
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
        const resp = await axios.post("http://ec2-54-205-140-13.compute-1.amazonaws.com:8080/api/v1/auth/refresh", {
          refresh_token: refreshToken,
        });

        // API returns { data: { access_token, refresh_token, user } }
        const responseData = resp.data.data || resp.data;
        const { access_token, refresh_token, user } = responseData;
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
