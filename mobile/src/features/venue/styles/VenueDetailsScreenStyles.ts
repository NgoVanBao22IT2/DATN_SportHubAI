import { StyleSheet, Platform, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const IMAGE_HEIGHT = 260;

export const styles = StyleSheet.create({
  // ==========================================
  // CONTAINER & LAYOUT
  // ==========================================
  container: {
    flex: 1,
    backgroundColor: '#fbf9f8',
  },

  // ==========================================
  // TOP HEADER BAR (Cyan bar giống HomeScreen)
  // ==========================================
  header: {
    backgroundColor: '#1989a8',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    paddingTop: Platform.OS === 'ios' ? 54 : 14,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    zIndex: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#ffffff',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  headerSearchButton: {
    padding: 4,
  },

  // ==========================================
  // SCROLLABLE CONTENT
  // ==========================================
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100, // Chừa khoảng cho nút Đặt lịch sticky
  },

  // ==========================================
  // BACKGROUND IMAGE AREA
  // ==========================================
  backgroundImageContainer: {
    width: '100%',
    height: IMAGE_HEIGHT,
    backgroundColor: '#334155',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  backgroundOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
  },

  // ==========================================
  // WHITE SHEET (Overlapping Card)
  // ==========================================
  sheetContainer: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: -40, // Đè lên ảnh nền
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
    // Shadow mềm mại cho sheet
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
  },

  // Indicator bar (thanh kéo) ở đầu sheet
  sheetIndicator: {
    width: 48,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#cbd5e1',
    alignSelf: 'center',
    marginBottom: 20,
  },

  // ==========================================
  // FLOATING ACTION BUTTONS (Back & Heart)
  // ==========================================
  floatingButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  floatingButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },

  // ==========================================
  // RATING BADGE (Huy hiệu sao)
  // ==========================================
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 1.5,
    borderColor: '#feae2c',
    borderRadius: 9999,
    paddingHorizontal: 14,
    paddingVertical: 5,
    gap: 4,
    marginBottom: 16,
  },
  ratingBadgeText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#feae2c',
  },

  // ==========================================
  // VENUE TITLE SECTION
  // ==========================================
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 12,
  },
  venueLogoBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#1a3a3a',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  venueLogoImage: {
    width: 48,
    height: 48,
    borderRadius: 12,
  },
  venueTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0f172a',
    flex: 1,
    letterSpacing: 0.3,
  },

  // Category Badge (Nhãn "Cầu lông")
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#e0f7fa',
    borderRadius: 9999,
    paddingHorizontal: 14,
    paddingVertical: 4,
    marginLeft: 60, // Thẳng hàng với tên venue
    marginBottom: 20,
  },
  categoryBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1989a8',
  },

  // ==========================================
  // INFO ROWS (Địa chỉ, Giờ, SĐT)
  // ==========================================
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 10,
  },
  infoIconWrapper: {
    width: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 1,
  },
  infoText: {
    fontSize: 14,
    color: '#475569',
    flex: 1,
    lineHeight: 20,
  },
  infoTextBold: {
    fontWeight: '600',
  },

  // ==========================================
  // TAB BAR (Thông tin | Dịch vụ | Hình ảnh | Điều khoản)
  // ==========================================
  tabBarContainer: {
    marginTop: 12,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  tabBarScroll: {
    flexDirection: 'row',
  },
  tabItem: {
    paddingVertical: 10,
    paddingHorizontal: 2,
    marginRight: 24,
  },
  tabItemText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#94a3b8',
  },
  tabItemTextActive: {
    color: '#1989a8',
    fontWeight: '700',
  },
  tabItemIndicator: {
    height: 2.5,
    backgroundColor: '#1989a8',
    borderRadius: 2,
    marginTop: 8,
  },

  // ==========================================
  // ONLINE BOOKING LINK BOX
  // ==========================================
  onlineLinkBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  onlineLinkIconWrapper: {
    marginRight: 10,
  },
  onlineLinkText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    color: '#1989a8',
  },
  onlineLinkChevron: {
    marginLeft: 8,
  },

  // ==========================================
  // GIỚI THIỆU SECTION
  // ==========================================
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 22,
    marginBottom: 16,
  },

  // ==========================================
  // GALLERY THUMBNAILS (Hàng ảnh thu nhỏ)
  // ==========================================
  galleryRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  galleryImage: {
    width: (SCREEN_WIDTH - 60) / 2, // 2 ảnh mỗi hàng, trừ padding
    height: 100,
    borderRadius: 12,
    backgroundColor: '#e2e8f0',
  },

  // ==========================================
  // STICKY BOTTOM BOOKING BAR
  // ==========================================
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 34 : 16,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 10,
  },
  bookingButton: {
    backgroundColor: '#feae2c',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
    borderRadius: 14,
    gap: 8,
    shadowColor: '#feae2c',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  bookingButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#ffffff',
  },

  // ==========================================
  // LOADING STATE
  // ==========================================
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fbf9f8',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#94a3b8',
  },
});

export default styles;
