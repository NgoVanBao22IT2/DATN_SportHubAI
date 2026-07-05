import { StyleSheet, Platform, StatusBar } from 'react-native';

const TEAL = '#1989a8';
const ORANGE = '#f97316';

const ConfirmCancelBookingScreenStyles = StyleSheet.create({
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
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingVertical: 32,
    alignItems: 'center',
  },

  // ── Warning Icon ─────────────────────────────────────────
  iconWrapper: {
    alignItems: 'center',
    marginBottom: 24,
  },
  iconCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#fff5f0',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ── Title & Refund Amount ────────────────────────────────
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 12,
  },
  refundLabel: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 4,
  },
  refundAmount: {
    fontSize: 38,
    fontWeight: '800',
    color: ORANGE,
    textAlign: 'center',
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  refundSub: {
    fontSize: 13,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 28,
  },

  // ── Time Card ────────────────────────────────────────────
  timeCard: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16,
  },
  timeCardLeft: {
    gap: 4,
  },
  timeCardCaption: {
    fontSize: 12,
    color: '#94a3b8',
  },
  timeCardValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
  },

  // ── Note Card ────────────────────────────────────────────
  noteCard: {
    width: '100%',
    backgroundColor: '#eff6ff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  noteText: {
    fontSize: 14,
    color: '#1e40af',
    lineHeight: 22,
  },
  noteBold: {
    fontWeight: '700',
  },

  // ── Checkbox Row ─────────────────────────────────────────
  checkRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#cbd5e1',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  checkboxChecked: {
    backgroundColor: TEAL,
    borderColor: TEAL,
  },
  checkText: {
    flex: 1,
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
  },
  policyLink: {
    color: TEAL,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },

  // ── Footer ───────────────────────────────────────────────
  footer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    gap: 10,
  },
  confirmBtn: {
    backgroundColor: '#dc2626',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#dc2626',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  confirmBtnDisabled: {
    backgroundColor: '#fca5a5',
    shadowOpacity: 0,
    elevation: 0,
  },
  confirmBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  backBtnFooter: {
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  backBtnFooterText: {
    color: '#475569',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ConfirmCancelBookingScreenStyles;
