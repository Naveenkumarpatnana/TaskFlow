import { Router } from 'express';
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from '../controllers/taskController';
import auth from '../middleware/auth';
import roleGuard from '../middleware/roleGuard';
import { UserRole } from '../models/User';

const router = Router();

router.use(auth); // All task routes require authentication

router.get('/', getTasks);
router.get('/:id', getTaskById);
router.post('/', roleGuard(UserRole.ADMIN, UserRole.MANAGER), createTask);
router.put('/:id', updateTask);
router.delete('/:id', roleGuard(UserRole.ADMIN), deleteTask);

export default router;
