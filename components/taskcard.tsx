import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface TaskCardProps {
  title: string;
  description: string;
  points: number;
  onSocialPress?: () => void;
}

export default function TaskCard({
  title,
  description,
  points,
  onSocialPress,
}: TaskCardProps) {
  return (
    <LinearGradient
      colors={['#130538', '#1C519D']}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.cardBorder}
    >
      <View style={styles.card}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
        </View>

        {/* Description */}
        <Text style={styles.description}>{description}</Text>

        {/* Footer */}
        <View style={styles.footer}>
          <LinearGradient
            colors={['#130538', '#1C519D']}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.socialBorder}
          >
            <Pressable style={styles.socialButton} onPress={onSocialPress}>
              <Text style={styles.socialText}>Social</Text>
            </Pressable>
          </LinearGradient>
    <View style={{
        flexDirection: 'row',
        gap: 4,
    }}>
        <Text style={{
            color: '#37363B',
            fontSize: 12,
            marginTop: 4,
        }}>10 Oct</Text>
        <View style={styles.points}>
            <Text style={styles.pointsText}>{points} pts</Text>
          </View>
    </View>
          
        </View>
      </View>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  /* CARD */
  cardBorder: {
    padding: 1.5, // border thickness
    borderRadius: 20,
    marginBottom: 16,
    // zIndex:0
  },

  card: {
    backgroundColor: '#0F0F0F',
    borderRadius: 18,
    padding: 16,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'AnekOdia-ExtraBold',
  },

  /* POINTS */
  points: {
    backgroundColor: '#37363B',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 999,
  },

  pointsText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },

  description: {
    color: '#C7C7C7',
    fontSize: 12,
    marginTop: 8,
    fontFamily: 'AnekOdia-Regular',
  },

  footer: {
    marginTop: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  /* SOCIAL BUTTON */
  socialBorder: {
    padding: 1.5,
    borderRadius: 999,
  },

  socialButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: '#0F0F0F',
  },

  socialText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontFamily: 'AnekOdia-Regular',
  },
});
