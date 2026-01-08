import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type {
    QueryParams,
    UpdateAvatarRequest,
    UpdateProfileRequest,
} from '../types';
import { api } from './axiosClient';

// Users API Functions
export const usersApi = {
  // Get current user profile
  getCurrentUser: async () => {
    const res = await api.get('/users/me');
    return res.data;
  },

  // Update user profile
  updateProfile: async (data: UpdateProfileRequest) => {
    const res = await api.put('/users/me', data);
    return res.data;
  },

  // Update user avatar
  updateAvatar: async (data: UpdateAvatarRequest) => {
    const res = await api.patch('/users/me/avatar', data);
    return res.data;
  },

  // Upload user resume
  uploadResume: async (formData: FormData) => {
    const res = await api.post('/users/me/resume', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  },

  // Get user certificates
  getCertificates: async () => {
    const res = await api.get('/users/me/certificates');
    return res.data;
  },

  // Download certificate
  downloadCertificate: async (id: number) => {
    const res = await api.get(`/users/me/certificates/${id}/download`, {
      responseType: 'blob',
    });
    return res.data;
  },

  // Get user dashboard stats
  getDashboardStats: async () => {
    const res = await api.get('/users/me/stats');
    return res.data;
  },

  // Get user activity feed
  getActivity: async (params?: QueryParams) => {
    const res = await api.get('/users/me/activity', { params });
    return res.data;
  },

  // Search users
  searchUsers: async (params: QueryParams) => {
    const res = await api.get('/users/search', { params });
    return res.data;
  },

  // Get user statistics
  getUserStats: async (id: number) => {
    const res = await api.get(`/users/${id}/stats`);
    return res.data;
  },
};

// React Query Hooks for Users
export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['user', 'me'],
    queryFn: usersApi.getCurrentUser,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: usersApi.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};

export const useUpdateAvatar = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: usersApi.updateAvatar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};

export const useUploadResume = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: usersApi.uploadResume,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};

export const useCertificates = () => {
  return useQuery({
    queryKey: ['certificates'],
    queryFn: usersApi.getCertificates,
  });
};

export const useDownloadCertificate = () => {
  return useMutation({
    mutationFn: usersApi.downloadCertificate,
  });
};

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: usersApi.getDashboardStats,
  });
};

export const useUserActivity = (params?: QueryParams) => {
  return useQuery({
    queryKey: ['user-activity', params],
    queryFn: () => usersApi.getActivity(params),
  });
};

export const useSearchUsers = (params: QueryParams) => {
  return useQuery({
    queryKey: ['search-users', params],
    queryFn: () => usersApi.searchUsers(params),
    enabled: !!params.q,
  });
};

export const useUserStats = (id: number) => {
  return useQuery({
    queryKey: ['user-stats', id],
    queryFn: () => usersApi.getUserStats(id),
    enabled: !!id,
  });
};

