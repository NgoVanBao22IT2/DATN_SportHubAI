import { StyleSheet, Platform, StatusBar } from 'react-native';

const TEAL = '#1989a8';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },

  // ── HEADER ──────────────────────────────────────────────────
  header: {
    backgroundColor: TEAL,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 54 : (StatusBar.currentHeight || 0) + 14,
    paddingBottom: 14,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#fff', letterSpacing: 0.2 },
  headerBell: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },

  // ── CHIPS ────────────────────────────────────────────────────
  chipsScrollContent: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingHorizontal: 16, paddingVertical: 14,
  },
  chipActive: {
    backgroundColor: TEAL, justifyContent: 'center', alignItems: 'center',
    paddingHorizontal: 20, height: 40, borderRadius: 9999,
    elevation: 4, shadowColor: TEAL,
    shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8,
  },
  chipInactive: {
    backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center',
    paddingHorizontal: 20, height: 40, borderRadius: 9999,
    borderWidth: 1, borderColor: '#bec8ce',
  },
  chipActiveText: { color: '#fff', fontSize: 14, fontWeight: '700' },
  chipInactiveText: { color: '#3e484d', fontSize: 14, fontWeight: '700' },

  // ── SCROLL CONTENT ───────────────────────────────────────────
  scrollContent: { paddingHorizontal: 18, paddingVertical: 16, gap: 20, paddingBottom: 48 },

  // ── MAIN TITLE ───────────────────────────────────────────────
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  mainTitle: { fontSize: 20, fontWeight: '800', color: '#0f172a' },

  // ── FORM SECTION ─────────────────────────────────────────────
  section: { gap: 12 },
  sectionHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  sectionTitle: { fontSize: 13, fontWeight: '800', color: '#334155', letterSpacing: 0.5 },

  fieldGroup: { gap: 6 },
  fieldLabel: { fontSize: 12, fontWeight: '600', color: '#64748b' },

  rowTwo: { flexDirection: 'row', gap: 12 },

  inputDisabled: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: '#f1f5f9', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12,
    borderWidth: 1, borderColor: '#e2e8f0',
  },
  inputTextDisabled: { fontSize: 13, fontWeight: '600', color: '#475569' },

  inputBox: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: '#f8fafc', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12,
    borderWidth: 1, borderColor: '#cbd5e1',
  },
  inputBoxLeft: { flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 },
  inputText: { fontSize: 13, fontWeight: '600', color: '#0f172a' },

  // Price Row
  priceRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  priceField: { flex: 1, gap: 6 },
  priceInputDisabled: {
    backgroundColor: '#f1f5f9', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12,
    borderWidth: 1, borderColor: '#e2e8f0', alignItems: 'center', justifyContent: 'center',
  },
  priceTextDisabled: { fontSize: 16, fontWeight: '800', color: '#0284c7' },

  priceInputActive: {
    backgroundColor: '#ffffff', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10,
    borderWidth: 1.5, borderColor: TEAL, alignItems: 'center', justifyContent: 'center',
  },
  priceTextInput: { fontSize: 18, fontWeight: '900', color: '#ef4444', textAlign: 'center' },

  priceArrow: { marginTop: 18 },

  // Price Suggestion Banner
  suggestionBanner: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: '#fff7ed', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12,
    borderWidth: 1, borderColor: '#ffedd5',
  },
  suggestionText: { fontSize: 13, fontWeight: '700', color: '#c2410c' },

  // Textarea
  textarea: {
    backgroundColor: '#ffffff', borderRadius: 14, paddingHorizontal: 14, paddingVertical: 12,
    borderWidth: 1, borderColor: '#cbd5e1', minHeight: 90, textAlignVertical: 'top',
    fontSize: 13, color: '#0f172a', lineHeight: 18,
  },

  // Quick Chips
  quickChipsRow: { flexDirection: 'row', gap: 8, marginTop: 4 },
  quickChipActive: {
    backgroundColor: '#e0f2fe', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 8,
    borderWidth: 1, borderColor: TEAL,
  },
  quickChipActiveText: { fontSize: 12, fontWeight: '700', color: '#0284c7' },
  quickChipInactive: {
    backgroundColor: '#ffffff', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 8,
    borderWidth: 1, borderColor: '#cbd5e1',
  },
  quickChipInactiveText: { fontSize: 12, fontWeight: '600', color: '#475569' },

  // Image Upload
  imageUploadRow: { flexDirection: 'row', gap: 14, alignItems: 'center' },
  uploadBox: {
    width: 90, height: 90, borderRadius: 14,
    borderWidth: 1.5, borderColor: '#cbd5e1', borderStyle: 'dashed',
    alignItems: 'center', justifyContent: 'center', gap: 4, backgroundColor: '#f8fafc',
  },
  uploadText: { fontSize: 10, fontWeight: '800', color: '#64748b' },

  imagePreviewBox: { width: 90, height: 90, borderRadius: 14, overflow: 'hidden', position: 'relative' },
  imagePreview: { width: '100%', height: '100%' },
  removeImageBadge: {
    position: 'absolute', top: 4, right: 4,
    width: 20, height: 20, borderRadius: 10, backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center', justifyContent: 'center',
  },

  // Checkbox
  checkboxRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 6 },
  checkboxBox: {
    width: 20, height: 20, borderRadius: 4, borderWidth: 1.5, borderColor: TEAL,
    alignItems: 'center', justifyContent: 'center', backgroundColor: TEAL,
  },
  checkboxText: { fontSize: 12, color: '#475569', flex: 1, lineHeight: 16 },
  linkText: { fontWeight: '700', color: TEAL, textDecorationLine: 'underline' },

  // Submit Button
  submitBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: TEAL, borderRadius: 14, height: 50, marginTop: 10,
    elevation: 3, shadowColor: TEAL, shadowOpacity: 0.3, shadowOffset: { width: 0, height: 4 }, shadowRadius: 8,
  },
  submitBtnText: { fontSize: 16, fontWeight: '800', color: '#ffffff', letterSpacing: 0.5 },
});

export default styles;
