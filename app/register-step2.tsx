import { GlobalStyle } from '@/assets/styles/GlobalStyle';
import AppButton from '@/components/ui/button';
import CollegeDropdown, { College } from '@/components/ui/college-dropdown';
import { GenericInput } from '@/components/ui/input';
import { useRegistration } from '@/contexts/RegistrationContext';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';

// Default college data
const DEFAULT_COLLEGES: College[] = [
  { id: 1, name: 'Harvard University' },
  { id: 2, name: 'Stanford University' },
  { id: 3, name: 'Massachusetts Institute of Technology' },
  { id: 4, name: 'University of California, Berkeley' },
  { id: 5, name: 'Yale University' },
  { id: 6, name: 'Princeton University' },
  { id: 7, name: 'Columbia University' },
  { id: 8, name: 'University of Chicago' },
  { id: 9, name: 'University of Pennsylvania' },
  { id: 10, name: 'California Institute of Technology' },
  { id: 11, name: 'Duke University' },
  { id: 12, name: 'Northwestern University' },
  { id: 13, name: 'Johns Hopkins University' },
  { id: 14, name: 'Dartmouth College' },
  { id: 15, name: 'Brown University' },
];

export default function RegisterStep2Screen() {
  const router = useRouter();
  const { data, updateData } = useRegistration();

  const handleNext = () => {
    router.push('/register-step3');
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
            label="Phone (Optional)"
            value={data.phone}
            onChangeText={(text) => updateData({ phone: text })}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
          />

          <View style={styles.dropdownContainer}>
            <Text style={styles.label}>College (Optional)</Text>
            <CollegeDropdown
              colleges={DEFAULT_COLLEGES}
              selected={data.selectedCollege}
              setSelected={(college) => updateData({ selectedCollege: college })}
              placeholder="Select your college"
            />
          </View>

          <GenericInput
            label="Referral ID (Optional)"
            value={data.referralId}
            onChangeText={(text) => updateData({ referralId: text })}
            placeholder="Enter referral ID if you have one"
            autoCapitalize="none"
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
                title="Next"
                variant="gradient"
                onPress={handleNext}
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
    // paddingVertical: 40,
    justifyContent: 'space-between',
  },
  titleSection: {
    paddingTop: 40,
    paddingBottom: 20,
    alignItems: 'center',
  },
  registrationText: {
    ...GlobalStyle.textRegular,
    // marginTop: 8,
    fontSize: 16,
  },
  formSection: {
    marginBottom: 80,
  },
  dropdownContainer: {
    marginBottom: 24,
  },
  label: {
    width: 185,
    height: 16,
    color: 'rgba(191, 191, 191, 1)',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    fontFamily: 'system',
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
