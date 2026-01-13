import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import TaskCard from '../taskcard';
import DateStrip from './datelist';

interface OngoingTaskProps {
    tasks?: any[];
    isLoading?: boolean;
}

export default function OngoingTask({ tasks = [], isLoading = false }: OngoingTaskProps){
    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#4A90E2" />
                <Text style={styles.loadingText}>Loading tasks...</Text>
            </View>
        );
    }

    if (tasks.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No ongoing tasks available</Text>
            </View>
        );
    }

    return (
        <View>
            <View style={{
                marginBottom: 12,
            }}>
                <DateStrip />
            </View>

            {tasks.map((task: any, index: number) => (
                <View 
                    key={task.id || task.task_id || index}
                    style={{
                        marginTop: index === 0 ? 16 : 16,
                    }}
                >
                    <TaskCard
                        title={task.title || task.name || 'Untitled Task'}
                        description={task.description || task.instructions || 'No description available'}
                        points={task.points || task.xp_reward || task.reward_points || 0}
                        onSocialPress={() => {
                            console.log('Task pressed:', task.id);
                        }}
                    />
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 40,
    },
    loadingText: {
        color: '#C7C7C7',
        fontSize: 14,
        marginTop: 12,
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 40,
    },
    emptyText: {
        color: '#808080',
        fontSize: 14,
    },
});