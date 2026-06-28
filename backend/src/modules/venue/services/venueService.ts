import { Op, Sequelize } from 'sequelize';
import Venue from '../models/Venue';
import Court from '../models/Court';
import { NotFoundError } from '../../../common/errors/AppError';

// Công thức Haversine tính khoảng cách giữa 2 điểm GPS (Km)
const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Bán kính trái đất (km)
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export const venueService = {
  // Tìm kiếm & lọc địa điểm
  search: async (filters: {
    sportType?: 'PICKLEBALL' | 'BADMINTON' | 'TENNIS';
    searchQuery?: string;
    latitude?: number;
    longitude?: number;
    maxDistanceKm?: number;
  }) => {
    const { sportType, searchQuery, latitude, longitude, maxDistanceKm } = filters;
    const whereClause: any = {};

    // Tìm kiếm theo từ khóa tên hoặc địa chỉ
    if (searchQuery) {
      whereClause[Op.or] = [
        { name: { [Op.like]: `%${searchQuery}%` } },
        { address: { [Op.like]: `%${searchQuery}%` } },
      ];
    }

    // Lọc theo loại môn thể thao
    if (sportType) {
      // Trong MySQL, JSON_CONTAINS kiểm tra xem mảng sportTypes có chứa sportType hay không
      whereClause[Op.and] = Sequelize.literal(`JSON_CONTAINS(sport_types, '"${sportType}"')`);
    }

    let venues = await Venue.findAll({
      where: whereClause,
      include: [
        {
          model: Court,
          as: 'courts',
          attributes: ['id', 'pricePerHour', 'sportType'],
        },
      ],
    });

    // Chuyển đổi dữ liệu và tính toán khoảng cách/giá
    let result = venues.map((venue: any) => {
      const courts = venue.courts || [];
      const prices = courts.map((c: any) => c.pricePerHour);
      
      let minPrice = 0;
      let maxPrice = 0;
      if (prices.length > 0) {
        minPrice = Math.min(...prices);
        maxPrice = Math.max(...prices);
      }

      const venueJson = venue.toJSON();

      return {
        id: venueJson.id,
        name: venueJson.name,
        description: venueJson.description,
        address: venueJson.address,
        location: {
          latitude: venueJson.latitude,
          longitude: venueJson.longitude,
          address: venueJson.address,
        },
        sportTypes: venueJson.sportTypes,
        rating: venueJson.rating,
        reviewsCount: venueJson.reviewsCount,
        imageUrls: venueJson.imageUrls,
        priceRange: { min: minPrice, max: maxPrice },
        distance: (latitude && longitude)
          ? getDistance(latitude, longitude, venueJson.latitude, venueJson.longitude)
          : undefined,
      };
    });

    // Lọc theo bán kính nếu được yêu cầu
    if (latitude && longitude && maxDistanceKm) {
      result = result.filter((v) => v.distance !== undefined && v.distance <= maxDistanceKm);
      // Sắp xếp tăng dần theo khoảng cách
      result.sort((a, b) => (a.distance || 0) - (b.distance || 0));
    }

    return result;
  },

  // Xem chi tiết
  getDetails: async (venueId: string) => {
    const venue = await Venue.findByPk(venueId, {
      include: [
        {
          model: Court,
          as: 'courts',
        },
      ],
    });

    if (!venue) {
      throw new NotFoundError('Không tìm thấy sân thể thao này.');
    }

    const courts = (venue as any).courts || [];
    const prices = courts.map((c: any) => c.pricePerHour);
    let minPrice = 0;
    let maxPrice = 0;
    if (prices.length > 0) {
      minPrice = Math.min(...prices);
      maxPrice = Math.max(...prices);
    }

    const venueJson = venue.toJSON();

    return {
      id: venueJson.id,
      name: venueJson.name,
      description: venueJson.description,
      address: venueJson.address,
      location: {
        latitude: venueJson.latitude,
        longitude: venueJson.longitude,
        address: venueJson.address,
      },
      sportTypes: venueJson.sportTypes,
      rating: venueJson.rating,
      reviewsCount: venueJson.reviewsCount,
      imageUrls: venueJson.imageUrls,
      priceRange: { min: minPrice, max: maxPrice },
    };
  },

  // Danh sách courts
  getCourts: async (venueId: string) => {
    const venue = await Venue.findByPk(venueId);
    if (!venue) {
      throw new NotFoundError('Không tìm thấy sân thể thao này.');
    }

    const courts = await Court.findAll({
      where: {
        venueId,
        status: 'ACTIVE',
      },
    });

    return courts;
  },
};
