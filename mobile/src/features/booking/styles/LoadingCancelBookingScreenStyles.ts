import { StyleSheet, Platform, StatusBar, Dimensions } from 'react-native';

const TEAL = '#1989a8';
const { width } = Dimensions.get('window');

const LoadingCancelBookingScreenStyles = StyleSheet.create({
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
    paddingBottom: 14,
    paddingHorizontal: 16,
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
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 32,
    alignItems: 'center',
  },

  // ── Animated Icon Area ───────────────────────────────────
  iconArea: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
    position: 'relative',
    width: 120,
    height: 120,
  },

  // Outer dashed ring
  ringOuter: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#bfdbfe',
    borderStyle: 'dashed',
  },

  // Inner solid ring
  ringInner: {
    position: 'absolute',
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: '#dbeafe',
  },

  // Dots on the outer ring (4 positions: top, right, bottom, left)
  dotTop: {
    position: 'absolute',
    top: 4,
    left: 56,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: TEAL,
  },
  dotRight: {
    position: 'absolute',
    right: 4,
    top: 56,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#93c5fd',
  },
  dotBottom: {
    position: 'absolute',
    bottom: 4,
    left: 56,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: TEAL,
  },
  dotLeft: {
    position: 'absolute',
    left: 4,
    top: 56,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#93c5fd',
  },

  // Center icon box
  iconBox: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: '#334155',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 6,
  },

  // ── Title ────────────────────────────────────────────────
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 0.1,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 28,
    paddingHorizontal: 16,
  },

  // ── Steps Card ───────────────────────────────────────────
  stepsCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },

  // Each step row
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
  },

  // Left column: icon + connector
  stepIconCol: {
    alignItems: 'center',
    width: 28,
  },
  stepIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepIconCircleDone: {
    backgroundColor: TEAL,
  },
  stepIconCircleActive: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: TEAL,
  },
  stepIconCircleInactive: {
    backgroundColor: '#e2e8f0',
    borderWidth: 0,
  },

  // Connector line between steps
  stepConnector: {
    width: 2,
    flex: 1,
    minHeight: 20,
    backgroundColor: '#e2e8f0',
    marginVertical: 4,
    borderRadius: 1,
  },
  stepConnectorDone: {
    backgroundColor: TEAL,
  },

  // Right column: texts
  stepTextCol: {
    flex: 1,
    paddingBottom: 20,
  },
  stepLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 2,
  },
  stepLabelInactive: {
    color: '#94a3b8',
    fontWeight: '500',
  },
  stepSub: {
    fontSize: 12,
    color: '#64748b',
    lineHeight: 16,
  },
  stepSubInactive: {
    color: '#cbd5e1',
  },

  // Active step spinner inside circle
  stepSpinnerContainer: {
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ── Info Banner ──────────────────────────────────────────
  infoBanner: {
    width: '100%',
    backgroundColor: '#eff6ff',
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 24,
  },
  infoIconBox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: TEAL,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  infoText: {
    flex: 1,
    fontSize: 13.5,
    color: '#334155',
    lineHeight: 20,
  },
  infoLink: {
    color: TEAL,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },

  // ── Footer ───────────────────────────────────────────────
  footer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  homeBtn: {
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    flexDirection: 'row',
    gap: 8,
  },
  homeBtnText: {
    color: '#334155',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default LoadingCancelBookingScreenStyles;
