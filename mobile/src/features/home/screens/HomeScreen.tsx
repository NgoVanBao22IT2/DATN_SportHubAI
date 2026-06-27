import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../core/navigation/navigation.types';
import styles from '../styles/HomeScreenStyles';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Auth'>;

export const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  // States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState(0);
  const [activeCategory, setActiveCategory] = useState('pickleball');

  // Quick Tags Filter Data
  const tags = ['Cầu lông gần tôi', 'Pickleball gần tôi', 'Sân tennis gần tôi', 'Tennis gần tôi'];

  // Categories Data
  const categories = [
    { id: 'pickleball', label: 'Pickleball', icon: 'tennisball' },
    { id: 'badminton', label: 'Cầu lông', icon: 'ribbon-outline' },
    { id: 'football', label: 'Bóng đá', icon: 'football-outline' },
    { id: 'tennis', label: 'Quần vợt', icon: 'baseball-outline' },
    { id: 'volleyball', label: 'Bóng chuyền', icon: 'basketball-outline' },
  ];

  // Mock Featured Venues Data
  const featuredVenues = [
    {
      id: '1',
      name: 'Sân Cầu Lông Sunrise',
      rating: '4.8',
      location: 'Quận 7, TP. Hồ Chí Minh',
      image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=400&auto=format&fit=crop',
    },
    {
      id: '2',
      name: 'ACE BADMINTON',
      rating: '4.5',
      location: '2A, Hòa Nam 6, Phường Hòa Khánh, TP Đà Nẵng',
      image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=400&auto=format&fit=crop',
    },
    {
      id: '3',
      name: 'Sân ICON',
      rating: '4.9',
      location: '122 Tôn Đản, Phường An Khê, TP Đà Nẵng',
      image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=400&auto=format&fit=crop',
    },
  ];

  // Actions
  const handleBannerPress = () => {
    Alert.alert('Khuyến mãi', 'Chương trình ưu đãi giảm giá 20% tự động áp dụng khi đặt sân Pickleball trong tuần này!');
  };

  const handleBookPress = (venue: typeof featuredVenues[0]) => {
    Alert.alert('Đặt lịch sân', `Bạn chọn đặt lịch tại: ${venue.name}. Hệ thống đặt sân đang được chuẩn bị.`);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      Alert.alert('Tìm kiếm', `Đang tìm kiếm thông tin cho: "${searchQuery}"`);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Top Bar */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Ionicons name="tennisball" size={24} color="#ffffff" />
          <Text style={styles.logoText}>SportHub</Text>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate('Auth', { screen: 'Login' })}
          >
            <Text style={styles.loginButtonText}>Đăng nhập</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => navigation.navigate('Auth', { screen: 'Register' })}
          >
            <Text style={styles.registerButtonText}>Đăng ký</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Scroll Content */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.mainSection}>
          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <Ionicons name="search-outline" size={20} color="#717a6d" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Tìm kiếm sân hoặc môn thể thao..."
              placeholderTextColor="#717a6d"
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
              returnKeyType="search"
            />
          </View>

          {/* Quick Tags Pills */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.tagsScrollView}
          >
            {tags.map((tag, index) => {
              const isActive = selectedTag === index;
              return (
                <TouchableOpacity
                  key={index}
                  style={[styles.tagPill, isActive && styles.tagPillActive]}
                  onPress={() => setSelectedTag(index)}
                >
                  <Ionicons
                    name="location-outline"
                    size={14}
                    color={isActive ? '#1989a8' : '#41496e'}
                    style={styles.tagIcon}
                  />
                  <Text style={[styles.tagText, isActive && styles.tagTextActive]}>{tag}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Sport Categories Grid (Icon Row) */}
          <View style={styles.categoriesContainer}>
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <TouchableOpacity
                  key={cat.id}
                  style={styles.categoryItem}
                  onPress={() => setActiveCategory(cat.id)}
                >
                  <View style={[styles.categoryIconWrapper, isActive && styles.categoryIconWrapperActive]}>
                    <Ionicons
                      name={cat.icon as any}
                      size={24}
                      color={isActive ? '#b2eeff' : '#1989a8'}
                    />
                  </View>
                  <Text style={styles.categoryLabel}>{cat.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Promotion Banner */}
          <View style={styles.bannerContainer}>
            <ImageBackground
              source={{ uri: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=600&auto=format&fit=crop' }}
              style={styles.bannerImage}
              resizeMode="cover"
            >
              <View style={styles.bannerOverlay} />
              <View style={styles.bannerContent}>
                <Text style={styles.bannerTagText}>ƯU ĐÃI HÈ RỰC RỠ</Text>
                <Text style={styles.bannerTitle}>Giảm 20% cho sân{"\n"}Pickleball mới</Text>
                <TouchableOpacity style={styles.bannerButton} onPress={handleBannerPress}>
                  <Text style={styles.bannerButtonText}>Đặt sân ngay</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>

          {/* Section: Sân thể thao nổi bật */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Sân thể thao nổi bật</Text>
            <TouchableOpacity onPress={() => Alert.alert('Xem tất cả', 'Đang tải toàn bộ danh sách sân thể thao...')}>
              <Text style={styles.seeAllLink}>Xem tất cả &gt;</Text>
            </TouchableOpacity>
          </View>

          {/* Venues Card List */}
          <View style={styles.venuesList}>
            {featuredVenues.map((venue) => (
              <View key={venue.id} style={styles.venueCard}>
                <Image source={{ uri: venue.image }} style={styles.venueImage} />
                <View style={styles.venueInfo}>
                  <View style={styles.venueNameRow}>
                    <Text style={styles.venueName} numberOfLines={1}>{venue.name}</Text>
                    <View style={styles.ratingRow}>
                      <Ionicons name="star" size={14} color="#feae2c" />
                      <Text style={styles.ratingText}>{venue.rating}</Text>
                    </View>
                  </View>

                  <View style={styles.locationRow}>
                    <Ionicons name="location-outline" size={14} color="#6b7280" style={styles.locationIcon} />
                    <Text style={styles.locationText} numberOfLines={2}>{venue.location}</Text>
                  </View>

                  <TouchableOpacity
                    style={styles.bookButton}
                    onPress={() => handleBookPress(venue)}
                  >
                    <Ionicons name="calendar-outline" size={16} color="#ffffff" />
                    <Text style={styles.bookButtonText}>Đặt lịch</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
