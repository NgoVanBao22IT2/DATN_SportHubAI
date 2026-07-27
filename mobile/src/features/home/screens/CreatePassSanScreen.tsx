import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  StatusBar,
  Alert,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../core/navigation/navigation.types';
import styles from '../styles/CreatePassSanScreenStyles';

type NavProp = StackNavigationProp<RootStackParamList>;

const TEAL = '#1989a8';
const CATEGORY_CHIPS = ['Tất cả', 'Gói hội viên', 'Khóa học', 'Sự kiện', 'Pass sân'];

export const CreatePassSanScreen = () => {
  const navigation = useNavigation<NavProp>();
  const [activeChip, setActiveChip] = useState(4); // Default to Pass sân

  const [originalPrice] = useState('200.000');
  const [passPrice, setPassPrice] = useState('180.000');
  const [noteText, setNoteText] = useState(
    'Mình bận việc đột xuất nên pass lại slot tối nay cho ae nào cần. Sân đẹp, mát mẻ...'
  );
  const [selectedQuickChip, setSelectedQuickChip] = useState(0);
  const [agreed, setAgreed] = useState(true);
  const [uploadedImage, setUploadedImage] = useState<string | null>(
    'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=400&auto=format&fit=crop'
  );

  const QUICK_REASONS = ['Bận việc đột xuất', 'Chấn thương nhẹ', 'Thiếu người'];

  const handleSelectQuickReason = (index: number, text: string) => {
    setSelectedQuickChip(index);
    setNoteText(`Ví dụ: '${text}. Pass lại slot giá rẻ cho ai cần...'`);
  };

  const handleSubmit = () => {
    if (!agreed) {
      Alert.alert('Thông báo', 'Vui lòng đồng ý với Quy định cộng đồng của SportHub.');
      return;
    }
    Alert.alert(
      'Đăng tin thành công! 🎉',
      `Tin pass sân "${passPrice}đ" đã được đăng công khai trên SportHub.`,
      [{ text: 'Đồng ý', onPress: () => navigation.goBack() }]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={TEAL} />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerLeft} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
          <Text style={styles.headerTitle}>SportHub</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.headerBell}
          onPress={() => Alert.alert('Thông báo', 'Bạn có 3 thông báo mới.')}
        >
          <Ionicons name="notifications-outline" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {/* CATEGORY CHIPS BAR */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipsScrollContent}
        style={{ backgroundColor: '#ffffff', flexGrow: 0 }}
      >
        {CATEGORY_CHIPS.map((chip, idx) => (
          <TouchableOpacity
            key={chip}
            style={idx === activeChip ? styles.chipActive : styles.chipInactive}
            onPress={() => {
              setActiveChip(idx);
              if (idx !== 4) {
                navigation.goBack();
              }
            }}
            activeOpacity={0.75}
          >
            <Text style={idx === activeChip ? styles.chipActiveText : styles.chipInactiveText}>
              {chip}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* FORM BODY */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Main Title */}
        <View style={styles.titleRow}>
          <Text style={{ fontSize: 22 }}>🔥</Text>
          <Text style={styles.mainTitle}>Chia sẻ slot, nhận lại niềm vui</Text>
        </View>

        {/* SECTION 1: THỜI GIAN & ĐỊA ĐIỂM */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Ionicons name="calendar-outline" size={18} color={TEAL} />
            <Text style={styles.sectionTitle}>THỜI GIAN & ĐỊA ĐIỂM</Text>
          </View>

          {/* Row: Ngày chơi & Khung giờ */}
          <View style={styles.rowTwo}>
            <View style={[styles.fieldGroup, { flex: 1 }]}>
              <Text style={styles.fieldLabel}>Ngày chơi</Text>
              <View style={styles.inputDisabled}>
                <Ionicons name="calendar-outline" size={15} color={TEAL} />
                <Text style={styles.inputTextDisabled}>Hôm nay, 24/05</Text>
              </View>
            </View>

            <View style={[styles.fieldGroup, { flex: 1 }]}>
              <Text style={styles.fieldLabel}>Khung giờ</Text>
              <View style={styles.inputDisabled}>
                <Ionicons name="time-outline" size={15} color={TEAL} />
                <Text style={styles.inputTextDisabled}>18:00 - 19:30</Text>
              </View>
            </View>
          </View>

          {/* Row: Tên sân */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Tên sân</Text>
            <TouchableOpacity
              style={styles.inputBox}
              onPress={() => Alert.alert('Chọn sân', 'Danh sách các sân đã đặt của bạn')}
              activeOpacity={0.8}
            >
              <View style={styles.inputBoxLeft}>
                <Ionicons name="grid-outline" size={16} color={TEAL} />
                <Text style={styles.inputText}>SixtyNine Pickleball - Sân số 4</Text>
              </View>
              <Ionicons name="chevron-down" size={18} color="#9ca3af" />
            </TouchableOpacity>
          </View>

          {/* Row: Địa chỉ */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Địa chỉ</Text>
            <View style={styles.inputBox}>
              <View style={styles.inputBoxLeft}>
                <Ionicons name="location-outline" size={16} color={TEAL} />
                <Text style={styles.inputText} numberOfLines={1}>
                  7A/5 Thành Thái, Phường 14, Quận 10, TP. HCM
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* SECTION 2: GIÁ MONG MUỐN */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Ionicons name="card-outline" size={18} color={TEAL} />
            <Text style={styles.sectionTitle}>GIÁ MONG MUỐN</Text>
          </View>

          <View style={styles.priceRow}>
            <View style={styles.priceField}>
              <Text style={styles.fieldLabel}>Giá gốc (VNĐ)</Text>
              <View style={styles.priceInputDisabled}>
                <Text style={styles.priceTextDisabled}>{originalPrice}</Text>
              </View>
            </View>

            <Ionicons name="arrow-forward" size={18} color="#9ca3af" style={styles.priceArrow} />

            <View style={styles.priceField}>
              <Text style={styles.fieldLabel}>Giá pass (VNĐ)</Text>
              <View style={styles.priceInputActive}>
                <TextInput
                  style={styles.priceTextInput}
                  value={passPrice}
                  onChangeText={setPassPrice}
                  keyboardType="numeric"
                />
              </View>
            </View>
          </View>

          {/* Suggestion Banner */}
          <View style={styles.suggestionBanner}>
            <Ionicons name="trending-down" size={18} color="#c2410c" />
            <Text style={styles.suggestionText}>Mức giảm gợi ý: -15%</Text>
          </View>
        </View>

        {/* SECTION 3: LÝ DO & GHI CHÚ */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Ionicons name="chatbubble-ellipses-outline" size={18} color={TEAL} />
            <Text style={styles.sectionTitle}>LÝ DO & GHI CHÚ</Text>
          </View>

          <TextInput
            style={styles.textarea}
            value={noteText}
            onChangeText={setNoteText}
            multiline
            placeholder="Ví dụ: 'Mình bận việc đột xuất nên pass lại slot tối nay cho ae nào cần. Sân đẹp, mát mẻ...'"
            placeholderTextColor="#9ca3af"
          />

          {/* Quick Reason Chips */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexGrow: 0 }}>
            <View style={styles.quickChipsRow}>
              {QUICK_REASONS.map((reason, idx) => (
                <TouchableOpacity
                  key={reason}
                  style={idx === selectedQuickChip ? styles.quickChipActive : styles.quickChipInactive}
                  onPress={() => handleSelectQuickReason(idx, reason)}
                  activeOpacity={0.8}
                >
                  <Text
                    style={
                      idx === selectedQuickChip ? styles.quickChipActiveText : styles.quickChipInactiveText
                    }
                  >
                    {reason}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* SECTION 4: HÌNH ẢNH (TÙY CHỌN) */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Ionicons name="camera-outline" size={18} color={TEAL} />
            <Text style={styles.sectionTitle}>HÌNH ẢNH (TÙY CHỌN)</Text>
          </View>

          <View style={styles.imageUploadRow}>
            <TouchableOpacity
              style={styles.uploadBox}
              onPress={() =>
                Alert.alert('Tải ảnh', 'Chọn ảnh từ thư viện hoặc chụp ảnh mới', [
                  {
                    text: 'Thư viện',
                    onPress: () =>
                      setUploadedImage(
                        'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=400&auto=format&fit=crop'
                      ),
                  },
                  { text: 'Hủy', style: 'cancel' },
                ])
              }
              activeOpacity={0.8}
            >
              <Ionicons name="cloud-upload-outline" size={24} color="#64748b" />
              <Text style={styles.uploadText}>TẢI LÊN</Text>
            </TouchableOpacity>

            {uploadedImage && (
              <View style={styles.imagePreviewBox}>
                <Image source={{ uri: uploadedImage }} style={styles.imagePreview} />
                <TouchableOpacity
                  style={styles.removeImageBadge}
                  onPress={() => setUploadedImage(null)}
                >
                  <Ionicons name="close" size={12} color="#ffffff" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        {/* CHECKBOX AGREEMENT */}
        <TouchableOpacity
          style={styles.checkboxRow}
          onPress={() => setAgreed(!agreed)}
          activeOpacity={0.8}
        >
          <View style={[styles.checkboxBox, !agreed && { backgroundColor: '#fff', borderColor: '#cbd5e1' }]}>
            {agreed && <Ionicons name="checkmark" size={14} color="#ffffff" />}
          </View>
          <Text style={styles.checkboxText}>
            Tôi đồng ý với <Text style={styles.linkText}>Quy định cộng đồng</Text> của SportHub.
          </Text>
        </TouchableOpacity>

        {/* SUBMIT BUTTON */}
        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} activeOpacity={0.88}>
          <Text style={styles.submitBtnText}>Đăng tin ngay</Text>
          <Ionicons name="send" size={16} color="#ffffff" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default CreatePassSanScreen;
