import { Router } from 'express';
import auth from '../middleware/auth';
import {
  getSprints,
  createSprint,
  startSprint,
  completeSprint,
  updateSprint,
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

export default router;
