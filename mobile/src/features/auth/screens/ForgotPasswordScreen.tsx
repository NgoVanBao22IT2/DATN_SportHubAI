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
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../core/navigation/navigation.types';
import { authApi } from '../services/authApi';
import styles from '../styles/ForgotPasswordScreenStyles';

type ForgotPasswordScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Auth'>;

export const ForgotPasswordScreen = () => {
  const navigation = useNavigation<ForgotPasswordScreenNavigationProp>();
  
  // States
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setError(null);

    // Validation
    if (!email.trim()) {
      setError('Vui lòng nhập Địa chỉ Email.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError('Định dạng Email không hợp lệ.');
      return;
    }

    // Call API
    setIsLoading(true);
    try {
      await authApi.forgotPassword(email.trim());
      setIsLoading(false);
      Alert.alert(
        'Đã gửi yêu cầu',
        'Vui lòng kiểm tra hộp thư email của bạn để thực hiện khôi phục mật khẩu.',
        [{ text: 'Quay lại Đăng nhập', onPress: () => navigation.navigate('Auth', { screen: 'Login' }) }]
      );
    } catch (err: any) {
      setIsLoading(false);
      const message = err.response?.data?.error?.message || 'Có lỗi xảy ra. Vui lòng thử lại sau.';
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
            <Text style={styles.title}>Quên mật khẩu</Text>
            <Text style={styles.subtitle}>
              Vui lòng nhập email của bạn để nhận hướng dẫn khôi phục mật khẩu.
            </Text>
          </View>

          {/* Form Card */}
          <View style={styles.card}>
            {/* Input Email */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Địa chỉ Email</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="mail-outline" size={20} color="#94a3b8" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="example@gmail.com"
                  placeholderTextColor="#94a3b8"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </View>

            {/* Error Message */}
            {error && (
              <View style={styles.errorContainer}>
                <Ionicons name="alert-circle-outline" size={16} color="#ef4444" />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}

            {/* Submit Button */}
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={isLoading}>
              {isLoading ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <>
                  <Text style={styles.submitButtonText}>Gửi yêu cầu</Text>
                  <Ionicons name="arrow-forward-outline" size={18} color="#ffffff" />
                </>
              )}
            </TouchableOpacity>

            {/* Back to Login Link */}
            <TouchableOpacity
              style={styles.backLinkContainer}
              onPress={() => navigation.navigate('Auth', { screen: 'Login' })}
            >
              <Ionicons name="arrow-back-outline" size={18} color="#06b6d4" style={styles.backIcon} />
              <Text style={styles.backLinkText}>Quay lại Đăng nhập</Text>
            </TouchableOpacity>

            {/* Footer Disclaimer */}
            <Text style={styles.termsFooterText}>
              Bằng cách tiếp tục, bạn đồng ý với Điều khoản & Chính sách bảo mật của SportHub.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};
export default ForgotPasswordScreen;
