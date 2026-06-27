import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  // ==========================================
  // BACKDROP (Lớp phủ tối mờ)
  // ==========================================
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(27, 28, 28, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },

  // ==========================================
  // MODAL DIALOG (Hộp thoại trắng)
  // ==========================================
  dialog: {
    backgroundColor: '#ffffff',
    width: '100%',
    maxWidth: 358,
    borderRadius: 12,
    overflow: 'hidden',
    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 24 },
    shadowOpacity: 0.15,
    shadowRadius: 48,
    elevation: 12,
  },

  // ==========================================
  // HEADER (Tiêu đề + nút đóng)
  // ==========================================
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0eded',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1b1c1c',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // ==========================================
  // CONTENT BODY (Phần chứa 2 tùy chọn)
  // ==========================================
  contentBody: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    gap: 16,
  },

  // ==========================================
  // OPTION CARD CHUNG
  // ==========================================
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
    gap: 16,
  },

  // Option 1: Đặt lịch ngày (Cyan theme)
  optionCardDay: {
    backgroundColor: 'rgba(25, 137, 168, 0.20)',
    borderColor: 'rgba(27, 94, 32, 0.10)',
  },

  // Option 2: Đặt lịch sự kiện (Pink theme)
  optionCardEvent: {
    backgroundColor: 'rgba(255, 216, 233, 0.40)',
    borderColor: 'rgba(113, 67, 92, 0.10)',
  },

  // ==========================================
  // ICON CIRCLE (Vòng tròn chứa icon)
  // ==========================================
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  iconCircleDay: {
    backgroundColor: '#1989a8',
  },
  iconCircleEvent: {
    backgroundColor: '#71435c',
  },

  // ==========================================
  // TEXT CONTAINER (Tên + mô tả)
  // ==========================================
  textContainer: {
    flex: 1,
    gap: 4,
  },
  optionTitle: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 25,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  optionTitleDay: {
    color: '#1989a8',
  },
  optionTitleEvent: {
    color: '#572c45',
  },
  optionDescription: {
    fontSize: 16,
    fontWeight: '400',
    color: '#41493e',
    lineHeight: 24,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },

  // ==========================================
  // ARROW BUTTON (Nút mũi tên tròn)
  // ==========================================
  arrowButton: {
    width: 25,
    height: 25,
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowButtonDay: {
    backgroundColor: '#1989a8',
  },
  arrowButtonEvent: {
    backgroundColor: '#71435c',
  },

  // ==========================================
  // NEW BADGE (Nhãn "New" cho option 2)
  // ==========================================
  newBadgeContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 2,
  },
  newBadge: {
    backgroundColor: '#feae2c',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderBottomLeftRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  newBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b4500',
    lineHeight: 16,
  },

  // ==========================================
  // FOOTER HINT (Dòng hotline)
  // ==========================================
  footer: {
    backgroundColor: '#f6f3f2',
    paddingHorizontal: 24,
    paddingVertical: 16,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#41493e',
    textAlign: 'center',
    lineHeight: 16,
  },
  footerHighlight: {
    color: '#1989a8',
    fontWeight: '600',
  },
});

export default styles;
