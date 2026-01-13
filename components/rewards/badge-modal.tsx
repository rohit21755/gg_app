import { LinearGradient } from 'expo-linear-gradient';
import { Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native';

interface BadgeModalProps {
  visible: boolean;
  onClose: () => void;
  badgeImage: any; // Image source
  badgeTitle?: string;
  badgeDescription?: string;
}

export default function BadgeModal({
  visible,
  onClose,
  badgeImage,
  badgeTitle = 'Badge',
  badgeDescription = 'Congratulations on unlocking this badge!',
}: BadgeModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.modal} onPress={(e) => e.stopPropagation()}>
          <LinearGradient
            colors={['#79008C', '#1C519D']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.modalGradient}
          >
            <View style={styles.content}>
              <Text style={styles.title}>{badgeTitle}</Text>
              <View style={styles.badgeContainer}>
                <Image source={badgeImage} style={styles.badgeImage} resizeMode="contain" />
              </View>
              <Text style={styles.description}>{badgeDescription}</Text>
              <Pressable style={styles.closeButton} onPress={onClose}>
                <Text style={styles.closeButtonText}>Close</Text>
              </Pressable>
            </View>
          </LinearGradient>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '80%',
    maxWidth: 350,
    borderRadius: 20,
    overflow: 'hidden',
  },
  modalGradient: {
    padding: 24,
    borderRadius: 20,
  },
  content: {
    alignItems: 'center',
    backgroundColor: 'rgba(26, 26, 26, 0.9)',
    borderRadius: 16,
    padding: 24,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  badgeContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#1B1B1B',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    overflow: 'hidden',
  },
  badgeImage: {
    width: '90%',
    height: '90%',
  },
  description: {
    color: '#C7C7C7',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  closeButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    minWidth: 120,
  },
  closeButtonText: {
    color: '#1A1A1A',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
});
