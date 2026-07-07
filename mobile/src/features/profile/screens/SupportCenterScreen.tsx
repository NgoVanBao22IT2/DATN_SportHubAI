import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  StatusBar,
  Alert,
  ActivityIndicator,
  Linking,
} from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../core/navigation/navigation.types';
import styles from '../styles/SupportCenterScreenStyles';

// ─── Types ────────────────────────────────────────────────────────────────────

type SupportCenterNavProp = StackNavigationProp<RootStackParamList>;

interface FAQItem {
  id: number;
  question: string;
  subText: string;
  answer: string;
  iconName: keyof typeof Ionicons.glyphMap;
}

// ─── Component ────────────────────────────────────────────────────────────────

const TEAL = '#1989a8';

const SupportCenterScreen: React.FC = () => {
  const navigation = useNavigation<SupportCenterNavProp>();

  // Form states
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Constants
  const maxMessageLength = 500;
  const phoneNumberVal = '0347176526';
  const emailVal = 'support@sporthub.vn';

  // FAQ Items
  const faqItems: FAQItem[] = [
    {
      id: 1,
      question: 'Làm sao để hủy hoặc đổi lịch đặt sân?',
      subText: 'Xem hướng dẫn',
      iconName: 'calendar-outline',
      answer:
        'Bạn có thể vào Lịch sử đặt sân từ trang cá nhân, chọn đơn đặt sân còn thời hạn và nhấn "Hủy đơn" hoặc "Đổi lịch". Số tiền hoàn sẽ phụ thuộc vào quy định thời gian hủy của cơ sở sân.',
    },
    {
      id: 2,
      question: 'Phương thức thanh toán nào được chấp nhận?',
      subText: 'Xem chi tiết',
      iconName: 'card-outline',
      answer:
        'Hệ thống SportHub hỗ trợ các hình thức thanh toán đa dạng bao gồm: Ví MoMo, tài khoản ngân hàng nội địa (Internet Banking) và chuyển khoản trực tiếp qua mã QR.',
    },
    {
      id: 3,
      question: 'Đặt sân trước bao lâu là hợp lý?',
      subText: 'Xem gợi ý',
      iconName: 'time-outline',
      answer:
        'Thông thường, bạn nên đặt sân trước ít nhất 1-2 ngày vào các ngày trong tuần và 3-5 ngày đối với dịp cuối tuần để đảm bảo giữ được khung giờ đẹp nhất.',
    },
  ];

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleBack = () => {
    navigation.goBack();
  };

  const handlePhoneCall = () => {
    Alert.alert('Gọi tổng đài hỗ trợ', `Bạn có muốn thực hiện cuộc gọi tới ${phoneNumberVal}?`, [
      { text: 'Hủy', style: 'cancel' },
      { text: 'Gọi', onPress: () => Linking.openURL(`tel:${phoneNumberVal}`).catch(() => {}) },
    ]);
  };

  const handleSendEmail = () => {
    Alert.alert('Gửi Email hỗ trợ', `Mở ứng dụng thư gửi tới ${emailVal}?`, [
      { text: 'Hủy', style: 'cancel' },
      {
        text: 'Gửi',
        onPress: () =>
          Linking.openURL(`mailto:${emailVal}?subject=Yêu cầu hỗ trợ SportHub`).catch(() => {}),
      },
    ]);
  };

  const handleLiveChat = () => {
    // Navigate to ChatAI or general help desk
    navigation.navigate('ChatAI');
  };

  const handleFAQPress = (item: FAQItem) => {
    Alert.alert(item.question, item.answer);
  };

  const handleSubmitMessage = async () => {
    // Basic validations
    if (!fullName.trim()) {
      Alert.alert('Thiếu thông tin', 'Vui lòng nhập Họ và tên của bạn.');
      return;
    }
    if (!phoneNumber.trim()) {
      Alert.alert('Thiếu thông tin', 'Vui lòng nhập Số điện thoại liên lạc.');
      return;
    }
    if (!message.trim()) {
      Alert.alert('Thiếu thông tin', 'Vui lòng nhập Nội dung tin nhắn cần hỗ trợ.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API submit delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      Alert.alert(
        'Gửi tin nhắn thành công',
        'Chúng tôi đã tiếp nhận yêu cầu hỗ trợ của bạn và sẽ phản hồi sớm nhất.',
        [
          {
            text: 'Đồng ý',
            onPress: () => {
              setFullName('');
              setPhoneNumber('');
              setEmail('');
              setMessage('');
            },
          },
        ]
      );
    } catch {
      Alert.alert('Thất bại', 'Không thể gửi tin nhắn hỗ trợ lúc này. Vui lòng thử lại sau.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#1989a8" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={handleBack}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Trung tâm hỗ trợ</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Support Greeting Card */}
        <View style={styles.agentCard}>
          <View style={styles.agentAvatarContainer}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop',
              }}
              style={styles.agentAvatar}
            />
            <View style={styles.chatBadge}>
              <Ionicons name="chatbubble" size={10} color="#fff" />
            </View>
          </View>
          <View style={styles.agentTextContainer}>
            <Text style={styles.agentTitle}>Chúng tôi luôn sẵn sàng hỗ trợ bạn!</Text>
            <Text style={styles.agentDesc}>
              Mọi thắc mắc hoặc yêu cầu hỗ trợ, đừng ngần ngại liên hệ với chúng tôi.
            </Text>
          </View>
        </View>

        {/* Quick Contact Card */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="call-outline" size={16} color={TEAL} />
            <Text style={styles.sectionTitle}>Liên hệ nhanh</Text>
          </View>

          <View style={styles.contactRow}>
            {/* Call element */}
            <TouchableOpacity
              style={styles.contactItem}
              onPress={handlePhoneCall}
              activeOpacity={0.7}
            >
              <View style={styles.iconRoundBox}>
                <Ionicons name="call" size={20} color={TEAL} />
              </View>
              <Text style={styles.contactLabel}>Gọi điện</Text>
              <Text style={styles.contactVal} numberOfLines={1}>
                {phoneNumberVal}
              </Text>
              <Text style={styles.contactSub}>08:00 - 22:00</Text>
            </TouchableOpacity>

            {/* Email element */}
            <TouchableOpacity
              style={[styles.contactItem, styles.contactItemMiddle]}
              onPress={handleSendEmail}
              activeOpacity={0.7}
            >
              <View style={styles.iconRoundBox}>
                <Ionicons name="mail" size={20} color={TEAL} />
              </View>
              <Text style={styles.contactLabel}>Email</Text>
              <Text style={styles.contactVal} numberOfLines={1}>
                {emailVal}
              </Text>
              <Text style={styles.contactSub}>Phản hồi trong 24h</Text>
            </TouchableOpacity>

            {/* Chat element */}
            <TouchableOpacity
              style={styles.contactItem}
              onPress={handleLiveChat}
              activeOpacity={0.7}
            >
              <View style={styles.iconRoundBox}>
                <Ionicons name="chatbubble-ellipses" size={20} color={TEAL} />
              </View>
              <Text style={styles.contactLabel}>Chat trực tuyến</Text>
              <Text style={styles.contactVal} numberOfLines={1}>
                Trò chuyện ngay
              </Text>
              <Text style={styles.contactSub}>08:00 - 22:00</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Message Send Form */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Feather name="send" size={15} color={TEAL} />
            <Text style={styles.sectionTitle}>Gửi tin nhắn cho chúng tôi</Text>
          </View>

          <View style={styles.formRow}>
            {/* Fullname input */}
            <View style={[styles.inputWrap, styles.inputWrapHalf]}>
              <Feather name="user" size={16} color="#94a3b8" style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="Họ và tên"
                placeholderTextColor="#94a3b8"
                value={fullName}
                onChangeText={setFullName}
              />
            </View>

            {/* Phone input */}
            <View style={[styles.inputWrap, styles.inputWrapHalf]}>
              <Feather name="phone" size={15} color="#94a3b8" style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="Số điện thoại"
                placeholderTextColor="#94a3b8"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
              />
            </View>
          </View>

          {/* Email input */}
          <View style={[styles.inputWrap, styles.inputWrapFull]}>
            <Feather name="mail" size={15} color="#94a3b8" style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              placeholder="Email (nếu có)"
              placeholderTextColor="#94a3b8"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* Textarea message input */}
          <View style={[styles.inputWrap, styles.textAreaWrap]}>
            <MaterialCommunityIcons
              name="message-outline"
              size={16}
              color="#94a3b8"
              style={[styles.inputIcon, { marginTop: 2 }]}
            />
            <TextInput
              style={[styles.textInput, styles.textAreaInput]}
              placeholder="Nội dung tin nhắn"
              placeholderTextColor="#94a3b8"
              multiline
              maxLength={maxMessageLength}
              value={message}
              onChangeText={setMessage}
            />
            <Text style={styles.charCounter}>
              {message.length}/{maxMessageLength}
            </Text>
          </View>

          {/* Submit button */}
          <TouchableOpacity
            style={styles.submitBtn}
            onPress={handleSubmitMessage}
            disabled={isSubmitting}
            activeOpacity={0.85}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Feather name="send" size={15} color="#fff" />
                <Text style={styles.submitBtnText}>Gửi tin nhắn</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* FAQs list Card */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="help-circle-outline" size={18} color={TEAL} />
            <Text style={styles.sectionTitle}>Câu hỏi thường gặp</Text>
          </View>

          {faqItems.map((item, index) => {
            const isLast = index === faqItems.length - 1;
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.faqRow, isLast && styles.faqRowLast]}
                onPress={() => handleFAQPress(item)}
                activeOpacity={0.7}
              >
                <View style={styles.faqIconBox}>
                  <Ionicons name={item.iconName} size={20} color={TEAL} />
                </View>
                <View style={styles.faqContent}>
                  <Text style={styles.faqTitle}>{item.question}</Text>
                  <Text style={styles.faqSub}>{item.subText}</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#cbd5e1" />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Footer Privacy Guard Banner */}
        <View style={styles.privacyBanner}>
          <View style={styles.privacyIconContainer}>
            <Ionicons name="shield-checkmark" size={20} color={TEAL} />
          </View>
          <View style={styles.privacyTextContainer}>
            <Text style={styles.privacyTitle}>Thông tin của bạn được bảo mật tuyệt đối</Text>
            <Text style={styles.privacyDesc}>
              Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn.
            </Text>
          </View>
          <View style={styles.checkmarkIconContainer}>
            <Ionicons name="checkmark-circle" size={20} color="#bbf7d0" />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SupportCenterScreen;
