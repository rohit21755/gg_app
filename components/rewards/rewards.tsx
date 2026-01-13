import React from 'react';
import SpinWheel from '../SpinWheel';
import RewardCollection from './reward-collection';
import DailyStreak from './reward-daily-streak';
// const { data: streakData, isLoading, error } = useStreaks('daily_engagement');
export default function RewardMain(){
    return(<> 
    <RewardCollection />
    <DailyStreak />
    <SpinWheel />
     </>)
}