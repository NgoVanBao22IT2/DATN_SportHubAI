import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import {
  useNavigation,
  CompositeNavigationProp,
} from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  AppTabParamList,
  RootStackParamList,
} from '../../../core/navigation/navigation.types';
import styles from '../styles/MapScreenStyles';

type SportFilter = 'all' | 'pickleball' | 'badminton' | 'football';

interface MapVenue {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  location: string;
  sportType: string;
  courtCount: number;
  sport: Exclude<SportFilter, 'all'>;
  latitude: number;
  longitude: number;
  imageUrl: string;
}

type MapScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<AppTabParamList, 'MapTab'>,
  StackNavigationProp<RootStackParamList>
>;

const HCM_REGION: Region = {
  latitude: 10.7769,
  longitude: 106.7009,
  latitudeDelta: 0.12,
  longitudeDelta: 0.12,
};

const MAP_VENUES: MapVenue[] = [
  {
    id: '1',
    name: 'Sân Cầu Lông Sunrise',
    rating: 4.8,
    reviewCount: 128,
    location: 'Quận 7, TP. Hồ Chí Minh',
    sportType: 'Cầu lông',
    courtCount: 6,
    sport: 'badminton',
    latitude: 10.7329,
    longitude: 106.7267,
    imageUrl:
      'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: '2',
    name: 'Pickleball District One',
    rating: 4.6,
    reviewCount: 86,
    location: 'Quận 1, TP. Hồ Chí Minh',
    sportType: 'Pickleball',
    courtCount: 4,
    sport: 'pickleball',
    latitude: 10.7763,
    longitude: 106.7012,
    imageUrl:
      'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: '3',
    name: 'Sân Bóng Đá Thảo Điền',
    rating: 4.5,
    reviewCount: 64,
    location: 'Quận 2, TP. Hồ Chí Minh',
    sportType: 'Bóng đá',
    courtCount: 2,
    sport: 'football',
    latitude: 10.8014,
    longitude: 106.738,
    imageUrl:
      'https://images.unsplash.com/photo-1574629810360-7ab2e98b9a64?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: '4',
    name: 'ACE BADMINTON',
    rating: 4.7,
    reviewCount: 92,
    location: 'Quận Tân Bình, TP. Hồ Chí Minh',
    sportType: 'Cầu lông',
    courtCount: 8,
    sport: 'badminton',
    latitude: 10.8019,
    longitude: 106.652,
    imageUrl:
      'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: '5',
    name: 'Pickleball Pro Center',
    rating: 4.4,
    reviewCount: 51,
    location: 'Quận Tân Bình, TP. Hồ Chí Minh',
    sportType: 'Pickleball',
    courtCount: 5,
    sport: 'pickleball',
    latitude: 10.7902,
    longitude: 106.6538,
    imageUrl:
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=400&auto=format&fit=crop',
  },
];

const CATEGORIES: {
  id: SportFilter;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
}[] = [
  { id: 'all', label: 'Tất cả', icon: 'grid-outline' },
  { id: 'pickleball', label: 'Pickleball', icon: 'tennisball-outline' },
  { id: 'badminton', label: 'Cầu lông', icon: 'ribbon-outline' },
  { id: 'football', label: 'Bóng đá', icon: 'football-outline' },
];

