import { GlobalStyle } from '@/assets/styles/GlobalStyle';
import AppButton from '@/components/ui/button';
import RegisterStep1 from '@/components/register/RegisterStep1';
import RegisterStep2 from '@/components/register/RegisterStep2';
import RegisterStep3 from '@/components/register/RegisterStep3';
import { useRegistration } from '@/contexts/RegistrationContext';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
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

export default function RegisterScreen() {
  const router = useRouter();
  const { data, updateData, resetData } = useRegistration();
  const { register } = useAuth();
  const { showSuccess, showError } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

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

  const handleLogin = () => {
    router.push('/login');
  };

  const handleStep1Next = () => {
    // Validation for step 1
    if (!data.firstName || !data.lastName || !data.email) {
      showError('Please fill in all required fields');
      return;
    }

    if (!data.email.includes('@')) {
      showError('Please enter a valid email address');
      return;
    }

    handleNext();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <RegisterStep1 />;
      case 2:
        return <RegisterStep2 />;
      case 3:
        return <RegisterStep3 loading={loading} />;
      default:
        return <RegisterStep1 />;
    }
  };

  const renderButtons = () => {
    if (currentStep === 1) {
      return (
        <View style={styles.buttonWrap}>
          <AppButton
            title="Next"
            variant="gradient"
            onPress={handleStep1Next}
            compact
          />
        </View>
      );
    } else if (currentStep === 2) {
      return (
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
              title="Next"
              variant="gradient"
              onPress={handleNext}
              compact
            />
          </View>
        </View>
      );
    } else {
      return (
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
              title={loading ? "Signing Up..." : "Sign Up"}
              variant="gradient"
              onPress={handleRegister}
              compact
            />
          </View>
        </View>
      );
    }
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
          {renderStep()}
          {renderButtons()}
        </View>

        {/* Login Link - Only show on first step */}
        {currentStep === 1 && (
          <View style={styles.loginSection}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={handleLogin}>
              <Text style={styles.loginLink}>Log In</Text>
            </TouchableOpacity>
          </View>
        )}
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
  buttonWrap: {
    alignSelf: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginTop: 20,
  },
  loginSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 'auto',
  },
  loginText: {
    color: '#999999',
    fontSize: 14,
    fontWeight: '400',
  },
  loginLink: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: '600',
  },
});
