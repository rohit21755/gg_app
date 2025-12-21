import { Image, View } from 'react-native';
import TaskCard from '../taskcard';
import DateStrip from './datelist';
export default function OngoingTask(){
    return (
        <View>
            <View style={{
                marginBottom: 12,
            }}>
                <DateStrip />
            </View>

            <View style={{
                marginTop:16,
            }}>
                <TaskCard
                    title="Post on Instagram"
                    description="Post about the upcoming Grove Growth workshop on your Instagram Story and tag @grovegrowth"
                    points={100}
                />
            </View>

            <View style={{
                padding:16,
                marginTop:16,
            }}>
                <Image
                    source={require('../../assets/images/vibe.png')}
                    style={{ width: '100%', height: 150, borderRadius: 12, resizeMode: 'cover' }}
                />
            </View>
        </View>
    );
}