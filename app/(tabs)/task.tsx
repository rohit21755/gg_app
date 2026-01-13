import SegmentedSwitch from '@/components/segment-switch';
import OngoingTask from '@/components/task/ongoing';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
// import TaskCardCompleted from '@/components/taskcardcompleted';
import AppHeader from '@/components/AppHeader';
import CompletedTask from '@/components/task/completed-task';
// import AppHeader from '@/components/AppHeader';
import { useAssignedTasks, useAvailableTasks } from '@/api/rest/tasks';
import { useToast } from '@/hooks/useToast';
import { useNavigation } from 'expo-router';

export default function Task() {
    const [selected, setSelected] = useState('Ongoing');
    const [open, setOpen] = useState(false);
    const navigation = useNavigation();
    const { showError } = useToast();
    
    // Fetch available tasks for "Ongoing" and assigned/completed tasks for "Completed"
    const { data: availableTasks, isLoading: isLoadingAvailable, error: availableError } = useAvailableTasks();
    const { data: assignedTasks, isLoading: isLoadingAssigned, error: assignedError } = useAssignedTasks();

    // Handle errors
    useEffect(() => {
        if (availableError || assignedError) {
            showError('Failed to load tasks. Please try again.');
        }
    }, [availableError, assignedError, showError]);

    // Handle API response structure
    const ongoingTasks = Array.isArray(availableTasks?.data) 
        ? availableTasks.data 
        : Array.isArray(availableTasks) 
        ? availableTasks 
        : [];

    const completedTasks = Array.isArray(assignedTasks?.data) 
        ? assignedTasks.data 
        : Array.isArray(assignedTasks) 
        ? assignedTasks 
        : [];

    // Filter completed tasks
    const filteredCompletedTasks = completedTasks.filter((task: any) => {
        const status = task.status || task.task_status || '';
        return status === 'completed' || status === 'approved' || status === 'done';
    });

    return(<>
    <View style={{marginTop:48}}>
        {/* <CalendarHeader /> */}
        <AppHeader
  type="month"
  monthText="October 2025"
  onMonthPress={() => setOpen(true)}
  onBackPress={() => navigation.goBack()}
/>

        <View style={{
            marginTop: 2,
            padding:16,
            justifyContent:'center',
        }}>
            <View style={{
                alignItems: 'center',
            }}>
                <SegmentedSwitch
      list={['Ongoing', 'Completed']}
      selected={selected}
      onSelected={setSelected}
    />
            </View>
            
    <View style={{padding: 16}}>
{
            selected==='Ongoing' 
                ? <OngoingTask tasks={ongoingTasks} isLoading={isLoadingAvailable} /> 
                : <CompletedTask tasks={filteredCompletedTasks} isLoading={isLoadingAssigned} />
        }
    </View>
        
        </View>
        </View>
    </>)
}