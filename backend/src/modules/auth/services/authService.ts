import jwt from 'jsonwebtoken';
import User from '../models/User';
import RefreshToken from '../models/RefreshToken';
import { BadRequestError, UnauthorizedError, ConflictError } from '../../../common/errors/AppError';
import logger from '../../../common/utils/logger';
import { sendOtpEmail } from '../../../common/utils/mailer';

export interface RegisterUserPayload {
  email: string;
  fullName: string;
  phoneNumber: string;
  role: 'USER' | 'OWNER';
  password?: string;
}

const accessSecret = process.env.JWT_ACCESS_SECRET || 'your_jwt_access_secret_key_should_be_very_long';
const refreshSecret = process.env.JWT_REFRESH_SECRET || 'your_jwt_refresh_secret_key_should_be_even_longer';

export const authService = {
  // Đăng ký tài khoản
  register: async (payload: RegisterUserPayload) => {
    const existingUser = await User.findOne({ where: { email: payload.email } });
    if (existingUser) {
      throw new ConflictError('Email này đã được sử dụng.');
    }

    const user = await User.create({
      email: payload.email,
      fullName: payload.fullName,
      phoneNumber: payload.phoneNumber,
      role: payload.role,
      password: payload.password || 'SportHubDefault@123',
      isVerified: true,
    });

    logger.info(`[ĐĂNG KÝ] Người dùng ${payload.email} đã đăng ký thành công.`);

    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
    };
  },

  // Xác thực Email qua OTP (giữ lại cho luồng cũ/khôi phục)
  verifyEmail: async (email: string, code: string) => {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestError('Người dùng không tồn tại.');
    }

    if (user.verificationCode !== code || !user.verificationExpires || new Date() > user.verificationExpires) {
      throw new BadRequestError('Mã OTP xác thực không chính xác hoặc đã hết hạn.');
    }

    user.isVerified = true;
    user.verificationCode = null;
    user.verificationExpires = null;
    await user.save();

    return true;
  },

  // Gửi lại mã OTP (giữ lại cho luồng cũ/khôi phục)
  resendVerification: async (email: string) => {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestError('Người dùng không tồn tại.');
    }

    if (user.isVerified) {
      throw new BadRequestError('Tài khoản đã được xác thực trước đó.');
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const verificationExpires = new Date(Date.now() + 10 * 60 * 1000);

    user.verificationCode = verificationCode;
    user.verificationExpires = verificationExpires;
    await user.save();

    await sendOtpEmail({
      to: email,
      code: verificationCode,
      purpose: 'verification',
      expiresInMinutes: 10,
    });

    logger.info(`[GỬI LẠI OTP] Mã OTP xác thực mới cho ${email} đã được gửi qua email.`);
    return true;
  },

  // Đăng nhập
  login: async (credentials: { email: string; password?: string }) => {
    const user = await User.findOne({ where: { email: credentials.email } });
    if (!user) {
      throw new UnauthorizedError('Email hoặc mật khẩu không chính xác.');
    }

    const isMatch = await user.comparePassword(credentials.password || '');
    if (!isMatch) {
      throw new UnauthorizedError('Email hoặc mật khẩu không chính xác.');
    }

    // Sinh token
    const accessToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      accessSecret,
      { expiresIn: '15m' }
    );

    const refreshTokenVal = jwt.sign(
      { id: user.id },
      refreshSecret,
      { expiresIn: '7d' }
    );

    // Lưu Refresh Token
    await RefreshToken.create({
      token: refreshTokenVal,
      userId: user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 ngày
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        avatarUrl: user.avatarUrl,
      },
      accessToken,
      refreshToken: refreshTokenVal,
    };
  },

  // Làm mới token
  refresh: async (refreshTokenVal: string) => {
    const dbToken = await RefreshToken.findOne({ where: { token: refreshTokenVal } });
    if (!dbToken || dbToken.isExpired) {
      if (dbToken) {
        await dbToken.destroy();
      }
      throw new UnauthorizedError('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
    }

    const user = await User.findByPk(dbToken.userId);
    if (!user) {
      throw new UnauthorizedError('Người dùng không tồn tại.');
    }

    // Xoá token cũ (Refresh Token Rotation)
    await dbToken.destroy();

    // Sinh cặp token mới
    const newAccessToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      accessSecret,
      { expiresIn: '15m' }
    );

    const newRefreshToken = jwt.sign(
      { id: user.id },
      refreshSecret,
      { expiresIn: '7d' }
    );

    await RefreshToken.create({
      token: newRefreshToken,
      userId: user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  },

  // Đăng xuất
  logout: async (refreshTokenVal: string) => {
    await RefreshToken.destroy({ where: { token: refreshTokenVal } });
    return true;
  },

  // Quên mật khẩu
  forgotPassword: async (email: string) => {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      // Để bảo mật không throw lỗi lộ email
      return true;
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 phút

    user.resetPasswordCode = code;
    user.resetPasswordExpires = expires;
    await user.save();

    await sendOtpEmail({
      to: email,
      code,
      purpose: 'password_reset',
      expiresInMinutes: 10,
    });

    logger.info(`[QUÊN MẬT KHẨU] OTP khôi phục mật khẩu cho ${email} đã được gửi qua email.`);
    return true;
  },

  // Đặt lại mật khẩu
  resetPassword: async (payload: { email: string; code: string; password?: string; newPassword?: string }) => {
    const user = await User.findOne({ where: { email: payload.email } });
    if (!user) {
      throw new BadRequestError('Yêu cầu không hợp lệ.');
    }

    if (
      user.resetPasswordCode !== payload.code ||
      !user.resetPasswordExpires ||
      new Date() > user.resetPasswordExpires
    ) {
      throw new BadRequestError('Mã OTP khôi phục mật khẩu không chính xác hoặc đã hết hạn.');
    }

    const newPass = payload.password || payload.newPassword;
    if (!newPass) {
      throw new BadRequestError('Mật khẩu mới không được để trống.');
    }

    user.password = newPass;
    user.resetPasswordCode = null;
    user.resetPasswordExpires = null;
    await user.save();

    logger.info(`[ĐẶT LẠI MẬT KHẨU] Người dùng ${payload.email} đã đổi mật khẩu thành công.`);
    return true;
  },
};
