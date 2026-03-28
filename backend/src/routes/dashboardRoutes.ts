import { Router } from 'express';
import { getAnalytics } from '../controllers/dashboardController';
import auth from '../middleware/auth';

const router = Router();

router.use(auth);
router.get('/analytics', getAnalytics);

export default router;
