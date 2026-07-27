import { StyleSheet, Platform, StatusBar } from 'react-native';

const TEAL = '#1989a8';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    backgroundColor: TEAL,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    paddingTop: Platform.OS === 'ios' ? 54 : 14 + (StatusBar.currentHeight || 0),
    gap: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  backButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
  },
  scrollContent: {
    paddingBottom: 40,
  },

  // Venue Info Card
  venueCard: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  venueImage: {
    width: 64,
    height: 64,
    borderRadius: 14,
    backgroundColor: '#e5e7eb',
  },
  venueInfo: {
    flex: 1,
    gap: 4,
  },
  venueName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0f172a',
  },
  venueAddressRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 4,
  },
  venueAddress: {
    fontSize: 12,
    color: '#64748b',
    flex: 1,
    lineHeight: 16,
  },

  // Rating Overview Card
  ratingOverviewCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    padding: 16,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  ratingLeft: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1.1,
    borderRightWidth: 1,
    borderRightColor: '#f1f5f9',
    paddingRight: 12,
  },
  ratingScore: {
    fontSize: 38,
    fontWeight: '900',
    color: '#0f172a',
  },
  starsRow: {
    flexDirection: 'row',
    gap: 3,
    marginVertical: 4,
  },
  ratingCountText: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '500',
  },
  ratingRight: {
    flex: 1.5,
    paddingLeft: 16,
    gap: 6,
  },
  progressBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  barLabel: {
    fontSize: 11,
    color: '#64748b',
    fontWeight: '600',
    width: 8,
    textAlign: 'center',
  },
  barTrack: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#f1f5f9',
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: '#f97316',
  },
  barCount: {
    fontSize: 11,
    color: '#94a3b8',
    width: 24,
    textAlign: 'right',
  },

  // Section Headers
  sectionTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0f172a',
  },
  seeAllText: {
    fontSize: 13,
    color: TEAL,
    fontWeight: '700',
  },

  // Category Cards Grid Wrapper
  categoriesContainer: { paddingLeft: 16, paddingRight: 8, marginBottom: 20 },
  categoryBox: { backgroundColor: '#ffffff', borderRadius: 12, padding: 10, alignItems: 'center', marginRight: 10, width: 76, gap: 6 },
  categoryCardWrapper: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginHorizontal: 16,
    paddingVertical: 14,
    paddingHorizontal: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: '#f1f5f9',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 1,
  },
  categoryBoxItem: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    flex: 1,
  },
  categoryLabel: {
    fontSize: 10,
    color: '#64748b',
    fontWeight: '600',
    textAlign: 'center',
  },
  categoryScore: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0f172a',
  },

  // Reviews List
  reviewsList: {
    paddingHorizontal: 16,
    gap: 14,
  },
  reviewCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 1,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  reviewMeta: { alignItems: 'flex-end', gap: 2 },
  reviewerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  reviewerAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#e5e7eb',
  },
  reviewerName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0f172a',
  },
  reviewDate: {
    fontSize: 11,
    color: '#0284c7',
    fontWeight: '600',
  },
  reviewComment: {
    fontSize: 13,
    lineHeight: 19,
    color: '#334155',
    fontWeight: '500',
    marginBottom: 12,
  },
  photoRow: {
    flexDirection: 'row',
    gap: 8,
  },
  reviewPhoto: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 10,
    backgroundColor: '#f1f5f9',
  },

  // Write Review Button
  writeReviewBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1.5,
    borderColor: TEAL,
    borderRadius: 14,
    height: 48,
    marginHorizontal: 16,
    marginTop: 20,
    backgroundColor: '#ffffff',
  },
  writeReviewText: {
    fontSize: 15,
    fontWeight: '800',
    color: TEAL,
  },
});

export default styles;
