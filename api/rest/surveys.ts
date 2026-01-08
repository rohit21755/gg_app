import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './axiosClient';
import type { SubmitSurveyRequest } from '../types';

// Surveys API Functions
export const surveysApi = {
  // Get available surveys
  getAvailableSurveys: async () => {
    const res = await api.get('/surveys/available');
    return res.data;
  },

  // Get survey by ID
  getSurveyById: async (id: number) => {
    const res = await api.get(`/surveys/${id}`);
    return res.data;
  },

  // Submit survey
  submitSurvey: async (id: number, data: SubmitSurveyRequest) => {
    const res = await api.post(`/surveys/${id}/submit`, data);
    return res.data;
  },

  // Get user survey responses
  getSurveyResponses: async () => {
    const res = await api.get('/surveys/responses');
    return res.data;
  },
};

// React Query Hooks for Surveys
export const useAvailableSurveys = () => {
  return useQuery({
    queryKey: ['surveys', 'available'],
    queryFn: surveysApi.getAvailableSurveys,
  });
};

export const useSurvey = (id: number) => {
  return useQuery({
    queryKey: ['survey', id],
    queryFn: () => surveysApi.getSurveyById(id),
    enabled: !!id,
  });
};

export const useSubmitSurvey = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: SubmitSurveyRequest }) =>
      surveysApi.submitSurvey(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['surveys'] });
      queryClient.invalidateQueries({ queryKey: ['survey-responses'] });
    },
  });
};

export const useSurveyResponses = () => {
  return useQuery({
    queryKey: ['survey-responses'],
    queryFn: surveysApi.getSurveyResponses,
  });
};

