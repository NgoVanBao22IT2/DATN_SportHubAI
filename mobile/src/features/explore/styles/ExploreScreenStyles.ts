import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f9f9',
  },
  // ==========================
  // HEADER
  // ==========================
  header: {
    backgroundColor: '#1989a8',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    paddingTop: Platform.OS === 'ios' ? 54 : 14,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
  },
  avatarContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.6)',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },

  // ==========================
  // SUB-TABS
  // ==========================
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
    position: 'relative',
  },
  tabLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#717a6d',
  },
  activeTabLabel: {
    color: '#1989a8',
    fontWeight: '700',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    left: '10%',
    right: '10%',
    height: 3,
    backgroundColor: '#1989a8',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },

  // ==========================
  // FORM & CARD
  // ==========================
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  formCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 16,
  },

  // Section titles
  fieldLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 8,
  },

  // ==========================
  // SPORT SELECTOR
  // ==========================
  sportScroll: {
    marginBottom: 20,
  },
  sportScrollContent: {
    gap: 10,
    paddingRight: 10,
  },
  sportItem: {
    width: 90,
    height: 90,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  sportItemSelected: {
    borderColor: '#1989a8',
    backgroundColor: '#f0f9ff',
  },
  sportText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1e293b',
  },
  sportTextSelected: {
    color: '#1989a8',
  },

  // ==========================
  // DATE TIME GRID
  // ==========================
  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  col: {
    flex: 1,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 12,
    paddingHorizontal: 12,
    gap: 8,
  },
  inputText: {
    fontSize: 14,
    color: '#1e293b',
    flex: 1,
  },
  placeholderText: {
    fontSize: 14,
    color: '#94a3b8',
    flex: 1,
  },

  // ==========================
  // GENERAL INPUTS
  // ==========================
  inputGroup: {
    marginBottom: 16,
  },
  textInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 12,
    paddingHorizontal: 12,
    fontSize: 14,
    color: '#1e293b',
  },
  textArea: {
    height: 100,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingTop: 12,
    fontSize: 14,
    color: '#1e293b',
    textAlignVertical: 'top',
  },

  // Dropdown Skill
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 12,
    paddingHorizontal: 12,
  },

  // ==========================
  // STEPPER COUNTER
  // ==========================
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  stepperButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepperValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },

  // ==========================
  // COST INPUT
  // ==========================
  costContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  costInput: {
    flex: 1,
    fontSize: 14,
    color: '#1e293b',
    height: '100%',
  },
  currencyText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1989a8',
    marginLeft: 8,
  },

  // ==========================
  // SUBMIT BUTTON
  // ==========================
  submitButton: {
    backgroundColor: '#1989a8',
    height: 52,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },

  // ==========================
  // INFO BOX
  // ==========================
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#f0f9ff',
    borderWidth: 1,
    borderColor: '#bae6fd',
    borderRadius: 12,
    padding: 12,
    gap: 10,
  },
  infoText: {
    fontSize: 13,
    color: '#0369a1',
    flex: 1,
    lineHeight: 18,
  },
  boldInfoText: {
    fontWeight: '700',
    color: '#0369a1',
  },

  // ==========================================
  // AI SEARCH TAB STYLE
  // ==========================================
  aiSearchContainer: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  aiSearchCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    margin: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  aiSearchTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 10,
  },
  aiSearchBadge: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#e0f2fe',
    justifyContent: 'center',
    alignItems: 'center',
  },
  aiSearchTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
    flex: 1,
    lineHeight: 24,
  },
  aiSearchSubtitle: {
    fontSize: 13,
    color: '#64748b',
    lineHeight: 18,
    marginBottom: 16,
  },
  aiSearchInputContainer: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 14,
    backgroundColor: '#f8fafc',
    padding: 12,
    position: 'relative',
    marginBottom: 14,
  },
  aiSearchInput: {
    fontSize: 14,
    color: '#334155',
    minHeight: 80,
    textAlignVertical: 'top',
    paddingRight: 36,
  },
  aiSearchMicButton: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  aiSearchChipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 14,
  },
  aiSearchChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 99,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 4,
  },
  aiSearchChipText: {
    fontSize: 13,
    color: '#334155',
    fontWeight: '500',
  },
  aiSearchToggleLink: {
    fontSize: 14,
    color: '#16a34a',
    fontWeight: '600',
    marginBottom: 16,
  },
  aiSearchBtn: {
    backgroundColor: '#1989a8',
    height: 48,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  aiSearchBtnText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },

  // Results header
  aiSearchResultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 12,
  },
  aiSearchResultsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
  },
  aiSearchResultsCount: {
    fontSize: 14,
    color: '#16a34a',
    fontWeight: '600',
  },

  // ==========================
  // POST CARD (NEW SPEC)
  // ==========================
  postCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    marginHorizontal: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  postCardImageContainer: {
    height: 160,
    width: '100%',
    position: 'relative',
    backgroundColor: '#cbd5e1',
  },
  postCardImage: {
    width: '100%',
    height: '100%',
  },
  postCardBadgeLeft: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#ffffff',
    borderRadius: 99,
    paddingHorizontal: 12,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  postCardBadgeLeftText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1989a8',
  },
  postCardBadgeRight: {
    position: 'absolute',
    top: 12,
    right: 12,
    borderRadius: 99,
    paddingHorizontal: 12,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  postCardBadgeRightText: {
    fontSize: 12,
    fontWeight: '700',
  },
  postCardBody: {
    padding: 16,
  },
  postCardTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  postCardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
    flex: 1,
    marginRight: 10,
  },
  postCardPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#f97316',
  },
  postCardPriceUnit: {
    fontSize: 11,
    fontWeight: '400',
    color: '#64748b',
  },
  postCardLocRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  postCardLocText: {
    fontSize: 13,
    color: '#64748b',
    flex: 1,
  },
  postCardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  postCardGridItem: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  postCardGridText: {
    fontSize: 13,
    color: '#334155',
  },

  // AI PHÂN TÍCH
  aiAnalysisBox: {
    backgroundColor: '#f0f9ff',
    borderWidth: 1,
    borderColor: '#e0f2fe',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  aiAnalysisTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0284c7',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  aiAnalysisRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  aiAnalysisItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  aiAnalysisText: {
    fontSize: 12,
    fontWeight: '500',
  },

  // Buttons
  postCardActions: {
    flexDirection: 'row',
    gap: 12,
  },
  btnDetail: {
    flex: 1,
    height: 42,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  btnDetailText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
  },
  btnJoin: {
    flex: 1,
    height: 42,
    borderRadius: 10,
    backgroundColor: '#1989a8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnJoinText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },

  // Modals
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    maxWidth: 320,
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  modalItemText: {
    fontSize: 14,
    color: '#334155',
    textAlign: 'center',
  },
  modalCloseButton: {
    marginTop: 16,
    backgroundColor: '#e2e8f0',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  modalCloseButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
  },
});

