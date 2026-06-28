import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedError, ForbiddenError } from '../errors/AppError';
import User from '../../modules/auth/models/User';

export interface AuthenticatedRequest extends Request {
  user?: User;
}

export const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError('Phiên đăng nhập không hợp lệ hoặc đã hết hạn.');
    }

    const token = authHeader.split(' ')[1];
    const accessSecret = process.env.JWT_ACCESS_SECRET || 'your_jwt_access_secret_key_should_be_very_long';

    let decoded: any;
    try {
      decoded = jwt.verify(token, accessSecret);
    } catch (err) {
      throw new UnauthorizedError('Access token không hợp lệ hoặc đã hết hạn.');
    }

    const user = await User.findByPk(decoded.id);
    if (!user) {
      throw new UnauthorizedError('Người dùng không tồn tại trong hệ thống.');
    }

    if (!user.isVerified) {
      throw new ForbiddenError('Tài khoản của bạn chưa được xác thực email.');
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export const requireRole = (roles: Array<'USER' | 'OWNER' | 'ADMIN'>) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new UnauthorizedError('Vui lòng đăng nhập để thực hiện hành động này.'));
    }

    if (!roles.includes(req.user.role)) {
      return next(new ForbiddenError('Bạn không có quyền thực hiện hành động này.'));
    }

    next();
  };
};
