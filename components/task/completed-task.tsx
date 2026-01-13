import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import SubmissionCard from "../taskcardcompleted";

interface CompletedTaskProps {
    tasks?: any[];
    isLoading?: boolean;
}

export default function CompletedTask({ tasks = [], isLoading = false }: CompletedTaskProps){
    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#4A90E2" />
                <Text style={styles.loadingText}>Loading completed tasks...</Text>
            </View>
        );
    }

    if (tasks.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No completed tasks available</Text>
            </View>
        );
    }

    return(
        <>
            {tasks.map((task: any, index: number) => (
                <View key={task.ID || task.id || task.task_id || index} style={{ marginBottom: 16 }}>
                    <SubmissionCard
                        title={task.Title || task.title || task.name || 'Untitled Task'}
                        description={task.Description || task.description || task.instructions || 'No description available'}
                        image={task.image_url 
                            ? { uri: task.image_url } 
                            : require('@/assets/images/vibe.png')}
                        responses={task.responses || task.response_count || 0}
                        points={task.XPReward || task.points || task.xp_reward || task.reward_points || 0}
                    />
                </View>
            ))}
        </>
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