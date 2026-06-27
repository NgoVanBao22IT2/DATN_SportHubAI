import { StyleSheet, Platform, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Kích thước cố định của lưới
const COURT_COL_WIDTH = 100;  // Cột tên sân (sticky)
const TIME_COL_WIDTH = 70;    // Mỗi cột giờ
const ROW_HEIGHT = 48;        // Chiều cao mỗi hàng

export const GRID = { COURT_COL_WIDTH, TIME_COL_WIDTH, ROW_HEIGHT };

export const styles = StyleSheet.create({
  // ==========================================
  // CONTAINER
  // ==========================================
  container: {
    flex: 1,
    backgroundColor: '#fbf9f8',
  },

  // ==========================================
  // HEADER (Cyan với back button)
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
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 140, // Đủ chỗ cho bottom bar
    gap: 16,
  },

  // ==========================================
  // LEGEND ROW (Chú thích màu)
  // ==========================================
  legendWrapper: {
    width: '100%',
    gap: 8,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flexWrap: 'wrap',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendBox: {
    width: 16,
    height: 16,
    borderRadius: 2,
  },
  legendBoxEmpty: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#c0c9bb',
  },
  legendBoxBooked: {
    backgroundColor: '#e57373',
  },
  legendBoxLocked: {
    backgroundColor: '#bdbdbd',
  },
  legendBoxEvent: {
    backgroundColor: '#7b5c7a',
  },
  legendText: {
    fontSize: 12,
    color: '#1b1c1c',
    lineHeight: 16,
  },

  // Link xem sân + date badge
  legendSubRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  venueLink: {
    fontSize: 12,
    color: '#835500',
    textDecorationLine: 'underline',
    lineHeight: 16,
    paddingVertical: 4,
  },
  dateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(25, 137, 168, 0.20)',
    borderWidth: 1,
    borderColor: '#1989a8',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  dateBadgeText: {
    fontSize: 12,
    color: '#1989a8',
    lineHeight: 16,
  },

  // ==========================================
  // NOTIFICATION BAR (Lưu ý)
  // ==========================================
  notificationBar: {
    backgroundColor: 'rgba(255, 221, 180, 0.30)',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    padding: 12,
    borderRadius: 8,
  },
  notificationText: {
    flex: 1,
    fontSize: 14,
    color: '#835500',
    lineHeight: 20,
  },

  // ==========================================
  // GRID CARD (Lưới sân/giờ)
  // ==========================================
  gridCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f0eded',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    overflow: 'hidden',
  },

  // Header row của grid
  gridHeaderRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f0eded',
  },

  // Ô tiêu đề "Sân / Giờ" (cố định)
  gridHeaderCourtCell: {
    width: COURT_COL_WIDTH,
    height: ROW_HEIGHT,
    backgroundColor: 'rgba(25, 137, 168, 0.20)',
    justifyContent: 'center',
    paddingHorizontal: 12,
    borderRightWidth: 1,
    borderRightColor: '#f0eded',
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 2,
  },
  gridHeaderCourtText: {
    fontSize: 12,
    color: '#1989a8',
    fontWeight: '400',
  },

  // Ô tiêu đề giờ (cuộn ngang)
  gridHeaderTimeCell: {
    width: TIME_COL_WIDTH,
    height: ROW_HEIGHT,
    backgroundColor: 'rgba(25, 137, 168, 0.20)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#f0eded',
  },
  gridHeaderTimeText: {
    fontSize: 12,
    color: '#1989a8',
    textAlign: 'center',
  },

  // Hàng body của grid
  gridBodyRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f0eded',
  },
  gridBodyRowLast: {
    borderBottomWidth: 0,
  },

  // Ô tên sân (cố định, không cuộn)
  gridCourtNameCell: {
    width: COURT_COL_WIDTH,
    height: ROW_HEIGHT,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    paddingHorizontal: 12,
    borderRightWidth: 1,
    borderRightColor: '#f0eded',
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 2,
  },
  gridCourtNameText: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '500',
  },

  // Ô dữ liệu slot
  gridSlotCell: {
    width: TIME_COL_WIDTH,
    height: ROW_HEIGHT,
    borderRightWidth: 1,
    borderRightColor: '#f0eded',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Trạng thái ô
  slotEmpty: {
    backgroundColor: '#ffffff',
  },
  slotBooked: {
    backgroundColor: '#e57373',
  },
  slotLocked: {
    backgroundColor: '#bdbdbd',
  },
  slotEvent: {
    backgroundColor: '#7b5c7a',
  },
  slotSelected: {
    backgroundColor: 'rgba(25, 137, 168, 0.55)',
    borderWidth: 1.5,
    borderColor: '#1989a8',
  },

  // Scroll indicator
  scrollIndicator: {
    height: 4,
    backgroundColor: '#1989a8',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 6,
    marginBottom: 4,
    width: 48,
  },

  // ==========================================
  // BOTTOM BAR STICKY
  // ==========================================
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 34 : 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 10,
    gap: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#94a3b8',
    marginBottom: 2,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1989a8',
  },
  summaryValueSuffix: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1989a8',
  },
  nextButton: {
    backgroundColor: '#feae2c',
    height: 52,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#feae2c',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  nextButtonDisabled: {
    backgroundColor: '#d1d5db',
    shadowOpacity: 0,
    elevation: 0,
  },
  nextButtonText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
});

export default styles;
