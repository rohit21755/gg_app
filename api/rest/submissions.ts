import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './axiosClient';
import type {
  CreateSubmissionRequest,
  UpdateSubmissionRequest,
  AppealSubmissionRequest,
} from '../types';

// Submissions API Functions
export const submissionsApi = {
  // Get user submissions
  getSubmissions: async () => {
    const res = await api.get('/submissions');
    return res.data;
  },

  // Create submission
  createSubmission: async (data: CreateSubmissionRequest) => {
    const res = await api.post('/submissions', data);
    return res.data;
  },

  // Get submission by ID
  getSubmissionById: async (id: number) => {
    const res = await api.get(`/submissions/${id}`);
    return res.data;
  },

  // Update submission
  updateSubmission: async (id: number, data: UpdateSubmissionRequest) => {
    const res = await api.put(`/submissions/${id}`, data);
    return res.data;
  },

  // Delete submission
  deleteSubmission: async (id: number) => {
    const res = await api.delete(`/submissions/${id}`);
    return res.data;
  },

  // Get submission proof
  getSubmissionProof: async (id: number) => {
    const res = await api.get(`/submissions/${id}/proof`);
    return res.data;
  },

  // Appeal rejected submission
  appealSubmission: async (id: number, data: AppealSubmissionRequest) => {
    const res = await api.post(`/submissions/${id}/appeal`, data);
    return res.data;
  },
};

// React Query Hooks for Submissions
export const useSubmissions = () => {
  return useQuery({
    queryKey: ['submissions'],
    queryFn: submissionsApi.getSubmissions,
  });
};

export const useCreateSubmission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: submissionsApi.createSubmission,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['submissions'] });
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

export const useSubmission = (id: number) => {
  return useQuery({
    queryKey: ['submission', id],
    queryFn: () => submissionsApi.getSubmissionById(id),
    enabled: !!id,
  });
};

export const useUpdateSubmission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateSubmissionRequest }) =>
      submissionsApi.updateSubmission(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['submission', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['submissions'] });
    },
  });
};

export const useDeleteSubmission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: submissionsApi.deleteSubmission,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['submissions'] });
    },
  });
};

export const useSubmissionProof = (id: number) => {
  return useQuery({
    queryKey: ['submission-proof', id],
    queryFn: () => submissionsApi.getSubmissionProof(id),
    enabled: !!id,
  });
};

export const useAppealSubmission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: AppealSubmissionRequest }) =>
      submissionsApi.appealSubmission(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['submission', variables.id] });
    },
  });
};

