import { GenericInput } from '@/components/ui/input';
import { useRegistration } from '@/contexts/RegistrationContext';
import { View, StyleSheet } from 'react-native';

interface RegisterStep3Props {
  loading?: boolean;
}

export default function RegisterStep3({ loading = false }: RegisterStep3Props) {
  const { data, updateData } = useRegistration();

  return (
    <View style={styles.container}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
