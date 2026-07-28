import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
  StatusBar,
  Alert,
  Switch,
  StyleSheet,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList } from '../../../core/navigation/navigation.types';
import styles from '../styles/FeaturedScreenStyles';

type FeaturedNavProp = StackNavigationProp<RootStackParamList>;

const TEAL = '#1989a8';
const CATEGORY_CHIPS = ['Tất cả', 'Gói hội viên', 'Khóa học', 'Sự kiện', 'Pass sân'];

// ── DATA: Tất cả tab ─────────────────────────────────────────
interface CourtSchedule { courtName: string; slots: string[] }
interface DateSchedule { id: string; dateLabel: string; courts: CourtSchedule[] }

const SCHEDULE_DATA: DateSchedule[] = [
  {
    id: '1', dateLabel: '10/07/2026',
    courts: [
      { courtName: 'Sân 1', slots: ['21:30 - 23:30'] },
      { courtName: 'Sân 2', slots: ['20:30 - 23:30'] },
    ],
  },
  {
    id: '2', dateLabel: '11/07/2026',
    courts: [
      { courtName: 'Sân 1', slots: ['05:30 - 07:30', '07:30 - 09:30', '09:30 - 11:30', '13:00 - 15:00'] },
      { courtName: 'Sân 2', slots: ['07:30 - 09:30', '07:30 - 08:30', '09:30 - 10:00', '12:00 - 14:00'] },
    ],
  },
];

interface CourseItem {
  id: string; name: string; location: string; distance: string;
  timeRange: string; price: string; badgeType: 'hot' | 'gold' | null;
  badgeLabel: string; imageUrl: string; coachName: string; coachAvatar: string;
}

const COURSES: CourseItem[] = [
  {
    id: '1', name: 'Lớp học Pickleball Cơ Bản', location: 'ECO PICK', distance: '4.1km',
    timeRange: '07:00 - 23:00', price: '330.000 đ/Buổi', badgeType: 'hot', badgeLabel: 'HOT',
    imageUrl: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=800&auto=format&fit=crop',
    coachName: 'Minh Hoàng',
    coachAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: '2', name: 'Cầu Lông Nâng Cao', location: 'Trung tâm Thể thao Q1', distance: '1.2km',
    timeRange: 'T2 - CN', price: '250.000 đ/Buổi', badgeType: 'gold', badgeLabel: 'ƯU ĐÃI',
    imageUrl: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=800&auto=format&fit=crop',
    coachName: 'Trần Thu Hà',
    coachAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
  },
];

// ── DATA: Gói hội viên tab ────────────────────────────────────
interface PerkItem { icon: string; label: string; description: string; }
interface SpecItem { label: string; value: string; icon: string; }

interface MemberPackage {
  id: string; packageNumber: number; tag: string; isBestValue: boolean;
  title: string; expiry?: string; specs?: SpecItem[]; perks?: PerkItem[];
  originalPrice?: string; totalLabel: string; price: string;
}

interface MemberVenue {
  id: string; coachAvatar: string; coachName: string; venueDistance: string;
  venueLocation: string; updatedAt: string; sportBannerUri: string;
  sportTitle: string; sportSubtitle: string; proTag: string; packages: MemberPackage[];
}

const MEMBER_VENUES: MemberVenue[] = [
  {
    id: 'mv1',
    coachAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
    coachName: 'Master Bros Nguyễn Xiển',
    venueDistance: '6.4km', venueLocation: '81 Tòa nhà Ecogreen', updatedAt: '16:44',
    sportBannerUri: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=800&auto=format&fit=crop',
    sportTitle: 'PICKLEBALL', sportSubtitle: 'ELITE TRAINING & MATCH', proTag: 'PRO SESSION',
    packages: [
      {
        id: 'p1', packageNumber: 1, tag: 'COMBO DUPR', isBestValue: false,
        title: 'Gói 10 vé • 01 Tháng',
        specs: [
          { label: 'THỜI HẠN', value: '30 Ngày', icon: 'timer-outline' },
          { label: 'ƯU ĐÃI', value: '10 Vé', icon: 'gift-outline' },
          { label: 'SÂN', value: 'Pickle', icon: 'people-outline' },
        ],
        totalLabel: 'TỔNG CỘNG', price: '900.000 đ',
      },
      {
        id: 'p2', packageNumber: 2, tag: 'COMBO DUPR', isBestValue: true,
        title: 'Gói 20 vé • 02 Tháng', expiry: 'Hạn bán: 30/04/2027',
        perks: [
          { icon: 'shield-checkmark-outline', label: 'ƯU QUYỀN ĐẶC BIỆT', description: 'Sử dụng 20 lượt chơi miễn phí' },
          { icon: 'time-outline', label: 'THỜI GIAN TRẢI NGHIỆM', description: 'Hiệu lực trong 60 ngày liên tục' },
        ],
        originalPrice: '1.800.000đ', totalLabel: 'TỔNG CỘNG', price: '1.700.000 đ',
      },
    ],
  },
  {
    id: 'mv2',
    coachAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
    coachName: 'Master Ngô Văn Bảo',
    venueDistance: '8.2km', venueLocation: 'Khu đô thị FPT', updatedAt: '17:30',
    sportBannerUri: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=800&auto=format&fit=crop',
    sportTitle: 'BADMINTON', sportSubtitle: 'PROFESSIONAL TRAINING', proTag: 'PRO SESSION',
    packages: [
      {
        id: 'p3', packageNumber: 1, tag: 'COMBO DUPR', isBestValue: false,
        title: 'Gói 10 vé • 01 Tháng',
        specs: [
          { label: 'THỜI HẠN', value: '30 Ngày', icon: 'timer-outline' },
          { label: 'ƯU ĐÃI', value: '10 Vé', icon: 'gift-outline' },
          { label: 'SÂN', value: 'Cầu lông', icon: 'people-outline' },
        ],
        totalLabel: 'TỔNG CỘNG', price: '800.000 đ',
      },
      {
        id: 'p4', packageNumber: 2, tag: 'COMBO DUPR', isBestValue: true,
        title: 'Gói 30 vé • 03 Tháng', expiry: 'Hạn bán: 30/04/2027',
        perks: [
          { icon: 'shield-checkmark-outline', label: 'ƯU QUYỀN ĐẶC BIỆT', description: 'Sử dụng 20 lượt chơi miễn phí' },
          { icon: 'time-outline', label: 'THỜI GIAN TRẢI NGHIỆM', description: 'Hiệu lực trong 60 ngày liên tục' },
        ],
        originalPrice: '2.100.000đ', totalLabel: 'TỔNG CỘNG', price: '1.500.000 đ',
      },
    ],
  },
];

