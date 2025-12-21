import { View } from "react-native";
import RefferalCard from "./refferal-card";
export default function Refferals() {
    return <>
        <View>
            <RefferalCard
  name="Sneha Kapoor"
  subtitle="Joined on March 8, 2023"
  avatar="https://your-image-url.com/avatar.jpg"
  onActionPress={() => console.log('Action pressed')}
/>

        </View>
    </>
}