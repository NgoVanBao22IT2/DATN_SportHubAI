import { StyleSheet, Platform, StatusBar } from 'react-native';

const TEAL = '#1989a8';

const CancelBookingScreenStyles = StyleSheet.create({
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
    backgroundColor: '#f8fafc',
  },
  scrollContent: {
    padding: 16,
    gap: 16,
  },

  // ── Sân Booking Info Card ───────────────────────────────
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
    position: 'relative',
    alignItems: 'center',
  },
  courtImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 14,
  },
  cardRight: {
    flex: 1,
    height: 80,
    justifyContent: 'space-between',
  },
  cardTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  courtName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1e293b',
    flex: 1,
    marginRight: 8,
  },
  courtBadge: {
    backgroundColor: '#eff6ff',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  courtBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#3b82f6',
  },
  cardDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  cardDateText: {
    fontSize: 13,
    color: '#64748b',
  },
  cardStatusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paidBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0fdf4',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
    gap: 4,
  },
  paidBadgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#22c55e',
  },
  paidBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#16a34a',
  },
  priceText: {
    fontSize: 16,
    fontWeight: '800',
    color: TEAL,
  },

  // ── Refund Policy Card ──────────────────────────────────
  policyCard: {
    backgroundColor: '#fff7ed',
    borderWidth: 1,
    borderColor: '#ffedd5',
    borderRadius: 14,
    padding: 16,
  },
  policyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  policyHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  policyTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#ea580c',
  },
  policySubtitle: {
    fontSize: 13,
    color: '#7c2d12',
    lineHeight: 18,
    marginBottom: 12,
  },
  policyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  policyRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  policyRowText: {
    fontSize: 13,
    color: '#7c2d12',
  },
  policyRefundRate: {
    fontSize: 13,
    fontWeight: '800',
    color: '#ea580c',
  },

  // ── Calculation Card ────────────────────────────────────
  calcCard: {
    backgroundColor: '#f0f6fa',
    borderRadius: 14,
    padding: 16,
    gap: 12,
  },
  calcHeading: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1e293b',
    marginBottom: 4,
  },
  calcRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  calcLabel: {
    fontSize: 13.5,
    color: '#475569',
  },
  calcValueBold: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1e293b',
  },
  rateBadge: {
    backgroundColor: '#ffedd5',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  rateBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ea580c',
  },
  calcDivider: {
    height: 1,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderStyle: 'dashed',
    borderRadius: 1,
    marginVertical: 4,
  },
  refundLabel: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1e293b',
  },
  refundValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#16a34a',
  },
  feeLabel: {
    fontSize: 12,
    color: '#64748b',
  },
  feeValue: {
    fontSize: 12.5,
    fontWeight: '600',
    color: '#64748b',
  },

  // ── Lý do hủy Section ───────────────────────────────────
  reasonsSection: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1e293b',
  },
  sectionTitleSub: {
    fontSize: 13,
    fontWeight: '400',
    color: '#64748b',
  },
  reasonsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  reasonBtn: {
    width: '48%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reasonBtnActive: {
    backgroundColor: '#f0f9ff',
    borderColor: '#0284c7',
  },
  reasonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#475569',
  },
  reasonTextActive: {
    color: '#0284c7',
    fontWeight: '700',
  },

  // ── Bottom Fixed Button ─────────────────────────────────
  footerContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    alignItems: 'center',
    gap: 8,
  },
  cancelSubmitBtn: {
    width: '100%',
    backgroundColor: '#dc2626',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#dc2626',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  cancelSubmitBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  privacyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  privacyText: {
    fontSize: 11,
    color: '#94a3b8',
  },
});

export default CancelBookingScreenStyles;
