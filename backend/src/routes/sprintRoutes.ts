import { Router } from 'express';
import auth from '../middleware/auth';
import roleGuard from '../middleware/roleGuard';
import { UserRole } from '../models/User';
import {
  getSprints,
  createSprint,
  startSprint,
  completeSprint,
  updateSprint,
  deleteSprint,
  moveTaskToSprint,
} from '../controllers/sprintController';

const router = Router();

router.use(auth);

router.get('/', getSprints);
router.post('/', createSprint);
router.put('/:id', updateSprint);
router.put('/:id/start', startSprint);
router.put('/:id/complete', completeSprint);
router.post('/move-task', moveTaskToSprint);
router.delete('/:id', roleGuard(UserRole.ADMIN, UserRole.MANAGER), deleteSprint);

export default router;
