import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './axiosClient';
import type { UpdateEmailPreferencesRequest } from '../types';

// Email API Functions
export const emailApi = {
  // Get email preferences
  getEmailPreferences: async () => {
    const res = await api.get('/email/preferences');
    // API returns { data: {...} } or just {...}
    return res.data.data || res.data;
  },

  // Update email preferences
  updateEmailPreferences: async (data: UpdateEmailPreferencesRequest) => {
    const res = await api.put('/email/preferences', data);
    // API returns { data: {...} } or just {...}
    return res.data.data || res.data;
  },

  // Resend verification email
  resendVerificationEmail: async () => {
    const res = await api.post('/email/verify/resend');
    // API returns { data: {...} } or just {...}
    return res.data.data || res.data;
  },
};

// React Query Hooks for Email
export const useEmailPreferences = () => {
  return useQuery({
    queryKey: ['email-preferences'],
    queryFn: emailApi.getEmailPreferences,
  });
};

export const useUpdateEmailPreferences = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: emailApi.updateEmailPreferences,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['email-preferences'] });
    },
  });
};

export const useResendVerificationEmail = () => {
  return useMutation({
    mutationFn: emailApi.resendVerificationEmail,
  });
};

