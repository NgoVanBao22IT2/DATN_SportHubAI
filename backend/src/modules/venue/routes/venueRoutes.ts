import { Router } from 'express';
import { venueController } from '../controllers/venueController';

const router = Router();

router.get('/', venueController.search);
router.get('/:venueId', venueController.getDetails);
router.get('/:venueId/courts', venueController.getCourts);

export default router;
