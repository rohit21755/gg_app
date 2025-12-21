import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
    LayoutAnimation,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    UIManager,
    View,
} from 'react-native';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

interface DropdownProps {
  list: string[];
  selected: string;
  setSelected: (value: string) => void;
}

export default function Dropdown({
  list,
  selected,
  setSelected,
}: DropdownProps) {
  const [open, setOpen] = useState(false);

  const toggleDropdown = () => {
    LayoutAnimation.easeInEaseOut();
    setOpen(prev => !prev);
  };

  const onSelect = (item: string) => {
    LayoutAnimation.easeInEaseOut();
    setSelected(item);
    setOpen(false);
  };

  return (
    <View style={styles.wrapper}>
      {/* Trigger */}
      <Pressable style={styles.container} onPress={toggleDropdown}>
        <Text style={styles.text} numberOfLines={1}>
          {selected}
        </Text>
        <Ionicons
          name="chevron-down"
          size={18}
          color="#fff"
          style={{ transform: [{ rotate: open ? '180deg' : '0deg' }] }}
        />
      </Pressable>

      {/* Menu */}
      {open && (
        <View style={styles.menu}> 
          {list.map(item => (
            <Pressable
              key={item}
              style={styles.menuItem}
              onPress={() => onSelect(item)}
            >
              <Text style={styles.menuText}>{item}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    zIndex: 1000,
  },

  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 999,
    borderWidth: 1,
    width: 150,
    backgroundColor: '#1D1D1D',
  },

  text: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'AnekOdia-Regular',
    flex: 1,
  },

  menu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    marginTop: 8,
    borderRadius: 14,
    backgroundColor: '#1D1D1D',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    overflow: 'hidden',
    zIndex: 1001,
  },

  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },

  menuText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'AnekOdia-Regular',
  },
});
