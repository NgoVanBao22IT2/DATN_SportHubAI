import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  // ==========================================
  // CONTAINER
  // ==========================================
  container: {
    flex: 1,
    backgroundColor: '#fbf9f8',
  },

  // ==========================================
  // HEADER
  // ==========================================
  header: {
    backgroundColor: '#1989a8',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    paddingTop: Platform.OS === 'ios' ? 54 : 14,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    overflow: 'hidden',
  },
  backButton: {
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '400',
    color: '#ffffff',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },

  // ==========================================
  // SCROLL CONTENT
  // ==========================================
  scrollContent: {
    padding: 16,
    gap: 16,
    paddingBottom: 40,
    alignItems: 'center',
  },

  // ==========================================
  // SECTION CARD (Card chung cho các section)
  // ==========================================
  sectionCard: {
    backgroundColor: 'rgba(25, 137, 168, 0.20)',
    borderRadius: 12,
    padding: 24,
    alignSelf: 'stretch',
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },

  // Section header (icon + title)
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    alignSelf: 'stretch',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '400',
    color: '#1b1c1c',
    lineHeight: 28,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },

  // ==========================================
  // VENUE INFO (Card 1)
  // ==========================================
  venueName: {
    fontSize: 12,
    color: '#1989a8',
    lineHeight: 16,
    alignSelf: 'stretch',
  },
  venueAddress: {
    fontSize: 14,
    color: '#41493e',
    lineHeight: 20,
    alignSelf: 'stretch',
    marginTop: 4,
  },

  // ==========================================
  // BOOKING INFO ROWS (Card 2)
  // ==========================================
  infoRowsContainer: {
    gap: 0,
    alignSelf: 'stretch',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#feae2c',
    marginBottom: 8,
  },
  infoRowLast: {
    borderBottomWidth: 0,
    paddingBottom: 0,
    marginBottom: 0,
  },
  infoRowNoBorder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#feae2c',
  },
  infoLabel: {
    fontSize: 14,
    color: '#41493e',
    lineHeight: 20,
  },
  infoValue: {
    fontSize: 12,
    color: '#1989a8',
    lineHeight: 16,
    textAlign: 'right',
    maxWidth: '55%',
  },
  infoValueLarge: {
    fontSize: 20,
    fontWeight: '400',
    color: '#feae2c',
    lineHeight: 28,
  },
  infoLabelLarge: {
    fontSize: 20,
    fontWeight: '400',
    color: '#1b1c1c',
    lineHeight: 28,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
  },

  // Pill tag (Đối tượng)
  pill: {
    backgroundColor: '#e5eae3',
    borderRadius: 9999,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  pillText: {
    fontSize: 12,
    color: '#1b1c1c',
    lineHeight: 16,
  },

  // ==========================================
  // PROMO CARD (Card xanh lá)
  // ==========================================
  promoCard: {
    backgroundColor: 'rgba(27, 94, 32, 0.10)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(27, 94, 32, 0.20)',
    padding: 24,
    alignSelf: 'stretch',
    gap: 16,
    alignItems: 'center',
  },
  promoText: {
    fontSize: 14,
    color: '#1b5e20',
    lineHeight: 20,
    textAlign: 'center',
  },
  promoButtonRow: {
    flexDirection: 'row',
    gap: 12,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  promoButtonLogin: {
    flex: 1,
    backgroundColor: '#feae2c',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  promoButtonLoginText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6b4500',
    lineHeight: 16,
    letterSpacing: 0.5,
  },
  promoButtonRegister: {
    flex: 1,
    backgroundColor: '#1b5e20',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  promoButtonRegisterText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ffffff',
    lineHeight: 16,
    letterSpacing: 0.5,
  },

  // ==========================================
  // FORM SECTION (Card Thông tin người đặt)
  // ==========================================
  formCard: {
    backgroundColor: 'rgba(25, 137, 168, 0.20)',
    borderRadius: 12,
    padding: 24,
    alignSelf: 'stretch',
    gap: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },
  formHeading: {
    paddingLeft: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#feae2c',
  },
  formHeadingText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#41493e',
    lineHeight: 16,
    letterSpacing: 0.5,
  },
  formField: {
    gap: 8,
    alignSelf: 'stretch',
  },
  formLabel: {
    fontSize: 12,
    color: '#64748b',
    lineHeight: 16,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  formInput: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: '#1b1c1c',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  phoneRow: {
    flexDirection: 'row',
    gap: 8,
    alignSelf: 'stretch',
  },
  phonePrefixBox: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    paddingHorizontal: 14,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  phonePrefixText: {
    fontSize: 14,
    color: '#475569',
    fontWeight: '500',
  },
  phoneInput: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: '#1b1c1c',
  },
  noteInput: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 12,
    fontSize: 14,
    color: '#1b1c1c',
    minHeight: 80,
    textAlignVertical: 'top',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },

  // ==========================================
  // PAYMENT AMOUNT BLOCK
  // ==========================================
  paymentBlock: {
    backgroundColor: '#1989a8',
    borderRadius: 12,
    padding: 20,
    alignSelf: 'stretch',
    alignItems: 'center',
    gap: 6,
  },
  paymentLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.80)',
    letterSpacing: 1,
    fontWeight: '600',
    textAlign: 'center',
  },
  paymentAmount: {
    fontSize: 32,
    fontWeight: '800',
    color: '#ffffff',
    lineHeight: 40,
  },

  // ==========================================
  // WARNING BAR
  // ==========================================
  warningBar: {
    backgroundColor: 'rgba(254, 174, 44, 0.18)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(254, 174, 44, 0.35)',
    padding: 12,
    flexDirection: 'row',
    gap: 10,
    alignSelf: 'stretch',
  },
  warningText: {
    flex: 1,
    fontSize: 13,
    color: '#92400e',
    lineHeight: 20,
  },
  warningBold: {
    fontWeight: '700',
    color: '#78350f',
  },

  // ==========================================
  // TERMS TEXT
  // ==========================================
  termsText: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 18,
    alignSelf: 'stretch',
  },
  termsLink: {
    color: '#1989a8',
    textDecorationLine: 'underline',
    fontWeight: '500',
  },

  // ==========================================
  // CONFIRM BUTTON
  // ==========================================
  confirmButton: {
    backgroundColor: '#feae2c',
    height: 52,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    alignSelf: 'stretch',
    shadowColor: '#feae2c',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.30,
    shadowRadius: 8,
    elevation: 4,
  },
  confirmButtonText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: 0.5,
  },

  // ==========================================
  // MAP LINK
  // ==========================================
  mapLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
  },
  mapLinkText: {
    fontSize: 13,
    color: '#1989a8',
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
});

export default styles;
