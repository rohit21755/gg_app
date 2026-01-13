import { useAvailableTasks } from '@/api/rest/tasks';
import Profile from '@/components/home/profile';
import TaskCard from '@/components/taskcard';
import Dropdown from '@/components/ui/dropdown';
import { useToast } from '@/hooks/useToast';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const [filter, setFilter] = useState<'Ongoing' | 'Completed'>('Ongoing');
  const { data, isLoading, error, refetch } = useAvailableTasks();
  const { showError } = useToast();
  console.log(data);
  // Handle errors
  useEffect(() => {
    if (error) {
      showError('Failed to load tasks. Please try again.');
    }
  }, [error, showError]);

  // Handle API response structure - API might return { data: [...] } or just [...]
  // Ensure tasks is always an array
  const tasks = Array.isArray(data?.data) 
    ? data.data 
    : Array.isArray(data) 
    ? data 
    : [];

  // Filter tasks based on selection (you may need to adjust this based on actual task structure)
  const filteredTasks = tasks.filter((task: any) => {
    // If task doesn't have status field, show all tasks for "Ongoing"
    if (!task.status && !task.task_status) {
      return filter === 'Ongoing';
    }
    
    const status = task.status || task.task_status || '';
    if (filter === 'Ongoing') {
      // Show tasks that are not completed
      return status !== 'completed' && status !== 'approved' && status !== 'done';
    } else {
      // Show completed tasks
      return status === 'completed' || status === 'approved' || status === 'done';
    }
  });

  return (
    <ScrollView
      style={{ flex: 1, padding: 16, marginTop: 48 }}
      showsVerticalScrollIndicator={false}
    >
      <Profile />
      <View style={{
        marginTop: 16,
      }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <Dropdown 
            list={['Ongoing', 'Completed']} 
            selected={filter} 
            setSelected={(value) => setFilter(value as 'Ongoing' | 'Completed')} 
          />
          <Pressable>
            <Text style={{fontSize: 12, textAlign: 'center', color: '#ffffff'}}>View All</Text>
          </Pressable>
        </View>
      </View>
      
      <View style={{
        marginTop: 16,
      }}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#4A90E2" />
            <Text style={styles.loadingText}>Loading tasks...</Text>
          </View>
        ) : filteredTasks.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No {filter.toLowerCase()} tasks available
            </Text>
          </View>
        ) : (
          filteredTasks.map((task: any) => (
            <Pressable
              key={task.ID || task.id || task.task_id}
              onPress={() => {
                router.push({
                  pathname: '/submit-task',
                  params: { taskId: task.ID || task.id || task.task_id },
                } as any);
              }}
            >
              <TaskCard
                title={task.Title || task.title || task.name || 'Untitled Task'}
                description={task.Description || task.description || task.instructions || 'No description available'}
                points={task.XPReward || task.points || task.xp_reward || task.reward_points || 0}
                onSocialPress={() => {
                  router.push({
                    pathname: '/submit-task',
                    params: { taskId: task.ID || task.id || task.task_id },
                  } as any);
                }}
              />
            </Pressable>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    color: '#C7C7C7',
    fontSize: 14,
    marginTop: 12,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    color: '#808080',
    fontSize: 14,
  },
});
