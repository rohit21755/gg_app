import { useCreateSubmission } from '@/api/rest/submissions';
import AppHeader from '@/components/AppHeader';
import SubmissionSuccessModal from '@/components/submission-success-modal';
import AppButton from '@/components/ui/button';
import FileUpload from '@/components/ui/file-upload';
import { useToast } from '@/hooks/useToast';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

export default function SubmitTaskScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const taskId = params.taskId ? Number(params.taskId) : null;
  const { showError } = useToast();
  const createSubmission = useCreateSubmission();

  const [imageUri, setImageUri] = useState<string | null>(null);
  const [videoUri, setVideoUri] = useState<string | null>(null);
  const [proofText, setProofText] = useState('');
  const [proofType, setProofType] = useState<'image' | 'video'>('image');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = async () => {
    if (!taskId) {
      showError('Task ID is required');
      return;
    }

    const proofUrl = proofType === 'image' ? imageUri : videoUri;
    if (!proofUrl) {
      showError(`Please upload a ${proofType}`);
      return;
    }

    setIsSubmitting(true);

    try {
      // In a real app, you would upload the file to a storage service first
      // and get the URL. For now, we'll use the local URI
      // TODO: Upload file to storage and get the URL
      
      createSubmission.mutate(
        {
          task_id: taskId,
          proof_type: proofType,
          proof_url: proofUrl, // This should be the uploaded file URL
          proof_text: proofText || undefined,
        },
        {
          onSuccess: () => {
            setShowSuccessModal(true);
          },
          onError: (error: any) => {
            const errorMessage =
              error?.response?.data?.message ||
              error?.message ||
              'Failed to submit task. Please try again.';
            showError(errorMessage);
          },
          onSettled: () => {
            setIsSubmitting(false);
          },
        }
      );
    } catch (error) {
      showError('An unexpected error occurred');
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <AppHeader
        type="title"
        title="Submit Task"
        onBackPress={() => router.back()}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Task Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Task Submission</Text>
          <Text style={styles.sectionDescription}>
            Upload your proof to complete this task
          </Text>
        </View>

        {/* Proof Type Selection */}
        <View style={styles.section}>
          <Text style={styles.label}>Proof Type</Text>
          <View style={styles.proofTypeContainer}>
            <AppButton
              title="Image"
              variant={proofType === 'image' ? 'gradient' : 'outline'}
              onPress={() => {
                setProofType('image');
                setVideoUri(null);
              }}
              compact
            />
            <AppButton
              title="Video"
              variant={proofType === 'video' ? 'gradient' : 'outline'}
              onPress={() => {
                setProofType('video');
                setImageUri(null);
              }}
              compact
            />
          </View>
        </View>

        {/* File Upload */}
        <View style={styles.section}>
          <FileUpload
            label={proofType === 'image' ? 'Upload Image' : 'Upload Video'}
            type={proofType}
            value={proofType === 'image' ? imageUri : videoUri}
            onChange={(uri) => {
              if (proofType === 'image') {
                setImageUri(uri);
              } else {
                setVideoUri(uri);
              }
            }}
            onRemove={() => {
              if (proofType === 'image') {
                setImageUri(null);
              } else {
                setVideoUri(null);
              }
            }}
          />
        </View>

        {/* Additional Text */}
        <View style={styles.section}>
          <View style={styles.textAreaContainer}>
            <Text style={styles.label}>Additional Notes (Optional)</Text>
            <TextInput
              style={styles.textArea}
              value={proofText}
              onChangeText={setProofText}
              placeholder="Add any additional information about your submission"
              placeholderTextColor="#666"
              multiline
              numberOfLines={4}
            />
          </View>
        </View>

        {/* Submit Button */}
        <View style={styles.submitSection}>
          <AppButton
            title={isSubmitting ? 'Submitting...' : 'Submit Task'}
            variant="gradient"
            onPress={handleSubmit}
            compact={false}
          />
        </View>
      </ScrollView>

      <SubmissionSuccessModal
        visible={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          router.back();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    paddingTop: 48
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingTop: 0,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    fontFamily: 'AnekOdia-ExtraBold',
  },
  sectionDescription: {
    color: '#C7C7C7',
    fontSize: 14,
    lineHeight: 20,
  },
  label: {
    color: 'rgba(191, 191, 191, 1)',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 12,
    fontFamily: 'system',
  },
  proofTypeContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  textAreaContainer: {
    marginBottom: 24,
  },
  textArea: {
    width: '100%',
    minHeight: 100,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#3a3a3a',
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: '#FFFFFF',
    fontSize: 14,
    backgroundColor: '#2a2a2a',
    textAlignVertical: 'top',
  },
  submitSection: {
    marginTop: 20,
    marginBottom: 40,
    alignItems: 'center',
  },
});
