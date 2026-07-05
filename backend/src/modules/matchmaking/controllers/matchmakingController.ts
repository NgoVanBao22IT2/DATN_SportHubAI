import { Response, NextFunction } from 'express';
import { matchmakingService } from '../services/matchmakingService';
import { AuthenticatedRequest } from '../../../common/middlewares/authMiddleware';

export const matchmakingController = {
  create: async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId = req.user!.id;
      const post = await matchmakingService.create(userId, req.body);
      res.status(201).json({
        status: 'SUCCESS',
        data: post,
      });
    } catch (error) {
      next(error);
    }
  },

  getAll: async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const posts = await matchmakingService.getAll(req.query);
      res.status(200).json({
        status: 'SUCCESS',
        data: posts,
      });
    } catch (error) {
      next(error);
    }
  },
};
