import { useQuery } from '@tanstack/react-query';
import { api } from './axiosClient';
import type { QueryParams } from '../types';

// Activities API Functions
export const activitiesApi = {
  // Get user activities
  getUserActivities: async (params?: QueryParams) => {
    const res = await api.get('/activities', { params });
    return res.data;
  },

  // Get global activity feed
  getGlobalActivities: async (params?: QueryParams) => {
    const res = await api.get('/activities/global', { params });
    return res.data;
  },
};

// React Query Hooks for Activities
export const useUserActivities = (params?: QueryParams) => {
  return useQuery({
    queryKey: ['user-activities', params],
    queryFn: () => activitiesApi.getUserActivities(params),
  });
};

export const useGlobalActivities = (params?: QueryParams) => {
  return useQuery({
    queryKey: ['global-activities', params],
    queryFn: () => activitiesApi.getGlobalActivities(params),
  });
};

