import ProfileActivity from "@/components/profile/activity";
import ProfileHeader from "@/components/profile/header";
import Refferals from "@/components/profile/refferals";
import SegmentedSwitch from "@/components/segment-switch";
// import { Text } from "react-native";

import { useState } from "react";
import { Text, View } from "react-native";
export default function Profile(){
    const [selected, setSelected] = useState('Activity');
    return(<>
    <View style={{
        marginTop:48,
        padding: 16,
    }}>
        <ProfileHeader 
        avatar=""
        username="Manoj"
        followers={100}
        following={100}
        onAddBio={() => console.log('Add bio')}
        onSettings={() => console.log('Settings')}
        onMore={() => console.log('More')}
        />
        <View style={{
            marginTop:12,
            justifyContent:'center',
            alignItems:'center',
        }}>
            <SegmentedSwitch
        list={['Activity', 'Collectibles', 'Refferals']}
        selected={selected}
        onSelected={(value) => setSelected(value)}
        />
        </View>
        <View style={{
            marginTop:12,
        }}>
            {selected === 'Activity' && <ProfileActivity />}
            {selected === 'Collectibles' && <View style={{ justifyContent:'center', alignItems:'center' }}><Text style={{ color: '#FFFFFF' }}>Comming Soon</Text></View>}
            {selected === 'Refferals' && <Refferals />}
        </View>
    </View>
    </>)
}