import LBHeader from "@/components/leaderborad/header";
import ProfileStats from "@/components/leaderborad/profile-stats";
import RankItem from "@/components/leaderborad/rank-item";
import { View } from "react-native";
export default function Leaderboard() {
    return(<>
    <View style={{marginTop:48}}>
        <LBHeader />
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