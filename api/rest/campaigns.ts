import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './axiosClient';

// Campaigns API Functions
export const campaignsApi = {
  // Get all campaigns
  getCampaigns: async () => {
    const res = await api.get('/campaigns');
    // API returns { data: [...] } or just [...]
    return res.data.data || res.data;
  },

  // Get campaign by ID
  getCampaignById: async (id: number) => {
    const res = await api.get(`/campaigns/${id}`);
    // API returns { data: {...} } or just {...}
    return res.data.data || res.data;
  },

  // Join campaign
  joinCampaign: async (id: number) => {
    const res = await api.post(`/campaigns/${id}/join`);
    // API returns { data: {...} } or just {...}
    return res.data.data || res.data;
  },

  // Get campaign tasks
  getCampaignTasks: async (id: number) => {
    const res = await api.get(`/campaigns/${id}/tasks`);
    // API returns { data: [...] } or just [...]
    return res.data.data || res.data;
  },

  // Get campaign leaderboard
  getCampaignLeaderboard: async (id: number) => {
    const res = await api.get(`/campaigns/${id}/leaderboard`);
    // API returns { data: [...] } or just [...]
    return res.data.data || res.data;
  },
};

// React Query Hooks for Campaigns
export const useCampaigns = () => {
  return useQuery({
    queryKey: ['campaigns'],
    queryFn: campaignsApi.getCampaigns,
  });
};

export const useCampaign = (id: number) => {
  return useQuery({
    queryKey: ['campaign', id],
    queryFn: () => campaignsApi.getCampaignById(id),
    enabled: !!id,
  });
};

export const useJoinCampaign = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: campaignsApi.joinCampaign,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['campaign', id] });
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
    },
  });
};

export const useCampaignTasks = (id: number) => {
  return useQuery({
    queryKey: ['campaign-tasks', id],
    queryFn: () => campaignsApi.getCampaignTasks(id),
    enabled: !!id,
  });
};

export const useCampaignLeaderboard = (id: number) => {
  return useQuery({
    queryKey: ['campaign-leaderboard', id],
    queryFn: () => campaignsApi.getCampaignLeaderboard(id),
    enabled: !!id,
  });
};

