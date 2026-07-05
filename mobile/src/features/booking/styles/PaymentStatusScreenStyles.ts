import { StyleSheet, Platform, StatusBar } from 'react-native';

const TEAL = '#1989a8';

const PaymentStatusScreenStyles = StyleSheet.create({
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
    padding: 24,
    alignItems: 'center',
  },

  // ── Status Circle & Header Text ──────────────────────────
  statusContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  statusCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#ffedd5', // light orange
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#f97316',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
  },
  statusTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1e293b',
    marginBottom: 10,
    textAlign: 'center',
  },
  statusDesc: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 16,
  },

  // ── Booking Details Card ─────────────────────────────────
  detailsCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginVertical: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    position: 'relative',
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  cardLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#94a3b8',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  venueName: {
    fontSize: 20,
    fontWeight: '800',
    color: TEAL,
    letterSpacing: 0.3,
  },
  orderCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  orderCodeText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1e293b',
  },
  timeText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1e293b',
  },
  dateText: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  courtText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1e293b',
  },

  // Dotted line separator
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 14,
    width: '100%',
    overflow: 'hidden',
  },
  dottedLine: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    borderStyle: 'dashed',
    borderRadius: 1,
    height: 0,
  },
  cardCircleLeft: {
    position: 'absolute',
    left: -10,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#f8fafc',
    zIndex: 5,
  },
  cardCircleRight: {
    position: 'absolute',
    right: -10,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#f8fafc',
    zIndex: 5,
  },

  // Bottom part of details card
  cardFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalAmountText: {
    fontSize: 22,
    fontWeight: '800',
    color: TEAL,
  },
  waitingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffedd5',
    borderWidth: 1,
    borderColor: '#fed7aa',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
    gap: 4,
  },
  waitingBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#c2410c',
  },

  // ── "Trong lúc chờ đợi..." Section ───────────────────────
  waitingSection: {
    width: '100%',
    marginTop: 10,
    marginBottom: 24,
  },
  sectionHeading: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 12,
    textAlign: 'left',
  },
  groupCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eef6f9',
    borderRadius: 14,
    padding: 14,
    gap: 12,
  },
  groupIconBox: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: 'rgba(25, 137, 168, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupText: {
    flex: 1,
    fontSize: 13.5,
    fontWeight: '500',
    color: '#334155',
    lineHeight: 18,
  },
  groupArrowBox: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },

  // ── Footer Button ────────────────────────────────────────
  footerButton: {
    width: '100%',
    backgroundColor: TEAL,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: TEAL,
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  footerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },

  // ── Success State Styles ─────────────────────────────────
  statusCircleSuccess: {
    backgroundColor: '#dcfce7', // light green
    shadowColor: '#22c55e',
  },
  statusTitleSuccess: {
    color: '#22c55e',
  },
  paidBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0fdf4',
    borderWidth: 1,
    borderColor: '#bbf7d0',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
    gap: 4,
  },
  paidBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#16a34a',
  },
  successActionsContainer: {
    width: '100%',
    gap: 12,
    marginTop: 10,
    marginBottom: 20,
  },
  btnSecondary: {
    backgroundColor: '#f1f5f9',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowOpacity: 0,
    elevation: 0,
  },
  btnSecondaryText: {
    color: '#334155',
  },
  btnWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});

export default PaymentStatusScreenStyles;
