import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './axiosClient';
import type { CreatePostRequest, CommentRequest, QueryParams } from '../types';

// Social API Functions
export const socialApi = {
  // Get activity feed
  getFeed: async (params?: QueryParams) => {
    const res = await api.get('/feed', { params });
    return res.data;
  },

  // Create social post
  createPost: async (data: CreatePostRequest) => {
    const res = await api.post('/posts', data);
    return res.data;
  },

  // Like a post
  likePost: async (id: number) => {
    const res = await api.post(`/posts/${id}/like`);
    return res.data;
  },

  // Unlike a post
  unlikePost: async (id: number) => {
    const res = await api.post(`/posts/${id}/unlike`);
    return res.data;
  },

  // Comment on a post
  commentOnPost: async (id: number, data: CommentRequest) => {
    const res = await api.post(`/posts/${id}/comment`, data);
    return res.data;
  },

  // Get post comments
  getPostComments: async (id: number, params?: QueryParams) => {
    const res = await api.get(`/posts/${id}/comments`, { params });
    return res.data;
  },
};

// React Query Hooks for Social
export const useFeed = (params?: QueryParams) => {
  return useQuery({
    queryKey: ['feed', params],
    queryFn: () => socialApi.getFeed(params),
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: socialApi.createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feed'] });
    },
  });
};

export const useLikePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: socialApi.likePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feed'] });
    },
  });
};

export const useUnlikePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: socialApi.unlikePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feed'] });
    },
  });
};

export const useCommentOnPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: CommentRequest }) =>
      socialApi.commentOnPost(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['post-comments', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['feed'] });
    },
  });
};

export const usePostComments = (id: number, params?: QueryParams) => {
  return useQuery({
    queryKey: ['post-comments', id, params],
    queryFn: () => socialApi.getPostComments(id, params),
    enabled: !!id,
  });
};

