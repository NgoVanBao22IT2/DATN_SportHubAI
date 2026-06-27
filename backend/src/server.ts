import dotenv from 'dotenv';
import http from 'http';
import app from './app';
import { connectDatabase, sequelize } from './config/database';
import logger from './common/utils/logger';

// Nạp các biến môi trường
dotenv.config();

const PORT = parseInt(process.env.PORT || '5000', 10);

const server = http.createServer(app);

const bootstrap = async () => {
  // 1. Kết nối Cơ sở dữ liệu MySQL
  await connectDatabase();

  // 2. Lắng nghe yêu cầu HTTP
  server.listen(PORT, () => {
    logger.info(`Máy chủ ArenaReserve Backend đang hoạt động trên Port: ${PORT} ở chế độ [${process.env.NODE_ENV}]`);
  });
};

// Xử lý lỗi Uncaught Exception (Các lỗi đồng bộ xảy ra ngoài luồng bắt lỗi thông thường)
process.on('uncaughtException', (error: Error) => {
  logger.error('Lỗi nghiêm trọng Uncaught Exception! Đang tắt máy chủ...', error);
  process.exit(1);
});

// Xử lý lỗi Unhandled Rejection (Các Promise bị reject mà không có catch)
process.on('unhandledRejection', (reason: any) => {
  logger.error('Lỗi nghiêm trọng Unhandled Rejection! Chi tiết:', reason);
  // Có thể cân nhắc tắt máy chủ tuỳ mức độ nghiêm trọng
});

// Xử lý tín hiệu tắt nguồn hệ thống để shutdown an toàn (Graceful Shutdown)
const gracefulShutdown = () => {
  logger.info('Đang nhận tín hiệu tắt máy chủ. Tiến hành đóng các kết nối an toàn...');
  
  server.close(async () => {
    logger.info('Máy chủ HTTP đã dừng nhận request mới.');
    try {
      await sequelize.close();
      logger.info('Đã đóng kết nối cơ sở dữ liệu MySQL thành công.');
      process.exit(0);
    } catch (error) {
      logger.error('Gặp lỗi khi đóng kết nối cơ sở dữ liệu MySQL:', error);
      process.exit(1);
    }
  });

  // Tự động ép buộc ngắt kết nối sau 10s nếu đóng an toàn bị treo
  setTimeout(() => {
    logger.warn('Không thể đóng kết nối đúng hạn, ép buộc ngắt tiến trình.');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

// Khởi chạy ứng dụng
bootstrap();
