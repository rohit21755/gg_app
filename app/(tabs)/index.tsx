import Profile from '@/components/home/profile';
import TaskCard from '@/components/taskcard';
import Dropdown from '@/components/ui/dropdown';
import { GlobalStyle } from '@/assets/styles/GlobalStyle';
import AppButton from '@/components/ui/button';
import { Colors } from '@/constants/theme';
import { router } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useAuthStore } from '@/store/authStore';

export default function HomeScreen() {
  const user = useAuthStore((state) => state.user);
  const accessToken = useAuthStore((state) => state.accessToken);

  // If user is not signed in, show landing page
  if (!user || !accessToken) {
    return <LandingPage />;
  }

  // If user is signed in, show home screen
  return (
    <>
    <ScrollView
    style={{ flex: 1, padding: 16, marginTop: 48 }}>
      <Profile />
      <View style={{
        marginTop: 16,
      }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <Dropdown list={['Ongoing', 'Completed']} selected="Ongoing" setSelected={(value) => console.log(value)} />
            <Pressable>
              <Text style={{fontSize: 12, textAlign: 'center', color: '#ffffff'}}>View All</Text>
            </Pressable>
        </View>

      </View>
      <View style={{
        marginTop: 16,
      }}>
        <TaskCard title='Post on Instagram'   description='Post about the upcoming Grove Growth workshop on your Instagram Story and tag @grovegrowth' points={100} />
      </View>
    </ScrollView>
    </>
  );
}

function LandingPage() {
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
          <Text style={GlobalStyle.textRegular}>What's your role? You can add another account at any time</Text>
     
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
      onPress={() => console.log('login')}
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
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
