import { StyleSheet, Platform, StatusBar } from 'react-native';

const TEAL = '#1989a8';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    backgroundColor: TEAL,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    paddingTop: Platform.OS === 'ios' ? 54 : 14 + (StatusBar.currentHeight || 0),
    gap: 12,
  },
  backButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    margin: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 2,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: '#4b5563',
    marginBottom: 24,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16,
  },
  optionButtonSelected: {
    borderColor: TEAL,
    backgroundColor: 'rgba(25, 137, 168, 0.02)',
  },
  optionButtonUnselected: {
    borderColor: '#e5e7eb',
    backgroundColor: '#ffffff',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  flagContainer: {
    width: 44,
    height: 28,
    borderRadius: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  flagImage: {
    width: '100%',
    height: '100%',
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#d1d5db',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterActive: {
    borderColor: TEAL,
  },
  radioInnerActive: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: TEAL,
  },
  graphicContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
    marginBottom: 12,
    gap: 8,
  },
  graphicSubtitle: {
    fontSize: 13,
    color: '#9ca3af',
    fontWeight: '500',
  },
  saveButton: {
    backgroundColor: TEAL,
    borderRadius: 12,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginTop: 8,
    shadowColor: TEAL,
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 3,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
});

export default styles;
