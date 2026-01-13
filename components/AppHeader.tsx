import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import SegmentedSwitch from './segment-switch';
// import { useNavigation } from 'expo-router';
import { getUserInitial } from '@/utils/userHelpers';
import { router } from 'expo-router';
type HeaderType = 'title' | 'segment' | 'month';

type AppHeaderProps = {
  type: HeaderType;

  // title
  title?: string;

  // segmented
  segmentList?: string[];
  selected?: string;
  onSelect?: (value: string) => void;

  // month
  monthText?: string;
  onMonthPress?: () => void;

  onBackPress?: () => void;
};

export default function AppHeader({
  type,
  title,
  segmentList,
  selected,
  onSelect,
  monthText,
  onMonthPress,
  onBackPress,
}: AppHeaderProps) {
    // const navigation = useNavigation()
  return (
    <View style={styles.container}>
      {/* Back Button */}
      <Pressable style={styles.iconButton} onPress={onBackPress}>
        <Ionicons name="chevron-back" size={22} color="#fff" />
      </Pressable>

      {/* Center Content */}
      {type === 'title' && (
        <Text style={styles.title}>{title}</Text>
      )}

      {type === 'segment' && segmentList && selected && onSelect && (
        <SegmentedSwitch
          list={segmentList}
          selected={selected}
          onSelected={onSelect}
        />
      )}

      {type === 'month' && (
        <Pressable style={styles.monthContainer} onPress={onMonthPress}>
          <Text style={styles.monthText}>{monthText}</Text>
          <Ionicons name="chevron-down" size={18} color="#C7C7C7" />
        </Pressable>
      )}

      {/* Avatar */}
      <Pressable onPress={()=>router.push('/profile')}>
      <LinearGradient
        colors={['#3958A1', '#47368F']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.avatar}
      >
        <Text style={styles.avatarText}>{getUserInitial()}</Text>
      </LinearGradient>
      </Pressable>
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

  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontFamily: 'AnekOdia-ExtraBold',
    fontWeight: '800',
  },

  monthContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
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
