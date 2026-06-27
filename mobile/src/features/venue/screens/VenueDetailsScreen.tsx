import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  ActivityIndicator,
  Alert,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootStackParamList } from '../../../core/navigation/navigation.types';
import { RootState, AppDispatch } from '../../../core/store/store';
import { fetchVenueDetailWithCourts, clearSelectedVenue } from '../slices/venueSlice';
import styles from '../styles/VenueDetailsScreenStyles';

type VenueDetailsRouteProp = RouteProp<RootStackParamList, 'VenueDetails'>;

// =============================================================================
// Dữ liệu mẫu (Mock Data) – dùng khi API chưa trả dữ liệu
// =============================================================================
const MOCK_VENUE = {
  id: '2',
  name: 'ACE BADMINTON',
  category: 'Cầu lông',
  rating: 4.8,
  address: '2A, Hòa Nam 6, Phường Hòa Khánh, TP Đà Nẵng',
  workingHours: '04:30 - 23:30 hàng ngày',
  phone: '090 123 4567',
  description:
    'Câu lạc bộ Cầu lông Đất Việt tự hào sở hữu 10 sân thảm tiêu chuẩn thi đấu quốc tế. Không gian thoáng đãng, hệ thống ánh sáng chống chói mắt chuyên dụng.',
  heroImage:
    'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=800&auto=format&fit=crop',
  galleryImages: [
    'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=400&auto=format&fit=crop',
  ],
  bookingUrl: 'https://sporthub.vn/booking',
};

// =============================================================================
// Tab items
// =============================================================================
const TABS = ['Thông tin', 'Dịch vụ', 'Hình ảnh', 'Điều khoản & quy định'];

