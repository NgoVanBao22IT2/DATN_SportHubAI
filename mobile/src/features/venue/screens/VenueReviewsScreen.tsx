import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../core/navigation/navigation.types';
import styles from '../styles/VenueReviewsScreenStyles';

type VenueReviewsRouteProp = RouteProp<RootStackParamList, 'VenueReviews'>;

interface ReviewItem {
  id: string;
  name: string;
  avatar: string;
  stars: number;
  date: string;
  comment: string;
  photos: string[];
}

interface CategoryItem {
  label: string;
  score: number;
  icon: keyof typeof Ionicons.glyphMap;
}

const initialReviews: ReviewItem[] = [
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
  {
    id: '3',
    name: 'Lê Quang Huy',
    avatar: 'https://images.unsplash.com/photo-1527983359383-4758693f760c?q=80&w=200&auto=format&fit=crop',
    stars: 4,
    date: '05/07/2026',
    comment: 'Mặt sân tốt, độ nảy ổn định. Bãi xe rộng rãi. Sẽ quay lại thường xuyên.',
    photos: [
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200',
      'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=200',
    ],
  },
];

const categories: CategoryItem[] = [
  { label: 'Mặt sân', score: 4.8, icon: 'tennisball-outline' },
  { label: 'Ánh sáng', score: 4.9, icon: 'sunny-outline' },
  { label: 'Thông gió', score: 4.7, icon: 'leaf-outline' },
  { label: 'Vệ sinh', score: 4.8, icon: 'cut-outline' }, // Custom clean toilet / hygiene symbol in Ionicons
  { label: 'Bãi giữ xe', score: 4.6, icon: 'car-outline' },
];

export const VenueReviewsScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute<VenueReviewsRouteProp>();
  const [reviews, setReviews] = useState<ReviewItem[]>(initialReviews);

  const venueId = route.params?.venueId ?? '2';
  const venueName = route.params?.venueName ?? 'ACE BADMINTON';
  const venueAddress = route.params?.venueAddress ?? '2A, Hòa Nam 6, Phường Hòa Khánh, TP Đà Nẵng';
  const imageUrl = route.params?.imageUrl ?? 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=800&auto=format&fit=crop';

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
            const newReview: ReviewItem = {
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

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1989a8" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Đánh giá</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Venue Info Top Card */}
        <View style={styles.venueCard}>
          <Image source={{ uri: imageUrl }} style={styles.venueImage} />
          <View style={styles.venueInfo}>
            <Text style={styles.venueName}>{venueName}</Text>
            <View style={styles.venueAddressRow}>
              <Ionicons name="location-outline" size={14} color="#1989a8" />
              <Text style={styles.venueAddress} numberOfLines={2}>
                {venueAddress}
              </Text>
            </View>
          </View>
        </View>

        {/* Rating Overview Card */}
        <View style={styles.ratingOverviewCard}>
          <View style={styles.ratingLeft}>
            <Text style={styles.ratingScore}>4.8</Text>
            <View style={styles.starsRow}>{renderStars(5, 16)}</View>
            <Text style={styles.ratingCountText}>(256 đánh giá)</Text>
          </View>

          <View style={styles.ratingRight}>
            {[
              { label: '5', percentage: '82%', count: '210' },
              { label: '4', percentage: '15%', count: '38' },
              { label: '3', percentage: '2%', count: '5' },
              { label: '2', percentage: '1%', count: '2' },
              { label: '1', percentage: '0.4%', count: '1' },
            ].map((bar) => (
              <View key={bar.label} style={styles.progressBarRow}>
                <Text style={styles.barLabel}>{bar.label}</Text>
                <Ionicons name="star" size={11} color="#feae2c" />
                <View style={styles.barTrack}>
                  <View style={[styles.barFill, { width: bar.percentage as any }]} />
                </View>
                <Text style={styles.barCount}>{bar.count}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Danh mục đánh giá */}
        <View style={styles.sectionTitleRow}>
          <Text style={styles.sectionTitle}>Danh mục đánh giá</Text>
          <TouchableOpacity onPress={() => Alert.alert('Thông tin', 'Hiển thị điểm số chi tiết theo từng khía cạnh phục vụ.')}>
            <Text style={styles.seeAllText}>Xem tất cả  <Ionicons name="chevron-forward" size={12} color="#1989a8" /></Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {categories.map((cat, idx) => (
            <View key={idx} style={styles.categoryBox}>
              <Ionicons name={cat.icon} size={20} color="#1989a8" />
              <Text style={styles.categoryLabel}>{cat.label}</Text>
              <Text style={styles.categoryScore}>{cat.score}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Đánh giá nổi bật */}
        <View style={styles.sectionTitleRow}>
          <Text style={styles.sectionTitle}>Đánh giá nổi bật</Text>
        </View>

        <View style={styles.reviewsList}>
          {reviews.map((rev) => (
            <View key={rev.id} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <View style={styles.reviewerInfo}>
                  <Image source={{ uri: rev.avatar }} style={styles.reviewerAvatar} />
                  <View style={{ gap: 2 }}>
                    <Text style={styles.reviewerName}>{rev.name}</Text>
                    <View style={{ flexDirection: 'row', gap: 2 }}>
                      {renderStars(rev.stars, 12)}
                    </View>
                  </View>
                </View>
                <View style={styles.reviewMeta}>
                  <Text style={styles.reviewDate}>{rev.date}</Text>
                </View>
              </View>

              <Text style={styles.reviewComment}>{rev.comment}</Text>

              {rev.photos.length > 0 && (
                <View style={styles.photoRow}>
                  {rev.photos.map((photo, pIdx) => (
                    <Image
                      key={pIdx}
                      source={{ uri: photo }}
                      style={styles.reviewPhoto}
                      resizeMode="cover"
                    />
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Viết đánh giá Button */}
        <TouchableOpacity style={styles.writeReviewBtn} onPress={handleWriteReview} activeOpacity={0.7}>
          <Ionicons name="create-outline" size={20} color="#1989a8" />
          <Text style={styles.writeReviewText}>Viết đánh giá</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
};

export default VenueReviewsScreen;
