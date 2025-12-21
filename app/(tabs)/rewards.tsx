import Collection from "@/components/rewards/collection";
import RewardHeader from "@/components/rewards/header";
import RewardMain from "@/components/rewards/rewards";
import { useState } from "react";
import { ScrollView } from "react-native";
export default function Rewards() {
    const [selected, setSelected] = useState('Rewards');
    return(<>
       <ScrollView style={{marginTop:48}}>
        <RewardHeader selected={selected} setSelected={setSelected} />
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