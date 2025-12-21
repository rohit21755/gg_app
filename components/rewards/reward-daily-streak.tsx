import { StyleSheet, Text, View } from 'react-native';

type StreakStatus = 'completed' | 'today' | 'inactive';

export interface StreakDay {
  day: string;
  date: number;
  status: StreakStatus;
}

interface DailyStreakProps {
  data: StreakDay[];
  columns?: number;
}

export default function DailyStreak({
  data,
  columns = 7,
}: DailyStreakProps) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Daily Streak</Text>

      {/* Day labels */}
      <View style={styles.grid}>
        {data.map((item, index) => (
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
        ))}
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
});
