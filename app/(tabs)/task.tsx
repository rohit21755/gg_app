import SegmentedSwitch from '@/components/segment-switch';
import CalendarHeader from '@/components/task/header';
import OngoingTask from '@/components/task/ongoing';
import React, { useState } from 'react';
import { View } from 'react-native';
// import TaskCardCompleted from '@/components/taskcardcompleted';
import CompletedTask from '@/components/task/completed-task';
export default function Task() {
    const [selected, setSelected] = useState('Ongoing');
    return(<>
    <View style={{marginTop:48}}>
        <CalendarHeader />
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