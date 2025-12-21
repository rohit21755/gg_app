import { GlobalStyle } from '@/assets/styles/GlobalStyle';
import AppButton from '@/components/ui/button';
import { GenericInput } from '@/components/ui/input';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    // navigate to a hidden screen inside the tabs group so the tab bar remains visible
    router.push('/(tabs)/details' as any);
    // if (!email || !password) {
    //   alert('Please fill in all fields');
    //   return;
    // }

    // setLoading(true);
    // try {
    //   // TODO: Replace with your authentication logic
    //   console.log('Login attempt:', { email, password });
    //   navigation.navigate('tabs' as never);
    //   // Navigate to home after successful login
    //   // navigation.navigate('(tabs)');
    // } catch (error) {
    //   alert('Login failed. Please try again.');
    //   console.error('Login error:', error);
    // } finally {
    //   setLoading(false);
    // }
  };

  const handleGoogleLogin = () => {
    // TODO: Implement Google Sign-In
    console.log('Google login pressed');
    router.push('/(tabs)' as any);
  };

  const handleAppleLogin = () => {
    // TODO: Implement Apple Sign-In
    console.log('Apple login pressed');
    router.push('/(tabs)' as any);
  };

  const handleSignUp = () => {
    router.push('/signup' as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo/Title Section */}
        <View style={styles.titleSection}>
          <Text style={GlobalStyle.textHeading}>Grove Growth</Text>
        </View>

        {/* Form Section */}
        <View style={styles.formSection}>
          <GenericInput
            label="Username or email"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!loading}
          />

          <GenericInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry={true}
            editable={!loading}
          />

          {/* Log In Button with Gradient */}
          <View style={styles.loginButtonWrap}>
            <AppButton title="Log In" variant="gradient" onPress={handleLogin} compact />
          </View>
        </View>

        {/* Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.line} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.line} />
        </View>

        {/* Social Login Buttons */}
        <View style={styles.socialSection}>
          {/* Google Button */}
          <TouchableOpacity
            style={styles.socialButton}
            onPress={handleGoogleLogin}
            disabled={loading}
          >
            <Text style={styles.socialButtonText}>Continue with Google</Text>
          </TouchableOpacity>

          {/* Apple Button */}
          <TouchableOpacity
            style={styles.socialButton}
            onPress={handleAppleLogin}
            disabled={loading}
          >
            <Text style={styles.socialButtonText}>Continue with Apple</Text>
          </TouchableOpacity>
        </View>

        {/* Sign Up Link */}
        <View style={styles.signupSection}>
          <Text style={styles.signupText}>Don't have a Grove Growth account?{' '}</Text>
          <TouchableOpacity onPress={handleSignUp} disabled={loading}>
            <Text style={styles.signupLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
    justifyContent: 'space-between',
  },
  titleSection: {
    paddingTop: 40,
    paddingBottom: 80,
    
  },
  title: {
    ...GlobalStyle.textHeading,
    fontSize: 48,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 40,
  },
  formSection: {
    marginBottom: 40,
  },
  loginButtonWrap: {
    alignSelf: 'center',
    // marginTop: 16,
  },
  gradientButton: {
    borderRadius: 8,
    marginTop: 20,
    overflow: 'hidden',
  },
  loginButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#404040',
  },
  dividerText: {
    marginHorizontal: 12,
    color: '#808080',
    fontSize: 14,
    fontWeight: '500',
  },
  socialSection: {
    marginBottom: 40,
    gap: 12,
  },
  socialButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },
  signupSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 'auto',
  },
  signupText: {
    color: '#999999',
    fontSize: 14,
    fontWeight: '400',
  },
  signupLink: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: '600',
  },
});
