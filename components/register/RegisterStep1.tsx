import { GenericInput } from '@/components/ui/input';
import { useRegistration } from '@/contexts/RegistrationContext';
import { View, StyleSheet } from 'react-native';

export default function RegisterStep1() {
  const { data, updateData } = useRegistration();

  return (
    <View style={styles.container}>
      <GenericInput
        label="First Name"
        value={data.firstName}
        onChangeText={(text) => updateData({ firstName: text })}
        placeholder="Enter your first name"
        autoCapitalize="words"
      />

      <GenericInput
        label="Last Name"
        value={data.lastName}
        onChangeText={(text) => updateData({ lastName: text })}
        placeholder="Enter your last name"
        autoCapitalize="words"
      />

      <GenericInput
        label="Email"
        value={data.email}
        onChangeText={(text) => updateData({ email: text })}
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
