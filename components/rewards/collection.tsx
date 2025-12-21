import { Pressable, ScrollView, Text, View } from "react-native";
import UpcomingBadge from "./upcoming-badge";
export default function Collection(){
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
                12
            </Text>
            <Text style={{
                color:'#8C8C8C',
                fontSize:16,
                fontWeight:'600',
            }}>Badges Unlocked</Text>

            <View style={{
                marginTop:16,
                flexDirection:'row',
                justifyContent:'space-between',
                alignItems:'center',
                gap:12,
                backgroundColor:'#1B1B1B'
            }}></View>

            <View style={{

            }}>

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
                <View ></View>
                <UpcomingBadge title="Badge 1" subtitle="Subtitle" progress={50} />
            </View>
        </ScrollView>
    </>)
}