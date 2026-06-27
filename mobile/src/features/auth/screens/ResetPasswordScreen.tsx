import React, { useState } from 'react';
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
import styles from '../styles/ResetPasswordScreenStyles';

type ResetPasswordScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Auth'>;
type ResetPasswordScreenRouteProp = RouteProp<AuthStackParamList, 'ResetPassword'>;

export const ResetPasswordScreen = () => {
  const navigation = useNavigation<ResetPasswordScreenNavigationProp>();
  const route = useRoute<ResetPasswordScreenRouteProp>();

  // Lấy email và code OTP từ navigation params
  const email = route.params?.email || '';
  const code = route.params?.code || '';

  // States
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleResetPassword = async () => {
    setError(null);

    // Validation
    if (!password || !confirmPassword) {
      setError('Vui lòng nhập đầy đủ mật khẩu mới.');
      return;
    }

    if (password.length < 8) {
      setError('Mật khẩu phải chứa ít nhất 8 ký tự.');
      return;
    }

    // Kiểm tra định dạng: bao gồm cả chữ cái và số
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    if (!hasLetter || !hasNumber) {
      setError('Mật khẩu phải bao gồm chữ cái và số.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không trùng khớp.');
      return;
    }

    setIsLoading(true);
    try {
      // Gửi cả password và newPassword đề phòng thiết kế API backend sử dụng tên trường khác nhau
      await authApi.resetPassword({
        email,
        code,
        password,
        newPassword: password,
      });

      setIsLoading(false);
      Alert.alert(
        'Đặt lại mật khẩu thành công',
        'Mật khẩu của bạn đã được cập nhật thành công. Vui lòng đăng nhập lại.',
        [
          {
            text: 'Đăng nhập',
            onPress: () => navigation.navigate('Auth', { screen: 'Login' }),
          },
        ]
      );
    } catch (err: any) {
      setIsLoading(false);
      const message = err.response?.data?.error?.message || 'Có lỗi xảy ra khi đặt lại mật khẩu. Vui lòng thử lại sau.';
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

            {/* Reset Password Card */}
            <View style={styles.card}>
              <Text style={styles.title}>Đặt lại mật khẩu</Text>
              <Text style={styles.subtitle}>
                Vui lòng nhập mật khẩu mới của bạn bên dưới để khôi phục quyền truy cập vào tài khoản Sporthub.
              </Text>

              {/* Input: Mật khẩu mới */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Mật khẩu mới</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="lock-closed-outline" size={20} color="#94a3b8" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="••••••••"
                    placeholderTextColor="#94a3b8"
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    value={password}
                    onChangeText={setPassword}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                    <Ionicons
                      name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                      size={20}
                      color="#94a3b8"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Input: Xác nhận mật khẩu */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Xác nhận mật khẩu</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="sync-outline" size={20} color="#94a3b8" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="••••••••"
                    placeholderTextColor="#94a3b8"
                    secureTextEntry={!showConfirmPassword}
                    autoCapitalize="none"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                  />
                  <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeIcon}>
                    <Ionicons
                      name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                      size={20}
                      color="#94a3b8"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Info Alert Box */}
              <View style={styles.infoAlertContainer}>
                <Ionicons
                  name="information-circle-outline"
                  size={20}
                  color="#0891b2"
                  style={styles.infoAlertIcon}
                />
                <Text style={styles.infoAlertText}>
                  Mật khẩu phải chứa ít nhất 8 ký tự, bao gồm chữ cái và số.
                </Text>
              </View>

              {/* Error Message */}
              {error && (
                <View style={styles.errorContainer}>
                  <Ionicons name="alert-circle-outline" size={16} color="#ef4444" />
                  <Text style={styles.errorText}>{error}</Text>
                </View>
              )}

              {/* Reset Submit Button */}
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleResetPassword}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="#ffffff" />
                ) : (
                  <Text style={styles.submitButtonText}>Cập nhật mật khẩu</Text>
                )}
              </TouchableOpacity>

              {/* Back to login screen */}
              <TouchableOpacity
                style={styles.backLinkContainer}
                onPress={() => navigation.navigate('Auth', { screen: 'Login' })}
              >
                <Ionicons name="arrow-back-outline" size={18} color="#06b6d4" style={styles.backIcon} />
                <Text style={styles.backLinkText}>Quay lại đăng nhập</Text>
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

export default ResetPasswordScreen;
