import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import logger from '../common/utils/logger';

// Load config in case database.ts is executed in scripts or tests directly
dotenv.config();

const dbHost = process.env.DB_HOST || '127.0.0.1';
const dbPort = parseInt(process.env.DB_PORT || '3306', 10);
const dbUser = process.env.DB_USER || 'root';
const dbPass = process.env.DB_PASS || '';
const dbName = process.env.DB_NAME || 'arena_reserve';

export const sequelize = new Sequelize(dbName, dbUser, dbPass, {
  host: dbHost,
  port: dbPort,
  dialect: 'mysql',
  logging: (msg) => logger.debug(`[Sequelize Query]: ${msg}`),
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  define: {
    timestamps: true,
    underscored: true, // Chuyển camelCase trong JS thành snake_case trong DB (chuẩn Enterprise)
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
  },
});

export const connectDatabase = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    logger.info('Kết nối Cơ sở dữ liệu MySQL thông qua Sequelize thành công!');
  } catch (error) {
    logger.error('Lỗi nghiêm trọng khi kết nối Cơ sở dữ liệu MySQL:', error);
    process.exit(1); // Thoát tiến trình nếu không kết nối được database chính
  }
};
