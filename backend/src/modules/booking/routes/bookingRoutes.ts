import { Router } from 'express';
import { bookingController } from '../controllers/bookingController';
import { authMiddleware } from '../../../common/middlewares/authMiddleware';

const router = Router();

// Tất cả các route đặt sân yêu cầu đăng nhập
router.use(authMiddleware);

router.post('/', bookingController.create);
router.get('/my-bookings', bookingController.getMyBookings);
router.get('/:bookingId', bookingController.getDetails);
router.post('/:bookingId/cancel', bookingController.cancel);

export default router;
