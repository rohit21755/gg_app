import AppHeader from "@/components/AppHeader";
import ProfileStats from "@/components/leaderborad/profile-stats";
import RankItem from "@/components/leaderborad/rank-item";
import { useAuthStore } from "@/store/authStore";
import { getUserDisplayName } from "@/utils/userHelpers";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
export default function Leaderboard() {
    const navigation = useNavigation();
    const user = useAuthStore((state) => state.user);
    const displayName = getUserDisplayName();
    const userXP = user?.xp || 0;
    
    return(<>
    <View style={{marginTop:48}}>
        {/* <LBHeader /> */}
        <AppHeader
  type="title"
  title="LeaderBoard"
  onBackPress={() => navigation.goBack()}
/>

        <ProfileStats   
        avatar={user?.email ? `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=3958A1&color=fff` : ""}
        points={userXP}
        username={displayName}
        rank="1"
        level={10}
        levelProgress={50}
        />
        <View style={{paddingHorizontal:16, paddingVertical:8, marginTop:16}}>
            <RankItem avatar={user?.email ? `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=3958A1&color=fff` : ""} name={displayName} points={userXP} level={10} rank={1} />
        </View>
    </View>
        {/* <LBHeader /> */}
    </>)
}