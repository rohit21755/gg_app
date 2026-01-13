import { useStreaks } from '@/api/rest/gamification';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

type StreakStatus = 'completed' | 'today' | 'inactive';

export interface StreakDay {
  day: string;
  date: number;
  status: StreakStatus;
}

interface DailyStreakProps {
  columns?: number;
}

export default function DailyStreak({
  columns = 7,
}: DailyStreakProps) {
  const { data: streakData, isLoading, error } = useStreaks('daily_engagement');

  // Generate calendar data for current month
  const getCurrentMonthCalendar = (): StreakDay[] => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    
    // First day of the month
    const firstDay = new Date(year, month, 1);
    const firstDayOfWeek = firstDay.getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    
    // Get calendar dates from API response
    const streakInfo = streakData?.data || streakData || {};
    const calendarDates = streakInfo?.calendar_dates || [];
    
    const calendar: StreakDay[] = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      calendar.push({
        day: '',
        date: 0,
        status: 'inactive',
      });
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const fullDate = new Date(year, month, day);
      const dayName = fullDate.toLocaleDateString('en-US', { weekday: 'short' });
      
      // Format date as YYYY-MM-DD to match API format
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      
      // Check if today
      const isToday = fullDate.toDateString() === today.toDateString();
      
      // Check if in streak dates
      const isInStreak = Array.isArray(calendarDates) && calendarDates.includes(dateStr);
      
      let status: StreakStatus = 'inactive';
      if (isToday) {
        status = 'today';
      } else if (isInStreak) {
        status = 'completed';
      }
      
      calendar.push({
        day: dayName,
        date: day,
        status,
      });
    }
    
    return calendar;
  };

  const calendar = getCurrentMonthCalendar();

  if (isLoading) {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.title}>Daily Streak</Text>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#FFFFFF" />
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.title}>Daily Streak</Text>
        <Text style={styles.errorText}>Failed to load streak data</Text>
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Daily Streak</Text>

      {/* Calendar grid with dots */}
      <View style={styles.grid}>
        {calendar.map((item, index) => {
          // Skip empty cells (date === 0)
          if (item.date === 0) {
            return <View key={index} style={styles.cell} />;
          }

          return (
            <View key={index} style={styles.cell}>
              <Text style={styles.dayLabel}>{item.day}</Text>

              <View
                style={[
                  styles.circle,
                  item.status === 'completed' && styles.completed,
                  item.status === 'today' && styles.today,
                  item.status === 'inactive' && styles.inactive,
                ]}
              >
                <Text style={styles.dateText}>{item.date}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    padding: 24,
    // backgroundColor: '#0F0F0F',
    // borderRadius: 16,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  cell: {
    width: `${100 / 7}%`,
    alignItems: 'center',
    marginBottom: 14,
  },

  dayLabel: {
    color: '#A1A1AA',
    fontSize: 8,
    marginBottom: 6,
  },

  circle: {
    width: 28,
    height: 28,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
  },

  completed: {
    backgroundColor: '#7E9B72', // green
  },

  today: {
    backgroundColor: '#6F8FBF', // blue
  },

  inactive: {
    backgroundColor: '#1D1D1D', // dark
  },

  dateText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },

  loadingContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  errorText: {
    color: '#FF6B6B',
    fontSize: 14,
    textAlign: 'center',
    padding: 20,
  },
});
