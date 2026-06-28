import dotenv from 'dotenv';
import path from 'path';

// Nạp biến môi trường từ file .env trước khi import bất kỳ model nào
dotenv.config({ path: path.join(__dirname, '../../.env') });

import { sequelize } from './database';
import User from '../modules/auth/models/User';
import Venue from '../modules/venue/models/Venue';
import Court from '../modules/venue/models/Court';
import logger from '../common/utils/logger';

const seedDatabase = async () => {
  try {
    logger.info('Đang kết nối database để chuẩn bị seeding...');
    await sequelize.authenticate();
    
    // Đồng bộ lại bảng (xoá bảng cũ và tạo bảng mới)
    logger.info('Đang đồng bộ hóa database (drop & recreate)...');
    await sequelize.sync({ force: true });
    
    logger.info('Bắt đầu seeding dữ liệu...');

    // 1. Tạo tài khoản người dùng mẫu
    logger.info('Tạo tài khoản người dùng...');
    const userClient = await User.create({
      email: 'mizien@sporthub.com',
      fullName: 'Phan Thị Mỹ Duyên',
      phoneNumber: '0789460364',
      password: '123456789',
      role: 'USER',
      isVerified: true,
    });

    const userOwner = await User.create({
      email: 'chusan@sporthub.com',
      fullName: 'Trần Văn Chủ',
      phoneNumber: '0912345678',
      password: '123456789',
      role: 'OWNER',
      isVerified: true,
    });

    const userAdmin = await User.create({
      email: 'admin@sporthub.com',
      fullName: 'Ngô Văn Bảo',
      phoneNumber: '0347176526',
      password: 'admin123',
      role: 'ADMIN',
      isVerified: true,
    });

    logger.info(`Đã tạo tài khoản: 
      - Khách hàng: ${userClient.email} / Mật khẩu: 123456789
      - Chủ sân: ${userOwner.email} / Mật khẩu: 123456789
      - Admin: ${userAdmin.email} / Mật khẩu: admin123`);

    // 2. Tạo địa điểm thể thao (Venues)
    logger.info('Tạo các địa điểm thể thao...');
    const venue1 = await Venue.create({
      name: 'Sân Pickleball Thảo Điền',
      description: 'Tổ hợp sân Pickleball hiện đại bậc nhất Quận 2 với hệ thống mái che cơ động, đèn chiếu sáng cao cấp chuẩn thi đấu quốc tế. Thích hợp cho cả tập luyện chuyên nghiệp và giao lưu giải trí.',
      address: '12 Quốc Hương, Thảo Điền, Quận 2, TP. Hồ Chí Minh',
      latitude: 10.803734,
      longitude: 106.732386,
      sportTypes: ['PICKLEBALL'],
      rating: 4.8,
      reviewsCount: 42,
      imageUrls: [
        'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800',
        'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800'
      ],
      ownerId: userOwner.id,
    });

    const venue2 = await Venue.create({
      name: 'SportCenter Bình Thạnh',
      description: 'Hệ thống sân Cầu lông và Tennis trong nhà cực kỳ thoáng mát, sàn đấu tiêu chuẩn giảm chấn thương, dịch vụ nước uống và tủ đồ miễn phí, bãi đỗ xe ô tô rộng rãi tiện lợi.',
      address: '200 Điện Biên Phủ, Phường 17, Bình Thạnh, TP. Hồ Chí Minh',
      latitude: 10.796342,
      longitude: 106.705123,
      sportTypes: ['BADMINTON', 'TENNIS'],
      rating: 4.5,
      reviewsCount: 28,
      imageUrls: [
        'https://images.unsplash.com/photo-1545809074-59472b3f5eca?w=800',
        'https://images.unsplash.com/photo-1613564834361-9436948817d1?w=800'
      ],
      ownerId: userOwner.id,
    });

    logger.info('Đã tạo các địa điểm thành công.');

    // 3. Tạo các sân thi đấu nhỏ (Courts)
    logger.info('Tạo các sân nhỏ...');
    
    // Courts của Venue 1 (Pickleball)
    await Court.create({
      venueId: venue1.id,
      name: 'Sân VIP 1 (Mái che)',
      sportType: 'PICKLEBALL',
      pricePerHour: 150000,
      status: 'ACTIVE',
    });

    await Court.create({
      venueId: venue1.id,
      name: 'Sân Thường 2',
      sportType: 'PICKLEBALL',
      pricePerHour: 100000,
      status: 'ACTIVE',
    });

    await Court.create({
      venueId: venue1.id,
      name: 'Sân Thường 3',
      sportType: 'PICKLEBALL',
      pricePerHour: 100000,
      status: 'ACTIVE',
    });

    // Courts của Venue 2 (Cầu lông & Tennis)
    await Court.create({
      venueId: venue2.id,
      name: 'Sân Badminton 1',
      sportType: 'BADMINTON',
      pricePerHour: 70000,
      status: 'ACTIVE',
    });

    await Court.create({
      venueId: venue2.id,
      name: 'Sân Badminton 2',
      sportType: 'BADMINTON',
      pricePerHour: 70000,
      status: 'ACTIVE',
    });

    await Court.create({
      venueId: venue2.id,
      name: 'Sân Tennis Ngoài trời',
      sportType: 'TENNIS',
      pricePerHour: 200000,
      status: 'ACTIVE',
    });

    logger.info('Đã tạo danh sách sân nhỏ thành công.');
    logger.info('=== QUÁ TRÌNH SEEDING HOÀN THÀNH THÀNH CÔNG ===');
    
    await sequelize.close();
    process.exit(0);
  } catch (error) {
    logger.error('Lỗi xảy ra trong quá trình seeding dữ liệu:', error);
    process.exit(1);
  }
};

seedDatabase();
