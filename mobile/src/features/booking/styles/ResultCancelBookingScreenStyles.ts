import { StyleSheet, Platform, StatusBar } from 'react-native';

const TEAL = '#1989a8';
const GREEN = '#22c55e';

const ResultCancelBookingScreenStyles = StyleSheet.create({
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
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 32,
  },

  // ── Success Header ───────────────────────────────────────
  successHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  checkCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: GREEN,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: GREEN,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 4,
  },
  successTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: GREEN,
    marginBottom: 8,
    textAlign: 'center',
  },
  successSubtitle: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 20,
  },

  // ── Venue Card ───────────────────────────────────────────
  venueCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  courtImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
  },
  venueDetails: {
    flex: 1,
    marginLeft: 14,
    justifyContent: 'center',
  },
  venueNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  venueName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1e293b',
    flex: 1,
    marginRight: 8,
  },
  courtBadge: {
    backgroundColor: '#eff6ff',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#dbeafe',
  },
  courtBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2563eb',
  },
  infoLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  orderCodeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 6,
  },
  orderCodeValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#334155',
  },
  timeValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
    marginTop: 2,
  },

  // ── Two Columns Row ──────────────────────────────────────
  infoRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  halfCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    minHeight: 100,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  halfCardLabel: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '500',
    marginBottom: 8,
  },
  refundValue: {
    fontSize: 20,
    fontWeight: '800',
    color: GREEN,
  },
  momoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  momoLogo: {
    width: 20,
    height: 20,
    borderRadius: 4,
    backgroundColor: '#a50064',
    alignItems: 'center',
    justifyContent: 'center',
  },
  momoLogoText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  methodText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1e293b',
  },
  methodSub: {
    fontSize: 11,
    color: '#94a3b8',
    lineHeight: 15,
  },

  // ── Status Card ──────────────────────────────────────────
  statusCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  statusCardTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1e293b',
    marginBottom: 20,
  },

  // Timeline Step
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  timelineLeft: {
    alignItems: 'center',
    width: 24,
  },
  timelineCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: GREEN,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  timelineLine: {
    width: 2,
    height: 38,
    backgroundColor: GREEN,
    marginVertical: 2,
  },
  timelineContent: {
    flex: 1,
    marginLeft: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 22,
  },
  timelineTextLeft: {
    flex: 1,
    paddingRight: 8,
  },
  timelineLabel: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#1e293b',
  },
  timelineSub: {
    fontSize: 11,
    color: '#94a3b8',
    marginTop: 2,
  },
  timelineTime: {
    fontSize: 11,
    color: '#94a3b8',
    fontWeight: '500',
    textAlign: 'right',
  },

  // ── Footer ───────────────────────────────────────────────
  footer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    gap: 12,
  },
  primaryBtn: {
    backgroundColor: TEAL,
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: TEAL,
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  primaryBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryBtn: {
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  secondaryBtnText: {
    color: '#475569',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default ResultCancelBookingScreenStyles;
