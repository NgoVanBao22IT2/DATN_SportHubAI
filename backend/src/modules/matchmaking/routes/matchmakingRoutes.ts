import { Router } from 'express';
import { matchmakingController } from '../controllers/matchmakingController';
import { authMiddleware } from '../../../common/middlewares/authMiddleware';

const router = Router();

// Lấy danh sách bài đăng (yêu cầu đăng nhập hoặc không - tuỳ ý, ở đây yêu cầu đăng nhập)
router.get('/', authMiddleware, matchmakingController.getAll);

// Đăng tuyển mới
router.post('/', authMiddleware, matchmakingController.create);

export default router;
