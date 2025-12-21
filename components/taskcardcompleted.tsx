import { Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet, Text, View } from 'react-native';

interface SubmissionCardProps {
  title: string;
  description: string;
  image: any;
  responses: number;
  points: number;
}

export default function SubmissionCard({
  title,
  description,
  image,
  responses,
  points,
}: SubmissionCardProps) {
  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.brandRow}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>G</Text>
          </View>

          <View>
            <Text style={styles.title}>{title}</Text>

            <View style={styles.metaRow}>
              <View style={styles.tag}>
                <Text style={styles.tagText}>Social</Text>
              </View>
              <Text style={styles.points}>• Oct 10  • +{points} pts</Text>
            </View>
          </View>
        </View>

        <View style={styles.star}>
          <Ionicons name="sparkles" size={16} color="#A5F3FC" />
        </View>
      </View>

      {/* Description */}
      <Text style={styles.description}>{description}</Text>

      {/* Image */}
      <Image source={image} style={styles.image} />

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.dots}>
          <View style={[styles.dot, { backgroundColor: '#FACC15' }]} />
          <View style={[styles.dot, { backgroundColor: '#22C55E' }]} />
          <View style={[styles.dot, { backgroundColor: '#3B82F6' }]} />
        </View>

        <Text style={styles.responses}>{responses} responses</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    padding: 16,
    gap: 12,
  },

  /* HEADER */
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  brandRow: {
    flexDirection: 'row',
    gap: 12,
  },

  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },

  title: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'AnekOdia-ExtraBold',
  },

  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },

  tag: {
    backgroundColor: '#1E293B',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
  },

  tagText: {
    color: '#60A5FA',
    fontSize: 11,
    fontWeight: '600',
  },

  points: {
    color: '#A1A1AA',
    fontSize: 12,
  },

  star: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* DESCRIPTION */
  description: {
    color: '#D4D4D8',
    fontSize: 14,
    lineHeight: 20,
  },

  /* IMAGE */
  image: {
    width: '100%',
    height: 160,
    borderRadius: 14,
    resizeMode: 'cover',
  },

  /* FOOTER */
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  dots: {
    flexDirection: 'row',
    gap: 4,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },

  responses: {
    color: '#A1A1AA',
    fontSize: 13,
  },
});
