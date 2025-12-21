import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function CalendarHeader() {
  return (
    <View style={styles.container}>
      {/* Back Button */}
      <Pressable style={styles.iconButton}>
        <Ionicons name="chevron-back" size={22} color="#fff" />
      </Pressable>

      {/* Month Dropdown */}
      <Pressable style={styles.monthContainer}>
        <Text style={styles.monthText}>October 2025</Text>
        <Ionicons name="chevron-down" size={18} color="#C7C7C7" />
      </Pressable>

      {/* Profile Avatar */}
      <LinearGradient
        colors={['#3958A1', '#47368F']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.avatar}
      >
        <Text style={styles.avatarText}>M</Text>
      </LinearGradient>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1D1D1D',
    justifyContent: 'center',
    alignItems: 'center',
  },

  monthContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    // borderWidth: 1,
    // borderColor: '#3A86FF',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },

  monthText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'AnekOdia-ExtraBold',
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
});
