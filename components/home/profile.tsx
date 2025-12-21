import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';

export default function WelcomeCard() {
  return (
    <LinearGradient
      colors={['#1C519D', '#33167F', '#1D1D1D']}
      locations={[0, 0.25, 1]}
      start={{ x: 1, y: 1 }}
      end={{ x: 0, y: 0 }}
      style={styles.card}
    >
      {/* Top Row */}
      <View style={styles.topRow}>
        <View style={styles.profileRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>M</Text>
          </View>
          <Text style={styles.helloText}>Hello, Manoj</Text>
        </View>

        <Ionicons name="notifications-outline" size={22} color="#fff" />
      </View>

      {/* Bottom Content */}
      <View style={styles.bottomRow}>
        <View>
          <Text style={styles.label}>Total Points</Text>
          <Text style={styles.points}>200</Text>

          <View style={styles.metaRow}>
            <Ionicons name="trending-up" size={14} color="#C7C7C7" />
            <Text style={styles.metaText}> Rank #18</Text>
            <Text style={styles.metaText}>  Level 10</Text>
          </View>
        </View>

        <View style={styles.trophyWrapper}>
          <Ionicons name="trophy-outline" size={28} color="#fff" />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    padding: 20,
    width: '100%',
    minHeight: 160,
    justifyContent: 'space-between',
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3B5BDB',
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },

  helloText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },

  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },

  label: {
    color: '#C7C7C7',
    fontSize: 14,
  },

  points: {
    color: '#fff',
    fontSize: 36,
    fontWeight: '700',
    marginVertical: 4,
  },

  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  metaText: {
    color: '#C7C7C7',
    fontSize: 13,
  },

  trophyWrapper: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
