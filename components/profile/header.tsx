import { Ionicons } from '@expo/vector-icons';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

interface ProfileHeaderProps {
  avatar: string;
  username: string;
  followers: number;
  following: number;
  onAddBio?: () => void;
  onSettings?: () => void;
  onMore?: () => void;
}

export default function ProfileHeader({
  avatar,
  username,
  followers,
  following,
  onAddBio,
  onSettings,
  onMore,
}: ProfileHeaderProps) {
  return (
    <View style={styles.container}>
      {/* Top right icons */}
      <View style={styles.topIcons}>
        <Pressable onPress={onSettings} style={styles.iconBtn}>
          <Ionicons name="settings-outline" size={22} color="#fff" />
        </Pressable>
        <Pressable onPress={onMore} style={styles.iconBtn}>
          <Ionicons name="ellipsis-vertical" size={22} color="#fff" />
        </Pressable>
      </View>

      {/* Avatar */}
      <Image source={{ uri: avatar }} style={styles.avatar} />

      {/* Username */}
      <Text style={styles.username}>{username}</Text>

      {/* Stats */}
      <View style={styles.statsRow}>
        <Text style={styles.statText}>
          {followers} <Text style={styles.statLabel}>followers</Text>
        </Text>
        <Text style={styles.statText}>
          {following} <Text style={styles.statLabel}>following</Text>
        </Text>
      </View>

      {/* Add Bio */}
      <Pressable onPress={onAddBio}>
        <Text style={styles.addBio}>+ Add your bio</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#0E0E0E',
    paddingTop: 12,
    paddingBottom: 12,
    alignItems: 'center',
  },

  topIcons: {
    position: 'absolute',
    top: 10,
    right: 16,
    flexDirection: 'row',
    gap: 12,
  },

  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 16,
  },

  username: {
    fontSize: 26,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 10,
  },

  statsRow: {
    flexDirection: 'row',
    gap: 40,
    marginBottom: 12,
  },

  statText: {
    color: '#D4D4D4',
    fontSize: 16,
    fontWeight: '500',
  },

  statLabel: {
    color: '#A1A1AA',
    fontWeight: '400',
  },

  addBio: {
    color: '#2563EB',
    fontSize: 16,
    fontWeight: '500',
  },
});
