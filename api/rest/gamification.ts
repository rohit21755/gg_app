import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './axiosClient';
import type { AwardXPRequest, LogStreakRequest } from '../types';

// Gamification API Functions
export const gamificationApi = {
  // Get XP transactions
  getXPTransactions: async () => {
    const res = await api.get('/xp/transactions');
    // API returns { data: [...] } or just [...]
    return res.data.data || res.data;
  },

  // Award XP (internal)
  awardXP: async (data: AwardXPRequest) => {
    const res = await api.post('/xp/award', data);
    // API returns { data: {...} } or just {...}
    return res.data.data || res.data;
  },

  // Get all levels
  getLevels: async () => {
    const res = await api.get('/levels');
    // API returns { data: [...] } or just [...]
    return res.data.data || res.data;
  },

  // Get current user level
  getCurrentLevel: async () => {
    const res = await api.get('/levels/current');
    // API returns { data: {...} } or just {...}
    return res.data.data || res.data;
  },

  // Get next level info
  getNextLevel: async (id: number) => {
    const res = await api.get(`/levels/${id}/next`);
    // API returns { data: {...} } or just {...}
    return res.data.data || res.data;
  },

  // Get all badges
  getBadges: async () => {
    const res = await api.get('/badges');
    // API returns { data: [...] } or just [...]
    return res.data.data || res.data;
  },

  // Get badge by ID
  getBadgeById: async (id: number) => {
    const res = await api.get(`/badges/${id}`);
    // API returns { data: {...} } or just {...}
    return res.data.data || res.data;
  },

  // Get user badges
  getUserBadges: async () => {
    const res = await api.get('/badges/me');
    // API returns { data: [...] } or just [...]
    return res.data.data || res.data;
  },

  // Get user streaks
  getStreaks: async (type?: 'daily_engagement' | 'daily_login' | 'weekly_task' | 'campaign') => {
    const res = await api.get('/streaks', {
      params: type ? { type } : { type: 'daily_engagement' },
    });
    // API returns { data: {...} } or just {...}
    return res.data.data || res.data;
  },

  // Log streak activity
  logStreak: async (data: LogStreakRequest) => {
    const res = await api.post('/streaks', data);
    // API returns { data: {...} } or just {...}
    return res.data.data || res.data;
  },

  // Get spin wheel
  getSpinWheel: async () => {
    const res = await api.get('/spin-wheel');
    // API returns { data: {...} } or just {...}
    return res.data.data || res.data;
  },

  // Spin the wheel
  spinWheel: async () => {
    const res = await api.post('/spin-wheel');
    // API returns { data: {...} } or just {...}
    return res.data.data || res.data;
  },

  // Get spin history
  getSpinHistory: async () => {
    const res = await api.get('/spin-wheel/history');
    // API returns { data: [...] } or just [...]
    return res.data.data || res.data;
  },
};

// React Query Hooks for Gamification
export const useXPTransactions = () => {
  return useQuery({
    queryKey: ['xp-transactions'],
    queryFn: gamificationApi.getXPTransactions,
  });
};

export const useAwardXP = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: gamificationApi.awardXP,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['xp-transactions'] });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};

export const useLevels = () => {
  return useQuery({
    queryKey: ['levels'],
    queryFn: gamificationApi.getLevels,
  });
};

export const useCurrentLevel = () => {
  return useQuery({
    queryKey: ['current-level'],
    queryFn: gamificationApi.getCurrentLevel,
  });
};

export const useNextLevel = (id: number) => {
  return useQuery({
    queryKey: ['next-level', id],
    queryFn: () => gamificationApi.getNextLevel(id),
    enabled: !!id,
  });
};

export const useBadges = () => {
  return useQuery({
    queryKey: ['badges'],
    queryFn: gamificationApi.getBadges,
  });
};

export const useBadge = (id: number) => {
  return useQuery({
    queryKey: ['badge', id],
    queryFn: () => gamificationApi.getBadgeById(id),
    enabled: !!id,
  });
};

export const useUserBadges = () => {
  return useQuery({
    queryKey: ['user-badges'],
    queryFn: gamificationApi.getUserBadges,
  });
};

export const useStreaks = (type?: 'daily_engagement' | 'daily_login' | 'weekly_task' | 'campaign') => {
  return useQuery({
    queryKey: ['streaks', type || 'daily_engagement'],
    queryFn: () => gamificationApi.getStreaks(type),
  });
};

export const useLogStreak = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: gamificationApi.logStreak,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['streaks'] });
    },
  });
};

export const useSpinWheel = () => {
  return useQuery({
    queryKey: ['spin-wheel'],
    queryFn: gamificationApi.getSpinWheel,
  });
};

export const useSpinWheelAction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: gamificationApi.spinWheel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['spin-wheel'] });
      queryClient.invalidateQueries({ queryKey: ['spin-history'] });
    },
  });
};

export const useSpinHistory = () => {
  return useQuery({
    queryKey: ['spin-history'],
    queryFn: gamificationApi.getSpinHistory,
  });
};

