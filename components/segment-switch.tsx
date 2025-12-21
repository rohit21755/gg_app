import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface SegmentedSwitchProps {
  list: string[];
  selected: string;
  onSelected: (value: string) => void;
}

export default function SegmentedSwitch({
  list,
  selected,
  onSelected,
}: SegmentedSwitchProps) {
  return (
    <View style={styles.container}>
      {list.map(item => {
        const isActive = item === selected;

        if (isActive) {
          return (
            <LinearGradient
              key={item}
              colors={['#6B4EFF', '#4A2EDB']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.activeTab}
            >
              <Pressable onPress={() => onSelected(item)}>
                <Text style={styles.activeText}>{item}</Text>
              </Pressable>
            </LinearGradient>
          );
        }

        return (
          <Pressable
            key={item}
            style={styles.inactiveTab}
            onPress={() => onSelected(item)}
          >
            <Text style={styles.inactiveText}>{item}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#1D1D1D',
    borderRadius: 999,
    padding: 4,
    height: 40,
    marginBottom: 16,
    // alignSelf: 'flex-start',
  },

  activeTab: {
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },

  inactiveTab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 999,
  },

  activeText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'AnekOdia-Regular',
  },

  inactiveText: {
    color: '#C7C7C7',
    fontSize: 14,
    fontFamily: 'AnekOdia-Regular',
  },
});
