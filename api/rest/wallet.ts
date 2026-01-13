import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './axiosClient';
import type { TransferWalletRequest, QueryParams } from '../types';

// Wallet API Functions
export const walletApi = {
  // Get user wallet
  getWallet: async () => {
    const res = await api.get('/wallet');
    // API returns { data: {...} } or just {...}
    return res.data.data || res.data;
  },

  // Get wallet transactions
  getWalletTransactions: async (params?: QueryParams) => {
    const res = await api.get('/wallet/transactions', { params });
    // API returns { data: [...] } or just [...]
    return res.data.data || res.data;
  },

  // Transfer wallet funds
  transferWallet: async (data: TransferWalletRequest) => {
    const res = await api.post('/wallet/transfer', data);
    // API returns { data: {...} } or just {...}
    return res.data.data || res.data;
  },
};

// React Query Hooks for Wallet
export const useWallet = () => {
  return useQuery({
    queryKey: ['wallet'],
    queryFn: walletApi.getWallet,
  });
};

export const useWalletTransactions = (params?: QueryParams) => {
  return useQuery({
    queryKey: ['wallet-transactions', params],
    queryFn: () => walletApi.getWalletTransactions(params),
  });
};

export const useTransferWallet = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: walletApi.transferWallet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wallet'] });
      queryClient.invalidateQueries({ queryKey: ['wallet-transactions'] });
    },
  });
};

