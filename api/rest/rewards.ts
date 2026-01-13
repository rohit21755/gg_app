import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './axiosClient';

// Rewards API Functions
export const rewardsApi = {
  // Get all rewards
  getRewards: async () => {
    const res = await api.get('/rewards');
    // API returns { data: [...] } or just [...]
    return res.data.data || res.data;
  },

  // Get reward by ID
  getRewardById: async (id: number) => {
    const res = await api.get(`/rewards/${id}`);
    // API returns { data: {...} } or just {...}
    return res.data.data || res.data;
  },

  // Redeem reward
  redeemReward: async (id: number) => {
    const res = await api.post(`/rewards/${id}/redeem`);
    // API returns { data: {...} } or just {...}
    return res.data.data || res.data;
  },

  // Get user reward redemptions
  getRedemptions: async () => {
    const res = await api.get('/rewards/redemptions');
    // API returns { data: [...] } or just [...]
    return res.data.data || res.data;
  },
};

// React Query Hooks for Rewards
export const useRewards = () => {
  return useQuery({
    queryKey: ['rewards'],
    queryFn: rewardsApi.getRewards,
  });
};

export const useReward = (id: number) => {
  return useQuery({
    queryKey: ['reward', id],
    queryFn: () => rewardsApi.getRewardById(id),
    enabled: !!id,
  });
};

export const useRedeemReward = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: rewardsApi.redeemReward,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rewards'] });
      queryClient.invalidateQueries({ queryKey: ['redemptions'] });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};

export const useRedemptions = () => {
  return useQuery({
    queryKey: ['redemptions'],
    queryFn: rewardsApi.getRedemptions,
  });
};

