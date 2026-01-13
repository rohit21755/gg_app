import { useQuery } from '@tanstack/react-query';
import { api } from './axiosClient';

// Campus Wars API Functions
export const campusWarsApi = {
  // Get active campus wars
  getActiveWars: async () => {
    const res = await api.get('/wars/active');
    // API returns { data: [...] } or just [...]
    return res.data.data || res.data;
  },

  // Get war by ID
  getWarById: async (id: number) => {
    const res = await api.get(`/wars/${id}`);
    // API returns { data: {...} } or just {...}
    return res.data.data || res.data;
  },

  // Get war participants
  getWarParticipants: async (id: number) => {
    const res = await api.get(`/wars/${id}/participants`);
    // API returns { data: [...] } or just [...]
    return res.data.data || res.data;
  },

  // Get war leaderboard
  getWarLeaderboard: async (id: number) => {
    const res = await api.get(`/wars/${id}/leaderboard`);
    // API returns { data: [...] } or just [...]
    return res.data.data || res.data;
  },
};

// React Query Hooks for Campus Wars
export const useActiveWars = () => {
  return useQuery({
    queryKey: ['wars', 'active'],
    queryFn: campusWarsApi.getActiveWars,
  });
};

export const useWar = (id: number) => {
  return useQuery({
    queryKey: ['war', id],
    queryFn: () => campusWarsApi.getWarById(id),
    enabled: !!id,
  });
};

export const useWarParticipants = (id: number) => {
  return useQuery({
    queryKey: ['war-participants', id],
    queryFn: () => campusWarsApi.getWarParticipants(id),
    enabled: !!id,
  });
};

export const useWarLeaderboard = (id: number) => {
  return useQuery({
    queryKey: ['war-leaderboard', id],
    queryFn: () => campusWarsApi.getWarLeaderboard(id),
    enabled: !!id,
  });
};

