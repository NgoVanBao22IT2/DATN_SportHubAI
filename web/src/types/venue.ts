export interface Venue {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  location: string;
  city: string;
  sport: string;
  image: string;
  pricePerHour: number;
  isHot?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export const CATEGORIES: Category[] = [
  { id: 'pickleball', name: 'Pickleball', icon: '🎾' },
  { id: 'badminton', name: 'Cầu lông', icon: '🏸' },
  { id: 'football', name: 'Bóng đá', icon: '⚽' },
  { id: 'tennis', name: 'Quần vợt', icon: '🎾' },
  { id: 'volleyball', name: 'Bóng chuyền', icon: '🏐' },
  { id: 'basketball', name: 'Bóng rổ', icon: '🏀' },
];

export const VENUES: Venue[] = [
  {
    id: '1',
    name: 'Sân Cầu Lông Sunrise',
    rating: 4.8,
    reviews: 128,
    location: 'Quận 7, TP. Hồ Chí Minh',
    city: 'HCM',
    sport: 'badminton',
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=600&auto=format&fit=crop',
    pricePerHour: 120000,
  },
  {
    id: '2',
    name: 'ACE BADMINTON',
    rating: 4.8,
    reviews: 92,
    location: '2A, Hòa Nam 6, Phường Hòa Khánh, TP Đà Nẵng',
    city: 'Đà Nẵng',
    sport: 'badminton',
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=600&auto=format&fit=crop',
    pricePerHour: 140000,
  },
  {
    id: '3',
    name: 'Sân ICON Sport',
    rating: 4.9,
    reviews: 156,
    location: 'Q2, TP. Hồ Chí Minh',
    city: 'HCM',
    sport: 'pickleball',
    image: 'https://images.unsplash.com/photo-1574629810360-7ab2e98b9a64?q=80&w=600&auto=format&fit=crop',
    pricePerHour: 180000,
  },
  {
    id: '4',
    name: 'Pickleball District One',
    rating: 4.8,
    reviews: 110,
    location: 'Quận 1, TP. Hồ Chí Minh',
    city: 'HCM',
    sport: 'pickleball',
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=600&auto=format&fit=crop',
    pricePerHour: 200000,
  },
  {
    id: '5',
    name: 'Sân Bóng Đá Thảo Điền',
    rating: 4.6,
    reviews: 84,
    location: 'Quận 2, TP. Hồ Chí Minh',
    city: 'HCM',
    sport: 'football',
    image: 'https://images.unsplash.com/photo-1574629810360-7ab2e98b9a64?q=80&w=600&auto=format&fit=crop',
    pricePerHour: 350000,
  },
  {
    id: '6',
    name: 'Tennis Club Central',
    rating: 4.9,
    reviews: 210,
    location: 'Quận 3, TP. Hồ Chí Minh',
    city: 'HCM',
    sport: 'tennis',
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=600&auto=format&fit=crop',
    pricePerHour: 250000,
  },
];

export const SIMILAR_VENUES: Venue[] = [
  {
    id: 'sim1',
    name: 'Cầu lông Đất Việt',
    rating: 4.7,
    reviews: 64,
    location: 'Ngũ Hành Sơn, Đà Nẵng',
    city: 'Đà Nẵng',
    sport: 'badminton',
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=600&auto=format&fit=crop',
    pricePerHour: 75000,
  },
  {
    id: 'sim2',
    name: 'Hải Vân Badminton',
    rating: 4.9,
    reviews: 112,
    location: 'Liên Chiểu, Đà Nẵng',
    city: 'Đà Nẵng',
    sport: 'badminton',
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=600&auto=format&fit=crop',
    pricePerHour: 85000,
    isHot: true,
  },
  {
    id: 'sim3',
    name: 'Sân Cầu Lông 365',
    rating: 4.5,
    reviews: 48,
    location: 'Cẩm Lệ, Đà Nẵng',
    city: 'Đà Nẵng',
    sport: 'badminton',
    image: 'https://images.unsplash.com/photo-1574629810360-7ab2e98b9a64?q=80&w=600&auto=format&fit=crop',
    pricePerHour: 70000,
  },
];
