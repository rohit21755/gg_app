import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';

interface FileUploadProps {
  label?: string;
  type?: 'image' | 'video' | 'both';
  value?: string | null;
  onChange: (uri: string) => void;
  onRemove?: () => void;
}

export default function FileUpload({
  label,
  type = 'both',
  value,
  onChange,
  onRemove,
}: FileUploadProps) {
  const pickImage = async () => {
    // Request permissions
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'We need access to your photos to upload files.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: type === 'image' 
        ? ImagePicker.MediaTypeOptions.Images 
        : type === 'video'
        ? ImagePicker.MediaTypeOptions.Videos
        : ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      onChange(result.assets[0].uri);
    }
  };

  const pickCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'We need camera permissions to take photos.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: type === 'image' 
        ? ImagePicker.MediaTypeOptions.Images 
        : type === 'video'
        ? ImagePicker.MediaTypeOptions.Videos
        : ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      onChange(result.assets[0].uri);
    }
  };

  const showOptions = () => {
    Alert.alert(
      'Select Source',
      'Choose where to get your file from',
      [
        { text: 'Camera', onPress: pickCamera },
        { text: 'Gallery', onPress: pickImage },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      {value ? (
        <View style={styles.previewContainer}>
          <View style={styles.preview}>
            {type === 'image' || value.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
              <Image source={{ uri: value }} style={styles.previewImage} />
            ) : (
              <View style={styles.videoPreview}>
                <Ionicons name="videocam" size={40} color="#fff" />
                <Text style={styles.videoText}>Video Selected</Text>
                <Text style={styles.videoSubtext}>Tap to preview</Text>
              </View>
            )}
            <Pressable style={styles.removeButton} onPress={onRemove}>
              <Ionicons name="close-circle" size={24} color="#EF4444" />
            </Pressable>
          </View>
        </View>
      ) : (
        <LinearGradient
          colors={['#130538', '#1C519D']}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.uploadBorder}
        >
          <Pressable style={styles.uploadBox} onPress={showOptions}>
            <View style={styles.uploadContent}>
              <Ionicons 
                name={type === 'image' ? 'image-outline' : type === 'video' ? 'videocam-outline' : 'images-outline'} 
                size={32} 
                color="#4A90E2" 
              />
              <Text style={styles.uploadText}>
                {type === 'image' ? 'Upload Image' : type === 'video' ? 'Upload Video' : 'Upload Image/Video'}
              </Text>
              <Text style={styles.uploadSubtext}>Tap to select from gallery</Text>
            </View>
          </Pressable>
        </LinearGradient>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  label: {
    width: 185,
    height: 16,
    color: 'rgba(191, 191, 191, 1)',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    fontFamily: 'system',
  },
  uploadBorder: {
    padding: 1.5,
    borderRadius: 12,
  },
  uploadBox: {
    backgroundColor: '#0F0F0F',
    borderRadius: 10,
    minHeight: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3a3a3a',
    borderStyle: 'dashed',
  },
  uploadContent: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  uploadText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
  },
  uploadSubtext: {
    color: '#808080',
    fontSize: 12,
    marginTop: 4,
  },
  previewContainer: {
    marginTop: 8,
  },
  preview: {
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  videoPreview: {
    width: '100%',
    height: 200,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3a3a3a',
  },
  videoText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginTop: 8,
    fontWeight: '600',
  },
  videoSubText: {
    color: '#808080',
    fontSize: 12,
    marginTop: 4,
  },
  removeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 12,
    padding: 4,
  },
});
