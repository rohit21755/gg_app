import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './axiosClient';
import type { QueryParams } from '../types';

// Tasks API Functions
export const tasksApi = {
  // Get all tasks
  getTasks: async (params?: QueryParams) => {
    const res = await api.get('/tasks', { params });
    // API returns { data: [...] } or just [...]
    return res.data.data || res.data;
  },

  // Get task by ID
  getTaskById: async (id: number) => {
    const res = await api.get(`/tasks/${id}`);
    // API returns { data: {...} } or just {...}
    return res.data.data || res.data;
  },

  // Get assigned tasks
  getAssignedTasks: async () => {
    const res = await api.get('/tasks/assigned');
    // API returns { data: [...] } or just [...]
    return res.data.data || res.data;
  },

  // Get available tasks
  getAvailableTasks: async () => {
    const res = await api.get('/tasks/available');
    // API returns { data: [...] } or just [...]
    return res.data.data || res.data;
  },
};

// React Query Hooks for Tasks
export const useTasks = (params?: QueryParams) => {
  return useQuery({
    queryKey: ['tasks', params],
    queryFn: () => tasksApi.getTasks(params),
  });
};

export const useTask = (id: number) => {
  return useQuery({
    queryKey: ['task', id],
    queryFn: () => tasksApi.getTaskById(id),
    enabled: !!id,
  });
};

export const useAssignedTasks = () => {
  return useQuery({
    queryKey: ['tasks', 'assigned'],
    queryFn: tasksApi.getAssignedTasks,
  });
};

export const useAvailableTasks = () => {
  return useQuery({
    queryKey: ['tasks', 'available'],
    queryFn: tasksApi.getAvailableTasks,
  });
};

