import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';

export default function DateStrip() {
  const today = new Date();

  // Create 7 dates with today in the center
  const dates = Array.from({ length: 7 }, (_, index) => {
    const d = new Date(today);
    d.setDate(today.getDate() - 3 + index);
    return d;
  });

  return (
    <View style={styles.container}>
      {dates.map((date, index) => {
        const isToday =
          date.toDateString() === today.toDateString();

        return (
          <View key={index} style={styles.item}>
            <Text style={styles.day}>
              {date.toLocaleDateString('en-US', { weekday: 'short' })}
            </Text>

            {isToday ? (
              <LinearGradient
                colors={['#1C519D', '#EC77FF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.today}
              >
                <Text style={styles.todayText}>
                  {date.getDate()}
                </Text>
              </LinearGradient>
            ) : (
              <View style={styles.date}>
                <Text style={styles.dateText}>
                  {date.getDate()}
                </Text>
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    width: '100%',
  },

  item: {
    width: 40,
    alignItems: 'center',
    gap: 6,
  },

  day: {
    color: '#A1A1AA',
    fontSize: 12,
    fontFamily: 'AnekOdia-Regular',
  },

  date: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#1D1D1D',
    justifyContent: 'center',
    alignItems: 'center',
  },

  dateText: {
    color: '#A1A1AA',
    fontSize: 13,
    fontWeight: '600',
  },

  today: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  todayText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
});
