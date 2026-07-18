import { StyleSheet, Platform, Dimensions, StatusBar } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TEAL = '#1989a8';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },

  // ==========================================
  // HEADER
  // ==========================================
  header: {
    backgroundColor: TEAL,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 54 : (StatusBar.currentHeight || 0) + 14,
    paddingBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 0.2,
  },
  headerBell: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ==========================================
  // CATEGORY CHIPS (Pill Buttons – horizontal scroll)
  // ==========================================
  chipsScrollContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 25,
  },
  chipActive: {
    backgroundColor: TEAL,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 40,
    // paddingVertical: 0,
    borderRadius: 9999,
    shadowColor: TEAL,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  chipInactive: {
    backgroundColor: '#ffffff',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 40,
    // paddingVertical: 10,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: '#bec8ce',
  },
  chipActiveText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
  chipInactiveText: {
    color: '#3e484d',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },

  // ==========================================
  // SCROLL CONTENT
  // ==========================================
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 36,
    gap: 14,
  },

  // ==========================================
  // FEATURED BANNER
  // ==========================================
  banner: {
    borderRadius: 16,
    overflow: 'hidden',
    height: 176,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
  },
  bannerBg: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.42)',
  },
  bannerContent: {
    padding: 16,
  },
  bannerBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#feae2c',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginBottom: 8,
  },
  bannerBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: 0.8,
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#ffffff',
    lineHeight: 24,
    marginBottom: 4,
  },
  bannerSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.88)',
  },

  // ==========================================
  // VENUE AVAILABLE CARD
  // ==========================================
  venueCard: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  venueRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  venueImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: '#e5e7eb',
  },
  venueInfo: {
    flex: 1,
  },
  venueName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 4,
  },
  venueAddressRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 3,
    marginBottom: 3,
  },
  venueAddress: {
    fontSize: 12,
    color: '#6b7280',
    flex: 1,
    lineHeight: 16,
  },
  venueUpdated: {
    fontSize: 11,
    color: '#9ca3af',
  },
  hotAlertRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff7ed',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginTop: 10,
    gap: 6,
  },
  hotAlertText: {
    fontSize: 12,
    color: '#ea580c',
    fontWeight: '600',
    flex: 1,
  },
  hotAlertLink: {
    fontSize: 11,
    color: TEAL,
    fontWeight: '600',
  },

  // ==========================================
  // COURT SCHEDULE CARD
  // ==========================================
  scheduleCard: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  dateHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 10,
  },
  dateNumberBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: TEAL,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateNumberText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#ffffff',
  },
  dateLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1f2937',
    flex: 1,
  },
  availableBadge: {
    backgroundColor: '#dcfce7',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  availableBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#16a34a',
  },
  courtSection: {
    marginBottom: 12,
  },
  courtLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 7,
  },
  timeSlotsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  timeSlotBtn: {
    backgroundColor: TEAL,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  timeSlotText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ffffff',
  },
  seeDetailBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f9ff',
    borderRadius: 10,
    paddingVertical: 10,
    marginTop: 4,
    gap: 4,
  },
  seeDetailText: {
    fontSize: 13,
    fontWeight: '700',
    color: TEAL,
  },

  // ==========================================
  // COURSES SECTION
  // ==========================================
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
    marginBottom: 12,
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0f172a',
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: '600',
    color: TEAL,
  },

  // ==========================================
  // COURSE CARD
  // ==========================================
  courseCard: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  courseImageContainer: {
    height: 150,
    position: 'relative',
  },
  courseImage: {
    width: '100%',
    height: '100%',
  },
  courseBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  courseBadgeHot: {
    backgroundColor: '#ef4444',
  },
  courseBadgeGold: {
    backgroundColor: '#f59e0b',
  },
  courseBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  courseBody: {
    padding: 14,
  },
  courseName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 6,
  },
  courseMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  courseMetaText: {
    fontSize: 12,
    color: '#6b7280',
  },
  courseDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  courseTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  courseTimeText: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '600',
  },
  coursePriceText: {
    fontSize: 13,
    fontWeight: '800',
    color: TEAL,
  },
  courseFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  coachRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  coachAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e5e7eb',
  },
  coachLabelText: {
    fontSize: 10,
    color: '#9ca3af',
  },
  coachName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#374151',
  },
  contactBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  contactBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: TEAL,
  },
});

export default styles;
