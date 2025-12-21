import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

interface UpcomingBadgeProps {
  title: string;
  subtitle: string;
  progress: number; // 0–100
}

export default function UpcomingBadge({
  title,
  subtitle,
  progress,
}: UpcomingBadgeProps) {
  const size = 42;
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (progress / 100) * circumference;

  return (
    <View style={styles.container}>
      {/* Left icon */}
      <View style={styles.icon}>
        <Text style={styles.iconText}>?</Text>
      </View>

      {/* Text */}
      <View style={styles.textWrap}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>

      {/* Progress */}
      <View style={styles.progressWrap}>
        <Svg width={size} height={size}>
          <Circle
            stroke="#2A2A2A"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
          />
          <Circle
            stroke="#8AB4F8"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            rotation="-90"
            origin={`${size / 2}, ${size / 2}`}
          />
        </Svg>
        <Text style={styles.progressText}>{progress}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#151515',
    borderRadius: 20,
    padding: 14,
    gap: 12,
  },

  icon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#1F1F1F',
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },

  textWrap: {
    flex: 1,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },

  subtitle: {
    color: '#9CA3AF',
    fontSize: 12,
    marginTop: 2,
  },

  progressWrap: {
    width: 42,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
  },

  progressText: {
    position: 'absolute',
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});
