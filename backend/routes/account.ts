import { Router } from 'express';
import { register, login, logout } from '../controllers/userController';

const router = Router();

router.get('/logout', logout)

router.post('/register', register);
router.post('/login', login);

export default router;