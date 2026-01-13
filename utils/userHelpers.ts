import { useAuthStore } from '@/store/authStore';

/**
 * Get user's display name from stored user data
 * Returns: "First Last" or "First" if last_name is not available
 */
export const getUserDisplayName = (): string => {
  const user = useAuthStore.getState().user;
  if (!user) {
    console.log('getUserDisplayName: No user found');
    return 'User';
  }
  
  console.log('getUserDisplayName: user data', user);
  
  if (user.first_name && user.last_name) {
    return `${user.first_name} ${user.last_name}`;
  }
  if (user.first_name) {
    return user.first_name;
  }
  if (user.email) {
    return user.email.split('@')[0];
  }
  return 'User';
};

/**
 * Get user's first name initial for avatar
 */
export const getUserInitial = (): string => {
  const user = useAuthStore.getState().user;
  if (!user) return 'U';
  
  if (user.first_name) {
    return user.first_name.charAt(0).toUpperCase();
  }
  if (user.email) {
    return user.email.charAt(0).toUpperCase();
  }
  return 'U';
};

/**
 * Get user's first name only
 */
export const getUserFirstName = (): string => {
  const user = useAuthStore.getState().user;
  if (!user) {
    console.log('getUserFirstName: No user found');
    return 'User';
  }
  
  if (user.first_name) {
    return user.first_name;
  }
  if (user.email) {
    return user.email.split('@')[0];
  }
  return 'User';
};
