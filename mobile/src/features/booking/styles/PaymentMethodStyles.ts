import { StyleSheet, Platform, StatusBar } from 'react-native';

const TEAL = '#1989a8';

const PaymentMethodStyles = StyleSheet.create({
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
    paddingHorizontal: 16,
    paddingVertical: 14,
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
    padding: 20,
  },

  // ── QR Card ─────────────────────────────────────────────
  qrCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 20,
  },
  qrLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#64748b',
    letterSpacing: 1.5,
    marginBottom: 16,
  },
  qrBorderBox: {
    padding: 16,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#cbd5e1',
    borderRadius: 14,
    marginBottom: 16,
  },
  qrInnerContainer: {
    width: 180,
    height: 180,
    backgroundColor: '#f8fafc',
    borderRadius: 10,
    padding: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  qrCodeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 4,
  },
  vietQrText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0d3b66',
  },
  qrColorText: {
    color: '#e07a5f',
  },
  mbText: {
    fontSize: 13,
    fontWeight: '900',
    color: '#1a8aa9',
  },
  qrPatternBox: {
    width: 100,
    height: 100,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrCornerTopLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 24,
    height: 24,
    borderWidth: 6,
    borderColor: '#0d3b66',
  },
  qrCornerTopRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 24,
    height: 24,
    borderWidth: 6,
    borderColor: '#0d3b66',
  },
  qrCornerBottomLeft: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 24,
    height: 24,
    borderWidth: 6,
    borderColor: '#0d3b66',
  },
  qrCenterLogo: {
    width: 22,
    height: 22,
    backgroundColor: '#1a8aa9',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  qrCenterLogoText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: '900',
  },
  qrGridLineRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 2,
    gap: 4,
  },
  qrBlockActive: {
    width: 10,
    height: 10,
    backgroundColor: '#0d3b66',
  },
  qrBlockSpacer: {
    width: 10,
    height: 10,
  },
  qrCodeFooter: {
    width: '100%',
    alignItems: 'center',
  },
  napasText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748b',
  },
  napasAccent: {
    color: '#e07a5f',
  },
  amountText: {
    fontSize: 24,
    fontWeight: '800',
    color: TEAL,
    marginBottom: 6,
  },
  subtitleText: {
    fontSize: 12,
    color: '#64748b',
  },

  // ── Details Card ─────────────────────────────────────────
  detailsCard: {
    backgroundColor: '#eef6f9',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  detailLabel: {
    fontSize: 13,
    color: '#64748b',
    marginBottom: 2,
  },
  detailValueBold: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1e293b',
  },
  detailValueBig: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1e293b',
  },
  copyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(25, 137, 168, 0.1)',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    gap: 4,
  },
  copyBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: TEAL,
  },
  rowDivider: {
    height: 1,
    backgroundColor: '#e2e8f0',
  },

  // ── Upload Section ───────────────────────────────────────
  uploadSection: {
    marginBottom: 24,
  },
  uploadTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 12,
  },
  uploadBox: {
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#cbd5e1',
    borderRadius: 14,
    backgroundColor: '#f8fafc',
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  uploadBoxActive: {
    borderColor: '#16a34a',
    backgroundColor: '#f0fdf4',
  },
  uploadPlaceholder: {
    alignItems: 'center',
  },
  uploadIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(25, 137, 168, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  uploadActionText: {
    fontSize: 13,
    fontWeight: '600',
    color: TEAL,
    marginBottom: 4,
    textAlign: 'center',
  },
  uploadInfoText: {
    fontSize: 11,
    color: '#64748b',
  },
  uploadedContent: {
    alignItems: 'center',
  },
  uploadedFileName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#16a34a',
    marginTop: 6,
  },
  uploadedSubText: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 2,
  },
  infoRow: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 6,
    paddingHorizontal: 4,
  },
  infoText: {
    fontSize: 12,
    color: '#64748b',
    fontStyle: 'italic',
    flex: 1,
  },

  // ── Confirm Button ───────────────────────────────────────
  confirmBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: TEAL,
    borderRadius: 12,
    paddingVertical: 14,
    shadowColor: TEAL,
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  confirmBtnDisabled: {
    opacity: 0.6,
  },
  confirmBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },

  // ── Image Preview ────────────────────────────────────────
  previewContainer: {
    borderRadius: 14,
    overflow: 'hidden',
    height: 200,
    marginBottom: 0,
    position: 'relative',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  previewOverlay: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    flexDirection: 'row',
    gap: 8,
  },
  previewChangeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(25, 137, 168, 0.85)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 5,
  },
  previewChangeBtnText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  previewDeleteBtn: {
    backgroundColor: 'rgba(220, 38, 38, 0.85)',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(22, 163, 74, 0.9)',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    gap: 5,
  },
  successBadgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },

  // ── Android Picker Modal (Bottom Sheet) ──────────────────
  pickerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },
  pickerSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingTop: 12,
    paddingBottom: 32,
    paddingHorizontal: 20,
  },
  pickerHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#e2e8f0',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  pickerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 20,
    textAlign: 'center',
  },
  pickerOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 14,
  },
  pickerOptionIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerOptionText: {
    flex: 1,
  },
  pickerOptionLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1e293b',
  },
  pickerOptionDesc: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  pickerDivider: {
    height: 1,
    backgroundColor: '#f1f5f9',
    marginVertical: 4,
  },
  pickerCancelBtn: {
    marginTop: 16,
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  pickerCancelText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#64748b',
  },
});

export default PaymentMethodStyles;
