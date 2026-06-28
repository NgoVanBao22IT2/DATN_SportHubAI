import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/authService';
import { AuthenticatedRequest } from '../../../common/middlewares/authMiddleware';

export const authController = {
  // Đăng ký
  register: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await authService.register(req.body);
      res.status(201).json({
        status: 'SUCCESS',
        data,
      });
    } catch (error) {
      next(error);
    }
  },

  // Xác thực Email
  verifyEmail: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, code } = req.body;
      await authService.verifyEmail(email, code);
      res.status(200).json({
        status: 'SUCCESS',
        message: 'Xác thực email thành công.',
        data: null,
      });
    } catch (error) {
      next(error);
    }
  },

  // Gửi lại mã OTP
  resendVerification: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email } = req.body;
      await authService.resendVerification(email);
      res.status(200).json({
        status: 'SUCCESS',
        message: 'Mã xác thực mới đã được gửi.',
        data: null,
      });
    } catch (error) {
      next(error);
    }
  },

  // Đăng nhập
  login: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await authService.login(req.body);
      res.status(200).json({
        status: 'SUCCESS',
        data,
      });
    } catch (error) {
      next(error);
    }
  },

  // Làm mới Token
  refresh: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { refreshToken } = req.body;
      const data = await authService.refresh(refreshToken);
      res.status(200).json({
        status: 'SUCCESS',
        data,
      });
    } catch (error) {
      next(error);
    }
  },

  // Đăng xuất
  logout: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { refreshToken } = req.body;
      await authService.logout(refreshToken);
      res.status(200).json({
        status: 'SUCCESS',
        message: 'Đăng xuất thành công.',
        data: null,
      });
    } catch (error) {
      next(error);
    }
  },

  // Lấy thông tin tài khoản hiện tại
  me: async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = req.user;
      res.status(200).json({
        status: 'SUCCESS',
        data: {
          user: {
            id: user?.id,
            email: user?.email,
            fullName: user?.fullName,
            role: user?.role,
            avatarUrl: user?.avatarUrl,
            phoneNumber: user?.phoneNumber,
          },
        },
      });
    } catch (error) {
      next(error);
    }
  },

  // Quên mật khẩu
  forgotPassword: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email } = req.body;
      await authService.forgotPassword(email);
      res.status(200).json({
        status: 'SUCCESS',
        message: 'Mã OTP khôi phục mật khẩu đã được gửi đến email nếu tồn tại.',
        data: null,
      });
    } catch (error) {
      next(error);
    }
  },

  // Đặt lại mật khẩu
  resetPassword: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await authService.resetPassword(req.body);
      res.status(200).json({
        status: 'SUCCESS',
        message: 'Đổi mật khẩu thành công.',
        data: null,
      });
    } catch (error) {
      next(error);
    }
  },
};
