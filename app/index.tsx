import { GlobalStyle } from '@/assets/styles/GlobalStyle';
import AppButton from '@/components/ui/button';
import { Colors } from '@/constants/theme';
import { router } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
export default function Landing() {
  function handleClick(){
    console.log('Button pressed');
    router.push('/login');
  }
  return (
    <View style={[styles.container, { backgroundColor: Colors.dark.background }]}>
      <View style={{
        width: 'auto', height: 'auto',
        alignItems: 'center', marginTop: '55%'
      }}>
        <Image
          source={require('@/assets/images/badge3.png')}
          style={{ width: 180, height: 180, resizeMode: 'contain' }}
        />
      </View>
      <View style={{
        alignItems: 'center',
      }}>
        <Text style={GlobalStyle.textHeading}>One app,</Text>
        <Text style={GlobalStyle.textHeading}> all your Groving</Text>
        <View style={{
          marginTop: 16,
        }}>
          <Text style={GlobalStyle.textRegular}>What’s your role? You can add another account at any time</Text>
     
        </View>
        <View
  style={{
    marginTop: 16,
    flexDirection: 'row',
    gap: 12, // spacing between buttons (RN >= 0.71 / Expo OK)
    width: '100%',
  }}
>
  <View style={{ flex: 1 }}>
    <AppButton
      title="Ambassador"
      variant="outline"
      onPress={() => router.push('/register')}
    />
  </View>

  <View style={{ flex: 1 }}>
    <AppButton
      title="State Lead"
      variant="outline"
      onPress={() => console.log('signup')}
    />
  </View>
</View>

<View style={{
          marginTop: 16,
          flexDirection: 'row',
        }}>
          <Text style={GlobalStyle.textRegular}>Already have an account?</Text>
          <Pressable onPress={handleClick}>
            <Text style={[GlobalStyle.textRegular, { color: "white" ,marginLeft: 4, fontWeight:'400' }]}>Log in</Text>
          </Pressable>
     
        </View>
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