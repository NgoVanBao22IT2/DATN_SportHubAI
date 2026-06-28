import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../core/navigation/navigation.types';
import styles from '../styles/VenuePriceScreenStyles';

type VenuePriceRouteProp = RouteProp<RootStackParamList, 'VenuePrice'>;
type VenuePriceNavProp = StackNavigationProp<RootStackParamList, 'VenuePrice'>;

type DayPeriod = 'weekday' | 'weekend';
type ContentTab = 'prices' | 'regulations';

type PriceRow = {
  timeSlot: string;
  fixedPrice: number;
  walkInPrice: number;
};

type PriceCategory = {
  id: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  weekdayPrices: PriceRow[];
  weekendPrices: PriceRow[];
};

const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=400&auto=format&fit=crop';

const WEEKDAY_PRICES: PriceRow[] = [
  { timeSlot: '09:00 - 15:00', fixedPrice: 50000, walkInPrice: 40000 },
  { timeSlot: '15:00 - 17:30', fixedPrice: 50000, walkInPrice: 50000 },
  { timeSlot: '17:30 - 21:30', fixedPrice: 80000, walkInPrice: 90000 },
  { timeSlot: '21:30 - 23:30', fixedPrice: 50000, walkInPrice: 60000 },
  { timeSlot: '05:00 - 09:00', fixedPrice: 50000, walkInPrice: 60000 },
];

const WEEKEND_PRICES: PriceRow[] = [
  { timeSlot: '09:00 - 15:00', fixedPrice: 60000, walkInPrice: 50000 },
  { timeSlot: '15:00 - 17:30', fixedPrice: 60000, walkInPrice: 60000 },
  { timeSlot: '17:30 - 21:30', fixedPrice: 90000, walkInPrice: 100000 },
  { timeSlot: '21:30 - 23:30', fixedPrice: 60000, walkInPrice: 70000 },
  { timeSlot: '05:00 - 09:00', fixedPrice: 60000, walkInPrice: 70000 },
];

const STUDENT_WEEKDAY_PRICES: PriceRow[] = [
  { timeSlot: '09:00 - 15:00', fixedPrice: 50000, walkInPrice: 40000 },
  { timeSlot: '15:00 - 17:30', fixedPrice: 50000, walkInPrice: 50000 },
  { timeSlot: '17:30 - 21:30', fixedPrice: 80000, walkInPrice: 80000 },
  { timeSlot: '21:30 - 23:30', fixedPrice: 50000, walkInPrice: 50000 },
  { timeSlot: '05:00 - 09:00', fixedPrice: 60000, walkInPrice: 60000 },
];

const STUDENT_WEEKEND_PRICES: PriceRow[] = [
  { timeSlot: '09:00 - 15:00', fixedPrice: 55000, walkInPrice: 45000 },
  { timeSlot: '15:00 - 17:30', fixedPrice: 55000, walkInPrice: 55000 },
  { timeSlot: '17:30 - 21:30', fixedPrice: 85000, walkInPrice: 85000 },
  { timeSlot: '21:30 - 23:30', fixedPrice: 55000, walkInPrice: 55000 },
  { timeSlot: '05:00 - 09:00', fixedPrice: 65000, walkInPrice: 65000 },
];

const PRICE_CATEGORIES: PriceCategory[] = [
  {
    id: 'general',
    title: 'Giá Chung',
    icon: 'document-text-outline',
    weekdayPrices: WEEKDAY_PRICES,
    weekendPrices: WEEKEND_PRICES,
  },
  {
    id: 'student',
    title: 'Học Sinh - Sinh Viên',
    icon: 'school-outline',
    weekdayPrices: STUDENT_WEEKDAY_PRICES,
    weekendPrices: STUDENT_WEEKEND_PRICES,
  },
];

const COURT_RULES = [
  'Vui lòng mang giày thể thao đế cao su (giày cầu lông chuyên dụng) để bảo vệ mặt sàn gỗ.',
  'Nghiêm cấm hút thuốc lá và mang theo các chất dễ cháy nổ vào khu vực thi đấu.',
  'Giữ gìn vệ sinh chung, bỏ rác đúng nơi quy định.',
  'Có mặt đúng giờ đã đặt. Sân sẽ bị hủy nếu quá 15 phút mà không thông báo.',
];

