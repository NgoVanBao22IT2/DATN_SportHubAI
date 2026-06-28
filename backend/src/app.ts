import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import errorHandler from './common/middlewares/errorHandler';
import { NotFoundError } from './common/errors/AppError';

import authRoutes from './modules/auth/routes/authRoutes';
import venueRoutes from './modules/venue/routes/venueRoutes';
import bookingRoutes from './modules/booking/routes/bookingRoutes';

const app: Application = express();

// ==========================================
// MIDDLEWARES CƠ BẢN
// ==========================================

// Bảo mật các Header HTTP bằng Helmet
app.use(helmet());

// Cấu hình chia sẻ tài nguyên CORS
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Phân tích dữ liệu JSON đầu vào (Payload size giới hạn 10mb bảo vệ DOS)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Giới hạn tần suất gọi API (Rate Limiting) phòng chống Bruteforce/DDoS
const globalRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 phút
  max: 100, // Tối đa 100 requests mỗi IP
  message: {
    error: {
      code: 'TOO_MANY_REQUESTS',
      message: 'Bạn đã thực hiện quá nhiều yêu cầu. Vui lòng thử lại sau 15 phút.',
    },
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', globalRateLimiter);

// ==========================================
// ĐỊNH TUYẾN (ROUTES)
// ==========================================

// Đăng ký các router nghiệp vụ
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/venues', venueRoutes);
app.use('/api/v1/bookings', bookingRoutes);

// Endpoint kiểm tra sức khoẻ server (Health Check)
app.use('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'UP',
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV,
  });
});

// Nơi đăng ký các router của Module nghiệp vụ sau này
// Ví dụ: app.use('/api/v1/auth', authRouter);

// Bắt các request vào các endpoint không tồn tại
app.use('*', (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError(`Không tìm thấy endpoint: ${req.originalUrl}`));
});

// ==========================================
// XỬ LÝ LỖI TOÀN CỤC (GLOBAL ERROR HANDLER)
// ==========================================
app.use(errorHandler);

export default app;
