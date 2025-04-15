import * as UserController from '../controllers/user.controller.js';
import { Router } from 'express';
import { isLoggedIn } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import {
    createUserSchema,
    loginUserSchema,
} from '../validators/user.validator.js';

const router = Router();

router.post(
    '/register',
    validate(createUserSchema),
    UserController.registerUser
);
router.post('/login', validate(loginUserSchema), UserController.loginUser);

export default router;
