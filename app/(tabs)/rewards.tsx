import AppHeader from "@/components/AppHeader";
import Collection from "@/components/rewards/collection";
import RewardMain from "@/components/rewards/rewards";
import { useNavigation } from "expo-router";
import { useState } from "react";
import { ScrollView } from "react-native";
export default function Rewards() {
    const [selected, setSelected] = useState('Rewards');
    const navigation = useNavigation();
    return(<>
       <ScrollView style={{marginTop:48}}>
        {/* <RewardHeader selected={selected} setSelected={setSelected} />
         */}
         <AppHeader
  type="segment"
  segmentList={['Rewards', 'Collections']}
  selected={selected}
  onSelect={setSelected}
  onBackPress={() => navigation.goBack()}
/>

        {selected==='Rewards' ? (
            <>
                {/* <RewardCollection /> */}
                <RewardMain />
            </>
        ) : (
            <>
                <Collection />
            </>
        )}
       </ScrollView>
        </>)
}