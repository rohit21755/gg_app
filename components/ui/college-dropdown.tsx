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

export interface College {
  id: number;
  name: string;
}

interface CollegeDropdownProps {
  colleges: College[];
  selected: College | null;
  setSelected: (college: College | null) => void;
  placeholder?: string;
}

export default function CollegeDropdown({
  colleges,
  selected,
  setSelected,
  placeholder = 'Select College',
}: CollegeDropdownProps) {
  const [open, setOpen] = useState(false);

  const toggleDropdown = () => {
    LayoutAnimation.easeInEaseOut();
    setOpen(prev => !prev);
  };

  const onSelect = (college: College) => {
    LayoutAnimation.easeInEaseOut();
    setSelected(college);
    setOpen(false);
  };

  return (
    <View style={styles.wrapper}>
      {/* Trigger */}
      <Pressable style={styles.container} onPress={toggleDropdown}>
        <Text style={[styles.text, { color: selected ? '#FFFFFF' : '#666' }]} numberOfLines={1}>
          {selected ? selected.name : placeholder}
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
          {colleges.map(college => (
            <Pressable
              key={college.id}
              style={styles.menuItem}
              onPress={() => onSelect(college)}
            >
              <Text style={styles.menuText}>{college.name}</Text>
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
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#3a3a3a',
    width: '100%',
    backgroundColor: '#2a2a2a',
    minHeight: 32,
  },

  text: {
    fontSize: 14,
    fontFamily: 'system',
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
    maxHeight: 200,
  },

  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },

  menuText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'system',
  },
});
