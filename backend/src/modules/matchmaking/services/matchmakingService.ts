import { Op } from 'sequelize';
import MatchmakingPost from '../models/MatchmakingPost';
import User from '../../auth/models/User';

export const matchmakingService = {
  create: async (userId: string, data: any) => {
    const post = await MatchmakingPost.create({
      sportType: data.sportType,
      playDate: data.playDate,
      playTime: data.playTime,
      location: data.location,
      skillLevel: data.skillLevel,
      neededQuantity: Number(data.neededQuantity || 1),
      totalQuantity: Number(data.totalQuantity || data.neededQuantity || 2),
      costPerPerson: Number(data.costPerPerson || 0),
      notes: data.notes || '',
      userId,
    });

    const fullPost = await MatchmakingPost.findByPk(post.id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'fullName', 'avatarUrl', 'email'],
        },
      ],
    });

    return fullPost;
  },

  getAll: async (query: any) => {
    const whereClause: any = {};

    if (query.sportType) {
      whereClause.sportType = query.sportType;
    }

    if (query.search) {
      const searchVal = `%${query.search}%`;
      whereClause[Op.or] = [
        { location: { [Op.like]: searchVal } },
        { sportType: { [Op.like]: searchVal } },
        { skillLevel: { [Op.like]: searchVal } },
        { notes: { [Op.like]: searchVal } },
      ];
    }

    const posts = await MatchmakingPost.findAll({
      where: whereClause,
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'fullName', 'avatarUrl', 'email'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    return posts;
  },
};
