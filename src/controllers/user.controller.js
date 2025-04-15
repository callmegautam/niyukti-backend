import { prisma } from '../db/db';
import asyncHandler from '../utils/asyncHandler.js';
import { checkExistingUser } from '../utils/checkExistingUser.js';

export const registerUser = asyncHandler(async (req, res) => {
    const { username, name, email, password } = req.body;
    const userExist = await checkExistingUser(username, email);
    if (userExist) {
        return res.status(409).json({
            success: false,
            message: 'User already exists with this email or username',
        });
    }
});
