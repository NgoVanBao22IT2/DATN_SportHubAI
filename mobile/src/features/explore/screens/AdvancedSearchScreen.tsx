import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Platform,
  PanResponder,
  Dimensions,
  Modal,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ─── Data ────────────────────────────────────────────────────────────────────

const SPORTS = [
  'Tất cả',
  'Cầu lông',
  'Pickleball',
  'Tennis',
  'Bóng đá',
  'Bóng rổ',
  'Bơi lội',
  'Gym',
];

const DISTRICTS = [
  'Tất cả khu vực',
  'Quận 1',
  'Quận 2',
  'Quận 3',
  'Quận 4',
  'Quận 5',
  'Quận 6',
  'Quận 7',
  'Quận 8',
  'Quận 9',
  'Quận 10',
  'Quận 11',
  'Quận 12',
  'Bình Thạnh',
  'Gò Vấp',
  'Tân Bình',
  'Phú Nhuận',
  'Thủ Đức',
];

const SKILL_LEVELS = [
  'Chọn trình độ',
  'Mọi trình độ',
  'Newbie',
  'Yếu',
  'TBY',
  'TB-',
  'Trung bình',
  'TB+',
  'Khá / Tốt',
  'Chuyên nghiệp',
];

const GENDERS = ['Cả hai', 'Nam', 'Nữ'];

const AGE_GROUPS = ['Tất cả', '18-25', '26-35', '36-45', '46+'];

const RANGE_STEPS = [1, 2, 3, 5, 10, 20, 50];

// ─── Reusable dropdown component ─────────────────────────────────────────────

interface DropdownProps {
  label: string;
  value: string;
  options: string[];
  onSelect: (val: string) => void;
  flex?: number;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  value,
  options,
  onSelect,
  flex,
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <View style={[styles.fieldGroup, flex ? { flex } : {}]}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TouchableOpacity
        style={styles.dropdownBtn}
        onPress={() => setVisible(true)}
        activeOpacity={0.8}
      >
        <Text style={styles.dropdownBtnText}>{value}</Text>
        <Ionicons name="chevron-down" size={16} color="#a0c4d8" />
      </TouchableOpacity>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setVisible(false)}
        >
          <View style={styles.dropdownModal}>
            <Text style={styles.dropdownModalTitle}>{label}</Text>
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.dropdownOption,
                    item === value && styles.dropdownOptionActive,
                  ]}
                  onPress={() => {
                    onSelect(item);
                    setVisible(false);
                  }}
                >
                  <Text
                    style={[
                      styles.dropdownOptionText,
                      item === value && styles.dropdownOptionTextActive,
                    ]}
                  >
                    {item}
                  </Text>
                  {item === value && (
                    <Ionicons name="checkmark" size={16} color="#00cfff" />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

// ─── Range Slider ─────────────────────────────────────────────────────────────

const SLIDER_TRACK_WIDTH = SCREEN_WIDTH - 64; // padding left/right

const RangeSlider: React.FC<{
  value: number;
  onChange: (v: number) => void;
}> = ({ value, onChange }) => {
  const maxKm = 50;
  const ratio = value / maxKm;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        const newRatio = Math.min(
          1,
          Math.max(0, (gesture.moveX - 32) / SLIDER_TRACK_WIDTH),
        );
        onChange(Math.round(newRatio * maxKm));
      },
    }),
  ).current;

  return (
    <View style={styles.sliderContainer} {...panResponder.panHandlers}>
      {/* Track */}
      <View style={styles.sliderTrack}>
        {/* Active portion */}
        <View style={[styles.sliderFill, { width: `${ratio * 100}%` }]} />
        {/* Thumb */}
        <View style={[styles.sliderThumb, { left: `${ratio * 100}%` as any }]}>
          <View style={styles.sliderThumbInner} />
        </View>
      </View>
    </View>
  );
};

// ─── Date / Time picker stubs ──────────────────────────────────────────────

const today = new Date();
const formatDate = (d: Date) =>
  `${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}/${d.getFullYear()}`;
const formatTime = (h: number, m: number) => {
  const period = h >= 12 ? 'PM' : 'AM';
  const hh = h % 12 === 0 ? 12 : h % 12;
  return `${String(hh).padStart(2, '0')}:${String(m).padStart(2, '0')} ${period}`;
};

// ─── Main Screen ─────────────────────────────────────────────────────────────

const AdvancedSearchScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  // Form state
  const [sport, setSport] = useState('Cầu lông');
  const [district, setDistrict] = useState('Quận 1');
  const [location, setLocation] = useState('37 Phước Tường 16, TP Đà Nẵng');
  const [playDate, setPlayDate] = useState(today);
  const [playHour, setPlayHour] = useState(18);
  const [playMinute, setPlayMinute] = useState(0);
  const [skillLevel, setSkillLevel] = useState('Chọn trình độ');
  const [gender, setGender] = useState('Cả hai');
  const [ageGroup, setAgeGroup] = useState('Tất cả');
  const [rangeKm, setRangeKm] = useState(5);
  const [cost, setCost] = useState('');

  // Date & time modal state
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [tempDate, setTempDate] = useState(today);
  const [tempHour, setTempHour] = useState(18);
  const [tempMinute, setTempMinute] = useState(0);

  // ── Handlers ────────────────────────────
  const handleSearch = () => {
    const params = {
      sport,
      district,
      location,
      playDate: formatDate(playDate),
      playTime: formatTime(playHour, playMinute),
      skillLevel,
      gender,
      ageGroup,
      rangeKm,
      cost,
    };
    // Navigate back with results OR go to results list screen
    Alert.alert(
      '✦ Đang tìm kiếm...',
      `Môn: ${sport}\nKhu vực: ${district}\nTrình độ: ${skillLevel}\nPhạm vi: ${rangeKm}km`,
      [{ text: 'OK' }],
    );
  };

  // ── Date picker helpers ─────────────────
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from(
    { length: new Date(tempDate.getFullYear(), tempDate.getMonth() + 1, 0).getDate() },
    (_, i) => i + 1,
  );
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = [0, 15, 30, 45];

  // ── Circuit board decorative circles (static) ───────────────────────────
  const circlePositions = [
    { top: 80, left: 40 },
    { top: 140, left: SCREEN_WIDTH - 50 },
    { top: 220, left: 20 },
    { top: 300, left: SCREEN_WIDTH - 30 },
    { top: 380, left: 60 },
    { top: 440, left: SCREEN_WIDTH - 80 },
    { top: 530, left: 15 },
    { top: 600, left: SCREEN_WIDTH - 25 },
  ];

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#050e1f" />

      {/* Background gradient layer */}
      <View style={styles.bgGradient} />

      {/* Circuit board decorative vertical lines */}
      {[0.12, 0.28, 0.52, 0.72, 0.88].map((pct, i) => (
        <View
          key={`vline-${i}`}
          style={[styles.circuitLine, { left: SCREEN_WIDTH * pct }]}
        />
      ))}

      {/* Circuit node dots */}
      {circlePositions.map((pos, i) => (
        <View
          key={`node-${i}`}
          style={[styles.circuitNode, { top: pos.top, left: pos.left }]}
        />
      ))}

      <SafeAreaView style={{ flex: 1 }}>
        {/* ── Header ──────────────────────────────── */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerBack}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Tìm người chơi</Text>
          <View style={styles.headerAvatar}>
            <Ionicons name="person-circle" size={36} color="#5bb3cc" />
          </View>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* ── Hero section ────────────────────────── */}
          <View style={styles.heroSection}>
            <View style={styles.sparkleCircle}>
              <MaterialCommunityIcons name="shimmer" size={30} color="#00cfff" />
            </View>
            <Text style={styles.heroTitle}>Tìm kèo nâng cao với AI</Text>
            <Text style={styles.heroSubtitle}>
              Sử dụng ngôn ngữ tự nhiên để tìm sân và đồng đội nhanh chóng.
            </Text>
          </View>

          {/* ── Form card ───────────────────────────── */}
          <View style={styles.formCard}>
            {/* Sport dropdown */}
            <Dropdown
              label="Chọn môn thể thao"
              value={sport}
              options={SPORTS}
              onSelect={setSport}
            />

            {/* District dropdown */}
            <Dropdown
              label="Khu vực"
              value={district}
              options={DISTRICTS}
              onSelect={setDistrict}
            />

            {/* Location text input */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Vị trí của bạn</Text>
              <TextInput
                style={styles.textInput}
                value={location}
                onChangeText={setLocation}
                placeholder="Nhập địa chỉ của bạn"
                placeholderTextColor="#567a8a"
              />
            </View>

            {/* Date + Time row */}
            <View style={styles.rowGroup}>
              {/* Date */}
              <View style={[styles.fieldGroup, { flex: 1, marginRight: 8 }]}>
                <Text style={styles.fieldLabel}>Ngày chơi</Text>
                <TouchableOpacity
                  style={styles.dropdownBtn}
                  onPress={() => {
                    setTempDate(playDate);
                    setShowDatePicker(true);
                  }}
                >
                  <Ionicons name="calendar-outline" size={15} color="#a0c4d8" />
                  <Text style={[styles.dropdownBtnText, { marginLeft: 6, flex: 1 }]}>
                    {formatDate(playDate)}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Time */}
              <View style={[styles.fieldGroup, { flex: 1, marginLeft: 8 }]}>
                <Text style={styles.fieldLabel}>Thời gian</Text>
                <TouchableOpacity
                  style={styles.dropdownBtn}
                  onPress={() => {
                    setTempHour(playHour);
                    setTempMinute(playMinute);
                    setShowTimePicker(true);
                  }}
                >
                  <Ionicons name="time-outline" size={15} color="#a0c4d8" />
                  <Text style={[styles.dropdownBtnText, { marginLeft: 6, flex: 1 }]}>
                    {formatTime(playHour, playMinute)}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Skill level */}
            <Dropdown
              label="Trình độ"
              value={skillLevel}
              options={SKILL_LEVELS}
              onSelect={setSkillLevel}
            />

            {/* Gender + Age row */}
            <View style={styles.rowGroup}>
              <Dropdown
                label="Giới tính"
                value={gender}
                options={GENDERS}
                onSelect={setGender}
                flex={1}
              />
              <View style={{ width: 16 }} />
              <Dropdown
                label="Độ tuổi"
                value={ageGroup}
                options={AGE_GROUPS}
                onSelect={setAgeGroup}
                flex={1}
              />
            </View>

            {/* Range slider */}
            <View style={styles.fieldGroup}>
              <View style={styles.sliderLabelRow}>
                <Text style={styles.fieldLabel}>Phạm vi (km)</Text>
                <Text style={styles.sliderValueBadge}>
                  {rangeKm < 50 ? `<${rangeKm}km` : '≥50km'}
                </Text>
              </View>
              <RangeSlider value={rangeKm} onChange={setRangeKm} />
            </View>

            {/* Cost input */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Chi phí dự kiến (VNĐ/người)</Text>
              <View style={styles.costInputRow}>
                <TextInput
                  style={[styles.textInput, { flex: 1, marginBottom: 0 }]}
                  value={cost}
                  onChangeText={setCost}
                  keyboardType="numeric"
                  placeholder="Ví dụ: 50.000"
                  placeholderTextColor="#567a8a"
                />
                <TouchableOpacity style={styles.costIconBtn}>
                  <MaterialCommunityIcons name="cash" size={20} color="#5bb3cc" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* ── Find button ──────────────────────────── */}
          <TouchableOpacity
            style={styles.findBtn}
            activeOpacity={0.85}
            onPress={handleSearch}
          >
            <MaterialCommunityIcons name="shimmer" size={18} color="#fff" />
            <Text style={styles.findBtnText}>Tìm ngay</Text>
          </TouchableOpacity>

          <View style={{ height: 40 }} />
        </ScrollView>
      </SafeAreaView>

      {/* ── Date Picker Modal ────────────────────── */}
      <Modal
        visible={showDatePicker}
        transparent
        animationType="slide"
        onRequestClose={() => setShowDatePicker(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowDatePicker(false)}
        >
          <View style={styles.pickerModal}>
            <Text style={styles.pickerModalTitle}>Chọn ngày chơi</Text>
            <View style={styles.pickerRow}>
              {/* Month */}
              <View style={styles.pickerColumn}>
                <Text style={styles.pickerColLabel}>Tháng</Text>
                <ScrollView showsVerticalScrollIndicator={false}>
                  {months.map((m) => (
                    <TouchableOpacity
                      key={m}
                      style={[
                        styles.pickerItem,
                        tempDate.getMonth() + 1 === m && styles.pickerItemActive,
                      ]}
                      onPress={() =>
                        setTempDate(
                          new Date(tempDate.getFullYear(), m - 1, tempDate.getDate()),
                        )
                      }
                    >
                      <Text
                        style={[
                          styles.pickerItemText,
                          tempDate.getMonth() + 1 === m && styles.pickerItemTextActive,
                        ]}
                      >
                        {m}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              {/* Day */}
              <View style={styles.pickerColumn}>
                <Text style={styles.pickerColLabel}>Ngày</Text>
                <ScrollView showsVerticalScrollIndicator={false}>
                  {days.map((d) => (
                    <TouchableOpacity
                      key={d}
                      style={[
                        styles.pickerItem,
                        tempDate.getDate() === d && styles.pickerItemActive,
                      ]}
                      onPress={() =>
                        setTempDate(
                          new Date(tempDate.getFullYear(), tempDate.getMonth(), d),
                        )
                      }
                    >
                      <Text
                        style={[
                          styles.pickerItemText,
                          tempDate.getDate() === d && styles.pickerItemTextActive,
                        ]}
                      >
                        {d}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              {/* Year */}
              <View style={styles.pickerColumn}>
                <Text style={styles.pickerColLabel}>Năm</Text>
                <ScrollView showsVerticalScrollIndicator={false}>
                  {[2024, 2025, 2026, 2027].map((y) => (
                    <TouchableOpacity
                      key={y}
                      style={[
                        styles.pickerItem,
                        tempDate.getFullYear() === y && styles.pickerItemActive,
                      ]}
                      onPress={() =>
                        setTempDate(
                          new Date(y, tempDate.getMonth(), tempDate.getDate()),
                        )
                      }
                    >
                      <Text
                        style={[
                          styles.pickerItemText,
                          tempDate.getFullYear() === y && styles.pickerItemTextActive,
                        ]}
                      >
                        {y}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>

            <View style={styles.pickerActions}>
              <TouchableOpacity
                style={styles.pickerCancelBtn}
                onPress={() => setShowDatePicker(false)}
              >
                <Text style={styles.pickerCancelText}>Huỷ</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.pickerConfirmBtn}
                onPress={() => {
                  setPlayDate(tempDate);
                  setShowDatePicker(false);
                }}
              >
                <Text style={styles.pickerConfirmText}>Xác nhận</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* ── Time Picker Modal ────────────────────── */}
      <Modal
        visible={showTimePicker}
        transparent
        animationType="slide"
        onRequestClose={() => setShowTimePicker(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowTimePicker(false)}
        >
          <View style={styles.pickerModal}>
            <Text style={styles.pickerModalTitle}>Chọn thời gian</Text>
            <View style={styles.pickerRow}>
              {/* Hour */}
              <View style={styles.pickerColumn}>
                <Text style={styles.pickerColLabel}>Giờ</Text>
                <ScrollView showsVerticalScrollIndicator={false}>
                  {hours.map((h) => (
                    <TouchableOpacity
                      key={h}
                      style={[
                        styles.pickerItem,
                        tempHour === h && styles.pickerItemActive,
                      ]}
                      onPress={() => setTempHour(h)}
                    >
                      <Text
                        style={[
                          styles.pickerItemText,
                          tempHour === h && styles.pickerItemTextActive,
                        ]}
                      >
                        {String(h).padStart(2, '0')}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              {/* Minute */}
              <View style={styles.pickerColumn}>
                <Text style={styles.pickerColLabel}>Phút</Text>
                <ScrollView showsVerticalScrollIndicator={false}>
                  {minutes.map((m) => (
                    <TouchableOpacity
                      key={m}
                      style={[
                        styles.pickerItem,
                        tempMinute === m && styles.pickerItemActive,
                      ]}
                      onPress={() => setTempMinute(m)}
                    >
                      <Text
                        style={[
                          styles.pickerItemText,
                          tempMinute === m && styles.pickerItemTextActive,
                        ]}
                      >
                        {String(m).padStart(2, '0')}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>

            <View style={styles.pickerActions}>
              <TouchableOpacity
                style={styles.pickerCancelBtn}
                onPress={() => setShowTimePicker(false)}
              >
                <Text style={styles.pickerCancelText}>Huỷ</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.pickerConfirmBtn}
                onPress={() => {
                  setPlayHour(tempHour);
                  setPlayMinute(tempMinute);
                  setShowTimePicker(false);
                }}
              >
                <Text style={styles.pickerConfirmText}>Xác nhận</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#050e1f',
  },
  bgGradient: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#070f22',
    opacity: 0.95,
  },

  // Circuit decorations
  circuitLine: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: 'rgba(0, 180, 220, 0.12)',
  },
  circuitNode: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(0, 207, 255, 0.55)',
    shadowColor: '#00cfff',
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 4,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerBack: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
    marginLeft: 12,
    letterSpacing: 0.3,
  },
  headerAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(0,207,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Scroll
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 20 },

  // Hero
  heroSection: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  sparkleCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(0,207,255,0.12)',
    borderWidth: 1.5,
    borderColor: 'rgba(0,207,255,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    shadowColor: '#00cfff',
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
  heroTitle: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: 0.4,
    marginBottom: 8,
  },
  heroSubtitle: {
    color: '#7bafc5',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 20,
  },

  // Form card
  formCard: {
    backgroundColor: 'rgba(6,20,40,0.82)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,207,255,0.14)',
    padding: 18,
    marginBottom: 20,
  },
  fieldGroup: {
    marginBottom: 16,
  },
  fieldLabel: {
    color: '#c8e6f5',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 7,
    letterSpacing: 0.2,
  },
  dropdownBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(0,207,255,0.22)',
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  dropdownBtnText: {
    flex: 1,
    color: '#d8eef8',
    fontSize: 14,
  },
  textInput: {
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(0,207,255,0.22)',
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: '#d8eef8',
    fontSize: 14,
    marginBottom: 0,
  },
  rowGroup: {
    flexDirection: 'row',
    marginBottom: 16,
  },

  // Slider
  sliderLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sliderValueBadge: {
    color: '#00cfff',
    fontSize: 13,
    fontWeight: '700',
    backgroundColor: 'rgba(0,207,255,0.12)',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,207,255,0.3)',
  },
  sliderContainer: {
    height: 36,
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  sliderTrack: {
    height: 4,
    backgroundColor: 'rgba(0,207,255,0.15)',
    borderRadius: 2,
    position: 'relative',
    justifyContent: 'center',
  },
  sliderFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#00cfff',
    borderRadius: 2,
  },
  sliderThumb: {
    position: 'absolute',
    top: -12,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(0,207,255,0.2)',
    borderWidth: 2,
    borderColor: '#00cfff',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -14,
    shadowColor: '#00cfff',
    shadowOpacity: 0.7,
    shadowRadius: 6,
    elevation: 6,
  },
  sliderThumbInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#00cfff',
  },

  // Cost input
  costInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(0,207,255,0.22)',
    paddingRight: 4,
  },
  costIconBtn: {
    padding: 10,
  },

  // Find button
  findBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0e8fa8',
    borderRadius: 14,
    paddingVertical: 16,
    shadowColor: '#00cfff',
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
    gap: 8,
  },
  findBtnText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 0.4,
  },

  // Modal overlay
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  // Dropdown modal
  dropdownModal: {
    backgroundColor: '#0d2135',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,207,255,0.25)',
    width: '100%',
    maxHeight: 400,
    padding: 12,
  },
  dropdownModalTitle: {
    color: '#a0d8ef',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 10,
    paddingLeft: 4,
  },
  dropdownOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 2,
  },
  dropdownOptionActive: {
    backgroundColor: 'rgba(0,207,255,0.1)',
  },
  dropdownOptionText: {
    color: '#c8dde8',
    fontSize: 14,
  },
  dropdownOptionTextActive: {
    color: '#00cfff',
    fontWeight: '700',
  },

  // Picker modal
  pickerModal: {
    backgroundColor: '#0d2135',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,207,255,0.25)',
    width: '100%',
    padding: 16,
  },
  pickerModalTitle: {
    color: '#a0d8ef',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },
  pickerRow: {
    flexDirection: 'row',
    height: 180,
  },
  pickerColumn: {
    flex: 1,
    alignItems: 'center',
  },
  pickerColLabel: {
    color: '#567a8a',
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  pickerItem: {
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 2,
    minWidth: 56,
    alignItems: 'center',
  },
  pickerItemActive: {
    backgroundColor: 'rgba(0,207,255,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(0,207,255,0.4)',
  },
  pickerItemText: {
    color: '#90b5c8',
    fontSize: 15,
  },
  pickerItemTextActive: {
    color: '#00cfff',
    fontWeight: '700',
  },
  pickerActions: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 12,
  },
  pickerCancelBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.06)',
    alignItems: 'center',
  },
  pickerCancelText: {
    color: '#90b5c8',
    fontWeight: '600',
    fontSize: 14,
  },
  pickerConfirmBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#0e8fa8',
    alignItems: 'center',
  },
  pickerConfirmText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
});

export default AdvancedSearchScreen;
