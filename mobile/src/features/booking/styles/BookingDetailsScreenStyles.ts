import { StyleSheet, Platform, StatusBar } from 'react-native';

const TEAL = '#1989a8';

const BookingDetailsScreenStyles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
  },

  // ── Header ──────────────────────────────────────────────
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: TEAL,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 24) + 8 : 52,
    paddingBottom: 14,
    paddingHorizontal: 16,
  },
  backBtn: {
    marginRight: 14,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.2,
  },

  // ── Scroll ──────────────────────────────────────────────
  scroll: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  scrollContent: {
    padding: 16,
    gap: 16,
  },

  // ── Success Banner ──────────────────────────────────────
  successBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0fdf4',
    borderWidth: 1,
    borderColor: '#bbf7d0',
    borderRadius: 14,
    padding: 14,
    justifyContent: 'space-between',
    gap: 12,
  },
  successBannerLeft: {
    flexDirection: 'row',
    flex: 1,
    gap: 12,
  },
  successTextContainer: {
    flex: 1,
  },
  successTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#16a34a',
    marginBottom: 4,
  },
  successDesc: {
    fontSize: 13,
    color: '#15803d',
    lineHeight: 18,
  },
  rebookBtn: {
    borderWidth: 1,
    borderColor: '#16a34a',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#fff',
  },
  rebookBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#16a34a',
  },

  // ── Order Meta Info Card ───────────────────────────────
  metaCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  metaLabel: {
    fontSize: 12,
    color: '#94a3b8',
    marginBottom: 4,
  },
  metaValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1e293b',
  },

  // ── Section Cards ───────────────────────────────────────
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: TEAL,
    letterSpacing: 0.5,
  },

  // ── User Info Content ──────────────────────────────────
  userInfoContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e2e8f0',
    marginRight: 14,
  },
  userStats: {
    flex: 1,
  },
  userNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  userName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
  },
  youBadge: {
    backgroundColor: '#e0f2fe',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  youBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: TEAL,
  },
  userDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginVertical: 2,
  },
  userDetailText: {
    fontSize: 13,
    color: '#64748b',
  },

  // ── Venue Info Content ──────────────────────────────────
  venueContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  venueImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 14,
  },
  venueStats: {
    flex: 1,
  },
  venueNameText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1e293b',
    marginBottom: 4,
  },
  venueRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 6,
  },
  venueRatingText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#ea580c',
  },
  venueAddressRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
  },
  venueAddressText: {
    flex: 1,
    fontSize: 13,
    color: '#64748b',
    lineHeight: 18,
  },

  // ── Schedule Info Content ──────────────────────────────
  scheduleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
  },
  gridItem: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 16,
  },
  gridIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridLabelText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#94a3b8',
    marginBottom: 2,
    textTransform: 'uppercase',
  },
  gridValueText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1e293b',
  },

  // ── Payment Detail Content ──────────────────────────────
  paymentDetails: {
    padding: 16,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  priceLabel: {
    fontSize: 14,
    color: '#64748b',
  },
  priceValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1e293b',
  },
  priceDivider: {
    height: 1,
    backgroundColor: '#f1f5f9',
    marginVertical: 12,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1e293b',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#16a34a',
  },
  methodBadgeBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0fdf4',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  methodBadgeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  methodBadgeLeftText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#15803d',
  },
  methodValueText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#15803d',
  },

  // ── Rules Detail Content ────────────────────────────────
  rulesContent: {
    padding: 16,
    gap: 10,
  },
  ruleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  ruleText: {
    flex: 1,
    fontSize: 13,
    color: '#475569',
    lineHeight: 18,
  },

  // ── Bottom Action Row ───────────────────────────────────
  bottomActions: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    backgroundColor: '#fff',
  },
  cancelBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: TEAL,
    borderRadius: 12,
    paddingVertical: 14,
    gap: 6,
  },
  cancelBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: TEAL,
  },
  contactBtn: {
    flex: 1.2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: TEAL,
    borderRadius: 12,
    paddingVertical: 14,
    gap: 6,
  },
  contactBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
  },
});

export default BookingDetailsScreenStyles;
