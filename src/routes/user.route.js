import * as UserController from '../controllers/user.controller.js';
import { Router } from 'express';
import { validate } from '../middlewares/validate.middleware.js';

const router = Router();

router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);
router.get('/users', UserController.getAllUsers);
router.get('/users/:id', UserController.getUserById);
router.get('/users/:username', UserController.getUserByUsername);
router.put('/users/:id', UserController.updateUser);
router.delete('/users/:id', UserController.deleteUser);

export default router;
