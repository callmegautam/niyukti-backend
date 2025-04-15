import asyncHandler from '../utils/asyncHandler.js';
import { verifyToken } from '../utils/jwt.js';

export const isLoggedIn = asyncHandler(async (req, res, next) => {
    const token =
        req.cookies?.accessToken ||
        req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized, please login',
            data: null,
        });
    }

    try {
        const data = verifyToken(token);
        res.locals.user = data;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized, please login',
            data: null,
        });
    }
});
