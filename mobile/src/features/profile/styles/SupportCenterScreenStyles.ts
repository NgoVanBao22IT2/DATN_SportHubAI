import { StyleSheet, Platform, StatusBar } from 'react-native';

const TEAL = '#1989a8';
const LIGHT_BLUE = '#eff6ff';

const SupportCenterScreenStyles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
  },

  // ── Header ──────────────────────────────────────────────
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: TEAL,
    paddingTop: Platform.OS === 'ios' ? 54 : 14,
    paddingHorizontal: 16,
    paddingVertical: 16,
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

  // ── Agent Greeting Card ─────────────────────────────────
  agentCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  agentAvatarContainer: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  agentAvatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
  },
  chatBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: TEAL,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  agentTextContainer: {
    flex: 1,
  },
  agentTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: TEAL,
    lineHeight: 22,
    marginBottom: 4,
  },
  agentDesc: {
    fontSize: 12.5,
    color: '#64748b',
    lineHeight: 18,
  },

  // ── Section Card Wrapper ────────────────────────────────
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: TEAL,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },

  // ── Contact Row ─────────────────────────────────────────
  contactRow: {
    flexDirection: 'row',
  },
  contactItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  contactItemMiddle: {
    borderLeftWidth: 1,
    borderLeftColor: '#f1f5f9',
    borderRightWidth: 1,
    borderRightColor: '#f1f5f9',
  },
  iconRoundBox: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#f0f9ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  contactLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  contactVal: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 2,
  },
  contactSub: {
    fontSize: 10,
    color: '#94a3b8',
    textAlign: 'center',
  },

  // ── Message Form ────────────────────────────────────────
  formRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    gap: 8,
  },
  inputWrapHalf: {
    flex: 1,
  },
  inputWrapFull: {
    marginBottom: 12,
  },
  inputIcon: {
    marginRight: 2,
  },
  textInput: {
    flex: 1,
    fontSize: 13.5,
    color: '#1e293b',
    paddingVertical: 0,
  },
  textAreaWrap: {
    alignItems: 'flex-start',
    height: 120,
    paddingVertical: 10,
    marginBottom: 16,
  },
  textAreaInput: {
    textAlignVertical: 'top',
    height: '100%',
  },
  charCounter: {
    position: 'absolute',
    bottom: 8,
    right: 12,
    fontSize: 11,
    color: '#94a3b8',
  },
  submitBtn: {
    backgroundColor: TEAL,
    borderRadius: 12,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  submitBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },

  // ── FAQ Items ───────────────────────────────────────────
  faqRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  faqRowLast: {
    borderBottomWidth: 0,
    paddingBottom: 4,
  },
  faqIconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: LIGHT_BLUE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  faqContent: {
    flex: 1,
    marginLeft: 12,
    paddingRight: 8,
  },
  faqTitle: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#1e293b',
    lineHeight: 18,
    marginBottom: 2,
  },
  faqSub: {
    fontSize: 11,
    color: TEAL,
    fontWeight: '600',
  },

  // ── Footer Privacy Box ──────────────────────────────────
  privacyBanner: {
    backgroundColor: '#eef6f9',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  privacyIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  privacyTextContainer: {
    flex: 1,
  },
  privacyTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 3,
  },
  privacyDesc: {
    fontSize: 11.5,
    color: '#64748b',
    lineHeight: 16,
  },
  checkmarkIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SupportCenterScreenStyles;
