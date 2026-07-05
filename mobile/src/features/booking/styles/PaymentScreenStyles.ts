import { StyleSheet, Platform, StatusBar } from 'react-native';

const TEAL = '#1989a8';

const PaymentScreenStyles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#eef2f5',
  },

  // ── Header ──────────────────────────────────────────────
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: TEAL,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 24) + 8 : 52,
    paddingBottom: 16,
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
  },
  scrollContent: {
    padding: 16,
  },

  // ── Summary Card ────────────────────────────────────────
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 18,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  summaryTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  summaryVenueLabel: {
    fontSize: 12,
    color: '#888',
    fontWeight: '600',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  statusBadge: {
    backgroundColor: TEAL,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 4,
  },
  statusBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  summaryVenueName: {
    fontSize: 22,
    fontWeight: '800',
    color: TEAL,
    marginBottom: 12,
    letterSpacing: 0.3,
  },
  summaryInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 7,
  },
  summaryInfoText: {
    fontSize: 14,
    color: '#444',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#e8edf0',
    marginVertical: 14,
  },
  summaryTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryTotalLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  summaryTotalAmount: {
    fontSize: 22,
    fontWeight: '800',
    color: TEAL,
    letterSpacing: 0.2,
  },
  discountAppliedRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  discountAppliedLabel: {
    fontSize: 13,
    color: '#888',
  },
  discountAppliedValue: {
    fontSize: 13,
    color: '#16a34a',
    fontWeight: '700',
  },

  // ── Section Title ────────────────────────────────────────
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 12,
  },

  // ── Payment Method Card ──────────────────────────────────
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#dde3e8',
    padding: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 1,
  },
  methodCardActive: {
    borderColor: TEAL,
    backgroundColor: '#f0f9fc',
  },
  methodIconBox: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#e8f4f8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  momoIconBox: {
    backgroundColor: '#a50064',
  },
  momoLogoText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '800',
    textAlign: 'center',
    lineHeight: 12,
    letterSpacing: 0.5,
  },
  methodTextBlock: {
    flex: 1,
  },
  methodName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  methodDesc: {
    fontSize: 12,
    color: '#777',
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#bbb',
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterActive: {
    backgroundColor: TEAL,
    borderColor: TEAL,
  },

  // ── Discount ─────────────────────────────────────────────
  discountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#bdd0d8',
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginTop: 10,
    gap: 10,
  },
  discountRowText: {
    flex: 1,
    fontSize: 14,
    color: '#444',
    fontWeight: '500',
  },
  discountInputRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: TEAL,
    overflow: 'hidden',
    marginTop: 10,
  },
  discountInput: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: '#333',
  },
  discountApplyBtn: {
    backgroundColor: TEAL,
    paddingHorizontal: 18,
    justifyContent: 'center',
  },
  discountApplyText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 13,
  },

  // ── Footer ───────────────────────────────────────────────
  footer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: Platform.OS === 'ios' ? 32 : 20,
    borderTopWidth: 1,
    borderTopColor: '#e8edf0',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 8,
    elevation: 8,
  },
  continueBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: TEAL,
    borderRadius: 14,
    paddingVertical: 16,
    marginBottom: 12,
    shadowColor: TEAL,
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  continueBtnDisabled: {
    opacity: 0.6,
  },
  continueBtnText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  termsText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#888',
    lineHeight: 18,
  },
  termsLink: {
    color: TEAL,
    fontWeight: '600',
  },
});

export default PaymentScreenStyles;
