import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './axiosClient';

// Notifications API Functions
export const notificationsApi = {
  // Get user notifications
  getNotifications: async () => {
    const res = await api.get('/notifications');
    return res.data;
  },

  // Get unread notification count
  getUnreadCount: async () => {
    const res = await api.get('/notifications/unread-count');
    return res.data;
  },

  // Mark notification as read
  markAsRead: async (id: number) => {
    const res = await api.put(`/notifications/${id}/read`);
    return res.data;
  },

  // Mark all notifications as read
  markAllAsRead: async () => {
    const res = await api.put('/notifications/read-all');
    return res.data;
  },

  // Delete notification
  deleteNotification: async (id: number) => {
    const res = await api.delete(`/notifications/${id}`);
    return res.data;
  },
};

// React Query Hooks for Notifications
export const useNotifications = () => {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: notificationsApi.getNotifications,
  });
};

export const useUnreadNotificationCount = () => {
  return useQuery({
    queryKey: ['notifications', 'unread-count'],
    queryFn: notificationsApi.getUnreadCount,
  });
};

export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: notificationsApi.markAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['notifications', 'unread-count'] });
    },
  });
};

export const useMarkAllNotificationsAsRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: notificationsApi.markAllAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['notifications', 'unread-count'] });
    },
  });
};

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: notificationsApi.deleteNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['notifications', 'unread-count'] });
    },
  });
};

