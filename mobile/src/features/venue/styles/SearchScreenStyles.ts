import { StyleSheet, Platform, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const HERO_HEIGHT = 224;

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
  // SEARCH BAR
  // ==========================================
  searchBarContainer: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  searchBarInner: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'stretch',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  searchIconBox: {
    backgroundColor: '#f6f3f2',
    paddingLeft: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#f6f3f2',
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#1b1c1c',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  clearButton: {
    backgroundColor: '#f6f3f2',
    paddingRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 0,
  },
  clearButtonCircle: {
    backgroundColor: 'rgba(234, 232, 231, 0.5)',
    width: 24,
    height: 24,
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // ==========================================
  // RESULTS LIST
  // ==========================================
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 100,
    gap: 24,
  },
  listGap: {
    height: 24,
  },
  emptyContainer: {
    paddingTop: 60,
    alignItems: 'center',
    gap: 12,
  },
  emptyText: {
    fontSize: 16,
    color: '#94a3b8',
    textAlign: 'center',
  },
  emptySubText: {
    fontSize: 13,
    color: '#cbd5e1',
    textAlign: 'center',
  },

  // ==========================================
  // VENUE CARD
  // ==========================================
  venueCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(192, 201, 187, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
    overflow: 'hidden',
  },

  // Hero image
  heroContainer: {
    height: HERO_HEIGHT,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: HERO_HEIGHT,
  },
  heroGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: 'rgba(0,0,0,0.15)',
  },

  // Rating badge (top-left)
  ratingBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#feae2c',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#ffffff',
  },

  // Favorite button (top-right)
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 9999,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },

  // Info section
  infoSection: {
    padding: 16,
    gap: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  sportIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 9999,
    backgroundColor: '#1b5e20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sportIconCirclePickle: {
    backgroundColor: '#1a237e',
  },
  sportIconCircleTennis: {
    backgroundColor: '#bf360c',
  },
  sportIconCircleBadminton: {
    backgroundColor: '#1b5e20',
  },
  venueTitleRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
  },
  venueName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1b1c1c',
    flexShrink: 1,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  distanceTag: {
    fontSize: 12,
    color: '#1989a8',
    fontWeight: '500',
  },
  venueAddress: {
    fontSize: 13,
    color: '#64748b',
    lineHeight: 18,
    marginTop: 2,
  },

  // Booking button
  bookingButton: {
    backgroundColor: '#feae2c',
    height: 48,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
    shadowColor: '#feae2c',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  bookingButtonText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: 0.8,
  },
});

export default styles;
