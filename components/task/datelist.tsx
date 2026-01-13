import { LinearGradient } from 'expo-linear-gradient';
import { useRef, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';

export default function DateStrip() {
  const today = new Date();
  const scrollViewRef = useRef<ScrollView>(null);
  const screenWidth = Dimensions.get('window').width;

  // Create more dates for horizontal scrolling (30 days before and after today)
  const dates = Array.from({ length: 61 }, (_, index) => {
    const d = new Date(today);
    d.setDate(today.getDate() - 30 + index);
    return d;
  });

  // Scroll to today's date on mount
  useEffect(() => {
    const todayIndex = 30; // Today is in the middle (index 30)
    const itemWidth = 40; // width of each date item
    const gap = 16; // gap between items
    const padding = 16; // horizontal padding
    // Calculate scroll position to center today's date
    const scrollToX = padding + (todayIndex * (itemWidth + gap)) - (screenWidth / 2) + (itemWidth / 2);
    
    setTimeout(() => {
      scrollViewRef.current?.scrollTo({
        x: Math.max(0, scrollToX),
        animated: false,
      });
    }, 100);
  }, [screenWidth]);

  return (
    <ScrollView
      ref={scrollViewRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      style={styles.scrollView}
    >
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
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  scrollView: {
    width: '100%',
  },
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    alignItems: 'center',
    gap: 16,
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
