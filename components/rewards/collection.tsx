import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import BadgeItem from "./badge-item";
import BadgeModal from "./badge-modal";
import UpcomingBadge from "./upcoming-badge";

export default function Collection(){
    const [badgeModalVisible, setBadgeModalVisible] = useState(false);

    return(<>
        <ScrollView style={{
            padding:16,
            // justifyContent:'center',
        }}>
            <View
            style={{
                justifyContent:'center',
                alignItems:'center',
            }}>
            <Text style={{
                color:'#FFFFFF',
                fontSize:36,
                fontWeight:'700',
        
            }}>
                2
            </Text>
            <Text style={{
                color:'#8C8C8C',
                fontSize:16,
                fontWeight:'600',
            }}>Badges Unlocked</Text>

            <View style={{
                marginTop:16,
                flexDirection:'row',
                justifyContent:'center',
                alignItems:'center',
                gap:12,
                paddingHorizontal: 16,
            }}>
                <BadgeItem image={require('@/assets/images/badge1.png')} />
                <BadgeItem image={require('@/assets/images/badge2.png')} />
            </View>

            </View>
            <View>
                <View style={{
                    marginTop:16,
                    flexDirection:'row',
                    justifyContent:'space-between',
                }}>
                    <Text style={{
                        color:'#FFFFFF',
                        fontSize:14,
                        fontWeight:'700',
                    }}>Upcomming Badges</Text>
                    <Pressable><Text style={{
                        color:'#AC8CFF',
                        fontSize:10,
                        fontWeight:'700',
                    }}>View All</Text></Pressable>
                </View>
                {/* List of upcomming badges */}
                <View style={{ marginTop: 12 }}></View>
                <UpcomingBadge 
                    title="Badge 3" 
                    subtitle="Complete more tasks to unlock" 
                    progress={50}
                    onPress={() => setBadgeModalVisible(true)}
                    badgeImage={require('@/assets/images/badge3.png')}
                />
            </View>
        </ScrollView>

        <BadgeModal
            visible={badgeModalVisible}
            onClose={() => setBadgeModalVisible(false)}
            badgeImage={require('@/assets/images/badge3.png')}
            badgeTitle="Badge 3"
            badgeDescription="Complete more tasks to unlock this badge!"
        />
    </>)
}