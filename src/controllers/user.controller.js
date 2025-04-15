import { prisma } from '../db/db.js';
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
    const user = await prisma.user.create({
        data: {
            username,
            name,
            email,
            password,
        },
    });
    return res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: {
            id: user.id,
            username: user.username,
            name: user.name,
            email: user.email,
        },
    });
});
