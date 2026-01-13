import { Image, StyleSheet, View } from 'react-native';

interface BadgeItemProps {
  image: any; // Image source (require() or { uri: string })
}

export default function BadgeItem({ image }: BadgeItemProps) {
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} resizeMode="contain" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#1B1B1B',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '90%',
    height: '90%',
  },
});
