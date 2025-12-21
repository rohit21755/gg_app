import Profile from '@/components/home/profile';
import TaskCard from '@/components/taskcard';
import Dropdown from '@/components/ui/dropdown';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
export default function HomeScreen() {
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

const styles = StyleSheet.create({
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
