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
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import { useRegistration } from '@/contexts/RegistrationContext';

export default function RegisterStep3Screen() {
  const router = useRouter();
  const { data, updateData, resetData } = useRegistration();
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const { showSuccess, showError } = useToast();

  const handleRegister = async () => {
    // Validation
    if (!data.email || !data.password || !data.firstName || !data.lastName) {
      showError('Please fill in all required fields');
      return;
    }

    if (data.password.length < 6) {
      showError('Password must be at least 6 characters long');
      return;
    }

    if (data.password !== data.confirmPassword) {
      showError('Passwords do not match');
      return;
    }

    if (!data.email.includes('@')) {
      showError('Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      const registerData = {
        email: data.email,
        password: data.password,
        first_name: data.firstName,
        last_name: data.lastName,
        ...(data.phone && { phone: data.phone }),
        ...(data.selectedCollege && { college_id: data.selectedCollege.id }),
        ...(data.referralId && { referral_id: data.referralId }),
      };

      register.mutate(registerData, {
        onSuccess: async () => {
          showSuccess('Registration successful!');
          resetData();
          // Navigation will be handled by _layout.tsx useEffect
        },
        onError: (error: any) => {
          const errorMessage =
            error?.response?.data?.message ||
            error?.message ||
            'Registration failed. Please try again.';
          showError(errorMessage);
        },
        onSettled: () => {
          setLoading(false);
        },
      });
    } catch (error) {
      showError('An unexpected error occurred. Please try again.');
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
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
          <Text style={styles.registrationText}>Registration</Text>
        </View>

        {/* Form Section */}
        <View style={styles.formSection}>
          <GenericInput
            label="Password"
            value={data.password}
            onChangeText={(text) => updateData({ password: text })}
            placeholder="Enter your password"
            secureTextEntry={true}
            editable={!loading}
          />

          <GenericInput
            label="Confirm Password"
            value={data.confirmPassword}
            onChangeText={(text) => updateData({ confirmPassword: text })}
            placeholder="Confirm your password"
            secureTextEntry={true}
            editable={!loading}
          />

          {/* Buttons */}
          <View style={styles.buttonsContainer}>
            <View style={styles.buttonWrap}>
              <AppButton
                title="Back"
                variant="outline"
                onPress={handleBack}
                compact
              />
            </View>
            <View style={styles.buttonWrap}>
              <AppButton
                title="Sign Up"
                variant="gradient"
                onPress={handleRegister}
                compact
              />
            </View>
          </View>
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
    paddingBottom: 20,
    alignItems: 'center',
  },
  registrationText: {
    ...GlobalStyle.textRegular,
    marginTop: 8,
    fontSize: 16,
  },
  formSection: {
    marginBottom: 40,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginTop: 20,
  },
  buttonWrap: {
    alignSelf: 'center',
  },
});
