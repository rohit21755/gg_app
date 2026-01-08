import { useQuery } from '@tanstack/react-query';
import type { QueryParams } from '../types';
import { api } from './axiosClient';

// Public API Functions
export const publicApi = {
  // Get all colleges
  getColleges: async () => {
    const res = await api.get('/colleges');
    return res.data;
  },

  // Get college by ID
  getCollegeById: async (id: number) => {
    const res = await api.get(`/colleges/${id}`);
    return res.data;
  },

  // Get college leaderboard
  getCollegeLeaderboard: async (id: number, params?: QueryParams) => {
    const res = await api.get(`/colleges/${id}/leaderboard`, { params });
    return res.data;
  },

  // Get all states
  getStates: async () => {
    const res = await api.get('/states');
    return res.data;
  },

  // Get state by ID
  getStateById: async (id: number) => {
    const res = await api.get(`/states/${id}`);
    return res.data;
  },

  // Get state leaderboard
  getStateLeaderboard: async (id: number, params?: QueryParams) => {
    const res = await api.get(`/states/${id}/leaderboard`, { params });
    return res.data;
  },

  // Get global leaderboard
  getGlobalLeaderboard: async (params?: QueryParams) => {
    const res = await api.get('/leaderboards/global', { params });
    return res.data;
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

