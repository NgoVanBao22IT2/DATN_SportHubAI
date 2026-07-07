import { StyleSheet, Platform, StatusBar } from 'react-native';

const TEAL = '#1989a8';
const GREEN = '#22c55e';
const RED = '#dc2626';
const ORANGE = '#ea580c';

const HistoryBookingScreenStyles = StyleSheet.create({
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

  // ── Search & Filters ────────────────────────────────────
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 8,
    backgroundColor: '#fff',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 20,
    paddingHorizontal: 14,
    height: 40,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#1e293b',
    paddingVertical: 0,
  },
  filterScrollView: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: '#fff',
  },
  filterScrollContent: {
    gap: 8,
    paddingRight: 16,
  },
  filterPill: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    backgroundColor: '#fff',
  },
  filterPillActive: {
    borderColor: TEAL,
    backgroundColor: '#eef6f9',
  },
  filterPillText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748b',
  },
  filterPillTextActive: {
    color: TEAL,
    fontWeight: '700',
  },

  // ── List & Cards ────────────────────────────────────────
  scroll: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollContent: {
    padding: 16,
    gap: 16,
  },

  // Card styles
  bookingCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.02,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  cardMain: {
    flexDirection: 'row',
    padding: 14,
  },
  venueImage: {
    width: 74,
    height: 74,
    borderRadius: 12,
    backgroundColor: '#e2e8f0',
  },
  cardDetails: {
    flex: 1,
    marginLeft: 12,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  venueTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1e293b',
    flex: 1,
    marginRight: 6,
  },
  chevronIcon: {
    marginTop: -2,
  },
  badgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  courtBadge: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  courtBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#475569',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  // Status colors
  statusUpcoming: {
    backgroundColor: '#e0f2fe',
  },
  statusUpcomingText: {
    color: '#0369a1',
  },
  statusCompleted: {
    backgroundColor: '#dcfce7',
  },
  statusCompletedText: {
    color: '#15803d',
  },
  statusCancelled: {
    backgroundColor: '#fee2e2',
  },
  statusCancelledText: {
    color: '#b91c1c',
  },
  statusCancelledOwner: {
    backgroundColor: '#ffedd5',
  },
  statusCancelledOwnerText: {
    color: '#c2410c',
  },

  // Date & Time rows
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  infoText: {
    fontSize: 12.5,
    color: '#64748b',
    fontWeight: '500',
  },
  timePriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  priceText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1e293b',
  },

  // Cancelled price styling
  cancelledPriceCol: {
    alignItems: 'flex-end',
  },
  originalPriceStrikethrough: {
    fontSize: 11,
    color: '#94a3b8',
    textDecorationLine: 'line-through',
    marginBottom: 1,
  },
  refundPriceText: {
    fontSize: 15,
    fontWeight: '800',
    color: RED,
  },
  refundPriceOwnerText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#c2410c',
  },

  // Action Buttons Row (Upcoming state)
  cardActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    height: 48,
  },
  actionBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionBtnDivider: {
    borderRightWidth: 1,
    borderRightColor: '#f1f5f9',
  },
  actionText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#475569',
  },
  actionTextDanger: {
    fontSize: 13,
    fontWeight: '700',
    color: RED,
  },

  // Refund Banner (Cancelled state)
  refundBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 10,
  },
  refundIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fee2e2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  refundIconCircleOwner: {
    backgroundColor: '#ffedd5',
  },
  refundBannerContent: {
    flex: 1,
  },
  refundBannerTitle: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#334155',
  },
  refundBannerSub: {
    fontSize: 11,
    color: '#94a3b8',
    marginTop: 1,
  },

  // ── Info Footnote ────────────────────────────────────────
  footnote: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 16,
    gap: 6,
  },
  footnoteText: {
    fontSize: 12,
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 18,
    flex: 1,
  },

  // ── Empty State ──────────────────────────────────────────
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 14,
    color: '#94a3b8',
    marginTop: 8,
    textAlign: 'center',
  },
});

export default HistoryBookingScreenStyles;