export const MapScreen = () => {
  const navigation = useNavigation<MapScreenNavigationProp>();
  const mapRef = useRef<MapView>(null);

  const [selectedCategory, setSelectedCategory] = useState<SportFilter>('all');
  const [selectedVenueId, setSelectedVenueId] = useState<string>('1');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const filteredVenues = useMemo(() => {
    if (selectedCategory === 'all') return MAP_VENUES;
    return MAP_VENUES.filter((venue) => venue.sport === selectedCategory);
  }, [selectedCategory]);

  const selectedVenue = useMemo(() => {
    const venue = filteredVenues.find((item) => item.id === selectedVenueId);
    return venue ?? filteredVenues[0] ?? null;
  }, [filteredVenues, selectedVenueId]);

  const handleCategoryPress = useCallback((categoryId: SportFilter) => {
    setSelectedCategory(categoryId);
    setSelectedVenueId((currentId) => {
      const nextVenues =
        categoryId === 'all'
          ? MAP_VENUES
          : MAP_VENUES.filter((venue) => venue.sport === categoryId);
      if (nextVenues.some((venue) => venue.id === currentId)) {
        return currentId;
      }
      return nextVenues[0]?.id ?? currentId;
    });
  }, []);

  const handleMarkerPress = useCallback((venueId: string) => {
    setSelectedVenueId(venueId);
  }, []);

  const handleVenueCardPress = useCallback(() => {
    if (!selectedVenue) return;
    navigation.navigate('VenueDetails', { venueId: selectedVenue.id });
  }, [navigation, selectedVenue]);

  const handleFavoriteToggle = useCallback(() => {
    if (!selectedVenue) return;
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(selectedVenue.id)) {
        next.delete(selectedVenue.id);
      } else {
        next.add(selectedVenue.id);
      }
      return next;
    });
  }, [selectedVenue]);

  const handleSearchPress = useCallback(() => {
    navigation.navigate('Search', {});
  }, [navigation]);

  const handleFilterPress = useCallback(() => {
    Alert.alert(
      'Bộ lọc',
      'Chọn thêm tiêu chí lọc sân trên bản đồ.',
      [{ text: 'Đóng', style: 'cancel' }],
    );
  }, []);

  const handleLocatePress = useCallback(async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Quyền truy cập vị trí',
          'Vui lòng cấp quyền vị trí để xem vị trí hiện tại trên bản đồ.',
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      mapRef.current?.animateToRegion(
        {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
        },
        600,
      );
    } catch {
      Alert.alert('Lỗi', 'Không thể lấy vị trí hiện tại. Vui lòng thử lại.');
    }
  }, []);

  const handleNotificationPress = useCallback(() => {
    Alert.alert('Thông báo', 'Chức năng thông báo sẽ được cập nhật sau.');
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Bản đồ sân</Text>
        </View>

        <TouchableOpacity
          style={styles.notificationButton}
          onPress={handleNotificationPress}
          activeOpacity={0.8}
        >
          <Ionicons name="notifications-outline" size={24} color="#ffffff" />
          <View style={styles.notificationDot} />
        </TouchableOpacity>
      </View>

      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={HCM_REGION}
          showsUserLocation
          showsMyLocationButton={false}
          showsCompass={false}
          toolbarEnabled={false}
        >
          {filteredVenues.map((venue) => {
            const isSelected = venue.id === selectedVenue?.id;
            return (
              <Marker
                key={venue.id}
                coordinate={{
                  latitude: venue.latitude,
                  longitude: venue.longitude,
                }}
                onPress={() => handleMarkerPress(venue.id)}
              >
                <View
                  style={[
                    styles.markerDot,
                    isSelected && styles.markerDotSelected,
                  ]}
                />
              </Marker>
            );
          })}
        </MapView>

        <View style={styles.overlayTop}>
          <View style={styles.searchRow}>
            <TouchableOpacity
              style={styles.searchBar}
              onPress={handleSearchPress}
              activeOpacity={0.9}
            >
              <Ionicons name="search-outline" size={20} color="#94a3b8" />
              <Text style={styles.searchPlaceholder}>
                Tìm kiếm sân hoặc môn thể thao...
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.filterButton}
              onPress={handleFilterPress}
              activeOpacity={0.85}
            >
              <Ionicons name="options-outline" size={22} color="#1989a8" />
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoryScroll}
            contentContainerStyle={styles.categoryScrollContent}
          >
            {CATEGORIES.map((category) => {
              const isActive = selectedCategory === category.id;
              return (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryChip,
                    isActive && styles.categoryChipActive,
                  ]}
                  onPress={() => handleCategoryPress(category.id)}
                  activeOpacity={0.85}
                >
                  <Ionicons
                    name={category.icon}
                    size={14}
                    color={isActive ? '#ffffff' : '#1989a8'}
                  />
                  <Text
                    style={[
                      styles.categoryChipText,
                      isActive && styles.categoryChipTextActive,
                    ]}
                  >
                    {category.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        <TouchableOpacity
          style={styles.locateButton}
          onPress={handleLocatePress}
          activeOpacity={0.85}
        >
          <Ionicons name="locate-outline" size={22} color="#1989a8" />
        </TouchableOpacity>

        {selectedVenue && (
          <TouchableOpacity
            style={styles.venueCard}
            onPress={handleVenueCardPress}
            activeOpacity={0.92}
          >
            <Image
              source={{ uri: selectedVenue.imageUrl }}
              style={styles.venueImage}
              resizeMode="cover"
            />

            <View style={styles.venueInfo}>
              <View style={styles.venueNameRow}>
                <Text style={styles.venueName} numberOfLines={2}>
                  {selectedVenue.name}
                </Text>
                <TouchableOpacity
                  style={styles.favoriteButton}
                  onPress={(event) => {
                    event.stopPropagation();
                    handleFavoriteToggle();
                  }}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <Ionicons
                    name={
                      favorites.has(selectedVenue.id)
                        ? 'heart'
                        : 'heart-outline'
                    }
                    size={20}
                    color={
                      favorites.has(selectedVenue.id) ? '#ef4444' : '#94a3b8'
                    }
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.ratingRow}>
                <Ionicons name="star" size={14} color="#fbbf24" />
                <Text style={styles.ratingText}>
                  {selectedVenue.rating.toFixed(1)}
                </Text>
                <Text style={styles.reviewCount}>
                  ({selectedVenue.reviewCount} đánh giá)
                </Text>
              </View>

              <View style={styles.locationRow}>
                <Ionicons name="location-outline" size={14} color="#6b7280" />
                <Text style={styles.locationText} numberOfLines={1}>
                  {selectedVenue.location}
                </Text>
              </View>

              <View style={styles.sportRow}>
                <Ionicons name="ribbon-outline" size={14} color="#1989a8" />
                <Text style={styles.sportText}>
                  {selectedVenue.sportType} • {selectedVenue.courtCount} sân
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default MapScreen;
