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
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { RootStackParamList } from '../../../core/navigation/navigation.types';
import { RootState, AppDispatch } from '../../../core/store/store';
import { fetchVenueDetailWithCourts, clearSelectedVenue } from '../slices/venueSlice';
import { BookingTypeModal } from '../components/BookingTypeModal';
import styles from '../styles/VenueDetailsScreenStyles';
import reviewsStyles from '../styles/VenueReviewsScreenStyles';

type VenueDetailsNavigationProp = StackNavigationProp<RootStackParamList, 'VenueDetails'>;
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
const TABS = ['Thông tin', 'Dịch vụ', 'Hình ảnh', 'Điều khoản & quy định', 'Đánh giá'];

// =============================================================================
// COMPONENT
// =============================================================================
export const VenueDetailsScreen = () => {
  const navigation = useNavigation<VenueDetailsNavigationProp>();
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
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [reviews, setReviews] = useState([
    {
      id: '1',
      name: 'Nguyễn Minh Tuấn',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
      stars: 5,
      date: '12/07/2026',
      comment: 'Sân đẹp, sạch sẽ, ánh sáng tốt. Nhân viên thân thiện, phục vụ nhiệt tình. Sẽ tiếp tục ủng hộ!',
      photos: [
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200',
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200',
        'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=200',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200',
      ],
    },
    {
      id: '2',
      name: 'Trần Hoàng Anh',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=200&auto=format&fit=crop',
      stars: 5,
      date: '08/07/2026',
      comment: 'Không gian thoáng mát, có đầy đủ tiện ích. Giá cả hợp lý. Rất hài lòng!',
      photos: [
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200',
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200',
        'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200',
      ],
    },
  ]);

  const handleWriteReview = () => {
    Alert.prompt(
      'Viết đánh giá mới',
      'Nhập nhận xét của bạn về sân:',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Gửi',
          onPress: (text?: string) => {
            if (!text || !text.trim()) return;
            const newReview = {
              id: Date.now().toString(),
              name: 'Người dùng SportHub',
              avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200',
              stars: 5,
              date: 'Hôm nay',
              comment: text.trim(),
              photos: [
                'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200',
              ],
            };
            setReviews([newReview, ...reviews]);
            Alert.alert('Thành công', 'Cảm ơn bạn đã đóng góp đánh giá!');
          },
        },
      ],
      'plain-text'
    );
  };

  const renderStars = (count: number, size: number = 14) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i <= count ? 'star' : 'star-outline'}
          size={size}
          color="#feae2c"
        />
      );
    }
    return stars;
  };

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
    setShowBookingModal(true);
  };

  const handleCloseBookingModal = () => {
    setShowBookingModal(false);
  };

  const handleDayBooking = () => {
    setShowBookingModal(false);
    navigation.navigate('DayBooking', {
      venueId,
      venueName: venue.name,
      venueAddress: venue.address,
      rating: venue.rating,
      reviewCount: 128,
      sportType: venue.category,
      courtCount: 6,
      imageUrl: venue.heroImage,
    });
  };

  const handleEventBooking = () => {
    setShowBookingModal(false);
    navigation.navigate('BookingEven', {
      venueId,
      venueName: venue.name,
      venueAddress: venue.address,
      rating: venue.rating,
      reviewCount: 128,
      sportType: venue.category,
      courtCount: 6,
      imageUrl: venue.heroImage,
    });
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
                  <Image
                    source={require('../../../../assets/image.png')}
                    style={styles.logoIcon}
                    resizeMode="contain"
                  />
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
          <TouchableOpacity
            style={styles.ratingBadge}
            onPress={() =>
              navigation.navigate('VenueReviews', {
                venueId,
                venueName: venue.name,
                venueAddress: venue.address,
                imageUrl: venue.heroImage,
              })
            }
            activeOpacity={0.7}
          >
            <Ionicons name="star" size={16} color="#feae2c" />
            <Text style={styles.ratingBadgeText}>{venue.rating}</Text>
          </TouchableOpacity>

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

          {activeTab === 4 && (
            <View style={{ paddingBottom: 16 }}>
              {/* Rating Overview Card */}
              <View style={[reviewsStyles.ratingOverviewCard, { marginHorizontal: 0, marginTop: 8 }]}>
                <View style={reviewsStyles.ratingLeft}>
                  <Text style={reviewsStyles.ratingScore}>4.8</Text>
                  <View style={reviewsStyles.starsRow}>{renderStars(5, 14)}</View>
                  <Text style={reviewsStyles.ratingCountText}>(256 đánh giá)</Text>
                </View>

                <View style={reviewsStyles.ratingRight}>
                  {[
                    { label: '5', percentage: '82%', count: '210' },
                    { label: '4', percentage: '15%', count: '38' },
                    { label: '3', percentage: '2%', count: '5' },
                    { label: '2', percentage: '1%', count: '2' },
                    { label: '1', percentage: '0.4%', count: '1' },
                  ].map((bar) => (
                    <View key={bar.label} style={reviewsStyles.progressBarRow}>
                      <Text style={reviewsStyles.barLabel}>{bar.label}</Text>
                      <Ionicons name="star" size={11} color="#feae2c" />
                      <View style={reviewsStyles.barTrack}>
                        <View style={[reviewsStyles.barFill, { width: bar.percentage as any }]} />
                      </View>
                      <Text style={reviewsStyles.barCount}>{bar.count}</Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Danh mục đánh giá */}
              <View style={[reviewsStyles.sectionTitleRow, { paddingHorizontal: 0 }]}>
                <Text style={reviewsStyles.sectionTitle}>Danh mục đánh giá</Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('VenueReviews', {
                      venueId,
                      venueName: venue.name,
                      venueAddress: venue.address,
                      imageUrl: venue.heroImage,
                    })
                  }
                >
                  <Text style={reviewsStyles.seeAllText}>Xem tất cả  <Ionicons name="chevron-forward" size={12} color="#1989a8" /></Text>
                </TouchableOpacity>
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={[reviewsStyles.categoriesContainer, { paddingLeft: 0, marginBottom: 16 }]}
              >
                {[
                  { label: 'Mặt sân', score: 4.8, icon: 'tennisball-outline' as const },
                  { label: 'Ánh sáng', score: 4.9, icon: 'sunny-outline' as const },
                  { label: 'Thông gió', score: 4.7, icon: 'leaf-outline' as const },
                  { label: 'Vệ sinh', score: 4.8, icon: 'cut-outline' as const },
                  { label: 'Bãi giữ xe', score: 4.6, icon: 'car-outline' as const },
                ].map((cat, idx) => (
                  <View key={idx} style={reviewsStyles.categoryBox}>
                    <Ionicons name={cat.icon} size={20} color="#1989a8" />
                    <Text style={reviewsStyles.categoryLabel}>{cat.label}</Text>
                    <Text style={reviewsStyles.categoryScore}>{cat.score}</Text>
                  </View>
                ))}
              </ScrollView>

              {/* Đánh giá nổi bật */}
              <View style={[reviewsStyles.sectionTitleRow, { paddingHorizontal: 0, marginBottom: 8 }]}>
                <Text style={reviewsStyles.sectionTitle}>Đánh giá nổi bật</Text>
              </View>

              <View style={[reviewsStyles.reviewsList, { paddingHorizontal: 0 }]}>
                {reviews.map((rev) => (
                  <View key={rev.id} style={reviewsStyles.reviewCard}>
                    <View style={reviewsStyles.reviewHeader}>
                      <View style={reviewsStyles.reviewerInfo}>
                        <Image source={{ uri: rev.avatar }} style={reviewsStyles.reviewerAvatar} />
                        <View style={{ gap: 2 }}>
                          <Text style={reviewsStyles.reviewerName}>{rev.name}</Text>
                          <View style={{ flexDirection: 'row', gap: 2 }}>
                            {renderStars(rev.stars, 12)}
                          </View>
                        </View>
                      </View>
                      <View style={reviewsStyles.reviewMeta}>
                        <Text style={reviewsStyles.reviewDate}>{rev.date}</Text>
                      </View>
                    </View>

                    <Text style={reviewsStyles.reviewComment}>{rev.comment}</Text>

                    {rev.photos.length > 0 && (
                      <View style={reviewsStyles.photoRow}>
                        {rev.photos.map((photo, pIdx) => (
                          <Image
                            key={pIdx}
                            source={{ uri: photo }}
                            style={reviewsStyles.reviewPhoto}
                            resizeMode="cover"
                          />
                        ))}
                      </View>
                    )}
                  </View>
                ))}
              </View>

              {/* Viết đánh giá Button */}
              <TouchableOpacity
                style={[reviewsStyles.writeReviewBtn, { marginHorizontal: 0, marginTop: 20 }]}
                onPress={handleWriteReview}
                activeOpacity={0.7}
              >
                <Ionicons name="create-outline" size={20} color="#1989a8" />
                <Text style={reviewsStyles.writeReviewText}>Viết đánh giá</Text>
              </TouchableOpacity>
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

      {/* ======== BOOKING TYPE MODAL ======== */}
      <BookingTypeModal
        visible={showBookingModal}
        onClose={handleCloseBookingModal}
        onSelectDayBooking={handleDayBooking}
        onSelectEventBooking={handleEventBooking}
      />
    </View>
  );
};

export default VenueDetailsScreen;