// ── DATA: Pass sân tab ───────────────────────────────────────
interface PassSanItem {
  id: string; sellerName: string; sellerRole?: string; rating: string;
  timeAgo: string; timeAgoColor: string; sellerAvatar: string; sportType: string;
  discount: string; venueImage: string; title: string; quote: string;
  timeSlot: string; location: string; oldPrice: string; newPrice: string;
}

const PASS_SAN_DATA: PassSanItem[] = [
  {
    id: 'ps1', sellerName: 'Minh Anh', sellerRole: 'SELLER', rating: '4.9 (42)',
    timeAgo: 'Vừa xong', timeAgoColor: '#16a34a',
    sellerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    sportType: 'PICKLEBALL', discount: '-15%',
    venueImage: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=800&auto=format&fit=crop',
    title: 'SixtyNine Pickleball',
    quote: '"Mình bận việc đột xuất nên pass lại slot tối nay cho ai cần. Sân đẹp, mát mẻ."',
    timeSlot: 'Hôm nay, 18:00 - 19:30', location: 'Quận 7, TP. Hồ Chí Minh',
    oldPrice: '200.000đ', newPrice: '185.000đ',
  },
  {
    id: 'ps2', sellerName: 'Hoàng Nam', rating: '4.7 (11)',
    timeAgo: '15 phút trước', timeAgoColor: '#0284c7',
    sellerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    sportType: 'CẦU LÔNG', discount: '-20%',
    venueImage: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=800&auto=format&fit=crop',
    title: 'Sunrise Badminton',
    quote: '"Đang bị chấn thương nhẹ không đi được, pass rẻ cho ai đi sáng sớm mai nhé."',
    timeSlot: 'Ngày mai, 06:00 - 08:00', location: 'Bình Thạnh, TP. HCM',
    oldPrice: '180.000đ', newPrice: '160.000đ',
  },
  {
    id: 'ps3', sellerName: 'Tuấn Kiệt', rating: '4.6 (8)',
    timeAgo: '1 giờ trước', timeAgoColor: '#6b7280',
    sellerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    sportType: 'BÓNG ĐÁ', discount: '-20%',
    venueImage: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800&auto=format&fit=crop',
    title: 'New City Soccer',
    quote: '"Team mình thiếu người nên pass lại sân 7. Anh em nào quan tâm ib."',
    timeSlot: 'Hôm nay, 20:00 - 21:30', location: 'Quận 2, TP. Hồ Chí Minh',
    oldPrice: '300.000đ', newPrice: '280.000đ',
  },
];

// ── DATA: Sự kiện tab ─────────────────────────────────────────
interface EventItem {
  id: string;
  codeTag: string;         // #16738 • Xé vé 6-12 tháng
  dateBadge: string;       // 03/07/2026
  timeSlot: string;        // 7:00 - 10:00
  courtName: string;       // Sân 1
  sportName: string;       // Pickleball
  duprRating: string;      // 2.0 → 2.5
  participants: number;    // 0, 2, 4
  maxParticipants: number; // 10
  avatars?: string[];
  price: string;           // 50.000đ / Vé
}

interface EventVenue {
  id: string;
  venueName: string;       // ACE BADMINTON
  venueLocation: string;   // 2A, Hòa Nam 6, Phường Hòa Khánh, TP Đà Nẵng
  updatedDate: string;     // 02/07/2026
  updatedTime: string;     // 16:44
  venueImage: string;
  events: EventItem[];
}

