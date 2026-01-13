import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type {
  ForgotPasswordRequest,
  LoginRequest,
  RefreshTokenRequest,
  RegisterRequest,
  ResetPasswordRequest,
} from '../types';
import { api } from './axiosClient';

// Authentication API Functions
export const authApi = {
  // Health Check
  healthCheck: async () => {
    const res = await api.get('/health');
    return res.data;
  },

  // Login
  login: async (data: LoginRequest) => {
    const res = await api.post('/auth/login', data);
    // API returns { data: { access_token, refresh_token, user } }
    return res.data.data || res.data;
  },

  // Register
  register: async (data: RegisterRequest) => {
    const res = await api.post('/auth/register', data);
    // API returns { data: { access_token, refresh_token, user } }
    return res.data.data || res.data;
  },

  // Refresh Token
  refreshToken: async (data: RefreshTokenRequest) => {
    const res = await api.post('/auth/refresh', data);
    return res.data;
  },

  // Logout
  logout: async () => {
    const res = await api.post('/auth/logout');
    return res.data;
  },

  // Forgot Password
  forgotPassword: async (data: ForgotPasswordRequest) => {
    const res = await api.post('/auth/forgot-password', data);
    return res.data;
  },

  // Reset Password
  resetPassword: async (data: ResetPasswordRequest) => {
    const res = await api.post('/auth/reset-password', data);
    return res.data;
  },

  // Verify Email
  verifyEmail: async (token: string) => {
    const res = await api.get(`/auth/verify-email/${token}`);
    return res.data;
  },
};

// React Query Hooks for Authentication
export const useHealthCheck = () => {
  return useQuery({
    queryKey: ['health'],
    queryFn: authApi.healthCheck,
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authApi.login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: authApi.register,
  });
};

export const useRefreshToken = () => {
  return useMutation({
    mutationFn: authApi.refreshToken,
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      queryClient.clear();
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: authApi.forgotPassword,
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: authApi.resetPassword,
  });
};

export const useVerifyEmail = (token: string) => {
  return useQuery({
    queryKey: ['verify-email', token],
    queryFn: () => authApi.verifyEmail(token),
    enabled: !!token,
  });
};

// Wrapper functions for useAuth hook
export const loginRequest = async (email: string, password: string) => {
  return authApi.login({ email, password });
};

export const registerRequest = async (data: RegisterRequest) => {
  return authApi.register(data);
};

export const logoutRequest = async () => {
  return authApi.logout();
};
