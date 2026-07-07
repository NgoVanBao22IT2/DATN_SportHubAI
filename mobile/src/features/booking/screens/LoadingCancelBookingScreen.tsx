import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Animated,
  Easing,
  Alert,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../core/navigation/navigation.types';
import styles from '../styles/LoadingCancelBookingScreenStyles';

// ─── Types ────────────────────────────────────────────────────────────────────

type LoadingCancelRouteProp = RouteProp<RootStackParamList, 'LoadingCancelBooking'>;
type LoadingCancelNavProp = StackNavigationProp<RootStackParamList, 'LoadingCancelBooking'>;

// ─── Helpers ──────────────────────────────────────────────────────────────────

const getNowString = (): string => {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const mo = String(now.getMonth() + 1).padStart(2, '0');
  const yyyy = now.getFullYear();
  return `${hh}:${mm} - ${dd}/${mo}/${yyyy}`;
};

// ─── Step definitions ─────────────────────────────────────────────────────────

type StepStatus = 'done' | 'active' | 'inactive';

interface Step {
  label: string;
  sub: string;
  status: StepStatus;
}

// ─── Component ────────────────────────────────────────────────────────────────

const LoadingCancelBookingScreen: React.FC = () => {
  const navigation = useNavigation<LoadingCancelNavProp>();
  const route = useRoute<LoadingCancelRouteProp>();

  const {
    bookingDate,
    cancelledAt,
    venueName,
    courtName,
    timeRange,
    totalPrice,
    refundAmount,
  } = route.params;

  const nowString = cancelledAt ?? getNowString();

  // ── Steps data ─────────────────────────────────────────────────────────────
  const steps: Step[] = [
    {
      label: 'Đã hủy đặt sân thành công',
      sub: nowString,
      status: 'done',
    },
    {
      label: 'Đã gửi yêu cầu hoàn tiền',
      sub: nowString,
      status: 'done',
    },
    {
      label: 'Ngân hàng đang xử lý',
      sub: 'Dự kiến 5 - 7 ngày làm việc',
      status: 'active',
    },
    {
      label: 'Hoàn tất',
      sub: 'Chúng tôi sẽ thông báo khi hoàn tất',
      status: 'inactive',
    },
  ];

  // ── Animation: rotating outer ring ────────────────────────────────────────
  const spinAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Spin the outer ring infinitely
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 6000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();

    // Pulse the icon box
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.08,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ).start();

    // Auto-transition to result screen after 3 seconds
    const timer = setTimeout(() => {
      navigation.replace('ResultCancelBooking', {
        venueName,
        courtName,
        bookingDate,
        timeRange,
        refundAmount,
        cancelledAt: nowString,
        confirmedAt: (() => {
          const now = new Date(Date.now() + 4 * 60 * 1000);
          const hh = String(now.getHours()).padStart(2, '0');
          const mm = String(now.getMinutes()).padStart(2, '0');
          const dd = String(now.getDate()).padStart(2, '0');
          const mo = String(now.getMonth() + 1).padStart(2, '0');
          const yyyy = now.getFullYear();
          return `${hh}:${mm} - ${dd}/${mo}/${yyyy}`;
        })(),
        receivedAt: (() => {
          const now = new Date(Date.now() + 4 * 60 * 1000);
          const hh = String(now.getHours()).padStart(2, '0');
          const mm = String(now.getMinutes()).padStart(2, '0');
          const dd = String(now.getDate()).padStart(2, '0');
          const mo = String(now.getMonth() + 1).padStart(2, '0');
          const yyyy = now.getFullYear();
          return `${hh}:${mm} - ${dd}/${mo}/${yyyy}`;
        })(),
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleGoHome = () => {
    navigation.navigate('App', { screen: 'HomeTab' } as any);
  };

  const handleTransactionHistory = () => {
    // Navigate to transaction history or show alert as fallback
    Alert.alert(
      'Lịch sử giao dịch',
      'Tính năng xem lịch sử giao dịch đang được phát triển.',
    );
  };

  // ── Step Icon Renderer ─────────────────────────────────────────────────────

  const renderStepIcon = (status: StepStatus) => {
    if (status === 'done') {
      return (
        <View style={[styles.stepIconCircle, styles.stepIconCircleDone]}>
          <Ionicons name="checkmark" size={16} color="#fff" />
        </View>
      );
    }
    if (status === 'active') {
      return (
        <View style={[styles.stepIconCircle, styles.stepIconCircleActive]}>
          <MaterialCommunityIcons name="clock-outline" size={16} color="#1989a8" />
        </View>
      );
    }
    // inactive
    return (
      <View style={[styles.stepIconCircle, styles.stepIconCircleInactive]}>
        <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: '#94a3b8' }} />
      </View>
    );
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#1989a8" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={handleGoHome}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Hủy đặt sân</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Animated Icon Area */}
        <View style={styles.iconArea}>
          {/* Rotating outer dashed ring */}
          <Animated.View style={[styles.ringOuter, { transform: [{ rotate: spin }] }]} />

          {/* Static inner ring */}
          <View style={styles.ringInner} />

          {/* Corner dots */}
          <View style={styles.dotTop} />
          <View style={styles.dotRight} />
          <View style={styles.dotBottom} />
          <View style={styles.dotLeft} />

          {/* Center pulsing icon box */}
          <Animated.View style={[styles.iconBox, { transform: [{ scale: pulseAnim }] }]}>
            <MaterialCommunityIcons name="credit-card-outline" size={32} color="#facc15" />
          </Animated.View>
        </View>

        {/* Title */}
        <Text style={styles.title}>Đang xử lý hoàn tiền...</Text>
        <Text style={styles.subtitle}>Yêu cầu hủy đặt sân của bạn đang được xử lý</Text>

        {/* Steps Progress Card */}
        <View style={styles.stepsCard}>
          {steps.map((step, index) => {
            const isLast = index === steps.length - 1;
            return (
              <View key={index}>
                <View style={styles.stepRow}>
                  {/* Icon + connector */}
                  <View style={styles.stepIconCol}>
                    {renderStepIcon(step.status)}
                    {!isLast && (
                      <View
                        style={[
                          styles.stepConnector,
                          step.status === 'done' && styles.stepConnectorDone,
                        ]}
                      />
                    )}
                  </View>

                  {/* Texts */}
                  <View style={[styles.stepTextCol, isLast && { paddingBottom: 0 }]}>
                    <Text
                      style={[
                        styles.stepLabel,
                        step.status === 'inactive' && styles.stepLabelInactive,
                      ]}
                    >
                      {step.label}
                    </Text>
                    <Text
                      style={[
                        styles.stepSub,
                        step.status === 'inactive' && styles.stepSubInactive,
                      ]}
                    >
                      {step.sub}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        {/* Info Banner */}
        <View style={styles.infoBanner}>
          <View style={styles.infoIconBox}>
            <Ionicons name="information" size={12} color="#fff" />
          </View>
          <Text style={styles.infoText}>
            Bạn có thể theo dõi trạng thái hoàn tiền tại{' '}
            <Text style={styles.infoLink} onPress={handleTransactionHistory}>
              Lịch sử giao dịch
            </Text>
          </Text>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.homeBtn}
          onPress={handleGoHome}
          activeOpacity={0.8}
        >
          <Ionicons name="home-outline" size={18} color="#334155" />
          <Text style={styles.homeBtnText}>Về trang chủ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoadingCancelBookingScreen;
