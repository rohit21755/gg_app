import SegmentedSwitch from '@/components/segment-switch';
import OngoingTask from '@/components/task/ongoing';
import React, { useState } from 'react';
import { View } from 'react-native';
// import TaskCardCompleted from '@/components/taskcardcompleted';
import AppHeader from '@/components/AppHeader';
import CompletedTask from '@/components/task/completed-task';
// import AppHeader from '@/components/AppHeader';
import { useNavigation } from 'expo-router';
export default function Task() {
    const [selected, setSelected] = useState('Ongoing');
    const [open, setOpen] = useState(false)
    const navigation = useNavigation()
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
            selected==='Ongoing' ? <OngoingTask /> : <CompletedTask />
        }
    </View>
        
        </View>
        </View>
    </>)
}