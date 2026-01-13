import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { CreateOrGetCollegeRequest, QueryParams } from '../types';
import { api } from './axiosClient';

// Public API Functions
export const publicApi = {
  // Get all colleges
  getColleges: async () => {
    const res = await api.get('/colleges');
    // API returns { colleges: [...] } or { data: { colleges: [...] } }
    const response = res.data.data || res.data;
    // Handle both { colleges: [...] } and direct array
    return response.colleges || response;
  },

  // Create or get college (Public - No Auth Required)
  createOrGetCollege: async (data: CreateOrGetCollegeRequest) => {
    const res = await api.post('/colleges', data);
    // API returns { college: {...}, message: "..." } or { data: { college: {...}, message: "..." } }
    const response = res.data.data || res.data;
    return response;
  },

  // Get college by ID
  getCollegeById: async (id: number) => {
    const res = await api.get(`/colleges/${id}`);
    // API returns { data: {...} } or just {...}
    return res.data.data || res.data;
  },

  // Get college leaderboard
  getCollegeLeaderboard: async (id: number, params?: QueryParams) => {
    const res = await api.get(`/colleges/${id}/leaderboard`, { params });
    // API returns { data: [...] } or just [...]
    return res.data.data || res.data;
  },

  // Get all states
  getStates: async () => {
    const res = await api.get('/states');
    // API returns { data: [...] } or just [...]
    return res.data.data || res.data;
  },

  // Get state by ID
  getStateById: async (id: number) => {
    const res = await api.get(`/states/${id}`);
    // API returns { data: {...} } or just {...}
    return res.data.data || res.data;
  },

  // Get state leaderboard
  getStateLeaderboard: async (id: number, params?: QueryParams) => {
    const res = await api.get(`/states/${id}/leaderboard`, { params });
    // API returns { data: [...] } or just [...]
    return res.data.data || res.data;
  },

  // Get global leaderboard
  getGlobalLeaderboard: async (params?: QueryParams) => {
    const res = await api.get('/leaderboards/global', { params });
    // API returns { data: [...] } or just [...]
    return res.data.data || res.data;
  },
};

// React Query Hooks for Public APIs
export const useColleges = () => {
  return useQuery({
    queryKey: ['colleges'],
    queryFn: publicApi.getColleges,
  });
};

export const useCollege = (id: number) => {
  return useQuery({
    queryKey: ['college', id],
    queryFn: () => publicApi.getCollegeById(id),
    enabled: !!id,
  });
};

export const useCollegeLeaderboard = (id: number, params?: QueryParams) => {
  return useQuery({
    queryKey: ['college-leaderboard', id, params],
    queryFn: () => publicApi.getCollegeLeaderboard(id, params),
    enabled: !!id,
  });
};

export const useStates = () => {
  return useQuery({
    queryKey: ['states'],
    queryFn: publicApi.getStates,
  });
};

export const useState = (id: number) => {
  return useQuery({
    queryKey: ['state', id],
    queryFn: () => publicApi.getStateById(id),
    enabled: !!id,
  });
};

export const useStateLeaderboard = (id: number, params?: QueryParams) => {
  return useQuery({
    queryKey: ['state-leaderboard', id, params],
    queryFn: () => publicApi.getStateLeaderboard(id, params),
    enabled: !!id,
  });
};

export const useGlobalLeaderboard = (params?: QueryParams) => {
  return useQuery({
    queryKey: ['global-leaderboard', params],
    queryFn: () => publicApi.getGlobalLeaderboard(params),
  });
};

// Create or get college hook
export const useCreateOrGetCollege = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: publicApi.createOrGetCollege,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['colleges'] });
    },
  });
};

