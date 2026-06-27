import React, { useState, useMemo, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../core/navigation/navigation.types';
import styles from '../styles/SearchScreenStyles';

type SearchRouteProp = RouteProp<RootStackParamList, 'Search'>;
type SearchNavProp = StackNavigationProp<RootStackParamList, 'Search'>;

// =============================================================================
// TYPES & MOCK DATA
// =============================================================================
type SportType = 'badminton' | 'pickleball' | 'tennis' | 'football';

interface Venue {
  id: string;
  name: string;
  address: string;
  rating: number;
  distance: string;
  sport: SportType;
  imageUrl: string;
}

const MOCK_VENUES: Venue[] = [
  {
    id: '1',
    name: 'Sân Cầu Lông ABC Premium',
    address: '123 Đường Lê Lợi, Phường Bến Nghé, Quận 1',
    rating: 4.9,
    distance: '1.2 km',
    sport: 'badminton',
    imageUrl: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '2',
    name: 'Pickleball District One',
    address: '456 Nguyễn Huệ, Quận 1, TP. HCM',
    rating: 4.6,
    distance: '2.5 km',
    sport: 'pickleball',
    imageUrl: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '3',
    name: 'ACE BADMINTON',
    address: '2A, Hòa Nam 6, Phường Hòa Khánh, TP Đà Nẵng',
    rating: 4.8,
    distance: '3.1 km',
    sport: 'badminton',
    imageUrl: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '4',
    name: 'Tennis Park Quận 7',
    address: '789 Nguyễn Thị Thập, Phường Tân Phú, Quận 7',
    rating: 4.7,
    distance: '4.2 km',
    sport: 'tennis',
    imageUrl: 'https://images.unsplash.com/photo-1617130394232-6d5c26c76f23?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '5',
    name: 'Sân Cầu Lông Sunrise',
    address: '88 Hoàng Diệu 2, Phường Linh Chiểu, Quận Thủ Đức',
    rating: 4.5,
    distance: '5.8 km',
    sport: 'badminton',
    imageUrl: 'https://images.unsplash.com/photo-1625830523687-e3ad5bddbd1b?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '6',
    name: 'Pickleball Pro Center',
    address: '12 Cộng Hòa, Phường 4, Quận Tân Bình, TP. HCM',
    rating: 4.4,
    distance: '6.3 km',
    sport: 'pickleball',
    imageUrl: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=800&auto=format&fit=crop',
  },
];

// Sport icon config
const SPORT_CONFIG: Record<SportType, { icon: string; color: string }> = {
  badminton: { icon: 'shield', color: '#1b5e20' },
  pickleball: { icon: 'tennisball', color: '#1a237e' },
  tennis: { icon: 'baseball', color: '#bf360c' },
  football: { icon: 'football', color: '#4a148c' },
};

// =============================================================================
// VENUE CARD COMPONENT
// =============================================================================
interface VenueCardProps {
  venue: Venue;
  isFavorite: boolean;
  onFavoriteToggle: (id: string) => void;
  onBook: (venue: Venue) => void;
}

const VenueCard: React.FC<VenueCardProps> = ({ venue, isFavorite, onFavoriteToggle, onBook }) => {
  const sportConf = SPORT_CONFIG[venue.sport];

  return (
    <View style={styles.venueCard}>
      {/* Hero Image */}
      <View style={styles.heroContainer}>
        <Image
          source={{ uri: venue.imageUrl }}
          style={styles.heroImage}
          resizeMode="cover"
        />
        <View style={styles.heroGradient} />

        {/* Rating Badge */}
        <View style={styles.ratingBadge}>
          <Ionicons name="star" size={12} color="#ffffff" />
          <Text style={styles.ratingText}>{venue.rating.toFixed(1)}</Text>
        </View>

        {/* Favorite Button */}
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => onFavoriteToggle(venue.id)}
          activeOpacity={0.8}
        >
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={18}
            color={isFavorite ? '#ef4444' : '#94a3b8'}
          />
        </TouchableOpacity>
      </View>

      {/* Info Section */}
      <View style={styles.infoSection}>
        {/* Name + Distance Row */}
        <View style={styles.infoRow}>
          {/* Sport icon circle */}
          <View style={[styles.sportIconCircle, { backgroundColor: sportConf.color }]}>
            <Ionicons name={sportConf.icon as any} size={16} color="#ffffff" />
          </View>
          <View style={styles.venueTitleRow}>
            <Text style={styles.venueName} numberOfLines={1}>
              {venue.name}
            </Text>
            <Text style={styles.distanceTag}>({venue.distance})</Text>
          </View>
        </View>

        {/* Address */}
        <Text style={styles.venueAddress} numberOfLines={2}>
          {venue.address}
        </Text>

        {/* Booking Button */}
        <TouchableOpacity
          style={styles.bookingButton}
          onPress={() => onBook(venue)}
          activeOpacity={0.85}
        >
          <Text style={styles.bookingButtonText}>ĐẶT LỊCH</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// =============================================================================
// MAIN SCREEN COMPONENT
// =============================================================================
export const SearchScreen = () => {
  const navigation = useNavigation<SearchNavProp>();
  const route = useRoute<SearchRouteProp>();

  const [query, setQuery] = useState(route.params?.initialQuery ?? '');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const inputRef = useRef<TextInput>(null);

  // Filter venues based on query
  const filteredVenues = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return MOCK_VENUES;
    return MOCK_VENUES.filter(
      (v) =>
        v.name.toLowerCase().includes(q) ||
        v.address.toLowerCase().includes(q) ||
        v.sport.toLowerCase().includes(q),
    );
  }, [query]);

  // Handlers
  const handleBack = () => navigation.goBack();

  const handleClear = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  const handleFavoriteToggle = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleBook = (venue: Venue) => {
    navigation.navigate('VenueDetails', { venueId: venue.id });
  };

  // =============================================================================
  // RENDER
  // =============================================================================
  return (
    <View style={styles.container}>
      {/* ======== HEADER ======== */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={22} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tìm Kiếm Sân</Text>
      </View>

      {/* ======== SEARCH BAR ======== */}
      <View style={styles.searchBarContainer}>
        <View style={styles.searchBarInner}>
          {/* Left icon */}
          <View style={styles.searchIconBox}>
            <Ionicons name="leaf" size={17} color="#00450d" />
          </View>

          {/* Text input */}
          <TextInput
            ref={inputRef}
            style={styles.searchInput}
            value={query}
            onChangeText={setQuery}
            placeholder="Tìm kiếm sân..."
            placeholderTextColor="#94a3b8"
            returnKeyType="search"
            autoFocus={!route.params?.initialQuery}
            onSubmitEditing={() => {}}
          />

          {/* Clear button */}
          {query.length > 0 && (
            <TouchableOpacity style={styles.clearButton} onPress={handleClear} activeOpacity={0.7}>
              <View style={styles.clearButtonCircle}>
                <Ionicons name="close" size={10} color="#717a6d" />
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* ======== RESULTS LIST ======== */}
      <FlatList
        data={filteredVenues}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.listGap} />}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) => (
          <VenueCard
            venue={item}
            isFavorite={favorites.has(item.id)}
            onFavoriteToggle={handleFavoriteToggle}
            onBook={handleBook}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="search-outline" size={48} color="#cbd5e1" />
            <Text style={styles.emptyText}>Không tìm thấy sân nào</Text>
            <Text style={styles.emptySubText}>Thử tìm với từ khóa khác</Text>
          </View>
        }
      />
    </View>
  );
};

export default SearchScreen;