const REFUND_POLICIES = [
  { label: 'Hủy trước 24 giờ', value: 'Hoàn 100%', valueStyle: 'teal' as const },
  { label: 'Hủy trước 12 giờ', value: 'Hoàn 50%', valueStyle: 'orange' as const },
  { label: 'Hủy dưới 12 giờ', value: 'Không hoàn phí', valueStyle: 'red' as const },
];

const formatPrice = (price: number): string =>
  price.toLocaleString('vi-VN').replace(/,/g, '.') + ' đ';

const PriceTable = ({ rows }: { rows: PriceRow[] }) => (
  <View style={styles.tableCard}>
    <View style={styles.tableHeaderRow}>
      <View style={[styles.tableHeaderCell, styles.tableHeaderCellWide]}>
        <Text style={styles.tableHeaderText}>Khung giờ</Text>
      </View>
      <View style={styles.tableHeaderCell}>
        <Text style={styles.tableHeaderText}>Cố định{'\n'}(VNĐ/giờ)</Text>
      </View>
      <View style={styles.tableHeaderCell}>
        <Text style={styles.tableHeaderText}>Vãng lai{'\n'}(VNĐ/giờ)</Text>
      </View>
    </View>

    {rows.map((row, index) => (
      <View
        key={row.timeSlot}
        style={[styles.tableRow, index === rows.length - 1 && styles.tableRowLast]}
      >
        <View style={[styles.tableCell, styles.tableCellWide]}>
          <Text style={styles.timeSlotText}>{row.timeSlot}</Text>
        </View>
        <View style={styles.tableCell}>
          <Text style={styles.fixedPriceText}>{formatPrice(row.fixedPrice)}</Text>
        </View>
        <View style={styles.tableCell}>
          <Text style={styles.walkInPriceText}>{formatPrice(row.walkInPrice)}</Text>
        </View>
      </View>
    ))}
  </View>
);

const PriceCategorySection = ({
  category,
  dayPeriod,
  onDayPeriodChange,
  altBackground = false,
}: {
  category: PriceCategory;
  dayPeriod: DayPeriod;
  onDayPeriodChange: (period: DayPeriod) => void;
  altBackground?: boolean;
}) => {
  const rows = dayPeriod === 'weekday' ? category.weekdayPrices : category.weekendPrices;

  return (
    <View style={[styles.priceSection, altBackground && styles.priceSectionAlt]}>
      <View style={styles.sectionTitleRow}>
        <Ionicons name={category.icon} size={20} color="#16a34a" />
        <Text style={styles.sectionTitle}>{category.title}</Text>
      </View>

      <View style={styles.dayToggleRow}>
        <TouchableOpacity
          style={[styles.dayToggle, dayPeriod === 'weekday' && styles.dayToggleActive]}
          onPress={() => onDayPeriodChange('weekday')}
          activeOpacity={0.8}
        >
          <Text style={[styles.dayToggleText, dayPeriod === 'weekday' && styles.dayToggleTextActive]}>
            T2 - T6
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.dayToggle, dayPeriod === 'weekend' && styles.dayToggleActive]}
          onPress={() => onDayPeriodChange('weekend')}
          activeOpacity={0.8}
        >
          <Text style={[styles.dayToggleText, dayPeriod === 'weekend' && styles.dayToggleTextActive]}>
            T7 - CN
          </Text>
        </TouchableOpacity>
      </View>

      <PriceTable rows={rows} />

      <View style={styles.priceNoteRow}>
        <Ionicons name="information-circle-outline" size={12} color="#6b7280" />
        <Text style={styles.priceNoteText}>
          Giá có thể thay đổi theo thời điểm hoặc chương trình khuyến mãi.
        </Text>
      </View>
    </View>
  );
};

