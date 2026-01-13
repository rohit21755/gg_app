/**
 * Toast Usage Examples
 * 
 * The toast system is available throughout the app via the useToast hook.
 * 
 * Example 1: Show success message
 * ```tsx
 * import { useToast } from '@/hooks/useToast';
 * 
 * const MyComponent = () => {
 *   const { showSuccess } = useToast();
 *   
 *   const handleSuccess = () => {
 *     showSuccess('Operation completed successfully!');
 *   };
 *   
 *   return <Button onPress={handleSuccess} title="Success" />;
 * };
 * ```
 * 
 * Example 2: Show error message
 * ```tsx
 * import { useToast } from '@/hooks/useToast';
 * 
 * const MyComponent = () => {
 *   const { showError } = useToast();
 *   
 *   const handleError = () => {
 *     showError('Something went wrong. Please try again.');
 *   };
 *   
 *   return <Button onPress={handleError} title="Error" />;
 * };
 * ```
 * 
 * Example 3: Custom duration
 * ```tsx
 * const { showSuccess } = useToast();
 * 
 * // Show success message for 5 seconds instead of default 3 seconds
 * showSuccess('This message will stay longer', 5000);
 * ```
 * 
 * Example 4: Using in API error handlers
 * ```tsx
 * const { showError, showSuccess } = useToast();
 * 
 * mutation.mutate(data, {
 *   onSuccess: () => {
 *     showSuccess('Data saved successfully!');
 *   },
 *   onError: (error) => {
 *     showError(error.message || 'Failed to save data');
 *   },
 * });
 * ```
 */

// This file is just for documentation purposes
export {};
