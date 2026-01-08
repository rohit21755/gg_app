import { useQuery } from '@tanstack/react-query';
import { api } from './axiosClient';

// Dashboard API Functions
export const dashboardApi = {
  // Get user dashboard
  getDashboard: async () => {
    const res = await api.get('/dashboard');
    return res.data;
  },

  // Get quick stats
  getQuickStats: async () => {
    const res = await api.get('/dashboard/quick-stats');
    return res.data;
  },
};

// React Query Hooks for Dashboard
export const useDashboard = () => {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: dashboardApi.getDashboard,
  });
};

export const useQuickStats = () => {
  return useQuery({
    queryKey: ['quick-stats'],
    queryFn: dashboardApi.getQuickStats,
  });
};

