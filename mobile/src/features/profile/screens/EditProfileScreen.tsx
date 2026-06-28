import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { RootStackParamList } from '../../../core/navigation/navigation.types';
import { RootState, AppDispatch } from '../../../core/store/store';
import { updateUserProfile, type User } from '../../auth/slices/authSlice';
import styles from '../styles/EditProfileScreenStyles';

const sportsOptions = ['Cầu lông', 'Pickleball', 'Bóng đá', 'Tennis', 'Bóng chuyền'];

const EditProfileScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'ProfileEdit'>>();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user) as User | null;

  const [fullName, setFullName] = useState(user?.fullName ?? 'Nguyễn Văn A');
  const [phoneNumber, setPhoneNumber] = useState('090 123 4567');
  const [email, setEmail] = useState(user?.email ?? 'example@gmail.com');
  const [address, setAddress] = useState('Quận 7, TP. Hồ Chí Minh');
  const [birthday, setBirthday] = useState('12/05/1998');
  const [gender, setGender] = useState<'Nam' | 'Nữ' | 'Khác'>('Nam');
  const [favoriteSports, setFavoriteSports] = useState<string[]>(['Cầu lông', 'Pickleball', 'Bóng đá']);
  const [bio, setBio] = useState('Yêu thích thể thao và khám phá các sân chất lượng!');
  const [promoNotifications, setPromoNotifications] = useState(true);
  const [bookingReminders, setBookingReminders] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const avatarUrl = user?.avatarUrl ?? 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop';
  const bioLength = useMemo(() => bio.length, [bio]);

  const toggleSport = (sport: string) => {
    setFavoriteSports((current) =>
      current.includes(sport) ? current.filter((item) => item !== sport) : [...current, sport]
    );
  };

  const handlePickAddress = () => {
    Alert.alert('Chọn địa chỉ', 'Chức năng chọn địa chỉ chi tiết sẽ kết nối bản đồ hoặc danh sách địa điểm sau.');
  };

  const handleChangeAvatar = () => {
    Alert.alert('Thay đổi ảnh', 'Kết nối chọn ảnh từ thư viện/camera sẽ được thêm ở bước sau.');
  };

  const handleSave = async () => {
    if (!fullName.trim() || !email.trim() || !phoneNumber.trim()) {
      Alert.alert('Thiếu thông tin', 'Vui lòng nhập đầy đủ họ tên, số điện thoại và email.');
      return;
    }

    setIsSaving(true);
    try {
      dispatch(
        updateUserProfile({
          fullName: fullName.trim(),
          email: email.trim(),
        })
      );

      Alert.alert('Lưu thành công', 'Thông tin hồ sơ đã được cập nhật.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chỉnh sửa hồ sơ</Text>
      </View>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.card}>
            <View style={styles.avatarSection}>
              <View style={styles.avatarWrap}>
                <Image source={{ uri: avatarUrl }} style={styles.avatar} />
                <TouchableOpacity style={styles.cameraBadge} onPress={handleChangeAvatar}>
                  <Ionicons name="camera" size={16} color="#ffffff" />
                </TouchableOpacity>
              </View>

              <View style={styles.avatarTextWrap}>
                <Text style={styles.sectionTitle}>Ảnh đại diện</Text>
                <TouchableOpacity style={styles.outlineButton} onPress={handleChangeAvatar}>
                  <Ionicons name="cloud-upload-outline" size={16} color="#258fb0" />
                  <Text style={styles.outlineButtonText}>Thay đổi ảnh</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionHeader}>Thông tin cá nhân</Text>

            <FieldRow icon="person-outline" label="Họ và tên">
              <TextInput style={styles.textInput} value={fullName} onChangeText={setFullName} placeholder="Nguyễn Văn A" />
            </FieldRow>

            <FieldRow icon="call-outline" label="Số ĐT">
              <TextInput style={styles.textInput} value={phoneNumber} onChangeText={setPhoneNumber} placeholder="090 123 4567" keyboardType="phone-pad" />
            </FieldRow>

            <FieldRow icon="mail-outline" label="Email">
              <TextInput style={styles.textInput} value={email} onChangeText={setEmail} placeholder="example@gmail.com" keyboardType="email-address" autoCapitalize="none" />
            </FieldRow>

            <FieldRow icon="location-outline" label="Địa chỉ">
              <TouchableOpacity style={styles.selectRow} onPress={handlePickAddress}>
                <Text style={styles.selectValue}>{address}</Text>
                <Ionicons name="chevron-forward" size={18} color="#9ca3af" />
              </TouchableOpacity>
            </FieldRow>

            <FieldRow icon="calendar-outline" label="Ngày sinh">
              <TextInput style={styles.textInput} value={birthday} onChangeText={setBirthday} placeholder="12/05/1998" />
            </FieldRow>

            <FieldRow icon="person-outline" label="Giới tính">
              <View style={styles.segmentRow}>
                {(['Nam', 'Nữ', 'Khác'] as const).map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[styles.segmentButton, gender === option && styles.segmentButtonActive]}
                    onPress={() => setGender(option)}
                  >
                    <Text style={[styles.segmentButtonText, gender === option && styles.segmentButtonTextActive]}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </FieldRow>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionHeader}>Thông tin bổ sung</Text>

            <FieldRow icon="heart-outline" label="Môn thể thao yêu thích" alignTop>
              <View style={styles.tagBox}>
                <View style={styles.tagsWrap}>
                  {favoriteSports.map((sport) => (
                    <TouchableOpacity key={sport} style={styles.tagChip} onPress={() => toggleSport(sport)}>
                      <Text style={styles.tagChipText}>{sport}  ×</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <TouchableOpacity style={styles.selectRow} onPress={() => Alert.alert('Môn thể thao yêu thích', 'Bạn có thể mở bộ chọn môn thể thao ở bước sau.')}>
                  <Text style={styles.selectHint}>Thêm môn thể thao</Text>
                  <Ionicons name="chevron-down" size={18} color="#9ca3af" />
                </TouchableOpacity>
              </View>
            </FieldRow>

            <FieldRow icon="pencil" label="Giới thiệu bản thân" alignTop>
              <View style={styles.bioBox}>
                <TextInput
                  style={styles.bioInput}
                  value={bio}
                  onChangeText={setBio}
                  multiline
                  textAlignVertical="top"
                  maxLength={150}
                  placeholder="Viết vài dòng về bạn"
                />
                <Text style={styles.counter}>{bioLength}/150</Text>
              </View>
            </FieldRow>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionHeader}>Tùy chọn thông báo</Text>

            <ToggleRow
              icon="notifications-outline"
              label="Nhận thông báo khuyến mãi"
              value={promoNotifications}
              onToggle={() => setPromoNotifications((current) => !current)}
            />
            <ToggleRow
              icon="calendar-outline"
              label="Nhắc lịch đặt sân"
              value={bookingReminders}
              onToggle={() => setBookingReminders((current) => !current)}
            />
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={isSaving}>
            {isSaving ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.saveButtonText}>Lưu thay đổi</Text>
            )}
          </TouchableOpacity>
        </View>
    </View>
  );
};

const FieldRow = ({
  icon,
  label,
  children,
  alignTop = false,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  children: React.ReactNode;
  alignTop?: boolean;
}) => (
  <View style={[styles.fieldRow, alignTop && styles.fieldRowTop]}> 
    <View style={styles.fieldLabelWrap}>
      <Ionicons name={icon} size={24} color="#6b7280" />
      <Text style={styles.fieldLabel}>{label}</Text>
    </View>
    <View style={styles.fieldValueWrap}>{children}</View>
  </View>
);

const ToggleRow = ({
  icon,
  label,
  value,
  onToggle,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: boolean;
  onToggle: () => void;
}) => (
  <View style={styles.toggleRow}>
    <View style={styles.toggleLabelWrap}>
      <Ionicons name={icon} size={24} color="#6b7280" />
      <Text style={styles.toggleLabel}>{label}</Text>
    </View>
    <TouchableOpacity style={[styles.toggleTrack, value && styles.toggleTrackActive]} onPress={onToggle} activeOpacity={0.8}>
      <View style={[styles.toggleThumb, value && styles.toggleThumbActive]} />
    </TouchableOpacity>
  </View>
);

export default EditProfileScreen;
