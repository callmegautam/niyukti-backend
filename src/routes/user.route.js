import * as UserController from '../controllers/user.controller.js';
import { Router } from 'express';
import { validate } from '../middlewares/validate.middleware.js';
import {
    createUserSchema,
    loginUserSchema,
    updateUserSchema,
} from '../validators/user.validator.js';

const router = Router();

router.post(
    '/register',
    validate(createUserSchema),
    UserController.registerUser
);
router.post('/login', validate(loginUserSchema), UserController.loginUser);
router.get('/users', UserController.getAllUsers);
router.get('/users/:id', UserController.getUserById);
router.get('/users/:username', UserController.getUserByUsername);
router.put('/users/:id', validate(updateUserSchema), UserController.updateUser);
router.delete('/users/:id', UserController.deleteUser);

export default router;
