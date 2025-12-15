import { Colors } from '@/constants/theme';
import { Link } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function WelcomeScreen() {
  return (
    <View style={[styles.container, { backgroundColor: Colors.dark.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: Colors.dark.text }]}>Welcome</Text>
        <Text style={[styles.subtitle, { color: Colors.dark.icon }]}>
          to Our App
        </Text>
      </View>
      
      <View style={styles.buttonContainer}>
        <Link href="/login" asChild>
          <TouchableOpacity style={[styles.button, { backgroundColor: Colors.dark.tint }]}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </Link>
        
        <Link href="/signup" asChild>
          <TouchableOpacity style={[styles.button, styles.signupButton, { borderColor: Colors.dark.tint, borderWidth: 2 }]}>
            <Text style={[styles.buttonText, { color: Colors.dark.tint }]}>Sign Up</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  content: {
    alignItems: 'center',
    marginTop: 40,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '300',
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  signupButton: {
    backgroundColor: 'transparent',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});