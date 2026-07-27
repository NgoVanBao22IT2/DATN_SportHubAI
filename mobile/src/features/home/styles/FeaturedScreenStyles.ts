import { StyleSheet, Platform, StatusBar } from 'react-native';

const TEAL = '#1989a8';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f4f7' },

  // ── HEADER ──────────────────────────────────────────────────
  header: {
    backgroundColor: TEAL,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 54 : (StatusBar.currentHeight || 0) + 14,
    paddingBottom: 14,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#fff', letterSpacing: 0.2 },
  headerBell: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },

  // ── CHIPS ────────────────────────────────────────────────────
  chipsScrollContent: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingHorizontal: 16, paddingVertical: 14,
  },
  chipActive: {
    backgroundColor: TEAL, justifyContent: 'center', alignItems: 'center',
    paddingHorizontal: 20, height: 40, borderRadius: 9999,
    elevation: 4, shadowColor: TEAL,
    shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8,
  },
  chipInactive: {
    backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center',
    paddingHorizontal: 20, height: 40, borderRadius: 9999,
    borderWidth: 1, borderColor: '#bec8ce',
  },
  chipActiveText: { color: '#fff', fontSize: 14, fontWeight: '700' },
  chipInactiveText: { color: '#3e484d', fontSize: 14, fontWeight: '700' },

  // ── SCROLL ───────────────────────────────────────────────────
  scrollContent: { paddingHorizontal: 14, paddingBottom: 80, gap: 14 },

  // ── BANNER ───────────────────────────────────────────────────
  banner: { borderRadius: 16, overflow: 'hidden', height: 176, elevation: 5 },
  bannerBg: { width: '100%', height: '100%', justifyContent: 'flex-end' },
  bannerOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.42)' },
  bannerContent: { padding: 16 },
  bannerBadge: {
    alignSelf: 'flex-start', backgroundColor: '#feae2c',
    borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3, marginBottom: 8,
  },
  bannerBadgeText: { fontSize: 10, fontWeight: '800', color: '#fff', letterSpacing: 0.8 },
  bannerTitle: { fontSize: 18, fontWeight: '800', color: '#fff', lineHeight: 24, marginBottom: 4 },
  bannerSubtitle: { fontSize: 12, color: 'rgba(255,255,255,0.88)' },

  // ── VENUE CARD (Tất cả) ──────────────────────────────────────
  venueCard: {
    backgroundColor: '#fff', borderRadius: 14, padding: 14, elevation: 2,
    shadowColor: '#000', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 2 }, shadowRadius: 8,
  },
  venueRow: { flexDirection: 'row', gap: 12, alignItems: 'flex-start' },
  venueImage: { width: 60, height: 60, borderRadius: 10, backgroundColor: '#e5e7eb' },
  venueInfo: { flex: 1 },
  venueName: { fontSize: 15, fontWeight: '800', color: '#0f172a', marginBottom: 4 },
  venueAddressRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 3, marginBottom: 3 },
  venueAddress: { fontSize: 12, color: '#6b7280', flex: 1, lineHeight: 16 },
  venueUpdatedContainer: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#f3f4f6',
    borderRadius: 20, paddingVertical: 6, paddingHorizontal: 12, marginTop: 8, gap: 6,
  },
  venueUpdatedText: { fontSize: 11, color: '#4b5563', fontWeight: '500' },
  hotAlertRow: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#e0f2fe',
    borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, marginTop: 12, gap: 8,
  },
  hotAlertTextContainer: { flex: 1, gap: 2 },
  hotAlertText: { fontSize: 13, color: '#0369a1', fontWeight: '700' },
  hotAlertLink: { fontSize: 11, color: '#0284c7', fontWeight: '600' },

  // ── SCHEDULE ─────────────────────────────────────────────────
  scheduleCard: {
    backgroundColor: '#fff', borderRadius: 14, padding: 14, elevation: 2,
    shadowColor: '#000', shadowOpacity: 0.04, shadowOffset: { width: 0, height: 2 }, shadowRadius: 6,
  },
  dateHeaderRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 10 },
  dateNumberBadge: { width: 28, height: 28, borderRadius: 14, backgroundColor: TEAL, alignItems: 'center', justifyContent: 'center' },
  dateNumberText: { fontSize: 13, fontWeight: '800', color: '#fff' },
  dateLabel: { fontSize: 14, fontWeight: '700', color: '#1f2937', flex: 1 },
  availableBadge: { backgroundColor: '#dcfce7', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 3 },
  availableBadgeText: { fontSize: 11, fontWeight: '700', color: '#16a34a' },
  courtSection: { marginBottom: 12 },
  courtLabel: { fontSize: 12, fontWeight: '600', color: '#374151', marginBottom: 7 },
  timeSlotsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  timeSlotBtn: { backgroundColor: '#dcfce7', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 6 },
  timeSlotText: { fontSize: 12, fontWeight: '700', color: '#15803d' },
  seeDetailBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: TEAL, borderRadius: 12, height: 44, marginTop: 12,
  },
  seeDetailText: { fontSize: 14, fontWeight: '700', color: '#fff' },

  // ── SECTION HEADER ───────────────────────────────────────────
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 },
  sectionHeaderLeft: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: '#0f172a' },
  seeAllText: { fontSize: 13, fontWeight: '600', color: TEAL },

  // ── COURSE CARD ──────────────────────────────────────────────
  courseCard: {
    backgroundColor: '#fff', borderRadius: 14, overflow: 'hidden', elevation: 2,
    shadowColor: '#000', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 2 }, shadowRadius: 8,
  },
  courseImageContainer: { height: 150, position: 'relative', borderBottomColor: 'rgba(24,88,217,0.2)', borderBottomWidth: 1 },
  courseImage: { width: '100%', height: '100%' },
  courseBadgeRow: { flexDirection: 'row', position: 'absolute', top: 10, left: 10, gap: 6 },
  courseBadge: { borderRadius: 6, paddingHorizontal: 8, paddingVertical: 4 },
  courseBadgeHot: { backgroundColor: '#ef4444' },
  courseBadgeGold: { backgroundColor: '#f59e0b' },
  courseBadgeBlue: { backgroundColor: '#e0f2fe' },
  courseBadgeText: { fontSize: 10, fontWeight: '800', color: '#fff', letterSpacing: 0.5 },
  courseBadgeTextBlue: { fontSize: 10, fontWeight: '800', color: '#0369a1', letterSpacing: 0.5 },
  courseBody: { padding: 14 },
  courseName: { fontSize: 15, fontWeight: '800', color: '#0f172a', marginBottom: 6 },
  courseMetaRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 10 },
  courseMetaText: { fontSize: 12, color: '#6b7280' },
  courseCapsulesRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 14 },
  courseCapsule: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#f3f4f6',
    borderRadius: 8, paddingHorizontal: 10, paddingVertical: 6, gap: 4,
  },
  courseCapsuleText: { fontSize: 12, color: '#4b5563', fontWeight: '600' },
  courseFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10, borderTopWidth: 1, borderTopColor: '#f3f4f6' },
  coachRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  coachAvatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#e5e7eb' },
  coachLabelText: { fontSize: 10, color: '#9ca3af' },
  coachName: { fontSize: 12, fontWeight: '700', color: '#374151' },
  contactBtn: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  contactBtnText: { fontSize: 12, fontWeight: '700', color: TEAL },

  // ── EMPTY PLACEHOLDER ────────────────────────────────────────
  emptyTab: { alignItems: 'center', paddingVertical: 80, gap: 12 },
  emptyTabTitle: { fontSize: 18, fontWeight: '700', color: '#6b7280' },
  emptyTabSub: { fontSize: 14, color: '#9ca3af' },

  // ── MEMBER HERO BANNER ─────────────────────────────────────────
  memberHeroBannerContainer: {
    height: 140, borderRadius: 16, overflow: 'hidden', marginBottom: 6,
    elevation: 3, shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 2 }, shadowRadius: 6,
  },
  memberHeroBannerBg: { width: '100%', height: '100%', justifyContent: 'flex-end' },
  memberHeroBannerContent: { padding: 14 },
  proSessionBadge: {
    position: 'absolute', top: 12, left: 12,
    backgroundColor: '#f59e0b', borderRadius: 6, paddingHorizontal: 10, paddingVertical: 4,
  },
  proSessionText: { fontSize: 11, fontWeight: '900', color: '#fff', letterSpacing: 1 },
  memberSportTitle: { fontSize: 24, fontWeight: '900', color: '#fff', letterSpacing: 2 },
  memberSportSubtitle: { fontSize: 11, color: 'rgba(255,255,255,0.85)', fontWeight: '600', letterSpacing: 0.5, marginTop: 2 },

  // ── MEMBER VENUE CARD ─────────────────────────────────────────
  memberVenueHeaderCard: {
    backgroundColor: '#fff', borderRadius: 16, padding: 14,
    flexDirection: 'row', alignItems: 'center', gap: 12,
    borderLeftWidth: 4, borderLeftColor: TEAL,
    borderWidth: 1, borderColor: '#e8ecf0',
    elevation: 2, shadowColor: '#000', shadowOpacity: 0.04, shadowOffset: { width: 0, height: 2 }, shadowRadius: 6,
  },
  memberCoachAvatar: {
    width: 52, height: 52, borderRadius: 12, backgroundColor: '#e5e7eb',
    borderWidth: 2, borderColor: '#e0f2fe',
  },
  memberCoachName: { fontSize: 15, fontWeight: '800', color: '#0f172a', marginBottom: 4 },
  memberVenueMetaRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  memberVenueMeta: { fontSize: 12, color: '#6b7280' },

  memberUpdatedBlock: { alignItems: 'flex-end' },
  memberUpdatedLabel: { fontSize: 10, color: '#9ca3af', fontWeight: '600', letterSpacing: 0.5 },
  memberUpdatedTime: { fontSize: 16, fontWeight: '800', color: TEAL, marginTop: 2 },

  memberDealsHeader: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 4, paddingTop: 6, paddingBottom: 6,
  },
  memberDealsTitle: { fontSize: 14, fontWeight: '900', color: '#0f172a', letterSpacing: 0.3 },
  memberDealsHashtag: { fontSize: 11, color: TEAL, fontWeight: '600', marginTop: 2 },

  dealsAvatarStack: { flexDirection: 'row', alignItems: 'center' },
  dealsAvatarCircle: { width: 28, height: 28, borderRadius: 14, borderWidth: 2, borderColor: '#fff' },
  dealsAvatarCountBadge: {
    width: 28, height: 28, borderRadius: 14, backgroundColor: TEAL,
    alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#fff',
  },
  dealsAvatarCountText: { fontSize: 10, fontWeight: '800', color: '#fff' },

  exploreMoreRow: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: '#fff', borderRadius: 16, paddingHorizontal: 14, paddingVertical: 14,
    borderWidth: 1, borderColor: '#e2e8f0', marginVertical: 4,
    elevation: 1, shadowColor: '#000', shadowOpacity: 0.03, shadowOffset: { width: 0, height: 1 }, shadowRadius: 4,
  },
  exploreMoreText: { flex: 1, fontSize: 13, fontWeight: '700', color: TEAL },

  // ── PACKAGE CARD ─────────────────────────────────────────────
  packageCard: {
    marginHorizontal: 14, marginBottom: 12,
    backgroundColor: '#fff', borderRadius: 16,
    padding: 16, position: 'relative',
    borderWidth: 1, borderColor: '#e8ecf0',
    elevation: 1, shadowColor: '#000', shadowOpacity: 0.03, shadowOffset: { width: 0, height: 1 }, shadowRadius: 4,
  },

  bestValueRibbon: {
    position: 'absolute', top: -1, right: 16,
    backgroundColor: '#fbbf24',
    paddingHorizontal: 10, paddingVertical: 5,
    borderBottomLeftRadius: 8, borderBottomRightRadius: 8,
    zIndex: 10,
  },
  bestValueRibbonText: { fontSize: 10, fontWeight: '900', color: '#78350f', letterSpacing: 0.8 },

  packageTagRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    marginBottom: 10,
  },
  packageTagBadge: {
    backgroundColor: '#dbeafe', borderRadius: 6, paddingHorizontal: 10, paddingVertical: 4,
  },
  packageTagText: { fontSize: 11, fontWeight: '800', color: '#1d4ed8', letterSpacing: 0.5 },

  packageNumberBadge: {
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: TEAL, alignItems: 'center', justifyContent: 'center',
  },
  packageNumberText: { fontSize: 14, fontWeight: '900', color: '#fff' },

  packageTitle: { fontSize: 20, fontWeight: '800', color: '#0f172a', marginBottom: 12, lineHeight: 26 },

  packageExpiryRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 14 },
  packageExpiryText: { fontSize: 12, color: '#6b7280' },

  packageSpecsRow: { flexDirection: 'row', gap: 10, marginBottom: 18 },
  packageSpecChip: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#f8fafc', borderRadius: 12,
    paddingVertical: 12, paddingHorizontal: 8,
    borderWidth: 1, borderColor: '#e5e7eb', gap: 4,
  },
  packageSpecLabel: { fontSize: 9, color: '#9ca3af', fontWeight: '700', letterSpacing: 0.5, textAlign: 'center' },
  packageSpecValue: { fontSize: 13, color: '#0f172a', fontWeight: '800', textAlign: 'center' },

  packagePerksBlock: {
    backgroundColor: '#f0f9ff', borderRadius: 12,
    padding: 14, marginBottom: 18,
    borderWidth: 1, borderColor: '#bae6fd',
  },
  packagePerkRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  packagePerkIconWrap: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: '#e0f2fe', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  },
  packagePerkLabel: { fontSize: 9, color: '#0284c7', fontWeight: '900', letterSpacing: 0.8, marginBottom: 2 },
  packagePerkText: { fontSize: 12, color: '#1e3a5f', fontWeight: '600', lineHeight: 18 },

  packageDivider: { height: 1, backgroundColor: '#f3f4f6', marginBottom: 14 },

  packageFooter: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' },
  packageOriginalPrice: {
    fontSize: 12, color: '#9ca3af',
    textDecorationLine: 'line-through',
    marginBottom: 2,
  },
  packageTotalLabel: { fontSize: 10, color: '#9ca3af', fontWeight: '700', letterSpacing: 0.5 },
  packagePrice: { fontSize: 22, fontWeight: '900', color: '#f97316', marginTop: 1 },

  registerBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: TEAL, borderRadius: 12,
    paddingHorizontal: 20, paddingVertical: 13,
    elevation: 2, shadowColor: TEAL, shadowOpacity: 0.3, shadowOffset: { width: 0, height: 2 }, shadowRadius: 6,
  },
  registerBtnText: { fontSize: 13, fontWeight: '800', color: '#fff', letterSpacing: 0.5 },

  // ── PASS SÂN STYLES ──────────────────────────────────────────
  passSanHeaderRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    marginTop: 8, marginBottom: 6,
  },
  passSanHeaderTitle: { fontSize: 18, fontWeight: '800', color: '#0f172a' },
  passSanHeaderSub: { fontSize: 12, color: '#6b7280', marginTop: 2 },

  passSanCard: {
    backgroundColor: '#fff', borderRadius: 16, padding: 14, marginBottom: 14,
    elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 2 }, shadowRadius: 8,
  },
  passSanSellerRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
  passSanAvatarWrap: { position: 'relative' },
  passSanAvatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#e5e7eb' },
  onlineBadgeDot: {
    position: 'absolute', bottom: 1, right: 1,
    width: 12, height: 12, borderRadius: 6, backgroundColor: '#10b981',
    borderWidth: 2, borderColor: '#fff',
  },
  passSanNameRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  passSanSellerName: { fontSize: 15, fontWeight: '800', color: '#0f172a' },
  sellerRoleBadge: { backgroundColor: '#e0f2fe', borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2 },
  sellerRoleText: { fontSize: 9, fontWeight: '800', color: TEAL, letterSpacing: 0.5 },
  passSanRatingRow: { flexDirection: 'row', alignItems: 'center', gap: 3, marginTop: 2 },
  passSanRatingText: { fontSize: 12, fontWeight: '600', color: '#6b7280' },
  passSanTimeAgo: { fontSize: 11, fontWeight: '600' },

  passSanImageWrap: { height: 170, borderRadius: 12, overflow: 'hidden', position: 'relative', marginBottom: 12 },
  passSanImage: { width: '100%', height: '100%' },
  sportBadgeTag: {
    position: 'absolute', top: 10, left: 10,
    backgroundColor: '#0d9488', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 4,
  },
  sportBadgeTagText: { fontSize: 10, fontWeight: '800', color: '#fff', letterSpacing: 0.5 },
  discountBadgeTag: {
    position: 'absolute', bottom: 10, left: 10,
    backgroundColor: '#ef4444', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 4,
  },
  discountBadgeTagText: { fontSize: 11, fontWeight: '900', color: '#fff' },

  passSanBody: { gap: 8 },
  passSanTitle: { fontSize: 16, fontWeight: '800', color: '#0f172a' },
  passSanQuoteBox: {
    backgroundColor: '#f3f4f6', borderRadius: 10, padding: 10, marginVertical: 2,
  },
  passSanQuoteText: { fontSize: 12, color: '#4b5563', fontStyle: 'italic', lineHeight: 18 },
  passSanMetaRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  passSanMetaText: { fontSize: 12, color: '#4b5563', fontWeight: '500' },

  passSanPriceRow: { flexDirection: 'row', alignItems: 'baseline', gap: 8, marginTop: 4 },
  passSanOldPrice: { fontSize: 12, color: '#9ca3af', textDecorationLine: 'line-through' },
  passSanNewPrice: { fontSize: 20, fontWeight: '900', color: '#f59e0b' },

  passSanContactBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
    height: 42, borderRadius: 12, borderWidth: 1.5, borderColor: TEAL,
    backgroundColor: '#fff', marginTop: 6,
  },
  passSanContactBtnText: { fontSize: 14, fontWeight: '800', color: TEAL },

  // ── COMMUNITY BANNER ─────────────────────────────────────────
  communityBanner: {
    borderRadius: 24, padding: 20, marginVertical: 10, gap: 10,
  },
  communityTagRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  communityTagText: { fontSize: 11, fontWeight: '800', color: 'rgba(255,255,255,0.9)', letterSpacing: 1 },
  communityTitle: { fontSize: 24, fontWeight: '900', color: '#fff', lineHeight: 30 },
  communityDesc: { fontSize: 13, color: 'rgba(255,255,255,0.9)', lineHeight: 19 },
  communityBtn: {
    alignSelf: 'flex-start', borderRadius: 14, paddingHorizontal: 24, paddingVertical: 12,
    marginTop: 6, elevation: 3, shadowColor: '#000', shadowOpacity: 0.2, shadowOffset: { width: 0, height: 2 }, shadowRadius: 4,
  },
  communityBtnText: { fontSize: 14, fontWeight: '800', color: '#fff' },

  // ── FAB BUTTON ───────────────────────────────────────────────
  fabBtn: {
    position: 'absolute', bottom: 24, right: 20,
    width: 56, height: 56, borderRadius: 28,
    elevation: 6, shadowColor: TEAL, shadowOpacity: 0.4, shadowOffset: { width: 0, height: 4 }, shadowRadius: 8,
  },
  fabGradient: {
    width: '100%', height: '100%', borderRadius: 28,
    alignItems: 'center', justifyContent: 'center',
  },

  // ── SỰ KIỆN TAB STYLES ───────────────────────────────────────
  eventDatePickerBox: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12,
    marginVertical: 8, borderWidth: 1, borderColor: '#e2e8f0',
  },
  eventDatePickerLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  eventDatePickerText: { fontSize: 13, fontWeight: '700', color: '#1e293b' },

  eventVenueHeaderCard: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: '#fff', borderRadius: 16, padding: 12,
    borderWidth: 1, borderColor: '#e8ecf0',
    elevation: 1, shadowColor: '#000', shadowOpacity: 0.03, shadowOffset: { width: 0, height: 1 }, shadowRadius: 4,
  },
  eventVenueImage: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#e5e7eb' },
  eventVenueName: { fontSize: 15, fontWeight: '900', color: '#0f172a', marginBottom: 2 },
  eventVenueLocationRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 3 },
  eventVenueLocation: { fontSize: 11, color: '#6b7280', flex: 1, lineHeight: 15 },
  eventVenueDateBlock: { alignItems: 'flex-end' },
  eventVenueDateText: { fontSize: 11, fontWeight: '800', color: '#0284c7' },
  eventVenueTimeText: { fontSize: 11, color: '#9ca3af', fontWeight: '600', marginTop: 1 },

  // Event Card
  eventCard: {
    backgroundColor: '#fff', borderRadius: 16, padding: 14,
    borderLeftWidth: 4, borderLeftColor: '#10b981',
    borderWidth: 1, borderColor: '#e5e7eb',
    elevation: 2, shadowColor: '#000', shadowOpacity: 0.04, shadowOffset: { width: 0, height: 2 }, shadowRadius: 6,
    gap: 10,
  },
  eventTopRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  eventCodeTag: { fontSize: 13, fontWeight: '800', color: '#0f172a' },
  eventDateBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: '#e0f2fe', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 4,
  },
  eventDateText: { fontSize: 11, fontWeight: '800', color: '#0284c7' },

  eventMetaRow: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  eventMetaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  eventMetaText: { fontSize: 12, color: '#4b5563', fontWeight: '600' },

  eventSportCapsule: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: '#f0f9ff', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 8,
    borderWidth: 1, borderColor: '#e0f2fe',
  },
  eventSportLeft: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  eventSportName: { fontSize: 13, fontWeight: '700', color: TEAL },
  eventDuprBadge: { backgroundColor: TEAL, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  eventDuprText: { fontSize: 11, fontWeight: '800', color: '#fff' },

  eventFooterRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 6 },
  eventParticipantsBlock: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  eventAvatarsStack: { flexDirection: 'row', alignItems: 'center' },
  eventAvatarImg: { width: 28, height: 28, borderRadius: 14, borderWidth: 2, borderColor: '#fff' },
  eventParticipantsCount: { fontSize: 12 },
  eventParticipantsLabel: { fontSize: 9, color: '#9ca3af', fontWeight: '800', letterSpacing: 0.5 },

  eventParticipantsEmpty: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  eventEmptyAvatarIcon: {
    width: 32, height: 32, borderRadius: 16, backgroundColor: '#f3f4f6',
    alignItems: 'center', justifyContent: 'center',
  },

  eventActionRight: { alignItems: 'flex-end', gap: 4 },
  eventPrice: { fontSize: 15, fontWeight: '900', color: '#10b981' },
  eventDetailBtn: {
    backgroundColor: TEAL, borderRadius: 20, paddingHorizontal: 14, paddingVertical: 7,
  },
  eventDetailBtnText: { fontSize: 12, fontWeight: '800', color: '#fff' },
});

export default styles;
