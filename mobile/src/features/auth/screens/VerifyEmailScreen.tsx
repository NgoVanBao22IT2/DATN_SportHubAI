import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
  Platform,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, AuthStackParamList } from '../../../core/navigation/navigation.types';
import { authApi } from '../services/authApi';
import styles from '../styles/VerifyEmailScreenStyles';

type VerifyEmailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Auth'>;
type VerifyEmailScreenRouteProp = RouteProp<AuthStackParamList, 'VerifyEmail'>;

export const VerifyEmailScreen = () => {
  const navigation = useNavigation<VerifyEmailScreenNavigationProp>();
  const route = useRoute<VerifyEmailScreenRouteProp>();

  // Lấy email và flow từ navigation params
  const email = route.params?.email || '';
  const flow = route.params?.flow || 'register';

  // States
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Timer State (2 phút = 120 giây)
  const [timer, setTimer] = useState(120);
  const [canResend, setCanResend] = useState(false);

  const pinRefs = useRef<(TextInput | null)[]>([]);

  // Đếm ngược 2 phút
  useEffect(() => {
    if (timer === 0) {
      setCanResend(true);
      return;
    }
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // Định dạng hiển thị thời gian MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Xử lý khi thay đổi text trong từng ô
  const handleChangeText = (text: string, index: number) => {
    setError(null);
    const value = text.replace(/[^0-9]/g, ''); // chỉ cho phép nhập số
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Nếu vừa nhập 1 số, nhảy sang ô kế tiếp
    if (value !== '' && index < 5) {
      pinRefs.current[index + 1]?.focus();
    }
  };

  // Xử lý khi nhấn phím (Backspace)
  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace') {
      if (otp[index] === '' && index > 0) {
        // Nếu ô hiện tại trống, quay lại ô trước và xoá ký tự
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        pinRefs.current[index - 1]?.focus();
      } else {
        // Xoá ký tự ở ô hiện tại
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    }
  };

  // Gửi lại mã OTP
  const handleResend = async () => {
    if (!canResend || isResending) return;
    setError(null);
    setIsResending(true);
    try {
      await authApi.resendVerificationCode(email);
      setTimer(120);
      setCanResend(false);
      setOtp(['', '', '', '', '', '']);
      pinRefs.current[0]?.focus();
      Alert.alert('Gửi lại thành công', 'Mã xác thực mới đã được gửi đến email của bạn.');
    } catch (err: any) {
      const message = err.response?.data?.error?.message || 'Không thể gửi lại mã. Vui lòng thử lại.';
      setError(message);
    } finally {
      setIsResending(false);
    }
  };

  // Xác nhận mã OTP
  const handleVerify = async () => {
    setError(null);
    const code = otp.join('');
    
    if (code.length < 6) {
      setError('Vui lòng nhập đầy đủ mã OTP 6 chữ số.');
      return;
    }

    setIsLoading(true);
    try {
      await authApi.verifyEmail(email, code);
      setIsLoading(false);
      
      Alert.alert(
        'Xác nhận thành công',
        'Tài khoản của bạn đã được xác thực thành công.',
        [
          {
            text: 'Đăng nhập ngay',
            onPress: () => navigation.navigate('Auth', { screen: 'Login' }),
          },
        ]
      );
    } catch (err: any) {
      setIsLoading(false);
      const message = err.response?.data?.error?.message || 'Mã xác thực không hợp lệ hoặc đã hết hạn.';
      setError(message);
    }
  };

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=750&auto=format&fit=crop' }}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.contentWrapper}>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.logoRow}>
                <View style={styles.logoIcon}>
                  <Ionicons name="tennisball" size={24} color="#06b6d4" />
                </View>
                <Text style={styles.logoText}>SPORTHUB</Text>
                <TouchableOpacity style={styles.langBtn}>
                  <Text style={styles.langBtnText}>VN</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* OTP Input Card */}
            <View style={styles.card}>
              <Text style={styles.title}>Xác nhận Email</Text>
              <Text style={styles.subtitle}>
                Vui lòng nhập mã OTP gồm 6 chữ số đã được gửi đến email của bạn.
              </Text>

              {/* OTP Grid */}
              <View style={styles.otpRow}>
                {otp.map((value, index) => (
                  <TextInput
                    key={index}
                    ref={(el) => (pinRefs.current[index] = el)}
                    style={[
                      styles.otpInput,
                      focusedIndex === index && styles.otpInputFocused,
                    ]}
                    value={value}
                    onChangeText={(text) => handleChangeText(text, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    onFocus={() => setFocusedIndex(index)}
                    onBlur={() => setFocusedIndex(null)}
                    keyboardType="number-pad"
                    maxLength={1}
                    selectTextOnFocus
                    autoFocus={index === 0}
                  />
                ))}
              </View>

              {/* Error Message */}
              {error && (
                <View style={styles.errorContainer}>
                  <Ionicons name="alert-circle-outline" size={16} color="#ef4444" />
                  <Text style={styles.errorText}>{error}</Text>
                </View>
              )}

              {/* Verify Button */}
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleVerify}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="#ffffff" />
                ) : (
                  <Text style={styles.submitButtonText}>Xác nhận</Text>
                )}
              </TouchableOpacity>

              {/* Resend Section */}
              <View style={styles.resendContainer}>
                <View style={styles.resendTextRow}>
                  <Text style={styles.resendLabel}>Bạn không nhận được mã? </Text>
                  <TouchableOpacity onPress={handleResend} disabled={!canResend || isResending}>
                    <Text
                      style={[
                        styles.resendLink,
                        (!canResend || isResending) && styles.resendLinkDisabled,
                      ]}
                    >
                      {isResending ? 'Đang gửi...' : 'Gửi lại mã'}
                    </Text>
                  </TouchableOpacity>
                </View>
                {!canResend && (
                  <Text style={styles.timerText}>{formatTime(timer)}</Text>
                )}
              </View>

              {/* Back to previous screen */}
              <TouchableOpacity
                style={styles.backLinkContainer}
                onPress={() => {
                  if (flow === 'forgot_password') {
                    navigation.navigate('Auth', { screen: 'ForgotPassword', params: { email } });
                  } else {
                    navigation.navigate('Auth', { screen: 'Register' });
                  }
                }}
              >
                <Ionicons name="arrow-back-outline" size={18} color="#06b6d4" style={styles.backIcon} />
                <Text style={styles.backLinkText}>Quay lại</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer links outside card */}
          <View style={styles.footer}>
            <View style={styles.footerLinksRow}>
              <TouchableOpacity>
                <Text style={styles.footerLinkText}>ĐIỀU KHOẢN DỊCH VỤ</Text>
              </TouchableOpacity>
              <View style={styles.footerLinkDivider} />
              <TouchableOpacity>
                <Text style={styles.footerLinkText}>CHÍNH SÁCH BẢO MẬT</Text>
              </TouchableOpacity>
              <View style={styles.footerLinkDivider} />
              <TouchableOpacity>
                <Text style={styles.footerLinkText}>HỖ TRỢ</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.copyrightText}>
              © 2026 SPORTHUB GLOBAL. ALL RIGHTS RESERVED.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default VerifyEmailScreen;
