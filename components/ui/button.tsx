import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text } from 'react-native';

interface AppButtonProps {
    title: string;
    variant?: 'outline' | 'gradient';
    compact?: boolean;
    onPress: () => void;
}
export default function AppButton({
  title,
  variant = 'outline',
  onPress,
  compact = false,
  
}: AppButtonProps) {
  if (variant === 'gradient') {
    return (
      <LinearGradient
        colors={['#79008C', '#1C519D']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBorder}
      >
        <Pressable style={compact ? styles.gradientButtonCompact : styles.gradientButton} onPress={onPress}>
          <Text style={compact ? styles.textBold : styles.text}>{title}</Text>
        </Pressable>
      </LinearGradient>
    );
  }

  // Outline Gradient Button
  return (
    <LinearGradient
      colors={['#AB8BFF', '#33167F', '#1C519D']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.outlineBorder}
    >
      <Pressable style={compact ? styles.outlineButtonCompact : styles.outlineButton} onPress={onPress}>
        <Text style={compact ? styles.textBold : styles.text}>{title}</Text>
      </Pressable>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  text: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'AnekOdia-Regular',
    textAlign: 'center',
  },
  textBold: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'AnekOdia-Regular',
    fontWeight: '700',
    textAlign: 'center',
  },

  // Button 1 — Outline Gradient
  outlineBorder: {
    padding: 1.5,
    borderRadius: 20,
  },
  outlineButton: {
    backgroundColor: 'rgba(19, 19, 19, 1)',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 27,
    alignItems: 'center',
  },
  outlineButtonCompact: {
    backgroundColor: 'rgba(19, 19, 19, 1)',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    alignItems: 'center',
  },

  // Button 2 — Gradient Fill
  gradientBorder: {
    padding: 1,
    borderRadius: 20,
  },
  gradientButton: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 18,
    alignItems: 'center',
  },
  gradientButtonCompact: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 16,
    alignItems: 'center',
  },
});