// =============================================================================
// COMPONENT
// =============================================================================
export const VenueDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<VenueDetailsRouteProp>();
  const dispatch = useDispatch<AppDispatch>();

  const { venueId } = route.params;

  // Redux state
  const { selectedVenue, isLoading } = useSelector(
    (state: RootState) => state.venue,
  );

  // Local state
  const [activeTab, setActiveTab] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  // =============================================================================
  // Gọi API lấy chi tiết venue khi mount
  // =============================================================================
  useEffect(() => {
    dispatch(fetchVenueDetailWithCourts(venueId));

    return () => {
      dispatch(clearSelectedVenue());
    };
  }, [dispatch, venueId]);

  // Dữ liệu hiển thị: ưu tiên API, fallback mock data
  const venue = selectedVenue
    ? {
        name: selectedVenue.name,
        category:
          selectedVenue.sportTypes?.[0] === 'BADMINTON'
            ? 'Cầu lông'
            : selectedVenue.sportTypes?.[0] === 'PICKLEBALL'
            ? 'Pickleball'
            : selectedVenue.sportTypes?.[0] === 'TENNIS'
            ? 'Quần vợt'
            : 'Thể thao',
        rating: selectedVenue.rating ?? MOCK_VENUE.rating,
        address: selectedVenue.location?.address ?? MOCK_VENUE.address,
        workingHours: MOCK_VENUE.workingHours, // API chưa có trường này
        phone: MOCK_VENUE.phone, // API chưa có trường này
        description: selectedVenue.description ?? MOCK_VENUE.description,
        heroImage: selectedVenue.imageUrls?.[0] ?? MOCK_VENUE.heroImage,
        galleryImages:
          selectedVenue.imageUrls && selectedVenue.imageUrls.length > 1
            ? selectedVenue.imageUrls.slice(1, 3)
            : MOCK_VENUE.galleryImages,
        bookingUrl: MOCK_VENUE.bookingUrl,
      }
    : MOCK_VENUE;

  // =============================================================================
  // Handlers
  // =============================================================================
  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleToggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  const handleOpenBookingLink = () => {
    Linking.openURL(venue.bookingUrl).catch(() => {
      Alert.alert('Lỗi', 'Không thể mở đường dẫn đặt sân.');
    });
  };

  const handleBooking = () => {
    Alert.alert(
      'Đặt lịch',
      `Bạn muốn đặt lịch tại ${venue.name}. Hệ thống đặt sân đang được chuẩn bị.`,
    );
  };

  const handleCallPhone = () => {
    Linking.openURL(`tel:${venue.phone.replace(/\s/g, '')}`).catch(() => {
      Alert.alert('Lỗi', 'Không thể thực hiện cuộc gọi.');
    });
  };

  // =============================================================================
  // LOADING STATE
  // =============================================================================
  if (isLoading && !selectedVenue) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1989a8" />
        <Text style={styles.loadingText}>Đang tải thông tin sân...</Text>
      </View>
    );
  }

  // =============================================================================
  // RENDER
  // =============================================================================
  return (
    <View style={styles.container}>
      {/* ======== HEADER TOP BAR ======== */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Ionicons name="tennisball" size={24} color="#ffffff" />
          <Text style={styles.logoText}>SportHub</Text>
        </View>
        <TouchableOpacity style={styles.headerSearchButton}>
          <Ionicons name="search-outline" size={22} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {/* ======== SCROLLABLE CONTENT ======== */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ---- Background Image ---- */}
        <View style={styles.backgroundImageContainer}>
          <ImageBackground
            source={{ uri: venue.heroImage }}
            style={styles.backgroundImage}
            resizeMode="cover"
          >
            <View style={styles.backgroundOverlay} />
          </ImageBackground>
        </View>

        {/* ---- White Sheet Container ---- */}
        <View style={styles.sheetContainer}>
          {/* Sheet indicator bar */}
          <View style={styles.sheetIndicator} />

          {/* Floating Buttons Row: Back & Favorite */}
          <View style={styles.floatingButtonsRow}>
            <TouchableOpacity
              style={styles.floatingButton}
              onPress={handleGoBack}
              activeOpacity={0.7}
            >
              <Ionicons name="arrow-back" size={22} color="#0f172a" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.floatingButton}
              onPress={handleToggleFavorite}
              activeOpacity={0.7}
            >
              <Ionicons
                name={isFavorite ? 'heart' : 'heart-outline'}
                size={22}
                color={isFavorite ? '#ef4444' : '#0f172a'}
              />
            </TouchableOpacity>
          </View>

          {/* Rating Badge */}
          <View style={styles.ratingBadge}>
            <Ionicons name="star" size={16} color="#feae2c" />
            <Text style={styles.ratingBadgeText}>{venue.rating}</Text>
          </View>

          {/* Venue Title Row */}
          <View style={styles.titleRow}>
            <View style={styles.venueLogoBox}>
              <Ionicons name="ribbon" size={28} color="#4ade80" />
            </View>
            <Text style={styles.venueTitle}>{venue.name}</Text>
          </View>

          {/* Category Badge */}
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryBadgeText}>{venue.category}</Text>
          </View>

          {/* Info Rows */}
          {/* Địa chỉ */}
          <View style={styles.infoRow}>
            <View style={styles.infoIconWrapper}>
              <Ionicons name="location-outline" size={20} color="#1989a8" />
            </View>
            <Text style={styles.infoText}>{venue.address}</Text>
          </View>

          {/* Giờ mở cửa */}
          <View style={styles.infoRow}>
            <View style={styles.infoIconWrapper}>
              <Ionicons name="time-outline" size={20} color="#1989a8" />
            </View>
            <Text style={styles.infoText}>{venue.workingHours}</Text>
          </View>

          {/* Số điện thoại */}
          <TouchableOpacity style={styles.infoRow} onPress={handleCallPhone}>
            <View style={styles.infoIconWrapper}>
              <Ionicons name="call-outline" size={20} color="#1989a8" />
            </View>
            <Text style={[styles.infoText, styles.infoTextBold]}>
              {venue.phone}
            </Text>
          </TouchableOpacity>

          {/* ======== TAB BAR ======== */}
          <View style={styles.tabBarContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.tabBarScroll}
            >
              {TABS.map((tab, index) => {
                const isActive = activeTab === index;
                return (
                  <TouchableOpacity
                    key={tab}
                    style={styles.tabItem}
                    onPress={() => setActiveTab(index)}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.tabItemText,
                        isActive && styles.tabItemTextActive,
                      ]}
                    >
                      {tab}
                    </Text>
                    {isActive && <View style={styles.tabItemIndicator} />}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* ======== TAB CONTENT ======== */}
          {activeTab === 0 && (
            <>
              {/* Online Booking Link Box */}
              <TouchableOpacity
                style={styles.onlineLinkBox}
                onPress={handleOpenBookingLink}
                activeOpacity={0.7}
              >
                <View style={styles.onlineLinkIconWrapper}>
                  <Ionicons name="globe-outline" size={22} color="#1989a8" />
                </View>
                <Text style={styles.onlineLinkText}>Link đặt sân online</Text>
                <View style={styles.onlineLinkChevron}>
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color="#feae2c"
                  />
                </View>
              </TouchableOpacity>

              {/* Giới thiệu Section */}
              <Text style={styles.sectionTitle}>Giới thiệu</Text>
              <Text style={styles.descriptionText}>{venue.description}</Text>

              {/* Gallery Thumbnails */}
              <View style={styles.galleryRow}>
                {venue.galleryImages.map((uri, idx) => (
                  <Image
                    key={idx}
                    source={{ uri }}
                    style={styles.galleryImage}
                    resizeMode="cover"
                  />
                ))}
              </View>
            </>
          )}

          {activeTab === 1 && (
            <View style={{ paddingVertical: 24, alignItems: 'center' }}>
              <Ionicons name="construct-outline" size={40} color="#cbd5e1" />
              <Text
                style={{
                  marginTop: 12,
                  fontSize: 14,
                  color: '#94a3b8',
                  textAlign: 'center',
                }}
              >
                Thông tin dịch vụ đang được cập nhật.
              </Text>
            </View>
          )}

          {activeTab === 2 && (
            <View style={{ paddingVertical: 24, alignItems: 'center' }}>
              <Ionicons name="images-outline" size={40} color="#cbd5e1" />
              <Text
                style={{
                  marginTop: 12,
                  fontSize: 14,
                  color: '#94a3b8',
                  textAlign: 'center',
                }}
              >
                Thư viện hình ảnh đang được cập nhật.
              </Text>
            </View>
          )}

          {activeTab === 3 && (
            <View style={{ paddingVertical: 24, alignItems: 'center' }}>
              <Ionicons
                name="document-text-outline"
                size={40}
                color="#cbd5e1"
              />
              <Text
                style={{
                  marginTop: 12,
                  fontSize: 14,
                  color: '#94a3b8',
                  textAlign: 'center',
                }}
              >
                Điều khoản và quy định đang được cập nhật.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* ======== STICKY BOTTOM BOOKING BAR ======== */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.bookingButton}
          onPress={handleBooking}
          activeOpacity={0.85}
        >
          <Ionicons name="calendar-outline" size={20} color="#ffffff" />
          <Text style={styles.bookingButtonText}>Đặt lịch</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VenueDetailsScreen;
