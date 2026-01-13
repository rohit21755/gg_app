import { View, StyleSheet } from "react-native";
import BadgeItem from "@/components/rewards/badge-item";

export default function Collectibles() {
    return (
        <View style={styles.container}>
            <View style={styles.badgesContainer}>
                <BadgeItem image={require('@/assets/images/badge1.png')} />
                <BadgeItem image={require('@/assets/images/badge2.png')} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
    badgesContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
        paddingHorizontal: 16,
    },
});