import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

interface UserInfoCardProps {
  name: string;
  subtitle: string;
  avatar: string;
  onActionPress?: () => void;
}

export default function RefferalCard({
  name,
  subtitle,
  avatar,
  onActionPress,
}: UserInfoCardProps) {
  return (
    <View style={styles.container}>
      {/* Left section */}
      <View style={styles.left}>
        <Image source={{ uri: avatar }} style={styles.avatar} />

        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      </View>

      {/* Right action */}
      <Pressable style={styles.action} onPress={onActionPress}>
        <MaterialCommunityIcons
          name="star-four-points"
          size={22}
          color="#9CFFB8"
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1C1C1C',
    padding: 12,
    borderRadius: 18,
  },

  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },

  name: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },

  subtitle: {
    color: '#A1A1AA',
    fontSize: 12,
    marginTop: 2,
  },

  action: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#242424',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

