import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './axiosClient';
import type {
  SubmitTriviaAnswersRequest,
  SubmitWeeklyChallengeRequest,
  SubmitBattleRequest,
} from '../types';

// Engagement API Functions
export const engagementApi = {
  // Get active flash challenges
  getActiveFlashChallenges: async () => {
    const res = await api.get('/flash-challenges/active');
    // API returns { data: [...] } or just [...]
    return res.data.data || res.data;
  },

  // Participate in flash challenge
  participateFlashChallenge: async (id: number) => {
    const res = await api.post(`/flash-challenges/${id}/participate`);
    // API returns { data: {...} } or just {...}
    return res.data.data || res.data;
  },

  // Get active trivia
  getActiveTrivia: async () => {
    const res = await api.get('/trivia/active');
    // API returns { data: {...} } or just {...}
    return res.data.data || res.data;
  },

  // Start trivia
  startTrivia: async (id: number) => {
    const res = await api.post(`/trivia/${id}/start`);
    // API returns { data: {...} } or just {...}
    return res.data.data || res.data;
  },

  // Submit trivia answers
  submitTriviaAnswers: async (id: number, data: SubmitTriviaAnswersRequest) => {
    const res = await api.post(`/trivia/${id}/submit-answers`, data);
    // API returns { data: {...} } or just {...}
    return res.data.data || res.data;
  },

  // Get mystery boxes
  getMysteryBoxes: async () => {
    const res = await api.get('/mystery-boxes');
    // API returns { data: [...] } or just [...]
    return res.data.data || res.data;
  },

  // Open mystery box
  openMysteryBox: async (id: number) => {
    const res = await api.post(`/mystery-boxes/${id}/open`);
    // API returns { data: {...} } or just {...}
    return res.data.data || res.data;
  },

  // Redeem secret code
  redeemSecretCode: async (code: string) => {
    const res = await api.post(`/secret-codes/redeem/${code}`);
    // API returns { data: {...} } or just {...}
    return res.data.data || res.data;
  },

  // Get current weekly challenge
  getCurrentWeeklyChallenge: async () => {
    const res = await api.get('/weekly-challenge/current');
    // API returns { data: {...} } or just {...}
    return res.data.data || res.data;
  },

  // Submit weekly challenge
  submitWeeklyChallenge: async (data: SubmitWeeklyChallengeRequest) => {
    const res = await api.post('/weekly-challenge/submit', data);
    // API returns { data: {...} } or just {...}
    return res.data.data || res.data;
  },

  // Get weekly challenge submissions
  getWeeklyChallengeSubmissions: async () => {
    const res = await api.get('/weekly-challenge/submissions');
    // API returns { data: [...] } or just [...]
    return res.data.data || res.data;
  },

  // Vote for weekly challenge submission
  voteWeeklyChallenge: async (submissionId: number) => {
    const res = await api.post(`/weekly-challenge/vote/${submissionId}`);
    // API returns { data: {...} } or just {...}
    return res.data.data || res.data;
  },

  // Get active battles
  getActiveBattles: async () => {
    const res = await api.get('/battles/active');
    // API returns { data: [...] } or just [...]
    return res.data.data || res.data;
  },

  // Submit battle entry
  submitBattle: async (id: number, data: SubmitBattleRequest) => {
    const res = await api.post(`/battles/${id}/submit`, data);
    // API returns { data: {...} } or just {...}
    return res.data.data || res.data;
  },

  // Vote for battle submission
  voteBattle: async (id: number, submissionId: number) => {
    const res = await api.post(`/battles/${id}/vote/${submissionId}`);
    // API returns { data: {...} } or just {...}
    return res.data.data || res.data;
  },
};

// React Query Hooks for Engagement
export const useActiveFlashChallenges = () => {
  return useQuery({
    queryKey: ['flash-challenges', 'active'],
    queryFn: engagementApi.getActiveFlashChallenges,
  });
};

export const useParticipateFlashChallenge = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: engagementApi.participateFlashChallenge,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['flash-challenges'] });
    },
  });
};

export const useActiveTrivia = () => {
  return useQuery({
    queryKey: ['trivia', 'active'],
    queryFn: engagementApi.getActiveTrivia,
  });
};

export const useStartTrivia = () => {
  return useMutation({
    mutationFn: engagementApi.startTrivia,
  });
};

export const useSubmitTriviaAnswers = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: SubmitTriviaAnswersRequest }) =>
      engagementApi.submitTriviaAnswers(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trivia'] });
    },
  });
};

export const useMysteryBoxes = () => {
  return useQuery({
    queryKey: ['mystery-boxes'],
    queryFn: engagementApi.getMysteryBoxes,
  });
};

export const useOpenMysteryBox = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: engagementApi.openMysteryBox,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mystery-boxes'] });
    },
  });
};

export const useRedeemSecretCode = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: engagementApi.redeemSecretCode,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};

export const useCurrentWeeklyChallenge = () => {
  return useQuery({
    queryKey: ['weekly-challenge', 'current'],
    queryFn: engagementApi.getCurrentWeeklyChallenge,
  });
};

export const useSubmitWeeklyChallenge = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: engagementApi.submitWeeklyChallenge,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['weekly-challenge'] });
    },
  });
};

export const useWeeklyChallengeSubmissions = () => {
  return useQuery({
    queryKey: ['weekly-challenge', 'submissions'],
    queryFn: engagementApi.getWeeklyChallengeSubmissions,
  });
};

export const useVoteWeeklyChallenge = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: engagementApi.voteWeeklyChallenge,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['weekly-challenge'] });
    },
  });
};

export const useActiveBattles = () => {
  return useQuery({
    queryKey: ['battles', 'active'],
    queryFn: engagementApi.getActiveBattles,
  });
};

export const useSubmitBattle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: SubmitBattleRequest }) =>
      engagementApi.submitBattle(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['battles', variables.id] });
    },
  });
};

export const useVoteBattle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, submissionId }: { id: number; submissionId: number }) =>
      engagementApi.voteBattle(id, submissionId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['battles', variables.id] });
    },
  });
};