const EVENT_VENUES: EventVenue[] = [
  {
    id: 'ev1',
    venueName: 'ACE BADMINTON',
    venueLocation: '2A, Hòa Nam 6, Phường Hòa Khánh, TP Đà Nẵng',
    updatedDate: '02/07/2026',
    updatedTime: '16:44',
    venueImage: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=200&auto=format&fit=crop',
    events: [
      {
        id: 'e1',
        codeTag: '#16738 • Xé vé 6-12 tháng',
        dateBadge: '03/07/2026',
        timeSlot: '7:00 - 10:00',
        courtName: 'Sân 1',
        sportName: 'Pickleball',
        duprRating: '2.0 → 2.5',
        participants: 0,
        maxParticipants: 10,
        price: '50.000đ / Vé',
      },
      {
        id: 'e2',
        codeTag: '#16939 • Xé vé 3-6 tháng',
        dateBadge: '04/07/2026',
        timeSlot: '8:00 - 11:00',
        courtName: 'Sân 2',
        sportName: 'Pickleball',
        duprRating: '2.0 → 2.5',
        participants: 0,
        maxParticipants: 10,
        price: '50.000đ / Vé',
      },
      {
        id: 'e3',
        codeTag: '#16940 • Xé vé 6-12 tháng',
        dateBadge: '04/07/2026',
        timeSlot: '18:00 - 19:00',
        courtName: 'Sân 2',
        sportName: 'Pickleball',
        duprRating: '2.5 → 3.5',
        participants: 2,
        maxParticipants: 10,
        avatars: [
          'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop',
        ],
        price: '100.000đ / Vé',
      },
    ],
  },
  {
    id: 'ev2',
    venueName: 'WinWin BADMINTON',
    venueLocation: '70B Nguyễn Lương Bằng, Hòa Khánh Bắc, TP Đà Nẵng',
    updatedDate: '01/07/2026',
    updatedTime: '16:44',
    venueImage: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=200&auto=format&fit=crop',
    events: [
      {
        id: 'e4',
        codeTag: '#19748 • Xé vé 6-12 tháng',
        dateBadge: '03/07/2026',
        timeSlot: '7:00 - 10:00',
        courtName: 'Sân 1',
        sportName: 'Pickleball',
        duprRating: '2.0 → 2.5',
        participants: 0,
        maxParticipants: 10,
        price: '60.000đ / Vé',
      },
      {
        id: 'e5',
        codeTag: '#19749 • Xé vé 3-6 tháng',
        dateBadge: '04/07/2026',
        timeSlot: '8:00 - 11:00',
        courtName: 'Sân 2',
        sportName: 'Pickleball',
        duprRating: '2.0 → 2.5',
        participants: 2,
        maxParticipants: 10,
        avatars: [
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop',
        ],
        price: '60.000đ / Vé',
      },
      {
        id: 'e6',
        codeTag: '#19750 • Xé vé 6-12 tháng',
        dateBadge: '04/07/2026',
        timeSlot: '18:00 - 19:00',
        courtName: 'Sân 2',
        sportName: 'Pickleball',
        duprRating: '2.5 → 3.5',
        participants: 4,
        maxParticipants: 10,
        avatars: [
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop',
        ],
        price: '100.000đ / Vé',
      },
    ],
  },
];

// ── PACKAGE CARD ─────────────────────────────────────────────
const PackageCard = ({ pkg, onRegister }: { pkg: MemberPackage; onRegister: () => void }) => (
  <View style={styles.packageCard}>
    {pkg.isBestValue && (
      <View style={styles.bestValueRibbon}>
        <Text style={styles.bestValueRibbonText}>BEST VALUE</Text>
      </View>
    )}

    <View style={styles.packageTagRow}>
      <View style={styles.packageTagBadge}>
        <Text style={styles.packageTagText}>{pkg.tag}</Text>
      </View>
      <View
        style={[
          styles.packageNumberBadge,
          pkg.isBestValue && { backgroundColor: '#f59e0b' },
        ]}
      >
        <Text style={styles.packageNumberText}>{pkg.packageNumber}</Text>
      </View>
    </View>

    <Text style={styles.packageTitle}>{pkg.title}</Text>

    {pkg.expiry && (
      <View style={styles.packageExpiryRow}>
        <Ionicons name="calendar-outline" size={12} color="#6b7280" />
        <Text style={styles.packageExpiryText}>{pkg.expiry}</Text>
      </View>
    )}

    {pkg.specs && (
      <View style={styles.packageSpecsRow}>
        {pkg.specs.map((spec) => (
          <View key={spec.label} style={styles.packageSpecChip}>
            <Ionicons name={spec.icon as any} size={18} color={TEAL} />
            <Text style={styles.packageSpecLabel}>{spec.label}</Text>
            <Text style={styles.packageSpecValue}>{spec.value}</Text>
          </View>
        ))}
      </View>
    )}

    {pkg.perks && (
      <View style={styles.packagePerksBlock}>
        {pkg.perks.map((perk, i) => (
          <View key={i} style={[styles.packagePerkRow, i < pkg.perks!.length - 1 && { marginBottom: 10 }]}>
            <View style={styles.packagePerkIconWrap}>
              <Ionicons name={perk.icon as any} size={16} color={TEAL} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.packagePerkLabel}>{perk.label}</Text>
              <Text style={styles.packagePerkText}>{perk.description}</Text>
            </View>
          </View>
        ))}
      </View>
    )}

    <View style={styles.packageDivider} />

    <View style={styles.packageFooter}>
      <View>
        {pkg.originalPrice && (
          <Text style={styles.packageOriginalPrice}>{pkg.originalPrice}</Text>
        )}
        {!pkg.originalPrice && (
          <Text style={styles.packageTotalLabel}>{pkg.totalLabel}</Text>
        )}
        <Text style={[styles.packagePrice, pkg.isBestValue && { color: '#ef4444' }]}>{pkg.price}</Text>
      </View>
      <TouchableOpacity
        style={[styles.registerBtn, pkg.isBestValue && { backgroundColor: '#22d3ee' }]}
        onPress={onRegister}
        activeOpacity={0.8}
      >
        <Text style={styles.registerBtnText}>ĐĂNG KÝ</Text>
        <Ionicons name="chevron-forward" size={14} color="#fff" />
      </TouchableOpacity>
    </View>
  </View>
);

