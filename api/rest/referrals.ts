import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './axiosClient';
import type { SendReferralInviteRequest } from '../types';

// Referrals API Functions
export const referralsApi = {
  // Get user referrals
  getReferrals: async () => {
    const res = await api.get('/referrals');
    // API returns { data: {...} } or just {...}
    return res.data.data || res.data;
  },

  // Get user referral code
  getReferralCode: async () => {
    const res = await api.get('/referrals/code');
    // API returns { data: {...} } or just {...}
    return res.data.data || res.data;
  },

  // Get referral invites
  getReferralInvites: async () => {
    const res = await api.get('/referrals/invites');
    // API returns { data: [...] } or just [...]
    return res.data.data || res.data;
  },

  // Send referral invite
  sendReferralInvite: async (data: SendReferralInviteRequest) => {
    const res = await api.post('/referrals/invite', data);
    // API returns { data: {...} } or just {...}
    return res.data.data || res.data;
  },
};

// React Query Hooks for Referrals
export const useReferrals = () => {
  return useQuery({
    queryKey: ['referrals'],
    queryFn: referralsApi.getReferrals,
  });
};

export const useReferralCode = () => {
  return useQuery({
    queryKey: ['referral-code'],
    queryFn: referralsApi.getReferralCode,
  });
};

export const useReferralInvites = () => {
  return useQuery({
    queryKey: ['referral-invites'],
    queryFn: referralsApi.getReferralInvites,
  });
};

export const useSendReferralInvite = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: referralsApi.sendReferralInvite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['referral-invites'] });
    },
  });
};

