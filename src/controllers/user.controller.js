import { cookiesOptions } from '../config/cookies.js';
import { prisma } from '../db/db.js';
import asyncHandler from '../utils/asyncHandler.js';
import { checkExistingUser } from '../utils/checkExistingUser.js';
import { generateToken } from '../utils/jwt.js';

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

export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await checkExistingUser(null, email);
    if (!user) {
        return res.status(401).json({
            success: false,
            message: 'Invalid email or password',
        });
    }
    if (user.password !== password) {
        return res.status(401).json({
            success: false,
            message: 'Invalid email or password',
        });
    }

    const JWTtoken = generateToken({ id: user.id });

    return res
        .status(200)
        .cookie('accessToken', JWTtoken, cookiesOptions)
        .json({
            success: true,
            message: 'Login successful',
            data: {
                id: user.id,
                username: user.username,
                name: user.name,
                email: user.email,
                accessToken: JWTtoken,
            },
        });
});
