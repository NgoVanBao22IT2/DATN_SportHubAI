import { Request, Response, NextFunction } from 'express';
import { venueService } from '../services/venueService';

export const venueController = {
  // Tìm kiếm địa điểm
  search: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { sportType, searchQuery, latitude, longitude, maxDistanceKm } = req.query;
      
      const filters = {
        sportType: sportType as any,
        searchQuery: searchQuery as string,
        latitude: latitude ? parseFloat(latitude as string) : undefined,
        longitude: longitude ? parseFloat(longitude as string) : undefined,
        maxDistanceKm: maxDistanceKm ? parseFloat(maxDistanceKm as string) : undefined,
      };

      const data = await venueService.search(filters);
      res.status(200).json({
        status: 'SUCCESS',
        data,
      });
    } catch (error) {
      next(error);
    }
  },

  // Chi tiết địa điểm
  getDetails: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { venueId } = req.params;
      const data = await venueService.getDetails(venueId);
      res.status(200).json({
        status: 'SUCCESS',
        data,
      });
    } catch (error) {
      next(error);
    }
  },

  // Lấy các sân thi đấu nhỏ
  getCourts: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { venueId } = req.params;
      const data = await venueService.getCourts(venueId);
      res.status(200).json({
        status: 'SUCCESS',
        data,
      });
    } catch (error) {
      next(error);
    }
  },
};
