import { Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

interface ProfileStatsProps {
  avatar: string;
  points: number;
  username: string;
  rank: string;
  level: number;
  levelProgress: number; // 0–100
}

export default function ProfileStats({
  avatar,
  points,
  username,
  rank,
  level,
  levelProgress,
}: ProfileStatsProps) {
  const radius = 26;
  const strokeWidth = 3;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference - (circumference * levelProgress) / 100;

  return (
    <View style={styles.container}>
      {/* Top Row */}
      <View style={styles.topRow}>
        {/* Settings */}
        <View style={styles.iconCircle}>
          <Ionicons name="settings-outline" size={20} color="#fff" />
        </View>

        {/* Avatar */}
        <Image source={{ uri: avatar }} style={styles.avatar} />

        {/* Level Progress */}
        <View style={styles.progressWrapper}>
          <Svg width={60} height={60}>
            <Circle
              cx="30"
              cy="30"
              r={radius}
              stroke="#2A2A2A"
              strokeWidth={strokeWidth}
              fill="none"
            />
            <Circle
              cx="30"
              cy="30"
              r={radius}
              stroke="#9ED0FF"
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={progress}
              strokeLinecap="round"
            />
          </Svg>
          <Text style={styles.levelText}>{level}</Text>
        </View>
      </View>

      {/* Points */}
      <Text style={styles.points}>{points.toLocaleString()}pt</Text>

      {/* Username + Rank */}
      <Text style={styles.meta}>
        {username} · <Text style={styles.star}>★</Text> {rank}st Place
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 24,
  },

  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },

  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1E1E1E',
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },

  progressWrapper: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },

  levelText: {
    position: 'absolute',
    color: '#C7F0B3',
    fontSize: 16,
    fontWeight: '700',
  },

  points: {
    marginTop: 20,
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '800',
  },

  meta: {
    marginTop: 4,
    color: '#A1A1AA',
    fontSize: 14,
    fontWeight: '600',
  },

  star: {
    color: '#FFD166',
  },
});