const RegulationsTab = () => {
  const getPolicyValueStyle = (style: 'teal' | 'orange' | 'red') => {
    if (style === 'teal') return styles.policyValueTeal;
    if (style === 'orange') return styles.policyValueOrange;
    return styles.policyValueRed;
  };

  return (
    <View style={styles.regulationsSection}>
      <View style={styles.regulationCard}>
        <View style={styles.regulationCardTitleRow}>
          <Ionicons name="hammer-outline" size={18} color="#00647e" />
          <Text style={styles.regulationCardTitle}>Nội quy sân</Text>
        </View>

        <View style={styles.ruleList}>
          {COURT_RULES.map((rule) => (
            <View key={rule} style={styles.ruleItemRow}>
              <Ionicons name="checkmark-circle" size={16} color="#00647e" />
              <Text style={styles.ruleItemText}>{rule}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.regulationCard}>
        <View style={styles.regulationCardTitleRow}>
          <Ionicons name="return-down-back-outline" size={20} color="#00647e" />
          <Text style={styles.regulationCardTitle}>Chính sách hoàn/hủy</Text>
        </View>

        <View style={styles.policyList}>
          {REFUND_POLICIES.map((policy) => (
            <View key={policy.label} style={styles.policyRow}>
              <Text style={styles.policyLabel}>{policy.label}</Text>
              <Text style={getPolicyValueStyle(policy.valueStyle)}>{policy.value}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.refundNote}>
          * Tiền hoàn sẽ được cộng vào ví SportHub của bạn trong vòng 3-5 ngày làm việc.
        </Text>
      </View>
    </View>
  );
};

export const VenuePriceScreen = () => {
  const navigation = useNavigation<VenuePriceNavProp>();
  const route = useRoute<VenuePriceRouteProp>();

  const {
    venueName = 'ACE BADMINTON',
    venueAddress = '2A, Hòa Nam 6, Phường Hòa Khánh, TP Đà Nẵng',
    rating = 4.8,
    reviewCount = 128,
    sportType = 'Cầu lông',
    courtCount = 6,
    imageUrl = DEFAULT_IMAGE,
  } = route.params;

  const [activeTab, setActiveTab] = useState<ContentTab>('prices');
  const [generalDayPeriod, setGeneralDayPeriod] = useState<DayPeriod>('weekday');
  const [studentDayPeriod, setStudentDayPeriod] = useState<DayPeriod>('weekday');
  const dateRangeLabel = '01/06/2025 - 30/06/2025';

  const handleBack = () => navigation.goBack();

  const handleDateRangePress = () => {
    Alert.alert(
      'Chọn khoảng thời gian',
      'Bộ chọn ngày chi tiết sẽ được kết nối ở bước tiếp theo.',
      [{ text: 'OK' }],
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={22} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bảng giá sân</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.heroSection}>
          <Image source={{ uri: imageUrl }} style={styles.heroImage} resizeMode="cover" />
          <View style={styles.heroInfo}>
            <Text style={styles.venueName}>{venueName}</Text>
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={16} color="#feae2c" />
              <Text style={styles.ratingValue}>{rating}</Text>
              <Text style={styles.reviewCount}>({reviewCount} đánh giá)</Text>
            </View>
            <View style={styles.locationRow}>
              <Ionicons name="location-outline" size={16} color="#258fb0" />
              <Text style={styles.locationText}>{venueAddress}</Text>
            </View>
            <View style={styles.sportRow}>
              <Ionicons name="tennisball-outline" size={16} color="#258fb0" />
              <Text style={styles.sportText}>{sportType} • {courtCount} sân</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.dateRangePicker} onPress={handleDateRangePress} activeOpacity={0.8}>
          <View style={styles.dateRangeLeft}>
            <Ionicons name="calendar-outline" size={20} color="#258fb0" />
            <Text style={styles.dateRangeText}>{dateRangeLabel}</Text>
          </View>
          <Ionicons name="chevron-down" size={16} color="#9ca3af" />
        </TouchableOpacity>

        <View style={styles.contentTabs}>
          <TouchableOpacity
            style={[styles.contentTab, activeTab === 'prices' && styles.contentTabActive]}
            onPress={() => setActiveTab('prices')}
            activeOpacity={0.8}
          >
            <Text style={[styles.contentTabText, activeTab === 'prices' && styles.contentTabTextActive]}>
              Bảng giá
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.contentTab, activeTab === 'regulations' && styles.contentTabActive]}
            onPress={() => setActiveTab('regulations')}
            activeOpacity={0.8}
          >
            <Text style={[styles.contentTabText, activeTab === 'regulations' && styles.contentTabTextActive]}>
              Quy định & Lưu ý
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'prices' ? (
          <>
            <PriceCategorySection
              category={PRICE_CATEGORIES[0]}
              dayPeriod={generalDayPeriod}
              onDayPeriodChange={setGeneralDayPeriod}
            />
            <PriceCategorySection
              category={PRICE_CATEGORIES[1]}
              dayPeriod={studentDayPeriod}
              onDayPeriodChange={setStudentDayPeriod}
              altBackground
            />
          </>
        ) : (
          <RegulationsTab />
        )}
      </ScrollView>
    </View>
  );
};

export default VenuePriceScreen;
