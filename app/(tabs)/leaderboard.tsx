import AppHeader from "@/components/AppHeader";
import ProfileStats from "@/components/leaderborad/profile-stats";
import RankItem from "@/components/leaderborad/rank-item";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
export default function Leaderboard() {
    const navigation = useNavigation();
    return(<>
    <View style={{marginTop:48}}>
        {/* <LBHeader /> */}
        <AppHeader
  type="title"
  title="LeaderBoard"
  onBackPress={() => navigation.goBack()}
/>

        <ProfileStats   
        avatar=""
        points={100}
        username="Manoj"
        rank="1"
        level={10}
        levelProgress={50}
        />
        <View style={{paddingHorizontal:16, paddingVertical:8, marginTop:16}}>
            <RankItem avatar="" name="Manoj" points={100} level={10} rank={1} />
        </View>
    </View>
        {/* <LBHeader /> */}
    </>)
}