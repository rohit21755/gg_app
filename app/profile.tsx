import ProfileActivity from "@/components/profile/activity";
import Collectibles from "@/components/profile/collectibles";
import ProfileHeader from "@/components/profile/header";
import ProfileActionSheet from "@/components/profile/ProfileActionSheet";
import Refferals from "@/components/profile/refferals";
import SettingsModal from "@/components/profile/SettingsModal";
import SegmentedSwitch from "@/components/segment-switch";
// import { Text } from "react-native";

import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/useToast";
import { useAuthStore } from "@/store/authStore";
import { getUserDisplayName } from "@/utils/userHelpers";
import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
export default function Profile(){
    const [selected, setSelected] = useState('Activity');
    const [actionSheetVisible, setActionSheetVisible] = useState(false);
    const [settingsModalVisible, setSettingsModalVisible] = useState(false);
    const user = useAuthStore((state) => state.user);
    const displayName = getUserDisplayName();
    const { logout } = useAuth();
    const { showSuccess, showError } = useToast();

    const handleLogout = () => {
        logout.mutate(undefined, {
            onSuccess: () => {
                showSuccess('Logged out successfully');
                router.push('/index' as any);
            },
            onError: (error: any) => {
                const errorMessage =
                    error?.response?.data?.message ||
                    error?.message ||
                    'Logout failed. Please try again.';
                showError(errorMessage);
            },
        });
    };
    
    return(<>
    <View style={{
        marginTop:48,
        padding: 16,
    }}>
        <ProfileHeader 
        avatar={user?.email ? `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=3958A1&color=fff` : ""}
        username={displayName}
        followers={100}
        following={100}
        onAddBio={() => console.log('Add bio')}
        onSettings={() => setSettingsModalVisible(true)}
        onMore={() => setActionSheetVisible(true)}
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
            {selected === 'Collectibles' && <Collectibles />}
            {selected === 'Refferals' && <Refferals />}
        </View>
    </View>
    <ProfileActionSheet
        visible={actionSheetVisible}
        onClose={() => setActionSheetVisible(false)}
        onCopyLink={() => console.log('Copy link')}
        onShareProfile={() => console.log('Share profile')}
        onAddReferral={() => console.log('Add referral')}
        onEditInfo={() => console.log('Edit info')}
        onResumes={() => console.log('Resumes')}
    />
    <SettingsModal
        visible={settingsModalVisible}
        onClose={() => setSettingsModalVisible(false)}
        onLogout={handleLogout}
    />
    </>)
}