import { Router } from 'express';
import { signup, login, getMe, getAllUsers } from '../controllers/authController';
import auth from '../middleware/auth';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/me', auth, getMe);
router.get('/users', auth, getAllUsers);

export default router;
