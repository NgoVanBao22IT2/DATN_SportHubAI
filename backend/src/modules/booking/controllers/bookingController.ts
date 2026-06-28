import { Response, NextFunction } from 'express';
import { bookingService } from '../services/bookingService';
import { AuthenticatedRequest } from '../../../common/middlewares/authMiddleware';

export const bookingController = {
  // Tạo đặt sân mới
  create: async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user!.id;
      const data = await bookingService.create(userId, req.body);
      res.status(201).json({
        status: 'SUCCESS',
        data,
      });
    } catch (error) {
      next(error);
    }
  },

  // Danh sách đặt sân của tôi
  getMyBookings: async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user!.id;
      const { page, limit, status } = req.query;

      const params = {
        page: page ? parseInt(page as string) : undefined,
        limit: limit ? parseInt(limit as string) : undefined,
        status: status as string,
      };

      const data = await bookingService.getMyBookings(userId, params);
      res.status(200).json({
        status: 'SUCCESS',
        data,
      });
    } catch (error) {
      next(error);
    }
  },

  // Chi tiết đặt sân
  getDetails: async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user!.id;
      const { bookingId } = req.params;
      const data = await bookingService.getDetails(userId, bookingId);
      res.status(200).json({
        status: 'SUCCESS',
        data,
      });
    } catch (error) {
      next(error);
    }
  },

  // Huỷ đặt sân
  cancel: async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user!.id;
      const { bookingId } = req.params;
      const { reason } = req.body;
      const data = await bookingService.cancel(userId, bookingId, reason);
      res.status(200).json({
        status: 'SUCCESS',
        data,
      });
    } catch (error) {
      next(error);
    }
  },
};
