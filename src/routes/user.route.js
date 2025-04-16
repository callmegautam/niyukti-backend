import * as UserController from '../controllers/user.controller.js';
import { Router } from 'express';

const router = Router();

router.get('/', UserController.getAllUsers);
router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);
router.get('/:id', UserController.getUserById);
router.get('/:username', UserController.getUserByUsername);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

export default router;