// ── MEMBER VENUE CARD ─────────────────────────────────────────
const MemberVenueCard = ({ venue, navigation }: { venue: MemberVenue; navigation: any }) => {
  return (
    <View style={{ gap: 10, marginBottom: 10 }}>
      {/* Coach Info Header Card with Left Accent Border */}
      <View style={styles.memberVenueHeaderCard}>
        <Image source={{ uri: venue.coachAvatar }} style={styles.memberCoachAvatar} />
        <View style={{ flex: 1 }}>
          <Text style={styles.memberCoachName}>{venue.coachName}</Text>
          <View style={styles.memberVenueMetaRow}>
            <Ionicons name="location-outline" size={12} color="#6b7280" />
            <Text style={styles.memberVenueMeta}>
              {venue.venueDistance} • {venue.venueLocation}
            </Text>
          </View>
        </View>
        <View style={styles.memberUpdatedBlock}>
          <Text style={styles.memberUpdatedLabel}>HÔM NAY</Text>
          <Text style={styles.memberUpdatedTime}>{venue.updatedAt}</Text>
        </View>
      </View>

      {/* Deals Section Title Row with Avatar Count Badge */}
      <View style={styles.memberDealsHeader}>
        <View>
          <Text style={styles.memberDealsTitle}>ƯU ĐÃI MỚI NHẤT</Text>
          <Text style={styles.memberDealsHashtag}>#uudaigoihoivien2026</Text>
        </View>

        {/* Avatar Stack with Count Badge (+12 / +27) */}
        <View style={styles.dealsAvatarStack}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100' }}
            style={styles.dealsAvatarCircle}
          />
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100' }}
            style={[styles.dealsAvatarCircle, { marginLeft: -8 }]}
          />
          <View style={[styles.dealsAvatarCountBadge, { marginLeft: -8 }]}>
            <Text style={styles.dealsAvatarCountText}>{venue.id === 'mv1' ? '+12' : '+27'}</Text>
          </View>
        </View>
      </View>

      {/* Package Cards */}
      {venue.packages.map((pkg) => (
        <PackageCard
          key={pkg.id}
          pkg={pkg}
          onRegister={() =>
            Alert.alert(
              'Đăng ký gói hội viên',
              `${pkg.title}\nGiá: ${pkg.price}\n\nBạn muốn đăng ký gói này?`,
              [
                { text: 'Hủy', style: 'cancel' },
                {
                  text: 'Xác nhận',
                  onPress: () =>
                    Alert.alert('Đăng ký thành công!', `Bạn đã đăng ký ${pkg.title} thành công.`),
                },
              ]
            )
          }
        />
      ))}

      {/* Explore More Link */}
      <TouchableOpacity
        style={styles.exploreMoreRow}
        onPress={() => navigation.navigate('VenueDetails', { venueId: venue.id })}
        activeOpacity={0.7}
      >
        <Ionicons name="earth-outline" size={18} color={TEAL} />
        <Text style={styles.exploreMoreText}>Khám phá ưu đãi chi nhánh</Text>
        <Ionicons name="chevron-forward" size={14} color={TEAL} />
      </TouchableOpacity>
    </View>
  );
};

