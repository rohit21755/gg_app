import React from 'react';
import RewardCollection from './reward-collection';
import DailyStreak, { StreakDay } from './reward-daily-streak';
const streakData: StreakDay[] = [
  { day: 'Mon', date: 13, status: 'inactive' },
  { day: 'Mon', date: 13, status: 'inactive' },
  { day: 'Mon', date: 13, status: 'inactive' },
  { day: 'Mon', date: 13, status: 'completed' },
  { day: 'Mon', date: 13, status: 'completed' },
  { day: 'Mon', date: 13, status: 'completed' },
  { day: 'Mon', date: 13, status: 'completed' },

  { day: 'Mon', date: 13, status: 'completed' },
  { day: 'Mon', date: 13, status: 'completed' },
  { day: 'Mon', date: 13, status: 'completed' },
  { day: 'Mon', date: 13, status: 'completed' },
  { day: 'Mon', date: 13, status: 'completed' },
  { day: 'Mon', date: 13, status: 'completed' },
  { day: 'Mon', date: 13, status: 'completed' },

  { day: 'Mon', date: 13, status: 'completed' },
  { day: 'Mon', date: 13, status: 'completed' },
  { day: 'Mon', date: 13, status: 'completed' },
  { day: 'Mon', date: 13, status: 'today' },
  { day: 'Mon', date: 13, status: 'inactive' },
  { day: 'Mon', date: 13, status: 'inactive' },
  { day: 'Mon', date: 13, status: 'inactive' },

  { day: 'Mon', date: 13, status: 'inactive' },
  { day: 'Mon', date: 13, status: 'inactive' },
  { day: 'Mon', date: 13, status: 'inactive' },
  { day: 'Mon', date: 13, status: 'inactive' },
  { day: 'Mon', date: 13, status: 'inactive' },
  { day: 'Mon', date: 13, status: 'inactive' },
  { day: 'Mon', date: 13, status: 'inactive' },
];



export default function RewardMain(){
    return(<> 
    <RewardCollection />
    <DailyStreak data={streakData} />
     </>)
}