// ── PASS SÂN CARD COMPONENT ────────────────────────────────────
const PassSanCard = ({ item }: { item: PassSanItem }) => {
  return (
    <View style={styles.passSanCard}>
      <View style={styles.passSanSellerRow}>
        <View style={styles.passSanAvatarWrap}>
          <Image source={{ uri: item.sellerAvatar }} style={styles.passSanAvatar} />
          <View style={styles.onlineBadgeDot} />
        </View>
        <View style={{ flex: 1 }}>
          <View style={styles.passSanNameRow}>
            <Text style={styles.passSanSellerName}>{item.sellerName}</Text>
            {item.sellerRole && (
              <View style={styles.sellerRoleBadge}>
                <Text style={styles.sellerRoleText}>{item.sellerRole}</Text>
              </View>
            )}
          </View>
          <View style={styles.passSanRatingRow}>
            <Ionicons name="star" size={12} color="#f59e0b" />
            <Text style={styles.passSanRatingText}>{item.rating}</Text>
          </View>
        </View>
        <Text style={[styles.passSanTimeAgo, { color: item.timeAgoColor }]}>
          {item.timeAgo}
        </Text>
      </View>

      <View style={styles.passSanImageWrap}>
        <Image source={{ uri: item.venueImage }} style={styles.passSanImage} resizeMode="cover" />
        <View style={styles.sportBadgeTag}>
          <Text style={styles.sportBadgeTagText}>{item.sportType}</Text>
        </View>
        <View style={styles.discountBadgeTag}>
          <Text style={styles.discountBadgeTagText}>{item.discount}</Text>
        </View>
      </View>

      <View style={styles.passSanBody}>
        <Text style={styles.passSanTitle}>{item.title}</Text>

        <View style={styles.passSanQuoteBox}>
          <Text style={styles.passSanQuoteText}>{item.quote}</Text>
        </View>

        <View style={styles.passSanMetaRow}>
          <Ionicons name="time-outline" size={14} color="#6b7280" />
          <Text style={styles.passSanMetaText}>{item.timeSlot}</Text>
        </View>

        <View style={styles.passSanMetaRow}>
          <Ionicons name="location-outline" size={14} color="#6b7280" />
          <Text style={styles.passSanMetaText}>{item.location}</Text>
        </View>

        <View style={styles.passSanPriceRow}>
          <Text style={styles.passSanOldPrice}>{item.oldPrice}</Text>
          <Text style={styles.passSanNewPrice}>{item.newPrice}</Text>
        </View>

        <TouchableOpacity
          style={styles.passSanContactBtn}
          onPress={() =>
            Alert.alert(
              'Liên hệ người bán',
              `Bạn muốn liên hệ với ${item.sellerName} để trao đổi sân ${item.title}?`,
              [
                { text: 'Hủy', style: 'cancel' },
                { text: 'Nhắn tin', onPress: () => Alert.alert('Thành công', 'Đang mở cửa sổ nhắn tin...') },
              ]
            )
          }
          activeOpacity={0.8}
        >
          <Ionicons name="chatbox-ellipses-outline" size={16} color={TEAL} />
          <Text style={styles.passSanContactBtnText}>Liên hệ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// ── EVENT CARD COMPONENT (Sự kiện) ─────────────────────────────
const EventCard = ({ event, onDetail }: { event: EventItem; onDetail: () => void }) => {
  return (
    <View style={styles.eventCard}>
      {/* Top Header: Tag + Date Badge */}
      <View style={styles.eventTopRow}>
        <Text style={styles.eventCodeTag}>{event.codeTag}</Text>
        <View style={styles.eventDateBadge}>
          <Ionicons name="calendar-outline" size={12} color="#0284c7" />
          <Text style={styles.eventDateText}>{event.dateBadge}</Text>
        </View>
      </View>

      {/* Time Slot & Court Row */}
      <View style={styles.eventMetaRow}>
        <View style={styles.eventMetaItem}>
          <Ionicons name="time-outline" size={14} color="#6b7280" />
          <Text style={styles.eventMetaText}>{event.timeSlot}</Text>
        </View>
        <View style={styles.eventMetaItem}>
          <Ionicons name="grid-outline" size={14} color="#6b7280" />
          <Text style={styles.eventMetaText}>{event.courtName}</Text>
        </View>
      </View>

      {/* Sport Capsule with DUPR Rating */}
      <View style={styles.eventSportCapsule}>
        <View style={styles.eventSportLeft}>
          <Ionicons name="tennisball-outline" size={15} color={TEAL} />
          <Text style={styles.eventSportName}>{event.sportName}</Text>
        </View>
        <View style={styles.eventDuprBadge}>
          <Text style={styles.eventDuprText}>{event.duprRating}</Text>
        </View>
      </View>

      {/* Participants & Price / Detail Row */}
      <View style={styles.eventFooterRow}>
        {/* Participants Left Side */}
        {event.participants > 0 && event.avatars ? (
          <View style={styles.eventParticipantsBlock}>
            <View style={styles.eventAvatarsStack}>
              {event.avatars.map((url, idx) => (
                <Image
                  key={idx}
                  source={{ uri: url }}
                  style={[styles.eventAvatarImg, { marginLeft: idx > 0 ? -10 : 0 }]}
                />
              ))}
            </View>
            <View>
              <Text style={styles.eventParticipantsCount}>
                <Text style={{ fontWeight: '800', color: '#0f172a' }}>{event.participants}</Text>
                <Text style={{ color: '#6b7280' }}> / {event.maxParticipants}</Text>
              </Text>
              <Text style={styles.eventParticipantsLabel}>THAM GIA</Text>
            </View>
          </View>
        ) : (
          <View style={styles.eventParticipantsEmpty}>
            <View style={styles.eventEmptyAvatarIcon}>
              <Ionicons name="people-outline" size={18} color="#9ca3af" />
            </View>
            <View>
              <Text style={styles.eventParticipantsCount}>
                <Text style={{ fontWeight: '800', color: '#0f172a' }}>0</Text>
                <Text style={{ color: '#6b7280' }}> / {event.maxParticipants}</Text>
              </Text>
              <Text style={styles.eventParticipantsLabel}>THAM GIA</Text>
            </View>
          </View>
        )}

        {/* Price & Action Button Right Side */}
        <View style={styles.eventActionRight}>
          <Text style={styles.eventPrice}>{event.price}</Text>
          <TouchableOpacity style={styles.eventDetailBtn} onPress={onDetail} activeOpacity={0.8}>
            <Text style={styles.eventDetailBtnText}>Xem chi tiết  →</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// ── MAIN COMPONENT ────────────────────────────────────────────
export const FeaturedScreen = () => {
  const navigation = useNavigation<FeaturedNavProp>();
  const [activeChip, setActiveChip] = useState(1); // Default to "Gói hội viên" (tab 1) as requested

  const handleTimeSlotPress = (slot: string, date: string) => {
    Alert.alert(
      'Đặt sân nhanh',
      `Bạn muốn đặt khung giờ ${slot} ngày ${date}?`,
      [
        { text: 'Hủy', style: 'cancel' },
        { text: 'Xem chi tiết', onPress: () => navigation.navigate('VenueDetails', { venueId: '2' }) },
      ]
    );
  };

  const handleCourseContact = (course: CourseItem) => {
    Alert.alert(
      `Liên hệ về khóa "${course.name}"`,
      `HLV: ${course.coachName}\nĐịa điểm: ${course.location}\nGiá: ${course.price}`,
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Xác nhận',
          onPress: () => Alert.alert('Đã gửi yêu cầu!', 'Chúng tôi sẽ liên hệ với bạn sớm nhất.'),
        },
      ]
    );
  };

  const renderCourseCard = (course: CourseItem) => (
    <TouchableOpacity
      key={course.id}
      style={styles.courseCard}
      onPress={() => Alert.alert(course.name, `Địa điểm: ${course.location}\nGiá: ${course.price}`)}
      activeOpacity={0.92}
    >
      <View style={styles.courseImageContainer}>
        <Image source={{ uri: course.imageUrl }} style={styles.courseImage} resizeMode="cover" />
        {course.badgeType === 'hot' ? (
          <View style={styles.courseBadgeRow}>
            <View style={[styles.courseBadge, styles.courseBadgeHot]}>
              <Text style={styles.courseBadgeText}>HOT</Text>
            </View>
            <View style={[styles.courseBadge, styles.courseBadgeBlue]}>
              <Text style={styles.courseBadgeTextBlue}>Khóa học</Text>
            </View>
          </View>
        ) : (
          course.badgeType && (
            <View style={styles.courseBadgeRow}>
              <View style={[styles.courseBadge, styles.courseBadgeGold]}>
                <Text style={styles.courseBadgeText}>{course.badgeLabel}</Text>
              </View>
            </View>
          )
        )}
      </View>
      <View style={styles.courseBody}>
        <Text style={styles.courseName}>{course.name}</Text>
        <View style={styles.courseMetaRow}>
          <Ionicons name="location-outline" size={13} color="#6b7280" />
          <Text style={styles.courseMetaText}>{course.location} • {course.distance}</Text>
        </View>
        <View style={styles.courseCapsulesRow}>
          <View style={styles.courseCapsule}>
            <Ionicons name={course.id === '1' ? 'time-outline' : 'calendar-outline'} size={13} color="#4b5563" />
            <Text style={styles.courseCapsuleText}>{course.timeRange}</Text>
          </View>
          <View style={styles.courseCapsule}>
            <Ionicons name="pricetag-outline" size={13} color="#4b5563" />
            <Text style={styles.courseCapsuleText}>{course.price}</Text>
          </View>
        </View>
        <View style={styles.courseFooter}>
          <View style={styles.coachRow}>
            <Image source={{ uri: course.coachAvatar }} style={styles.coachAvatar} />
            <View>
              <Text style={styles.coachLabelText}>HUẤN LUYỆN VIÊN</Text>
              <Text style={styles.coachName}>{course.coachName}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.contactBtn} onPress={() => handleCourseContact(course)}>
            <Text style={styles.contactBtnText}>Liên hệ ngay</Text>
            <Ionicons name="chevron-forward" size={13} color={TEAL} />
          </TouchableOpacity>
        </View>
      </View>
      <LinearGradient
        colors={course.id === '1' ? [TEAL, '#4ade80'] : [TEAL, '#38bdf8']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ height: 4, width: '100%' }}
      />
    </TouchableOpacity>
  );

  const renderContent = () => {
    switch (activeChip) {

      // ── TAB 0: Tất cả ─────────────────────────────────────
      case 0:
        return (
          <>
            <TouchableOpacity
              style={[styles.banner, { marginTop: 14 }]}
              activeOpacity={0.92}
              onPress={() => Alert.alert('Khuyến mãi', 'Giảm 20% cho học viên mới đăng ký khóa Pickleball!')}
            >
              <ImageBackground
                source={{ uri: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=800&auto=format&fit=crop' }}
                style={styles.bannerBg}
                resizeMode="cover"
              >
                <View style={styles.bannerOverlay} />
                <View style={styles.bannerContent}>
                  <View style={styles.bannerBadge}>
                    <Text style={styles.bannerBadgeText}>MỚI NHẤT</Text>
                  </View>
                  <Text style={styles.bannerTitle}>Học Pickleball{'\n'}Cùng Huấn Luyện Viên</Text>
                  <Text style={styles.bannerSubtitle}>Giảm 20% cho học viên mới</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>

            <View style={styles.venueCard}>
              <View style={styles.venueRow}>
                <Image
                  source={{ uri: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=400&auto=format&fit=crop' }}
                  style={styles.venueImage}
                  resizeMode="cover"
                />
                <View style={styles.venueInfo}>
                  <Text style={styles.venueName}>ACE BADMINTON</Text>
                  <View style={styles.venueAddressRow}>
                    <Ionicons name="location-outline" size={13} color="#6b7280" />
                    <Text style={styles.venueAddress} numberOfLines={2}>
                      2A, Hòa Nam 6, Phường Hòa Khánh, TP Đà Nẵng
                    </Text>
                  </View>
                  <View style={styles.venueUpdatedContainer}>
                    <Ionicons name="time-outline" size={13} color="#4b5563" />
                    <Text style={styles.venueUpdatedText}>Cập nhật lúc 08:29 • 10/07/2026</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={styles.hotAlertRow}
                onPress={() => navigation.navigate('VenueDetails', { venueId: '2' })}
                activeOpacity={0.8}
              >
                <Text style={{ fontSize: 16 }}>🔥</Text>
                <View style={styles.hotAlertTextContainer}>
                  <Text style={styles.hotAlertText}>Sân trống trong hôm nay</Text>
                  <Text style={styles.hotAlertLink}>#thongbaosantrong</Text>
                </View>
              </TouchableOpacity>
            </View>

            {SCHEDULE_DATA.map((day, dayIdx) => (
              <View key={day.id} style={styles.scheduleCard}>
                <View style={styles.dateHeaderRow}>
                  <View style={styles.dateNumberBadge}>
                    <Text style={styles.dateNumberText}>{dayIdx + 1}</Text>
                  </View>
                  <Text style={styles.dateLabel}>{day.dateLabel}</Text>
                  <View style={styles.availableBadge}>
                    <Text style={styles.availableBadgeText}>Sân trống</Text>
                  </View>
                </View>
                {day.courts.map((court) => (
                  <View key={court.courtName} style={styles.courtSection}>
                    <Text style={styles.courtLabel}>• {court.courtName}</Text>
                    <View style={styles.timeSlotsRow}>
                      {court.slots.map((slot) => (
                        <TouchableOpacity
                          key={slot}
                          style={styles.timeSlotBtn}
                          onPress={() => handleTimeSlotPress(slot, day.dateLabel)}
                          activeOpacity={0.75}
                        >
                          <Text style={styles.timeSlotText}>{slot}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                ))}
                <TouchableOpacity
                  style={styles.seeDetailBtn}
                  onPress={() => navigation.navigate('VenueDetails', { venueId: '2' })}
                  activeOpacity={0.8}
                >
                  <Text style={styles.seeDetailText}>Xem chi tiết  →</Text>
                </TouchableOpacity>
              </View>
            ))}

            <View style={styles.sectionHeader}>
              <View style={styles.sectionHeaderLeft}>
                <Text style={{ fontSize: 18 }}>🔥</Text>
                <Text style={styles.sectionTitle}>Khóa học mới</Text>
              </View>
              <TouchableOpacity onPress={() => Alert.alert('Khóa học', 'Đang tải tất cả khóa học...')}>
                <Text style={styles.seeAllText}>Xem tất cả  ›</Text>
              </TouchableOpacity>
            </View>

            {COURSES.map(renderCourseCard)}
          </>
        );

      // ── TAB 1: Gói hội viên ───────────────────────────────
      case 1:
        return (
          <>
            {/* Top PRO SESSION Hero Banner */}
            <View style={styles.memberHeroBannerContainer}>
              <ImageBackground
                source={{ uri: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=800&auto=format&fit=crop' }}
                style={styles.memberHeroBannerBg}
                resizeMode="cover"
              >
                <LinearGradient
                  colors={['rgba(15, 23, 42, 0.75)', 'rgba(15, 23, 42, 0.35)']}
                  style={StyleSheet.absoluteFill}
                />
                <View style={styles.proSessionBadge}>
                  <Text style={styles.proSessionText}>PRO SESSION</Text>
                </View>
                <View style={styles.memberHeroBannerContent}>
                  <Text style={styles.memberSportTitle}>PICKLEBALL</Text>
                  <Text style={styles.memberSportSubtitle}>ELITE TRAINING & MATCH</Text>
                </View>
              </ImageBackground>
            </View>

            {MEMBER_VENUES.map((venue) => (
              <MemberVenueCard key={venue.id} venue={venue} navigation={navigation} />
            ))}
          </>
        );

      // ── TAB 2: Khóa học ───────────────────────────────────
      case 2:
        return (
          <>
            <View style={[styles.sectionHeader, { marginTop: 14 }]}>
              <View style={styles.sectionHeaderLeft}>
                <Text style={{ fontSize: 18 }}>🎓</Text>
                <Text style={styles.sectionTitle}>Tất cả khóa học</Text>
              </View>
              <TouchableOpacity onPress={() => Alert.alert('Khóa học', 'Đang tải...')}>
                <Text style={styles.seeAllText}>Xem tất cả ›</Text>
              </TouchableOpacity>
            </View>
            {COURSES.map(renderCourseCard)}
          </>
        );

      // ── TAB 3: Sự kiện ───────────────────────────────────
      case 3:
        return (
          <>
            {/* Tin mới nhất Header */}
            <View style={styles.passSanHeaderRow}>
              <View>
                <Text style={styles.passSanHeaderTitle}>Tin mới nhất</Text>
                <Text style={styles.passSanHeaderSub}>Có 12 sân mới được pass trong 30 phút qua</Text>
              </View>
              <TouchableOpacity onPress={() => Alert.alert('Tin mới nhất', 'Đang tải thêm tin...')}>
                <Text style={styles.seeAllText}>Xem thêm ›</Text>
              </TouchableOpacity>
            </View>

            {/* Date Range Picker Dropdown Card */}
            <TouchableOpacity
              style={styles.eventDatePickerBox}
              onPress={() => Alert.alert('Chọn khoảng ngày', 'Mở bộ lọc khoảng ngày')}
              activeOpacity={0.8}
            >
              <View style={styles.eventDatePickerLeft}>
                <Ionicons name="calendar-outline" size={18} color={TEAL} />
                <Text style={styles.eventDatePickerText}>01/06/2025 - 30/06/2025</Text>
              </View>
              <Ionicons name="chevron-down-outline" size={18} color="#9ca3af" />
            </TouchableOpacity>

            {/* Event Venues List */}
            {EVENT_VENUES.map((venue) => (
              <View key={venue.id} style={{ gap: 10, marginTop: 4 }}>
                {/* Venue Header Card */}
                <View style={styles.eventVenueHeaderCard}>
                  <Image source={{ uri: venue.venueImage }} style={styles.eventVenueImage} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.eventVenueName}>{venue.venueName}</Text>
                    <View style={styles.eventVenueLocationRow}>
                      <Ionicons name="location-outline" size={12} color="#6b7280" />
                      <Text style={styles.eventVenueLocation} numberOfLines={2}>
                        {venue.venueLocation}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.eventVenueDateBlock}>
                    <Text style={styles.eventVenueDateText}>{venue.updatedDate}</Text>
                    <Text style={styles.eventVenueTimeText}>{venue.updatedTime}</Text>
                  </View>
                </View>

                {/* Event Cards inside this venue */}
                {venue.events.map((ev) => (
                  <EventCard
                    key={ev.id}
                    event={ev}
                    onDetail={() =>
                      Alert.alert(
                        ev.codeTag,
                        `Sân: ${ev.courtName}\nKhung giờ: ${ev.timeSlot}\nGiá: ${ev.price}`,
                        [
                          { text: 'Hủy', style: 'cancel' },
                          { text: 'Tham gia ngay', onPress: () => Alert.alert('Thành công', 'Đã gửi yêu cầu tham gia!') },
                        ]
                      )
                    }
                  />
                ))}
              </View>
            ))}
          </>
        );

      // ── TAB 4: Pass sân ───────────────────────────────────
      case 4:
        return (
          <>
            <View style={styles.passSanHeaderRow}>
              <View>
                <Text style={styles.passSanHeaderTitle}>Tin mới nhất</Text>
                <Text style={styles.passSanHeaderSub}>Có 12 sân mới được pass trong 30 phút qua</Text>
              </View>
              <TouchableOpacity onPress={() => Alert.alert('Tin mới nhất', 'Đang tải tất cả tin pass sân...')}>
                <Text style={styles.seeAllText}>Xem thêm ›</Text>
              </TouchableOpacity>
            </View>

            {PASS_SAN_DATA.map((item) => (
              <PassSanCard key={item.id} item={item} />
            ))}

            <LinearGradient
              colors={['#0e7490', '#06b6d4']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.communityBanner}
            >
              <View style={styles.communityTagRow}>
                <Ionicons name="people-outline" size={16} color="rgba(255,255,255,0.9)" />
                <Text style={styles.communityTagText}>COMMUNITY SERVICE</Text>
              </View>
              <Text style={styles.communityTitle}>Bạn không thể{'\n'}tham gia?</Text>
              <Text style={styles.communityDesc}>
                Đừng để lãng phí slot! Đăng tin pass sân ngay để lấy lại chi phí và giúp cộng đồng SportHub.
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('CreatePassSan')}
                activeOpacity={0.88}
              >
                <LinearGradient
                  colors={['#2dd4bf', '#ec4899']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.communityBtn}
                >
                  <Text style={styles.communityBtnText}>Đăng tin ngay</Text>
                </LinearGradient>
              </TouchableOpacity>
            </LinearGradient>
          </>
        );

      default:
        return (
          <View style={styles.emptyTab}>
            <MaterialCommunityIcons name="compass-outline" size={64} color="#d1d5db" />
            <Text style={styles.emptyTabTitle}>Sắp ra mắt</Text>
            <Text style={styles.emptyTabSub}>Nội dung đang được cập nhật...</Text>
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={TEAL} />

      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <MaterialCommunityIcons name="badminton" size={28} color="#ffffff" />
          <Text style={styles.headerTitle}>SportHub</Text>
        </View>
        <TouchableOpacity
          style={styles.headerBell}
          onPress={() => navigation.navigate('Notification')}
          activeOpacity={0.8}
        >
          <Ionicons name="notifications-outline" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

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
            onPress={() => setActiveChip(idx)}
            activeOpacity={0.75}
          >
            <Text style={idx === activeChip ? styles.chipActiveText : styles.chipInactiveText}>
              {chip}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {renderContent()}
      </ScrollView>

      {/* Floating Action Button (FAB) for Pass sân */}
      {activeChip === 4 && (
        <TouchableOpacity
          style={styles.fabBtn}
          onPress={() => navigation.navigate('CreatePassSan')}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={['#2dd4bf', '#14b8a6']}
            style={styles.fabGradient}
          >
            <Ionicons name="add" size={32} color="#ffffff" />
          </LinearGradient>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default FeaturedScreen;
